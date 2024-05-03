const axios = require('axios');

exports.getChatResponse = async (options) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",  // Specify the model here
            messages: [{ "role": "user", "content": options.prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = response.data.choices[0];
        return {
            response_id: data.id,  // Assuming 'id' exists in the response
            model: "gpt-4",
            created_time: Date.now(),
            prompt_tokens: options.prompt.length,
            completion_tokens: data.tokens.length,  // Adjust based on actual response structure
            total_tokens: options.prompt.length + data.tokens.length,
            finish_reason: data.finish_reason  // Adjust based on actual response structure
        };
    } catch (error) {
        console.error('Error getting chat response:', error);
        throw error;  // Ensure to throw the error to handle it appropriately in the calling function
    }
};
