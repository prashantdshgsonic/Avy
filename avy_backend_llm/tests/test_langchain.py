import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.file_processor import process_pdf

def test_langchain_pdf():
    print("Testing Langchain PDF Loader...")

    pdf_path = "C:/Users/Win-10/Downloads/Lesson_11._Vocabulary_set.pdf"

    try:
        text = process_pdf(pdf_path)
        if text:
            print("\nPDF Text Extraction Succesful!")
            print(text[:500])
        else:
            print("\nFailed to extract text from PDF")
    except Exception as e:
        print(f"Error during Langchain PDF test: {e}")


if __name__ == "__main__":
    test_langchain_pdf()