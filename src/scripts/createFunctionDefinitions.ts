import { ChatCompletionFunctions } from "openai-edge";

export const OpenAiFunctionNames = Object.freeze({
    SAVE_UNANSWERED_QUESTION: 'save_unanswered_question',
    GET_PROGRAMS: 'get_programs',
    GET_PROGRAM_DETAILS_BY_ID: 'get_program_details_by_id',
})

export const functions: ChatCompletionFunctions[] = [
    {
        name: OpenAiFunctionNames.GET_PROGRAMS,
        description: 'Run this function to get a list of all programs in the DHIS2 instance',
        parameters: {
            type: 'object',
            properties: {
                programType: {
                    type: 'string',
                    description: 'The type of program to get. Should be one of: [TRACKER, EVENT, AGGREGATE]. Always default to EVENT',
                }
            },
            required: ['programType'],
        },
    },
    {
        name: OpenAiFunctionNames.GET_PROGRAM_DETAILS_BY_ID,
        description: 'Run this function to get details about a specific program. The program ID can be found in the list of programs returned by the GET_PROGRAMS function',
        parameters: {
            type: 'object',
            properties: {
                programId: {
                    type: 'string',
                    description: 'The ID of the program to get details about',
                }
            },
            required: ['programId'],
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
