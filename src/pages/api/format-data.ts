import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai-edge"
import {NextRequest} from "next/server";
import type {NextApiResponse} from 'next'
import { buildFormatSystemTemplate } from "@/scripts/buildFormatSystemMessage";
import { OpenAIStream, StreamingTextResponse } from "ai";

type Data = {
    prompt: string,
    graphData: Object,
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
        const { prompt, graphData }: Data = await req.json();

        const systemTemplate = buildFormatSystemTemplate(JSON.stringify(graphData));

        const messages = [
            { role: ChatCompletionRequestMessageRoleEnum.System, content: systemTemplate },
            { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt },
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            temperature: 0.1,
            messages,
            stream: true,
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)

    } else {
        res.status(405).end();
    }
}
