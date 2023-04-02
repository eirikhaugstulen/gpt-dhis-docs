import {Pill} from "@/components/UI/Pill";
import {motion} from "framer-motion";

const containerVariant = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}

type Props = {
    setQuery: (query: string) => void;
}

export const MessagePresets = ({ setQuery }: Props) => {
    return (
        <motion.div
            variants={containerVariant}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            className={'mt-10'}
        >
            <h2 className={'text-gray-500 text-sm'}>Not sure where to start?</h2>

            <motion.ul
                variants={containerVariant}
                initial={'hidden'}
                animate={'visible'}
                exit={'hidden'}
                className={'flex flex-wrap mt-2 gap-2'}
            >
                <Pill onClick={setQuery} text={'What are data sets?'} />
                <Pill onClick={setQuery} text={'Give me an example of a vaccination campaign'} />
                <Pill onClick={setQuery} text={'How do I import CSV data?'} />
                <Pill onClick={setQuery} text={'What are data element group sets?'} />
                <Pill onClick={setQuery} text={'What are indicators?'} />
            </motion.ul>
        </motion.div>
    )
}
