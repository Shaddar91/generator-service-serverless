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

        console.log("Response data:", response.data); // Log the full response data

        const data = response.data.choices[0];
        return {
            response_id: data.id || 'default_id',  // Provide a default if undefined
            model: "gpt-4",
            created_time: Date.now(),
            prompt_tokens: options.prompt.length,
            completion_tokens: data.tokens ? data.tokens.length : 0,  // Safeguard against undefined
            total_tokens: options.prompt.length + (data.tokens ? data.tokens.length : 0),
            finish_reason: data.finish_reason || 'unknown_reason'  // Provide a default if undefined
        };
    } catch (error) {
        console.error('Error getting chat response:', error);
        throw error;  // Ensure to throw the error to handle it appropriately in the calling function
    }
};