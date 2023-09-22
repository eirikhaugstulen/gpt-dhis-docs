import {Pill} from "../../UI/Pill";
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
                <Pill onClick={setQuery} text={'Show me the weight for height over 80 in Bo'} />
                <Pill onClick={setQuery} text={'Show me the ANC data for Port Loko and Western Area'} />
                <Pill onClick={setQuery} text={'Can you give me the OPV coverage for Bo, Bombali, Kenema and Kono?'} />
            </motion.ul>
        </motion.div>
    )
}
