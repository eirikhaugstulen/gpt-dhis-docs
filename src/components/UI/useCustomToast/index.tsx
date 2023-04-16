import {toast} from "react-hot-toast";
import {motion} from "framer-motion";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

export const useCustomToast = () => {
    return () => toast.custom((t) => (
        <motion.div
            className={'max-w-md p-4 w-full bg-yellow-200 shadow-lg rounded-lg flex ring-1 ring-black ring-opacity-5'}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
        >
            <div className={'flex justify-center items-center'}>
                <ExclamationTriangleIcon className={'w-12 h-12 text-yellow-600 p-2'} />
            </div>
            <div className={'w-full flex flex-col px-2'}>
                <p className={'text-yellow-800 text-sm'}>Not getting the result you wanted?</p>
                <p className={'text-yellow-700 text-xs'}>The AI is only fetching new context based off your first question. Try resetting the chat to get new results</p>
            </div>
        </motion.div>
    ), {
        position: 'bottom-right',
    });
}
