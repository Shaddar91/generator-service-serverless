const axios = require('axios');
const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const {
        CHATGPT_TOKEN,
        DB_HOST,
        DB_NAME,
        DB_PASSWORD,
        DB_PORT,
        DB_USER
    } = process.env;

    async function sendMessage(message) {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHATGPT_TOKEN}`,
        };
        const data = {
            model: "gpt-4",
            messages: [{ role: "user", content: message }]
        };

        try {
            const response = await axios.post(apiUrl, data, { headers });
            console.log("Response from ChatGPT:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error interacting with ChatGPT API:", error.response ? error.response.data : error);
            throw new Error("Failed to interact with ChatGPT API");
        }
    }

    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: DB_PORT
        });
        console.log("Database connection successful");
        //Test db
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        console.log("Test query successful, solution: ", rows[0].solution);
        await connection.end();

        //ChatGPT API interaction
        const chatGPTResponse = await sendMessage(event.message || "Hello, how are you?");
        console.log("Received response from ChatGPT:", chatGPTResponse);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Database connectivity and ChatGPT interaction successful"
            })
        };
    } catch (error) {
        console.error("Lambda execution error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Lambda function execution failed"
            })
        };
    }
};

