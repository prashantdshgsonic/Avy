import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    MONGO_URI = os.getenv("MONGO_URI")
    DB_NAME = os.getenv("DB_NAME")
    ACTIVE_MQ_URL = os.getenv("ACTIVE_MQ_URL")
    LESSON_QUEUE = os.getenv("LESSON_QUEUE")
    CHUNK_QUEUE = os.getenv("CHUNK_QUEUE")
