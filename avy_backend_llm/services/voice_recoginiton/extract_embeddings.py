import os
import torchaudio
from speechbrain.pretrained import EncoderClassifier

from database.mongo_handler import MongoHandler

# Load the pre-trained speaker recognition model
classifier = EncoderClassifier.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb", savedir="tmp_model")
db_handler = MongoHandler(uri=os.getenv("MONGO_URI"), db_name=os.getenv("DB_NAME"))

def extract_embedding(file_path):
    print("extracting_embedding")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File {file_path} not found!")
    print(file_path)
    signal, fs = torchaudio.load(file_path)  # Load audio
    embedding = classifier.encode_batch(signal)  # Extract deep learning features
    return embedding.squeeze().detach().numpy()  # Convert to NumPy array

def store_embedding(user_id,file_path):
    embedding = extract_embedding(file_path) # Save embeddings
    print("extracted successfully")
    db_handler.insert_user_voice_embedding(user_id,embedding)
    print("Voice embeddings stored successfully.")
