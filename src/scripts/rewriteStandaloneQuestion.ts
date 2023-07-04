import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai-edge";

export const rewriteStandaloneQuestion = async (messages: ChatCompletionRequestMessage[]) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openAiApi = new OpenAIApi(configuration);
    const systemTemplate = `
Based on the following message history and latest user question, please rewrite the user question to be a standalone question.
Only add contextually relevant information to the question. Please return the original question if it is unrelated to the rest of the message history.
---
Example 1:
message history: discussing program indicators
user question: how do I create it?
standalone question: how do I create a program indicator?
---
Example 2:
message history: discussing tracker program in DHIS2
user question: what is a program rule?
standalone question: what is a program rule in DHIS2?
---

Message history:"""
${messages.map(message => `${message.role}: ${message.content}`).join(' ')}
"""
User question:"""
${messages[messages.length - 1].content}
""""

Standalone question:`.replaceAll('\n', ' ').trim()

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
