import {CreateMessage} from "ai";
import {OpenAiFunctionNames} from "@/scripts/createFunctionDefinitions";
import {getPrograms} from "@/scripts/serverFunctions/getPrograms";
import {getProgramById} from "@/scripts/serverFunctions/getProgramById";

const FunctionHandlers = Object.freeze({
    [OpenAiFunctionNames.GET_PROGRAMS]: getPrograms,
    [OpenAiFunctionNames.GET_PROGRAM_DETAILS_BY_ID]: getProgramById,
});

type ValidFunctionNames = keyof typeof FunctionHandlers;
export type ValidFunctionCallPayload = { name: ValidFunctionNames, arguments: Record<string, unknown> };

export const handleServerFunctions = async (
    functionCall: ValidFunctionCallPayload,
    createFunctionCallMessages: (functionCallResult: any) => CreateMessage[]
) => {
    const handler = FunctionHandlers[functionCall.name];
    if (!handler) throw new Error(`No handler for function call ${functionCall.name}`);
    const functionCallResult = await handler(functionCall.arguments);

    return createFunctionCallMessages(functionCallResult);
}
