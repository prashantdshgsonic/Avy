from langchain_community.document_loaders import PyPDFLoader
import whisper

# Extracts text from a PDF file using PyPDFLoader from the langchain-community library.
def process_pdf(file_path):
    try:
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        return " ".join(doc.page_content for doc in documents)
    except Exception as e:
        print(f"Error processing PDF: {e}")

# Converts audio from a video file into text using the OpenAI Whisper model.
def process_video(file_path):
    try:
        model = whisper.load_model("base")
        result = model.transcribe(file_path)
        return result["text"]
    except Exception as e:
        print(f"Error processing video: {e}")
        return None