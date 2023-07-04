import {MessageTypes, Props} from "./ChatBubble.types";
import Image from "next/image";
import { motion } from "framer-motion";
import {UserIcon} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {mdxComponents} from "@/components/UI/mdxComponents/mdxComponents";

export const ChatBubble = ({ message }: Props) => {
    const { content, role } = message;
    const isChatbot = role === MessageTypes.CHATBOT;

    if (role === MessageTypes.FUNCTION || !!message.function_call) {
        return null;
    }

    return (
        <motion.div
            className={`flex gap-2 w-full ${isChatbot ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <div className={isChatbot ? '-order-1' : 'order-1'}>
                <div className={`flex p-0.5 justify-center items-center rounded-full drop-shadow ${isChatbot ? 'bg-white' : 'bg-slate-50 w-6 h-6'}`}>
                    {isChatbot ? (
                        <Image
                            className={''}
                            src={'/dhis2-logo.svg'}
                            alt={'dhis2 logo'}
                            width={25}
                            height={25}
                        />
                    ) : (
                        <UserIcon
                            className={'w-4 h-4 text-sky-700'}
                        />
                    )}
                </div>
            </div>
            <div className={'max-w-prose mt-3'}>
                <div className={`${isChatbot ? 'bg-gray-100 rounded-r-lg rounded-bl-lg' : 'bg-sky-600 text-white rounded-l-lg rounded-br-lg'} p-3`}>
                    <div className={'text-sm'}>
                        {isChatbot ? (
                            <ReactMarkdown
                                components={mdxComponents}
                                // eslint-disable-next-line react/no-children-prop
                                children={content}
                                remarkPlugins={[remarkGfm]}
                            />
                        ) : (
                            <>
                                {content}
                            </>
                        )}
                    </div>
                </div>
                <p className={'text-xs ml-2 text-gray-500 '}>{}</p>
            </div>
        </motion.div>
    );
}
