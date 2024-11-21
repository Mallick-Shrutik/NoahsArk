import pandas as pd
import spacy
from langdetect import detect
import sys
sys.path.append("..")
from config import offensive_list


#keeping ready the function to get the offensive words for further use
def check_list_offensive():
    offensive_words = offensive_list('../offensive.txt')

    if not offensive_words:
        print("The offensive list is empty or not loaded.")
        return

    return offensive_words

#using small model of spacy for basic keyword extraction
# We may also use RAKE but as of now for my MVP, we will proceed with spacy
nlp = spacy.load("en_core_web_sm")

# cleaning the caption using pandas
def cleaned_caption(caption):
    caption_raw = pd.Series([caption])
    cleaned_caption = caption_raw.str.replace("[^a-zA-Z\s]", "", regex=True).str.strip().values[0]
    cleaned_caption = cleaned_caption.lower()
    
    #removing common stop words next. and also any characters
    cleaned_caption = " ".join(word for word in cleaned_caption.split() if len(word) > 1)
    
    return cleaned_caption

