import {PromptTemplate} from "langchain";
import {ChatOpenAI} from "langchain/chat_models";

export const queryFollowUp = () => {
    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.5,
    });

    const CONDENSE_PROMPT = PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
        Chat History:
        {chat_history}
        Follow Up Input: {question}
        Standalone question:`);
}
