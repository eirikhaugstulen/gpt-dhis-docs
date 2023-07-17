// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next'
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {NextRequest} from "next/server";
import {rewriteStandaloneQuestion} from "@/scripts/rewriteStandaloneQuestion";
import {searchSupabaseVectors} from "@/scripts/searchSupabaseVectors";
import {buildSystemTemplate} from "@/scripts/buildSystemTemplate";

type Data = {
    messages: ChatCompletionRequestMessage[],
}

export const config = {
    runtime: 'edge',
}

const apiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

export default async function handler(
    req: NextRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { messages }: Data = await req.json();
        let updatedMessages = [...messages];
        const query = updatedMessages[updatedMessages.length - 1];

        if (!query) {
            res.status(400).end();
            return;
        }

        if (query.role === 'user') {
            const messageHistory = messages.slice(0, messages.length - 1);
            const standaloneQuestion = await rewriteStandaloneQuestion(updatedMessages);
            const context = await searchSupabaseVectors(query.content);
            const systemTemplate = buildSystemTemplate(context);

            updatedMessages = [
                { role: 'system', content: systemTemplate },
                ...messageHistory,
                { role: 'user', content: standaloneQuestion }
            ];
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-16k',
            temperature: 0,
            messages: updatedMessages,
            // function_call: 'auto',
            // functions,
            stream: true,
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)
    } else {
        res.status(405).end();
    }
}
