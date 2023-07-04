import { ChatCompletionFunctions } from "openai-edge";

export const OpenAiFunctionNames = Object.freeze({
    ASK_TO_SAVE_UNANSWERED_QUESTION: 'ask_to_save_unanswered_question',
    SAVE_UNANSWERED_QUESTION: 'save_unanswered_question',
})

export const functions: ChatCompletionFunctions[] = [
    {
        name: OpenAiFunctionNames.ASK_TO_SAVE_UNANSWERED_QUESTION,
        description: 'Run this function if you do not know the answer to the user query',
        parameters: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'The question asked by the user',
                }
            }
        }
    },
    {
        name: OpenAiFunctionNames.SAVE_UNANSWERED_QUESTION,
        description: 'Run this function if the user has consented to save the user query for further improvements',
        parameters: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'The question asked by the user',
                }
            },
            required: ['query']
        },
    }
]
