import {AnimatePresence, motion} from "framer-motion";
import {Message} from 'ai/react'
import {ChatBubble} from "../../UI/Chat/ChatBubble";
import {LoadingBubble} from "../../UI/Chat/LoadingBubble";
import {MessageTypes} from "@/components/UI/Chat/ChatBubble/ChatBubble.types";

type Props = {
    messages: Message[];
    isQuerying: boolean;
}

export const ChatMessages = ({ messages, isQuerying }: Props) => {

    return (
        <AnimatePresence>
            {messages && (
                <motion.div className={'flex flex-col gap-3'}>
                    <ChatBubble
                        message={{
                            id: 'initial-message',
                            role: MessageTypes.CHATBOT,
                            content: 'Hello! I am your DHIS2 assistant - ask me anything DHIS2 related 👋'
                        }}
                    />

                    {messages?.map((message: Message, index: number) => (
                        <ChatBubble
                            key={index}
                            message={message}
                        />
                    ))}

                    {isQuerying && <LoadingBubble />}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
