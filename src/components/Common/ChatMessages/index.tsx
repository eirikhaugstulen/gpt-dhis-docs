import {AnimatePresence, motion} from "framer-motion";
import {Message} from "../../UI/Chat/ChatBubble/ChatBubble.types";
import {ChatBubble} from "../../UI/Chat/ChatBubble";
import {LoadingBubble} from "../../UI/Chat/LoadingBubble";

type Props = {
    messages: Message[];
    isQuerying: boolean;
}

export const ChatMessages = ({ messages, isQuerying }: Props) => {

    return (
        <AnimatePresence>
            {messages && (
                <motion.div>
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
