import openai

from config import Config
import os
from database.mongo_handler import MongoHandler
from dotenv import load_dotenv


load_dotenv()

openai.api_key = Config.OPENAI_API_KEY
openai.api_key = os.getenv("OPENAI_API_KEY")
db_handler = MongoHandler(uri=os.getenv("MONGO_URI"), db_name=os.getenv("DB_NAME"))

def get_summary_from_llm(context):
    messages = [
        {"role": "system","content":
            "You are a helpful assistant and must provide a brief but informative summary of the context(your answer must be strictly up to 500 characters!)"},
        {"role": "user", "content": f"Context: {context}"}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150
    )
    print("result: " + response.choices[0].message["content"].strip())
    return response.choices[0].message["content"].strip()

def get_response_from_llm(user,user_input):
 try:
    user_id = user.get("user_id")
    lesson_id = user.get("lesson_id")
    conversation_tracker = user.get("conversation_history")
    conversation_tracker.append(
        {
            "role": "user",
            "content": f"User input:{user_input}"
        }
    )
    print("course tracker appended")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation_tracker,
        max_tokens=150
    ).choices[0].message["content"].strip()
    print(response)
    conversation_tracker.append(
        {
            "role": "assistant",
            "content": response
        }
    )
    print(conversation_tracker)
    db_handler.insert_user_data(user_id,lesson_id,conversation_tracker)
    return response
 except Exception as e:
      print(f"Error querying LLM: {e}")

def get_navigation_request(request):
    messages = [
        {"role": "system", "content":
            "Based on the request you must semantically answer with one of these words: Dashboard, Profile, Market, Simulate, Log Out or if none of these words suits answer just None"},
        {"role": "user", "content": request}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150
    ).choices[0].message["content"].strip()
    print(response)
    return response

def get_cv_validation(context):
    messages = [
        {"role": "system",   "content": (
        "### Objective:\n"
        "Analyze the provided text and determine whether it belongs to a Curriculum Vitae (CV). \n\n"
        
        "### What a CV Typically Includes:\n"
        "A valid CV should contain **multiple** of the following elements (not necessarily all, but enough to clearly indicate it's a CV):\n"
        "- **Personal details** (name, contact information, location, summary)\n"
        "- **Work experience** (job titles, company names, employment dates, responsibilities)\n"
        "- **Education** (degree, university name, graduation year)\n"
        "- **Skills & certifications** (programming languages, software expertise, professional licenses)\n"
        "- **Professional achievements** (awards, key projects, notable contributions)\n\n"
        
        "**Important:**\n"
        "- A CV **may vary in format** but should still include identifiable career-related details.\n"
        "- If the text contains a structured **work history** along with **skills or education**, it is highly likely a CV.\n\n"
        
        "### What is NOT a CV:\n"
        "Reject documents that are clearly unrelated, such as:\n"
        "- **Legal documents** (NDAs, contracts, leases, official agreements)\n"
        "- **Financial or business documents** (invoices, policies, balance sheets, tenders)\n"
        "- **Academic papers** (essays, research reports, abstracts)\n"
        "- **Other non-relevant texts** (fiction, news articles, marketing materials, general emails)\n\n"
        
        "### Strict Validation Criteria:\n"
        "- If the text **contains only** general descriptions without job titles, work history, or personal details, it is NOT a CV.\n"
        "- **If the text lacks any career-related content, reject it.**\n"
        "- **If unsure, do NOT default to validation. Only confirm if multiple CV-like elements exist.**\n\n"
        
        "### How to Respond:\n"
        "- **If the text is clearly or highly likely a CV, respond with:**\n"
        "  **'validated'**\n"
        "- **If the text is NOT a CV, respond with:**\n"
        "  _'The provided file is not a CV. It appears to be [brief document type].'_\n"
    )},
        {"role": "user", "content": context}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150
    ).choices[0].message["content"].strip()
    print(response)
    return response
