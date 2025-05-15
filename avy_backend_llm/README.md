.env
OPENAI_API_KEY=
# API key to authenticate and access OpenAI's GPT models for generating responses.
MONGO_URI = "mongodb://localhost:27017" # MongoDB connection string to interact with the database for storing and retrieving lesson data.
DB_NAME = "avy" # Specifies the name of the database (avy) used in MongoDB for storing application-related data.
ACTIVE_MQ_URL = "localhost" # URL of the ActiveMQ server (localhost in this case) used for message queue communication.
LESSON_QUEUE = "lesson_queue" # Name of the queue (lesson_queue) where lesson processing requests are sent.
DELETE_LESSON_CHUNKS_QUEUE = "delete_lesson_queue"  # Name of the queue (delete_lesson_queue) where chunks elimination requests are sent
CHUNK_QUEUE = "chunk_queue" # Name of the queue (chunk_queue) where processed chunks or data are stored for further use.]
LESSON_SUMMARY_QUEUE = "lesson_summary" # Name of the queue (lesson_summary_queue) where lesson summary is sent.


How to Run the Project
Install Required Dependencies using "pip install -r requirements.txt"

Start Required Services
MongoDB: Ensure the MongoDB server is running locally
ActiveMQ: Start the ActiveMQ server

Run the Application
Start the Flask application:
python app.py

How to Run Tests:
pip install pytest

python tests/test_langchain.py
python tests/test_whisper.py
python tests/test_mongodb.py
python tests/test_llm_service.py

Replace pdf_path = "C:/Users/Win-10/Downloads/Lesson_11._Vocabulary_set.pdf"
with the absolute path to a valid PDF file on your local machine.