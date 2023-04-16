import Image from "next/image";
import dynamic from 'next/dynamic'
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {HelpModal} from "@/components/Common/HelpModal";


export const TopBar = () => {
    const [helpModalOpen, setHelpModalOpen] = useState(false)

    return (
        <>
            <div className={'w-full flex items-center justify-between align-center px-10 py-4 w-full border-b'}>
                <div className={'flex items-center'}>
                    <Image
                        src={'/dhis2-logo.svg'}
                        alt={'dhis2 logo'}
                        width={35}
                        height={35}
                    />

                    <h1 className={'text-xl font-bold ml-2'}>DHIS2 Chatbot</h1>
                </div>

                <button
                    className={'flex gap-2 items-center'}
                    onClick={() => setHelpModalOpen(prevState => !prevState)}
                >
                    <QuestionMarkCircleIcon className={'transition h-8 w-8 text-gray-500 p-1 rounded cursor-pointer hover:text-gray-600 hover:bg-sky-100'} />
                </button>

                <HelpModal isOpen={helpModalOpen} setHelpModalOpen={setHelpModalOpen} />
            </div>
        </>
    )
}
