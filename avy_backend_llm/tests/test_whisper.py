import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.file_processor import process_video

def test_whisper():
    print("Testing Whisper...")

    video_path = r"C:\Users\Win-10\IdeaProjects\avy-backend\avy-backend\src\main\resources\video\1c73b188-d88a-4970-b1ab-9d9e38213607.mp4"

    try:

        transciption = process_video(video_path)
        if transciption:
            print("\nTranscription Succesfull!")
            print(transciption)
        else:
            print("\nFailed to transcribe video")
    except Exception as e:
        print(f"Error during Whisper test: {e}")


if __name__ == "__main__":
    test_whisper()