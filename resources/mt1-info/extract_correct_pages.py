"""
Updated script to extract correct question pages and generate solutions.
"""

import os
import re
from pathlib import Path
from PyPDF2 import PdfReader, PdfWriter
from PIL import Image

# Base directory
BASE_DIR = Path(__file__).parent
RESOURCES_DIR = BASE_DIR.parent

def parse_mapping_file(file_path):
    """Parse the pseudo-YAML file to extract exam and question mappings."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract exam path
    exam_match = re.search(r'exam:\s*(.+\.pdf)', content)
    exam_path = exam_match.group(1).strip() if exam_match else None
    
    # Extract question mappings
    mappings = []
    
    # Parse each question block
    blocks = re.split(r'\n\s+- number:', content)
    
    for block in blocks[1:]:  # Skip first split (before first question)
        lines = block.strip().split('\n')
        mapping = {}
        
        # Parse number from first line
        mapping['number'] = int(lines[0].split()[0])
        
        # Parse other fields
        for line in lines[1:]:
            line = line.strip()
            
            # Handle different field types
            if line.startswith('folder:'):
                mapping['folder'] = line.split(':', 1)[1].strip()
            elif line.startswith('q-pages:'):
                pages_str = line.split(':', 1)[1].strip()
                # Parse page numbers (can be single or comma-separated)
                mapping['q_pages'] = [int(p.strip()) for p in pages_str.split(',')]
            elif line.startswith('sol-file:'):
                mapping['sol_file'] = line.split(':', 1)[1].strip()
            elif line.startswith('sol-pages:'):
                pages_str = line.split(':', 1)[1].strip()
                mapping['sol_pages'] = [int(p.strip()) for p in pages_str.split(',')]
            elif line.startswith('generate-solution:'):
                value = line.split(':', 1)[1].strip().lower()
                mapping['generate_solution'] = value == 'true'
            elif line.startswith('short_name:'):
                mapping['short_name'] = line.split('"')[1]
            elif line.startswith('topic:'):
                mapping['topic'] = line.split('"')[1]
            elif line.startswith('sp26_exam:'):
                mapping['sp26_exam'] = line.split(':', 1)[1].strip()
        
        mappings.append(mapping)
    
    return {
        'exam': exam_path,
        'mappings': mappings
    }

def extract_pages(pdf_path, page_numbers, output_path):
    """Extract specific pages from a PDF (page numbers are 1-indexed)."""
    reader = PdfReader(pdf_path)
    writer = PdfWriter()
    
    for page_num in page_numbers:
        # Convert to 0-indexed
        page_idx = page_num - 1
        if 0 <= page_idx < len(reader.pages):
            writer.add_page(reader.pages[page_idx])
        else:
            print(f"Warning: Page {page_num} does not exist in {pdf_path.name}")
    
    with open(output_path, 'wb') as output:
        writer.write(output)
    
    return output_path

def convert_png_to_pdf(png_path, output_path):
    """Convert a PNG to PDF format."""
    try:
        img = Image.open(png_path)
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        img.save(output_path, 'PDF', resolution=100.0)
        return output_path
    except Exception as e:
        print(f"Error converting PNG {png_path}: {e}")
        return None

def main():
    # Parse the mapping file
    mapping_file = BASE_DIR / 'mt1-ques-topics.txt'
    data = parse_mapping_file(mapping_file)
    
    print("Processing questions and solutions...\n")
    
    exam_path = RESOURCES_DIR / data['exam'].replace('resources/', '')
    
    for mapping in data['mappings']:
        folder_name = mapping['folder']
        folder_path = BASE_DIR / folder_name
        folder_path.mkdir(exist_ok=True)
        
        print(f"Question {mapping['number']}: {folder_name}")
        
        # Extract question pages
        if 'q_pages' in mapping:
            ques_output = folder_path / f"ques-{folder_name}.pdf"
            extract_pages(exam_path, mapping['q_pages'], ques_output)
            print(f"  ✓ Extracted question pages {mapping['q_pages']} -> {ques_output.name}")
        
        # Handle solutions
        if 'sol_file' in mapping:
            # Extract solution from specified file
            sol_file = mapping['sol_file']
            
            # Handle PNG files
            if sol_file.endswith('.png'):
                sol_path = RESOURCES_DIR / sol_file.replace('resources/', '')
                sol_output = folder_path / f"sol-{folder_name}.pdf"
                convert_png_to_pdf(sol_path, sol_output)
                print(f"  ✓ Converted solution PNG -> {sol_output.name}")
            
            # Handle PDF files
            elif sol_file.endswith('.pdf'):
                sol_path = RESOURCES_DIR / sol_file.replace('resources/', '')
                sol_output = folder_path / f"sol-{folder_name}.pdf"
                
                if 'sol_pages' in mapping:
                    extract_pages(sol_path, mapping['sol_pages'], sol_output)
                    print(f"  ✓ Extracted solution pages {mapping['sol_pages']} from {sol_file} -> {sol_output.name}")
                else:
                    # Copy entire solution file
                    extract_pages(sol_path, list(range(1, len(PdfReader(sol_path).pages) + 1)), sol_output)
                    print(f"  ✓ Copied entire solution from {sol_file} -> {sol_output.name}")
        
        elif mapping.get('generate_solution', False):
            print(f"  ⚠ Solution needs to be generated manually for this question")
        
        print()
    
    print("Done!")

if __name__ == '__main__':
    main()
