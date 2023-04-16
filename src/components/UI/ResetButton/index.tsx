import {ArrowPathIcon} from "@heroicons/react/24/outline";
import {motion} from "framer-motion";

type Props = {
    onClick: () => void;
}

export const ResetButton = ({ onClick }: Props) => {
    return (
        <motion.button
            onClick={onClick}
            className={'flex items-center text-sm mx-auto justify-center gap-2 border hover:bg-gray-100 text-gray-500 rounded py-1.5 px-3'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}

        >
            <div className={'flex items-center justify-center gap-2'}>
                <ArrowPathIcon className={'h-5 w-5'} />
                <span>Ask another topic</span>
            </div>
        </motion.button>
    );
}
