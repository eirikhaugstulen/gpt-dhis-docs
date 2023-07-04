import {Message} from "ai/react";

export const MessageTypes = Object.freeze({
    CHATBOT: 'assistant',
    USER: 'user',
    FUNCTION: 'function',
});

export interface Props {
    message: Message;
}
