// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {searchSupabaseVectors} from "../../scripts/searchSupabaseVectors";
import {queryChatGPT} from "../../scripts/queryChatGPT";
import {MutationVariables} from "../../hooks/useAiQuery";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";

type Data = {
    text: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const supabaseClient = createSupabaseClient();
        const { query, isFollowUp = false, messages }: MutationVariables = req.body;

        await supabaseClient
            .from('queries')
            .insert({
                querytext: query,
                isFollowUp,
            })

        const context = await searchSupabaseVectors(query);
        const response = await queryChatGPT(query, context);

        res.status(200).json({ text: response.text });
    } else {
        res.status(405).end();
    }
}
