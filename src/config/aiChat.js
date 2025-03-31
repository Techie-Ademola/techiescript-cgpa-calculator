/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// import dotenv from 'dotenv'

// dotenv.config();

// import { apiUrl } from '../config';

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const apiKey = "";
// const apiKey = "AIzaSyBETJk4feTBUiQysc5n1xkY93rGXVdyOgg";

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

async function run(prompt, imageFile = null) {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-pro-vision for image inputs, otherwise use gemini-pro
    const modelName = imageFile ? "gemini-2.0-flash-lite" : "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const generationConfig = {
        temperature: 0.9,
        topP: 1,
        topK: 32,
        maxOutputTokens: 2048,
    };

    try {
        if (imageFile) {
            // Handle image + text query
            const imagePart = await fileToGenerativePart(imageFile);
            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            return response.text();
        } else {
            // Handle text-only query
            const chatSession = model.startChat({
                generationConfig,
                safetySettings,
                history: [],
            });
            const result = await chatSession.sendMessage(prompt);
            return result.response.text();
        }
    } catch (error) {
        console.error("Error in run function:", error);
        throw new Error(`Failed to generate content: ${error.message}`);
    }
}

export default run;