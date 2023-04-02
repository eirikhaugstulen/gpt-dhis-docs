import Image from "next/image";
import {motion} from "framer-motion";

export const LoadingBubble = () => {

    return (
        <motion.div
            className={'flex gap-2 w-full justify-start'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <div className={'-order-1'}>
                <div className={'flex p-0.5 justify-center items-center rounded-full drop-shadow bg-white'}>
                    <Image
                        className={''}
                        src={'/dhis2-logo.svg'}
                        alt={'dhis2 logo'}
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            <div className={'max-w-prose mt-3'}>
                <div className={'flex gap-1 bg-gray-100 rounded-r-lg rounded-bl-lg py-3 px-6'}>
                    <div className={'w-2 h-2 bg-sky-500 rounded-full animate-bounce'} />
                    <div className={'w-2 h-2 bg-sky-300 rounded-full animate-bounce animation-delay-200'} />
                    <div className={'w-2 h-2 bg-sky-400 rounded-full animate-bounce animation-delay-300'} />
                </div>
                <p className={'text-xs ml-2 text-gray-500 '}>{}</p>
            </div>
        </motion.div>
    )
}
