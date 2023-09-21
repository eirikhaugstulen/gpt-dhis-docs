import {CreateMessage} from "ai";
import {OpenAiFunctionNames} from "@/scripts/createFunctionDefinitions";
import {searchSupabaseVectors} from "@/scripts/serverFunctions/searchSupabaseVectors";
import {fetchAnalyticsData} from "@/scripts/serverFunctions/fetchAnalyticsData";

const FunctionHandlers = Object.freeze({
    [OpenAiFunctionNames.FETCH_ANALYTICS_DATA]: fetchAnalyticsData
});

type ValidFunctionNames = keyof typeof FunctionHandlers;
export type ValidFunctionCallPayload = { name: ValidFunctionNames, arguments: Record<string, unknown> };

export const handleServerFunctions = async (
    functionCall: ValidFunctionCallPayload,
    createFunctionCallMessages: (functionCallResult: any) => CreateMessage[],
    streamData: any
) => {
    const handler = FunctionHandlers[functionCall.name];
    if (!handler) throw new Error(`No handler for function call ${functionCall.name}`);
    const functionCallResult = await handler(functionCall.arguments, streamData);

    return createFunctionCallMessages(functionCallResult);
}
