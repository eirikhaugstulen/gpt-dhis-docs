import {Message} from "ai/react";
import {Configuration, OpenAIApi} from "openai-edge";

export const rewriteStandaloneQuestion = async (messages: Message[]) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openAiApi = new OpenAIApi(configuration);
    const systemTemplate = `
Based on the following message history and user question, please rewrite the user question to be a standalone question.
Only add contextually relevant information to the question.
Message history:"""
${messages.map(message => `${message.role}: ${message.content}`).join(' ').replaceAll('\n', ' ').trim()}
"""
User question:"""
${messages[messages.length - 1].content}
""""

Standalone question:`

    const response = await openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo-16k',
        temperature: 0,
        messages: [
            {
                role: 'system',
                content: systemTemplate,
            }
        ],
        stream: false,
    })
    const data = await response.json();

    return data.choices[0].message.content;
}
