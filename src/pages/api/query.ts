// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {searchSupabaseVectors} from "../../scripts/searchSupabaseVectors";
import {queryChatGPT} from "../../scripts/queryChatGPT";
import {MutationVariables} from "../../hooks/useAiQuery";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";
import {queryFollowUp} from "@/scripts/queryFollowUp";

type Data = {
    text: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const supabaseClient = createSupabaseClient();
        const { query, conversationId }: MutationVariables = req.body;

        const { data: messages } = await supabaseClient
            .from('queries')
            .select('role,content')
            .eq('conversationId', conversationId)
            .order('id', { ascending: true })
            .limit(10);

        let response;
        if (!messages?.length) {
            const context = await searchSupabaseVectors(query);
            response = await queryChatGPT(query, context, conversationId);
        } else {
            response = await queryFollowUp(query, conversationId, messages);
        }

        await supabaseClient
            .from('queries')
            .insert([
                {
                    role: 'assistant',
                    content: response.text,
                    conversationId,
                }
            ]);

        res.status(200).json({ text: response.text });
    } else {
        res.status(405).end();
    }
}
