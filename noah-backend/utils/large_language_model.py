from langchain_community.llms import HuggingFacePipeline
from langchain_core.prompts import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch
import sys
sys.path.append("..")
from db import posts_collection
from img2text import export_caption

# as request for llama model was rejected by repo authors, going ahead with nvidia llama model
model_name = "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF"

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True)

hf_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=150,
    temperature=0.7,
    top_p=0.9,
    device=0 if torch.cuda.is_available() else -1
    
)

llm = HuggingFacePipeline(pipeline=hf_pipeline)

def forming_caption():
    latest_post = posts_collection.find_one(sort=[("_id", -1)]) 
    if latest_post and "caption" in latest_post:
        media_caption = latest_post["caption"]
        img2text_caption = export_caption 
        merged_caption = f"{media_caption.strip()} {img2text_caption.strip()}"
        return merged_caption
    return None


# providing the prompt for the LLM
seo_prompt_template = PromptTemplate(
    input_variables=["merged_caption"],
    template="""Optimize the following caption for SEO purposes. Make it engaging, relevant, and ensure it includes key phrases for audience appeal:
Original Caption: "{caption}"
SEO Optimized Caption:"""
)


def generate_seo_caption(caption):
    if caption is None:
        return "No caption provided for optimization."
    prompt = seo_prompt_template.format(caption=caption)
    seo_caption = llm(prompt)  # Using llm to generate the optimized caption
    return seo_caption

final_caption = forming_caption()
optimized_caption = generate_seo_caption(final_caption)
print("Optimized SEO Caption:", optimized_caption)