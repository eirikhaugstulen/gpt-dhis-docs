import { ChatCompletionFunctions } from "openai-edge";

export const OpenAiFunctionNames = Object.freeze({
    FETCH_ANALYTICS_DATA: 'fetch_analytics_data',
})

export const functions: ChatCompletionFunctions[] = [
    {
        name: OpenAiFunctionNames.FETCH_ANALYTICS_DATA,
        description: 'Run this function to fetch data from the analytics endpoints',
        parameters: {
            type: 'object',
            properties: {
                organisationUnitIds: {
                    type: 'array',
                    description: 'The ids of the organisation units to fetch data for',
                    items: {
                        type: 'string',
                    },
                },
                indicatorIds: {
                    type: 'array',
                    description: 'The indicatorIds to fetch data for',
                    items: {
                        type: 'string',
                    }
                },
            },
            required: ['organisationUnitIds', 'indicatorIds']
        }
    }
]
