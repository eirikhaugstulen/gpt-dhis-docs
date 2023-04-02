import Image from "next/image";
import {ChevronDownIcon, QuestionMarkCircleIcon} from "@heroicons/react/24/outline";

export const TopBar = () => {

    return (
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

            {/*<button className={'flex gap-2 items-center'}>
                <p>Saved conversations</p>
                <ChevronDownIcon className={'h-5 w-5'} />
            </button>*/}
            {/*<QuestionMarkCircleIcon className={'h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-600'} />*/}
        </div>
    )
}
