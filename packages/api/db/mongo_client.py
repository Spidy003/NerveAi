import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.environ.get("MONGODB_URI")
MONGODB_DB_NAME = os.environ.get("MONGODB_DB_NAME")

class MongoDBClient:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    def connect(cls):
        cls.client = AsyncIOMotorClient(MONGODB_URI)
        cls.db = cls.client[MONGODB_DB_NAME]

    @classmethod
    def close(cls):
        if cls.client:
            cls.client.close()

mongo_client = MongoDBClient()
