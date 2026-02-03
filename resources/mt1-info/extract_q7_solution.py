from PyPDF2 import PdfReader, PdfWriter

# Read the q4q6sol.pdf which has 3 pages
reader = PdfReader('C:/Users/mrede/Documents/cs104/site/resources/midterm-c-q4q6sol.pdf')
print(f'Total pages in q4q6sol.pdf: {len(reader.pages)}')

# Extract page 3 (index 2) for Question 7
if len(reader.pages) >= 3:
    writer = PdfWriter()
    writer.add_page(reader.pages[2])
    
    output_path = 'C:/Users/mrede/Documents/cs104/site/resources/mt1-info/heap-linked-removemin/sol-heap-linked-removemin.pdf'
    with open(output_path, 'wb') as output:
        writer.write(output)
    
    print(f'✓ Created solution for Question 7: {output_path}')
    print('  Extracted page 3 from q4q6sol.pdf')
else:
    print('ERROR: q4q6sol.pdf does not have a 3rd page')
