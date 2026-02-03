from pathlib import Path
import re
from PyPDF2 import PdfReader, PdfWriter

BASE_DIR = Path(__file__).parent
RESOURCES_DIR = BASE_DIR.parent
TOPICS_FILE = BASE_DIR / "mt1-ques-topics.txt"
TARGET_EXAM = "resources/midterm-b.pdf"


def parse_mt1_topics(file_path):
    exams = []
    current_exam = None
    current_mapping = None
    in_mapping = False

    with open(file_path, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.rstrip("\n")
            stripped = line.strip()

            if stripped.startswith("- exam:"):
                # Save previous exam block
                if current_exam:
                    if current_mapping:
                        current_exam["mapping"].append(current_mapping)
                        current_mapping = None
                    exams.append(current_exam)

                exam_path = stripped.split(":", 1)[1].strip()
                current_exam = {"exam": exam_path, "solutions": [], "mapping": []}
                in_mapping = False
                continue

            if current_exam is None:
                continue

            if stripped.startswith("solutions:"):
                # optional, ignore for midterm-b unless needed later
                continue

            if stripped.startswith("mapping:"):
                in_mapping = True
                continue

            if in_mapping and stripped.startswith("- number:"):
                if current_mapping:
                    current_exam["mapping"].append(current_mapping)
                number_val = stripped.split(":", 1)[1].strip()
                current_mapping = {"number": number_val}
                continue

            if in_mapping and current_mapping is not None and ":" in stripped:
                key, val = stripped.split(":", 1)
                key = key.strip()
                val = val.strip()

                if key == "q-pages" or key == "sol-pages":
                    pages = [int(p.strip()) for p in val.split(",") if p.strip()]
                    current_mapping[key] = pages
                elif key in ("generate-solution", "generate-sol"):
                    current_mapping["generate-solution"] = val.lower() == "true"
                else:
                    current_mapping[key] = val

    # append final exam
    if current_exam:
        if current_mapping:
            current_exam["mapping"].append(current_mapping)
        exams.append(current_exam)

    return exams


def extract_pages(pdf_path, page_numbers, output_path):
    reader = PdfReader(pdf_path)
    writer = PdfWriter()
    for page_num in page_numbers:
        idx = page_num - 1
        if 0 <= idx < len(reader.pages):
            writer.add_page(reader.pages[idx])
        else:
            print(f"Warning: page {page_num} out of range for {pdf_path.name}")
    with open(output_path, "wb") as f:
        writer.write(f)


def main():
    exams = parse_mt1_topics(TOPICS_FILE)
    exam_block = next((e for e in exams if e["exam"] == TARGET_EXAM), None)
    if not exam_block:
        print(f"Could not find exam block for {TARGET_EXAM}")
        return

    exam_pdf = RESOURCES_DIR / TARGET_EXAM.replace("resources/", "")
    if not exam_pdf.exists():
        print(f"Exam PDF not found: {exam_pdf}")
        return

    for mapping in exam_block["mapping"]:
        folder = mapping.get("folder")
        if not folder:
            continue
        folder_path = BASE_DIR / folder
        folder_path.mkdir(exist_ok=True)

        # Extract question pages
        q_pages = mapping.get("q-pages")
        if q_pages:
            ques_output = folder_path / f"ques-{folder}.pdf"
            extract_pages(exam_pdf, q_pages, ques_output)
            print(f"Question {mapping.get('number')}: extracted pages {q_pages} -> {ques_output.name}")

        # Extract solution pages if provided
        sol_file = mapping.get("sol-file")
        sol_pages = mapping.get("sol-pages")
        if sol_file and sol_pages:
            sol_pdf = RESOURCES_DIR / sol_file.replace("resources/", "")
            sol_output = folder_path / f"sol-{folder}.pdf"
            extract_pages(sol_pdf, sol_pages, sol_output)
            print(f"Solution for {folder}: extracted pages {sol_pages} from {sol_file} -> {sol_output.name}")

        if mapping.get("generate-solution"):
            print(f"Solution needs generation for {folder}")


if __name__ == "__main__":
    main()
