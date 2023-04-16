import {ChatOpenAI} from "langchain/chat_models";
import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} from "langchain/prompts";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";

export const queryChatGPT = async (query: string, context: string, conversationId: string) => {
    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.5,
    });

    const systemTemplate = `
    You are an assistant that teaches people about the open source platform DHIS2.
     You are given some context about DHIS2 and a question from the user.
      You should answer the question based only of the context given or you should respond with "I'm sorry, I don't know."
       Provide a response to the following question:
   Context:
    {context}`

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(systemTemplate),
        HumanMessagePromptTemplate.fromTemplate('User: {query}'),
    ])

    const formattedMessages = await chatPrompt.formatPromptValue({
        context: context,
        query: query
    })

    const messages = formattedMessages.toChatMessages();
    const { error } = await createSupabaseClient().from('queries').insert([
        {
            role: 'system',
            content: messages[0].text,
            conversationId,
        },
        {
            role: 'user',
            content: query,
            conversationId,
        }
    ]);

    if (error) {
        console.log('error', error);
    }

    return await model.call(messages);
}
