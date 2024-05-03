const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

const ChatService = require('./src/services/ChatService');
const ChatResponse = require('./src/models/ChatResponse');

exports.handler = async (event, context, callback) => {
    try {
        // Simulated function to invoke ChatGPT and get a response
        const chatResponse = await ChatService.getChatResponse({ prompt: "Your prompt here" });

        // Save the response in the database
        await ChatResponse.saveResponse(chatResponse);
        
        // Log success and complete the Lambda function
        console.log("Response saved successfully.");
        callback(null, "Process completed successfully.");
    } catch (error) {
        console.error("Error during process:", error);
        callback(error);
    }
};
