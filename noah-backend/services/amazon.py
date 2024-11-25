from pymongo import MongoClient
import boto3
from datetime import datetime
from bson.objectid import ObjectId
import sys
sys.path.append("..")
from config import (
    MONGO_DB,MONGODB_URI, AWS_ACCESS_KEY_ID, AWS_REGION_NAME, AWS_SECRET_ACCESS_KEY,
    AMAZON_SELLER_ID, AMAZON_SKU, AMAZON_ACCESS_TOKEN
)

client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
client.server_info()
db = client[MONGO_DB]
amazon_listing_collections = db["amazon_listing"] if db is not None else None

def insert_listing_to_database(data):
    try:
        # data insertion to db before calling the SP API
        inserted_to_collection = amazon_listing_collections.insert_one(data)
        mongo_id = str(inserted_to_collection.inserted_id)
        
        #creating a function to map the data as per SP API
        payload = map_data_for_listing(data)
        
        callSPAPi = False
        if callSPAPi:
            # below function for sign in is required, as before creating a listing through APIs, Amazon authenticates the request to check if any tamper
	    
            session = boto3.Session(
                aws_access_key_id=AWS_ACCESS_KEY_ID,
                aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                region_name=AWS_REGION_NAME
            )
            client = session.client('execute-api')
            
            # Triggering the Amazon SP API
            response = client.invoke(
                method='POST',
                url=f'https://sellingpartnerapi-na.amazon.com/listings/2020-09-01/items/{AMAZON_SELLER_ID}/{AMAZON_SKU}',
                headers={
                    'x-amz-access-token': f'{AMAZON_ACCESS_TOKEN}',
                    'x-amz-date': datetime.now().strftime('%Y%m%dT%H%M%SZ'),
                    'Content-Type': 'application/json'
                },
                json=payload
            )
            amazon_response = response.json()
        else:
            amazon_response = {"status": "success", "message": f"Your product has been listed to Amazon successfully with order id {mongo_id}"}
        
        # Updating the database with the status of SP API response
        amazon_listing_collections.update_one(
            {"_id": ObjectId(mongo_id)},
            {"$set": {"amazon_response": amazon_response}}
        )
        
        return {"status": "success", "mongo_id": mongo_id, "amazon_response": amazon_response}

    except Exception as e:
        print("Error:", str(e))
        
        amazon_listing_collections.update_one(
            {"_id": ObjectId(mongo_id)},
            {"$set": {"amazon_error": str(e)}}
        )
        
        return {"status": "error", "message": str(e)}
        
    
    
    
def map_data_for_listing(data):
    price_value = data.get("price", 0.0)
    try:
        price_value = float(price_value)
    except ValueError:
        price_value = 0.0
    # need to convert the data recieved from frontend to be mapped as per Amazon SP API
    return {
        "productType": data.get("productType", "BEAUTY"),  # Default to "BEAUTY" if productType is missing
        "attributes": {
            "title": [{"value": data.get("title", "")}],
            "description": [{"value": data.get("description", "")}],
            "itemImage": [{"value": data.get("imageUrl", "")}],
            "price": [{"value": {"currency": "USD", "amount": price_value}}], #setting default values aas to make it fail proof
            "condition_type": [{"value": data.get("conditionType", "new")}],
            "availability": [{
                "value": {
                    "fulfillment_type": "AFN", 
                    "quantity": int(data.get("quantity", 1))
                }
            }]
        }
    }
    
