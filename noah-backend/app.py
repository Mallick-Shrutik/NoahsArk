from flask import Flask,jsonify,request
from services.aws_s3 import process_latest_post
from services.instagram import fetch_instagram_comments,fetch_instagram_dms,fetch_instagram_post
from utils.translation import detect_translate_caption

app = Flask(__name__)

@app.route("/fetch-posts/<user_id>", methods=["GET"])
def fetch_post_route(user_id):
    try:
        posts = fetch_instagram_post(user_id)
        upload_status, message = process_latest_post()

        if upload_status:
            translated_caption = detect_translate_caption()
            return jsonify({
                "success": True, 
                "data": posts, 
                "message": "Uploaded to S3 successfully",
                "translated_caption": translated_caption
            }), 200
        else:
            return jsonify({"success": False, "data": posts, "error": message}), 500

        # return jsonify({"success":True, "data":posts}),200
    except Exception as e:
        return jsonify({"success":False,"error": str(e)}),500


@app.route("/fetch-dms/<user_id>", methods=["GET"])
def fetch_dms_route(user_id):
    try:
        dms = fetch_instagram_dms(user_id)
        return jsonify({"success":True,"data":dms}),200
    except Exception as e:
        return jsonify({"success":False,"error":str(e)}),500
    

@app.route("/fetch-comments/<user_id>",methods=["GET"])
def fetch_comment_route(user_id):
    try:
        comments = fetch_instagram_comments(user_id)
        return jsonify({"success":True,"data":comments}),200
    except Exception as e:
        return jsonify({"success":False,"error":str(e)}),500
    
    

# testing the translation via routes
# @app.route("/translate-latest-caption", methods=["GET"])
# def translate_latest_caption_route():
#     try:
#         translated_caption = detect_translate_caption()
#         if translated_caption:
#             return jsonify({"success": True, "translated_caption": translated_caption}), 200
#         else:
#             return jsonify({"success": False, "error": "No caption or translation failed"}), 500
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

    
    
if __name__ == "__main__":
    app.run(debug=True)