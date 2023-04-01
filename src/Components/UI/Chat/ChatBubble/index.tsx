import {MessageTypes, Props} from "./ChatBubble.types";
import Image from "next/image";
import { motion } from "framer-motion";
import {useMemo} from "react";

export const ChatBubble = ({ message }: Props) => {
    const { text, type, timestamp } = message;
    const isChatbot = type === MessageTypes.CHATBOT;

    return (
        <motion.div
            className={`flex gap-2 w-full ${isChatbot ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <div className={isChatbot ? '-order-1' : 'order-1'}>
                <div className={`flex p-0.5 justify-center items-center rounded-full drop-shadow ${isChatbot ? 'bg-white' : 'bg-slate-50 w-6 h-6'}`}>
                    {isChatbot && (
                        <Image
                            className={''}
                            src={'/dhis2-logo.svg'}
                            alt={'dhis2 logo'}
                            width={25}
                            height={25}
                        />
                    )}
                </div>
            </div>
            <div className={'max-w-prose mt-3'}>
                <div className={`${isChatbot ? 'bg-gray-100 rounded-r-lg rounded-bl-lg' : 'bg-sky-600 text-white rounded-l-lg rounded-br-lg'} p-3`}>
                    <p className={'text-sm'}>
                        {text}
                    </p>
                </div>
                <p className={'text-xs ml-2 text-gray-500 '}>{}</p>
            </div>
        </motion.div>
    );
}
