import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.llm_api import get_response_from_llm
from dotenv import load_dotenv

load_dotenv()

# Mock data for testing
mock_context = """
Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems.
Specific applications of AI include expert systems, natural language processing (NLP), speech recognition,
and machine vision.
"""

mock_question = "What is Artificial intelligence?"

def test_llm_service():
    print("Testing LLM Service...")

    try:
        # Fetch response from LLM
        response = get_response_from_llm(mock_context, mock_question)
        print("\nLLM Response:")
        print(response)
    except Exception as e:
        print(f"Error during LLM service test: {e}")
        raise  # To re-raise the exception and see the traceback for debugging

if __name__ == "__main__":
    try:
        # Env. variables for testing
        os.environ["OPENAI_API_KEY"] = "API-KEY"

        test_llm_service()

    except Exception as e:
        print(f"Error in main execution: {e}")
