import {createSupabaseClient} from "@/scripts/createSupabaseClient";
import {Configuration, OpenAIApi} from 'openai-edge'

interface SupabaseVectors {
    id: string;
    title: string;
    embedding: number[];
    content: string;
    similarity: number;
}

export const searchSupabaseVectors = async (functionArgs: unknown) => {
    console.log('Running searchSupabaseVectors function', functionArgs);
    const { query } = functionArgs as { query: string };
    if (!query) return query;

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

    const { data: results, error } = await supabaseClient.rpc('match_page_sections', {
        embedding,
        match_threshold: 0.81,
        match_count: 10,
        min_content_length: 50,
    });

    if (error) {
        console.log('error', error);
    }

    if (!results.length) {
        return 'Could not fetch any results. Please inform the user that you do not know the answer and ask them to rephrase their question.';
    }

    return results?.reduce((acc: string, {id, embedding, ...rest}: SupabaseVectors) => {
        const currentStringifiedText = JSON.stringify(rest);
        return `${acc}\n${currentStringifiedText}`;
    }, '');
}
