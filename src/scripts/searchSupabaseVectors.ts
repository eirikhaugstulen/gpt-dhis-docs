import {createSupabaseClient} from "../scripts/createSupabaseClient";
import { Configuration, OpenAIApi } from 'openai-edge'


export const searchSupabaseVectors = async (query: string) => {
    const supabaseClient = createSupabaseClient();
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openAIApi = new OpenAIApi(configuration);

    const response = await openAIApi.createEmbedding({
        input: query,
        model: 'text-embedding-ada-002',
    })
    const data = await response.json();
    const [{ embedding }] = data.data;
    console.log('data', embedding);

    const { data: results, error } = await supabaseClient.rpc('match_page_sections', {
        embedding,
        match_threshold: 0.81,
        match_count: 10,
        min_content_length: 50,
    });

    if (error) {
        console.log('error', error);
    }

    return results.reduce((acc: any, { content }: { content: string }) => {
        return acc + ' ' + content;
    }, '');
}
