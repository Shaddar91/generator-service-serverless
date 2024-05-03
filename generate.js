const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const ChatService = require('./src/services/ChatService');
const ChatResponse = require('./src/models/ChatResponse');

exports.handler = async (event) => {
    try {
        const chatResponse = await ChatService.getChatResponse({ prompt: "Hello, how can I help you today?" });
        await ChatResponse.saveResponse(chatResponse);
        console.log('Response saved successfully.');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Process completed successfully' })
        };
    } catch (error) {
        console.error('Error during processing:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to process', error: error.toString() })
        };
    }
};
