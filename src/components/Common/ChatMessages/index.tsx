import {AnimatePresence, motion} from "framer-motion";
import {Message} from 'ai/react'
import {ChatBubble} from "../../UI/Chat/ChatBubble";
import {LoadingBubble} from "../../UI/Chat/LoadingBubble";
import {MessageTypes} from "@/components/UI/Chat/ChatBubble/ChatBubble.types";

type Props = {
    messages: Message[];
    isQuerying: boolean;
    defaultText?: string;
}

export const ChatMessages = ({
                                 messages,
                                 isQuerying,
                                 defaultText = 'Hello! I am your DHIS2 assistant - ask me anything DHIS2 related 👋',
                             }: Props) => {

    return (
        <AnimatePresence>
            {messages && (
                <motion.div>
                    <ChatBubble
                        message={{
                            id: 'initial-message',
                            role: MessageTypes.CHATBOT,
                            content: defaultText
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
