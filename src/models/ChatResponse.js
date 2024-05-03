const db = require('../db');

class ChatResponse {
    static saveResponse(responseData) {
        return new Promise((resolve, reject) => {
            const { response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason } = responseData;
            const sql = `INSERT INTO chat_responses (response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            db.query(sql, [response_id, model, created_time, prompt_tokens, completion_tokens, total_tokens, finish_reason], (err, result) => {
                if (err) return reject(err);
                console.log("Chat response recorded: ", result.insertId);
                resolve(result.insertId);
            });
        });
    }
}

module.exports = ChatResponse;
