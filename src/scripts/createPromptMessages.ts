import {SystemMessagePromptTemplate} from "langchain/prompts";

const systemTemplate = `
    You are an assistant that teaches people about the open source platform DHIS2.
     You are given some context about DHIS2 and a question from the user.
      You should answer the question based only of the context given or you should respond with "I'm sorry, I don't know."
       Provide a response to the following question:
   Context:
    {context}`


export const createSystemPrompt = (context: string) => {
    return SystemMessagePromptTemplate.fromTemplate(systemTemplate).format({ context });
}
