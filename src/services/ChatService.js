const axios = require('axios');

exports.getChatResponse = async (options) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ "role": "user", "content": options.prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Response data:", response.data); 
        const choice = response.data.choices[0];
        const videoContent = {
            response_id: response.data.id,
            video_title: "Generated Video Content",
            video_content: choice.message.content,
            finish_reason: choice.finish_reason
        };

        console.log("Video Content Details:", videoContent);
        return videoContent;

    } catch (error) {
        console.error('Error getting chat response:', error);
        throw error;
    }
};
