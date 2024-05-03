const { queryDatabase } = require('../db/dbConnection');

class ChatResponse {
    static async saveResponse(responseData) {
        const { response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason } = responseData;
        const sql = `INSERT INTO chat_responses (response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        try {
            await queryDatabase(sql, [response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason]);
            console.log("Chat response recorded:", response_id);
        } catch (err) {
            console.error('Failed to save chat response:', err);
            throw err;
        }
    }
}

module.exports = ChatResponse;
