import { ChatMessages } from "@/components/Common/ChatMessages";
import { ChatForm } from "@/components/Common/Form";
import { GraphDataDisplay } from '@/components/Common/GraphDataDisplay';
import { MessagePresets } from "@/components/Common/MessagePresets";
import { TopBar } from "@/components/Common/TopBar";
import { MessageTypes } from "@/components/UI/Chat/ChatBubble/ChatBubble.types";
import { ResetButton } from "@/components/UI/ResetButton";
import { generateId } from "@/utils/generateId";
import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";
import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
    const [showPresets, setShowPresets] = useState(true);
    const conversationIdRef = useRef<string>(generateId());
    const submitRef = useRef<HTMLButtonElement | undefined>(undefined);
    const {
        messages,
        handleSubmit,
        handleInputChange,
        input,
        setInput,
        setMessages,
        isLoading,
        data,
    } = useChat({
        api: '/api/query',
    })

    const choosePreset = async (query: string) => {
        if (submitRef.current) {
            await setInput(query);
            submitRef.current.click();
        }
    }

    const resetChat = () => {
        setShowPresets(true)
        setInput('')
        setMessages([])
    }

    useEffect(() => {
        if (messages.length > 0) {
            setShowPresets(false)
        }
    }, [messages.length]);

    const isQuerying = useMemo(() => {
        const lastMessage = messages[messages.length - 1]
        if (!lastMessage || !isLoading) return false
        return lastMessage.role !== MessageTypes.CHATBOT || !!lastMessage.function_call
    }, [isLoading, messages])

    return (
        <>
            <Head>
                <title>GPT - DHIS2 Docs</title>
                <meta name="title" content="DHIS2 Documentation Chatbot" />
                <meta name="description" content="Interact with DHIS2 Documentation in a simpler, more intuitive way through our chatbot" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="DHIS2 Documentation Chatbot" />
                <meta property="og:description" content="Interact with DHIS2 Documentation in a simpler, more intuitive way through our chatbot" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='bg-white'>
                <TopBar title={'AI Analytics'} />

                <div className={'flex'}>
                    <div className={"relative transition-all overflow-scroll w-1/3 z-10 border-r"}>
                        <div className="transform h-screen flex flex-col justify-between gap-5 px-6 pb-10 pt-24 rounded bg-white ">
                            <div className={'flex justify-end text-black'}>
                                {!showPresets && (
                                    <div>
                                        <ResetButton onClick={resetChat} />
                                    </div>
                                )}
                            </div>

                            <div className={'max-w-3xl flex-grow w-full mx-auto'}>
                                <ChatMessages
                                    messages={messages}
                                    isQuerying={isQuerying}
                                />
                            </div>


                            <div className={'w-full max-w-2xl mx-auto'}>
                                <AnimatePresence>
                                    {showPresets && (
                                        <MessagePresets
                                            setQuery={choosePreset}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <ChatForm
                                handleMessageSubmit={handleSubmit}
                                onFieldChange={handleInputChange}
                                value={input}
                                submitRef={submitRef}
                            />
                        </div>
                    </div>

                    <div className='flex w-2/3  bg-gray-50 px-24 h-screen'>
                        <div className='bg-white shadow-lg rounded mb-12 overflow-y-scroll overflow-x-hidden mt-24 p-10 text-center w-full'>
                            <GraphDataDisplay
                                graphData={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
