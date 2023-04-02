import {createSupabaseClient} from "../scripts/createSupabaseClient";
import {SupabaseVectorStore} from "langchain/vectorstores";
import {OpenAIEmbeddings} from "langchain/embeddings";

export const searchSupabaseVectors = async (query: string) => {
    const supabaseClient = createSupabaseClient();
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        {
            client: supabaseClient,
            tableName: 'documents',
            queryName: 'match_documents'
        }
    )

    const result = await vectorStore.similaritySearch(query, 10);

    console.log('Result', result[0].pageContent);

    return result[0].pageContent;
}
