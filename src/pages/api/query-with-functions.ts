// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next'
import {
    ChatCompletionRequestMessage,
    ChatCompletionRequestMessageRoleEnum,
    Configuration,
    OpenAIApi
} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {NextRequest} from "next/server";
import {buildFunctionsSystemTemplate} from "@/scripts/buildFunctionsSystemTemplate";
import {functions} from "@/scripts/createFunctionDefinitions";
import {handleServerFunctions} from "@/scripts/handleServerFunctions";

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
        const systemTemplate = buildFunctionsSystemTemplate();
        let updatedMessages = [
            { role: ChatCompletionRequestMessageRoleEnum.System, content: systemTemplate },
            ...messages
        ];

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            temperature: 0,
            messages: updatedMessages,
            function_call: 'auto',
            functions,
            stream: true,
        })

        const stream = OpenAIStream(response, {
            experimental_onFunctionCall: async (functionCall, createFunctionCallMessages) => {
                // @ts-ignore
                const functionCallResult = await handleServerFunctions(functionCall, createFunctionCallMessages)
                    .catch(err => {
                        console.error('Error handling server function', err);
                        return createFunctionCallMessages(`Error handling server function: ${err}`);
                    });

                return openai.createChatCompletion({
                    model: 'gpt-4',
                    temperature: 0,
                    // @ts-ignore
                    messages: [...updatedMessages, ...functionCallResult],
                    stream: true,
                })
            }
        });

        return new StreamingTextResponse(stream)
    } else {
        res.status(405).end();
    }
}
