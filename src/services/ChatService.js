const axios = require('axios');

exports.getChatResponse = async (options) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
            prompt: options.prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_TOKEN}`
            }
        });

        return {
            response_id: response.data.id,
            model: "gpt-4",
            created_time: Date.now(),
            prompt_tokens: options.prompt.length,
            completion_tokens: response.data.choices[0].tokens.length,
            total_tokens: options.prompt.length + response.data.choices[0].tokens.length,
            finish_reason: response.data.choices[0].finish_reason
        };
    } catch (error) {
        console.error('Error getting chat response:', error);
        throw error;
    }
};
