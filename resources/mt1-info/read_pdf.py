from PyPDF2 import PdfReader
import sys

if len(sys.argv) < 2:
    print("Usage: python read_pdf.py <pdf_path>")
    sys.exit(1)

pdf_path = sys.argv[1]
pdf = PdfReader(pdf_path)

for i in range(len(pdf.pages)):
    print(f'\n{"="*60}')
    print(f'Page {i+1} of {len(pdf.pages)}')
    print("="*60)
    print(pdf.pages[i].extract_text())
