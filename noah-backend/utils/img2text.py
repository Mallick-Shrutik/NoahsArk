from transformers import BlipProcessor,BlipForConditionalGeneration
from PIL import Image
from db import posts_collection
import boto3
from config import AWS_S3_BUCKET
from io import BytesIO


# Using salesforce Bootstrap Language Image Pretraining as backup of AWS Rekognition as we realized, it is used to detect object and not for image captioning mainly which we need here

# need to fetch the image from S3 

# getting the image name of the latest post. 
# Although we can directly fetch from DB but at this stage, we have integrated with S3 so let's use it

def fetch_image_name():
    latest_post = posts_collection.find_one(sort=[("_id", -1)]) 
    if latest_post and "id" in latest_post:
        media_id = latest_post["id"]
        img_name = f"{media_id}.jpg"
        return img_name
    

image_name = fetch_image_name()
bucket_name = AWS_S3_BUCKET

s3 = boto3.client("s3")
s3_object = s3.get_object(Bucket=bucket_name,Key=image_name)
image_data = s3_object["Body"].read()

image = Image.open(BytesIO(image_data))

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

inputs = processor(images=image, return_tensors="pt")
output = model.generate(**inputs)

#decoding the generated caption
caption = processor.decode(output[0],skip_special_tokens=True)

def export_caption():
    return caption

# print("Captions from img2text for testing: ", caption)