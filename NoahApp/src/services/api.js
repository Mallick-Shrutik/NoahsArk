import { API_BASE_URL } from '@env';


export const fetchPosts = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/fetch-posts/${userId}`);
        const data = await response.json();

        if (data.success) {
            const post = data.data.data[0];
            const cleanedCaption = data.cleaned_caption;
            if (post) {
                const postDetails = {
                    imageUrl: post.media_url,
                    caption: post.caption,
                    cleanedCaption,
                };
                return postDetails;
            } else {
                console.log("No post found.");
                return null;
            }
        } else {
            console.log("Error in fetching the posts from API");
            return null;
        }
    } catch (error) {
        console.log("Failed before even calling the API", error);
        return null;
    }
};


export const accessLangchain = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/access-langchain`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            console.error('Unable to connect for LLM', data.message);
            return null;
        }
    } catch (error) {
        console.error('Failed to initialize connection with LLM before even triggering the API', error.message);
        return null;
    }
}