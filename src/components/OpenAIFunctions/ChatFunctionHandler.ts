import {ChatRequest, FunctionCallHandler, nanoid} from "ai";
import {OpenAiFunctionNames} from "@/scripts/createFunctionDefinitions";
import {createSupabaseClient} from "@/scripts/createSupabaseClient";

export const ChatFunctionHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall
) => {
    console.log('Running function call handler', functionCall)
    if (functionCall.name === OpenAiFunctionNames.ASK_TO_SAVE_UNANSWERED_QUESTION) {
        const functionResponse: ChatRequest = {
            messages: [
                ...chatMessages,
                {
                    id: nanoid(),
                    name: OpenAiFunctionNames.ASK_TO_SAVE_UNANSWERED_QUESTION,
                    role: 'function' as const,
                    content: JSON.stringify({
                        info: 'Explain that you are sorry that you dont know and ask the user if the question could be saved to further improve our documentation.'
                    })
                }
            ]
        }
        return functionResponse
    }
    if (functionCall.name === OpenAiFunctionNames.SAVE_UNANSWERED_QUESTION) {
        try {
            if (!functionCall.arguments) throw new Error('No function call arguments');
            const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)

            const { query } = parsedFunctionCallArguments;

            if (!query) throw new Error('No query in function call arguments');

            const { error } = await createSupabaseClient()
                .from('unanswered_questions')
                .insert({ query })

            if (error) throw new Error(error.message)
        } catch (e) {
            console.error('There has been an error saving the user query', e)
            return {
                messages: [
                    ...chatMessages,
                    {
                        id: nanoid(),
                        name: OpenAiFunctionNames.SAVE_UNANSWERED_QUESTION,
                        role: 'function' as const,
                        content: JSON.stringify({
                            info: 'There has been an error saving your question. Please try again later.'
                        })
                    }
                ]
            }
        }


        const functionResponse: ChatRequest = {
            messages: [
                ...chatMessages,
                {
                    id: nanoid(),
                    name: OpenAiFunctionNames.SAVE_UNANSWERED_QUESTION,
                    role: 'function' as const,
                    content: JSON.stringify({
                        info: 'Explain that the question could not be answered and that a generalized query has been stored to further improve the DHIS2 documentation. Thank the user for their contribution and patience.'
                    })
                }
            ]
        }
        return functionResponse
    }
}
