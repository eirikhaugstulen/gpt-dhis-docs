import {Configuration, OpenAIApi} from "openai";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";
import {ChatCompletionRequestMessage} from "openai/api";


export const queryFollowUp = async (query: string, conversationId: string, messages: ChatCompletionRequestMessage[]) => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openAIApi = new OpenAIApi(config);

    await createSupabaseClient().from('queries').insert([
        {
            role: 'user',
            content: query,
            conversationId,
        },
    ]);

    if (!messages) return { text: 'An unexpected error occurred.' }

    const response = await openAIApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [...messages, { role: 'user', content: query }],
        temperature: 0.3,
    })
    const responseText = response.data.choices[0]?.message?.content;

    if (!responseText) return { text: 'An unexpected error occurred.' }

    return { text: responseText }
}
