import {readFileSync} from 'fs';
import {MarkdownTextSplitter} from "langchain/text_splitter";
import {SupabaseVectorStore} from "langchain/vectorstores";
import {OpenAIEmbeddings} from "langchain/embeddings";
import {createSupabaseClient} from "../scripts/createSupabaseClient";

export const importDocument = async () => {
    const supabaseClient = createSupabaseClient();
    const fileName = 'about-sharing-of-objects';

    const file = readFileSync(`./src/documents/${fileName}.md`, {
        encoding: 'utf-8'
    })

    const textSplitter = new MarkdownTextSplitter({
        chunkSize: 800,
        chunkOverlap: 100,
    })

    const documents = await textSplitter.createDocuments([file])

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
        new OpenAIEmbeddings(), {
        client: supabaseClient,
        tableName: 'documents',
        queryName: 'match_documents'
    })

    return await vectorStore.addDocuments(documents);
}

