import Head from 'next/head'
import {useRef, useState} from "react";
import {MessagePresets} from "@/components/Common/MessagePresets";
import {AnimatePresence} from "framer-motion";
import {TopBar} from "@/components/Common/TopBar";
import {ChatForm} from "@/components/Common/Form";
import {ChatMessages} from "@/components/Common/ChatMessages";
import {ResetButton} from "@/components/UI/ResetButton";
import {useChat} from "ai/react";
import {MessageTypes} from "@/components/UI/Chat/ChatBubble/ChatBubble.types";

export default function Home() {
    const [showPresets, setShowPresets] = useState(true);
    const submitRef = useRef<HTMLButtonElement | undefined>(undefined);
    const {
        messages,
        handleSubmit,
        handleInputChange,
        input,
        setInput,
        setMessages,
        isLoading,
    } = useChat({
        api: '/api/query'
    })

    const choosePreset = async (query: string) => {
        if (submitRef.current) {
            setShowPresets(false)
            await setInput(query);
            submitRef.current.click();
        }
    }

    const resetChat = () => {
        setShowPresets(true)
        setInput('')
        setMessages([])
    }

    return (
        <>
            <Head>
                <title>GPT - DHIS2 Docs</title>
                <meta name="title" content="DHIS2 Documentation Chatbot"/>
                <meta name="description" content="Interact with DHIS2 Documentation in a simpler, more intuitive way through our chatbot"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="DHIS2 Documentation Chatbot"/>
                <meta property="og:description" content="Interact with DHIS2 Documentation in a simpler, more intuitive way through our chatbot"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <TopBar />

                <div className={"relative mt-16 transition-all rounded-lg mx-auto mb-28 shadow-2xl max-w-4xl z-10"}>
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
                                isQuerying={!(messages[messages.length - 1]?.role === MessageTypes.CHATBOT) && isLoading}
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
            </div>
        </>
    )
}
