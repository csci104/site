"""
Script to split exam PDFs and solution files into separate folders based on question mapping.
"""

import os
import re
import shutil
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
    
    # Extract solutions
    solutions_match = re.search(r'solutions:\s*\[(.+?)\]', content, re.DOTALL)
    solutions = []
    if solutions_match:
        sol_content = solutions_match.group(1)
        # Remove any braces that might be in the content
        sol_content = sol_content.replace('{', '').replace('}', '')
        # Extract file paths from the braces
        sol_paths = re.findall(r'(\S+\.(pdf|png|jpg|jpeg))', sol_content)
        solutions = [path[0] for path in sol_paths]
    
    # Extract question mappings
    mappings = []
    mapping_pattern = r'- number:\s*(\d+)\s+folder:\s*(\S+)\s+short_name:\s*"([^"]+)"\s+topic:\s*"([^"]+)"\s+sp26_exam:\s*(\S+)'
    for match in re.finditer(mapping_pattern, content, re.MULTILINE | re.DOTALL):
        mappings.append({
            'number': int(match.group(1)),
            'folder': match.group(2),
            'short_name': match.group(3),
            'topic': match.group(4),
            'sp26_exam': match.group(5)
        })
    
    return {
        'exam': exam_path,
        'solutions': solutions,
        'mappings': mappings
    }

def create_folders(mappings, base_dir):
    """Create subfolders for each question."""
    created_folders = []
    for mapping in mappings:
        folder_path = base_dir / mapping['folder']
        folder_path.mkdir(exist_ok=True)
        created_folders.append((mapping, folder_path))
        print(f"Created folder: {folder_path}")
    return created_folders

def split_pdf_by_pages(pdf_path, output_folder, prefix, question_number, folder_name):
    """Split a PDF and extract specific pages for a question."""
    reader = PdfReader(pdf_path)
    
    # Question-to-page mapping for midterm-c (based on the 11-page structure)
    # You may need to adjust this based on actual page breaks in the PDF
    question_pages = {
        1: [0, 1],      # Question 1: pages 1-2
        2: [2],         # Question 2: page 3
        3: [3, 4],      # Question 3: pages 4-5
        4: [5, 6],      # Question 4: pages 6-7
        5: [7, 8],      # Question 5: pages 8-9
        6: [9],         # Question 6: page 10
        7: [10]         # Question 7: page 11
    }
    
    if question_number not in question_pages:
        print(f"Warning: No page mapping for question {question_number}")
        return None
    
    writer = PdfWriter()
    for page_idx in question_pages[question_number]:
        if page_idx < len(reader.pages):
            writer.add_page(reader.pages[page_idx])
        else:
            print(f"Warning: Page {page_idx + 1} does not exist in PDF")
    
    output_file = output_folder / f"{prefix}-{folder_name}.pdf"
    with open(output_file, 'wb') as output:
        writer.write(output)
    
    print(f"Created: {output_file}")
    return output_file

def convert_png_to_pdf(png_path, output_folder, prefix, folder_name):
    """Convert a PNG solution to PDF format."""
    try:
        img = Image.open(png_path)
        # Convert to RGB if necessary (PNG might have alpha channel)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        output_file = output_folder / f"{prefix}-{folder_name}.pdf"
        img.save(output_file, 'PDF', resolution=100.0)
        print(f"Converted PNG to PDF: {output_file}")
        return output_file
    except Exception as e:
        print(f"Error converting PNG {png_path}: {e}")
        return None

def determine_solution_file(question_num, solutions_list):
    """
    Determine which solution file contains the solution for a given question.
    Based on the naming pattern in the file.
    """
    best_match = None
    
    # Pattern matching for solution files
    for sol_file in solutions_list:
        # Check if filename contains exact question number pattern
        # e.g., midterm-c-q1sol.png -> question 1
        if f'q{question_num}sol' in sol_file.lower():
            return sol_file
        
        # Check for range patterns like q2q3 (covers 2-3) or q4q6 (covers 4-7 based on content)
        range_match = re.search(r'q(\d+)q(\d+)', sol_file.lower())
        if range_match:
            start = int(range_match.group(1))
            end = int(range_match.group(2))
            # Check if question falls in this range
            # For q4q6, assume it covers 4, 5, 6 (and possibly 7)
            if start <= question_num <= end + 1:  # +1 to handle case like q4q6 covering through 7
                # Prioritize more specific matches
                if start <= question_num <= end:
                    return sol_file
                elif question_num == end + 1:
                    best_match = sol_file
    
    return best_match

def extract_solution_page(sol_file, question_num, output_folder, folder_name, resources_dir):
    """Extract the appropriate solution page/section for a question."""
    sol_path = resources_dir / sol_file.replace('resources/', '')
    
    if not sol_path.exists():
        print(f"Warning: Solution file not found: {sol_path}")
        return None
    
    # If it's a PNG, convert it directly
    if sol_path.suffix.lower() == '.png':
        return convert_png_to_pdf(sol_path, output_folder, 'sol', folder_name)
    
    # If it's a PDF, we need to determine which page(s) to extract
    if sol_path.suffix.lower() == '.pdf':
        # Parse the filename to understand the structure
        # e.g., midterm-c-q2q3sol.pdf has 2 pages (one per question: 2, 3)
        # e.g., midterm-c-q4q6sol.pdf has 3 pages (questions: 4, 5, 6, and possibly 7)
        range_match = re.search(r'q(\d+)q(\d+)', sol_path.stem.lower())
        
        reader = PdfReader(sol_path)
        writer = PdfWriter()
        
        if range_match:
            start = int(range_match.group(1))
            end = int(range_match.group(2))
            
            # Special case for q4q6 which has 3 pages for questions 4, 5, 6 (and 7)
            # If we have more questions than the typical range would suggest
            if 'q4q6' in sol_path.stem.lower() and len(reader.pages) == 3:
                # Questions 4, 5, 6 map to pages 0, 1, 2
                page_mapping = {4: 0, 5: 1, 6: 2}
                if question_num in page_mapping:
                    page_index = page_mapping[question_num]
                elif question_num == 7:
                    # Question 7 might be in this file too, but we don't have a page for it
                    # Let's check if there's content - for now assume it's not here
                    print(f"Warning: Question {question_num} may not have a solution in this PDF")
                    return None
            else:
                # Calculate which page this question is on (0-indexed)
                page_index = question_num - start
            
            if 0 <= page_index < len(reader.pages):
                writer.add_page(reader.pages[page_index])
            else:
                # If we can't determine, just copy the whole PDF
                print(f"Warning: Could not determine page for question {question_num}, copying entire solution")
                for page in reader.pages:
                    writer.add_page(page)
        else:
            # Single question solution - copy all pages
            for page in reader.pages:
                writer.add_page(page)
        
        output_file = output_folder / f"sol-{folder_name}.pdf"
        with open(output_file, 'wb') as output:
            writer.write(output)
        
        print(f"Created solution: {output_file}")
        return output_file
    
    return None

def main():
    # Parse the mapping file
    mapping_file = BASE_DIR / 'mt1-ques-topics.txt'
    data = parse_mapping_file(mapping_file)
    
    print("Parsed data:")
    print(f"Exam: {data['exam']}")
    print(f"Solutions: {data['solutions']}")
    print(f"Number of questions: {len(data['mappings'])}")
    print()
    
    # Create folders
    folder_mappings = create_folders(data['mappings'], BASE_DIR)
    print()
    
    # Process exam PDF - split into individual questions
    exam_path = RESOURCES_DIR / data['exam'].replace('resources/', '')
    if exam_path.exists():
        print(f"Processing exam: {exam_path}")
        for mapping, folder_path in folder_mappings:
            split_pdf_by_pages(
                exam_path, 
                folder_path, 
                'ques', 
                mapping['number'],
                mapping['folder']
            )
    else:
        print(f"Warning: Exam file not found: {exam_path}")
    
    print()
    
    # Process solutions
    print("Processing solutions...")
    for mapping, folder_path in folder_mappings:
        sol_file = determine_solution_file(mapping['number'], data['solutions'])
        if sol_file:
            print(f"Question {mapping['number']} -> {sol_file}")
            extract_solution_page(
                sol_file,
                mapping['number'],
                folder_path,
                mapping['folder'],
                RESOURCES_DIR
            )
        else:
            print(f"Warning: No solution file found for question {mapping['number']}")
    
    print("\nDone!")

if __name__ == '__main__':
    main()
