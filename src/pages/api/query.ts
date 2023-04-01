// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {OpenAI} from "langchain";
import {PineconeClient} from "@pinecone-database/pinecone";
import {PineconeStore} from "langchain/vectorstores";
import {Document} from "langchain/docstore";
import {OpenAIEmbeddings} from "langchain/embeddings";
import {VectorDBQAChain} from "langchain/chains";
import {ChatOpenAI} from "langchain/chat_models";
import {AIChatMessage, HumanChatMessage, SystemChatMessage} from "langchain/schema";
import {importDocument} from "@/scripts/importDocument";
import {searchSupabaseVectors} from "@/scripts/searchSupabaseVectors";
import {queryChatGPT} from "@/scripts/queryChatGPT";
import {MessageTypes} from "@/Components/UI/Chat/ChatBubble/ChatBubble.types";

type Data = {
    text: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { query } = req.body;

        const context = await searchSupabaseVectors(query);

        console.log('Context', context)

        const response = await queryChatGPT(query, context);

        res.status(200).json({ text: response.text });
    } else {
        res.status(405).end();
    }
}
