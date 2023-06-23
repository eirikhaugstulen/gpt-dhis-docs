// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next'
import {Message} from "ai/react";
import {Configuration, OpenAIApi} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {NextRequest} from "next/server";
import {rewriteStandaloneQuestion} from "@/scripts/rewriteStandaloneQuestion";
import {searchSupabaseVectors} from "@/scripts/searchSupabaseVectors";
import {buildSystemTemplate} from "@/scripts/buildSystemTemplate";

type Data = {
    messages: Message[],
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
        const { messages } = await req.json();
        const query = messages[messages.length - 1]?.content;

        if (!query) {
            res.status(400).end();
            return;
        }

        const standaloneQuestion = await rewriteStandaloneQuestion(messages);

        const context = await searchSupabaseVectors(query);

        const systemTemplate = buildSystemTemplate(context);

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-16k',
            temperature: 0,
            messages: [{ role: 'system', content: systemTemplate }, { role: 'user', content: standaloneQuestion }],
            stream: true,
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)
    } else {
        res.status(405).end();
    }
}
