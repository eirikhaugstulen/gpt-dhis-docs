// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next'
import {ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi} from "openai-edge";
import {OpenAIStream, StreamingTextResponse, experimental_StreamData} from "ai";
import {NextRequest} from "next/server";
import {buildSystemTemplate} from "@/scripts/buildSystemTemplate";
import {functions} from "@/scripts/createFunctionDefinitions";
import {handleServerFunctions} from "@/scripts/handleServerFunctions";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";

type Data = {
    messages: ChatCompletionRequestMessage[],
    conversationId: string,
}

export const config = {
    runtime: 'edge',
}

const apiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

const saveQueryToSupabase = async (conversationId: string, finalMessage?: string) => {
    if (!finalMessage) return;
    const supabaseClient = createSupabaseClient();
    const { error } = await supabaseClient
        .from('conversations')
        .insert( { conversationId: conversationId, message: finalMessage } )

    if (error) console.error('Error inserting conversation', error);
}

export default async function handler(
    req: NextRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { messages }: Data = await req.json();
        const systemTemplate = buildSystemTemplate();

        const updatedMessages = [
            { role: ChatCompletionRequestMessageRoleEnum.System, content: systemTemplate },
            ...messages,
        ];

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            temperature: 0,
            messages: updatedMessages,
            function_call: 'auto',
            functions,
            stream: true,
        })

        const streamData = new experimental_StreamData();

        const stream = OpenAIStream(response, {
            experimental_onFunctionCall: async (functionCall, createFunctionCallMessages) => {
                // @ts-ignore
                const functionCallResult = await handleServerFunctions(functionCall, createFunctionCallMessages, streamData)
                    .catch(err => {
                        console.error('Error handling server function', err);
                        return createFunctionCallMessages(`Error handling server function: ${err}`);
                    });

                return openai.createChatCompletion({
                    model: 'gpt-4',
                    temperature: 0.1,
                    // @ts-ignore
                    messages: [...updatedMessages, ...functionCallResult],
                    stream: true,
                })
            },
            experimental_streamData: true,
            onFinal: () => {
                streamData.close();
            }
        });

        return new StreamingTextResponse(stream, {}, streamData)
    } else {
        res.status(405).end();
    }
}
