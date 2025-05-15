import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.mongo_handler import MongoHandler

lesson_id = "lessond123"
chunks = ["This is a chunk of text from a leeson.", "Another chunks of lesson text"]

def test_mongo_db():
    print("Testing MongoDB...")

    try:
        db_handler = MongoHandler(uri="mongodb://localhost:27017", db_name="avy")

        db_handler.insert_lesson_chunks(lesson_id,chunks)
        print("\nLesson chunks inserted successfully")

        retrieved_chunks = db_handler.get_lesson_chunks(lesson_id)
        if retrieved_chunks:
            print("\Lesson chunks retrieved successfully")
            print(retrieved_chunks)
        else:
            print("\nNo chunks found for the provided lesson ID")
    except Exception as e:
        print(f"Error during Mongo test: {e}")


if __name__ == "__main__":
    test_mongo_db()