import Head from 'next/head'
import {useState} from "react";
import {MessagePresets} from "../components/Common/MessagePresets";
import {AnimatePresence} from "framer-motion";
import {useAiQuery} from "../hooks/useAiQuery";
import {TopBar} from "../components/Common/TopBar";
import {ChatForm} from "../components/Common/Form";
import {ChatMessages} from "../components/Common/ChatMessages";
import {useQueryClient} from "@tanstack/react-query";
import {Message} from "../components/UI/Chat/ChatBubble/ChatBubble.types";
import {ResetButton} from "../components/UI/ResetButton";

export default function Home() {
    const [showPresets, setShowPresets] = useState(true);
    const queryClient = useQueryClient();
    const {
        messages,
        queryGPT,
        isQuerying,
        isFetched,
    } = useAiQuery();
    console.log('isFetched', isFetched);

    const resetChat = () => {
        queryClient.removeQueries(['messages']);
        setShowPresets(true);
    }

    const handleMessageSubmit = (query: string) => {
        const messages: Message[] | undefined = queryClient.getQueryData(['messages']);
        if (showPresets || !messages) {
            setShowPresets(false);
            queryGPT({ query });
            return;
        }

        queryGPT({ query, isFollowUp: true, messages });
    }

    return (
        <>
            <Head>
                <title>GPT - DHIS2 Docs</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <TopBar />

                <div className={"relative mt-16 transition-all rounded-lg mx-auto shadow-2xl max-w-4xl z-10"}>
                    <div className="transform overflow-hidden flex flex-col gap-5 px-6 py-10 rounded bg-white ">
                        <div className={'flex justify-end'}>
                            {!showPresets && (
                                <div>
                                    <ResetButton onClick={resetChat} />
                                </div>
                            )}
                        </div>

                        <div className={'max-w-3xl w-full mx-auto'}>
                            <ChatMessages
                                messages={messages}
                                isQuerying={isQuerying}
                            />
                        </div>


                        <div className={'w-full max-w-2xl mx-auto'}>
                            <AnimatePresence>
                                {showPresets && (
                                    <MessagePresets
                                        setQuery={handleMessageSubmit}
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        <ChatForm
                            handleMessageSubmit={handleMessageSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
