export const MessageTypes = Object.freeze({
    CHATBOT: 'CHATBOT',
    USER: 'USER',
});

export interface Message {
    id: string;
    text: string;
    timestamp?: string | Date;
    loading?: boolean;
    type: typeof MessageTypes[keyof typeof MessageTypes];
}

export interface Props {
    message: Message;
}
