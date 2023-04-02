import { motion } from 'framer-motion'

type Props = {
    text: string;
    onClick?: (text: string) => void;
}

const listItemVariant = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

export const Pill = ({ text, onClick = () => {} }: Props) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        variants={listItemVariant}
        transition={{ duration: 0.2 }}
        onClick={() => onClick(text)}
        className={'bg-slate-100 px-2 py-1 cursor-pointer text-sm rounded text-gray-600 ring-1 ring-gray-300 hover:bg-slate-200'}
    >
            {text}
    </motion.button>
)
