import { ChatCompletionFunctions } from "openai-edge";

export const OpenAiFunctionNames = Object.freeze({
    GET_QUERY_SOURCES: 'get_query_sources',
    SAVE_UNANSWERED_QUESTION: 'save_unanswered_question',
})

export const functions: ChatCompletionFunctions[] = [
    {
        name: OpenAiFunctionNames.GET_QUERY_SOURCES,
        description: 'Run this function to get the sources for a query',
        parameters: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'The question asked by the user rewritten as a standalone query',
                }
            },
            required: ['query']
        }
    }
]
