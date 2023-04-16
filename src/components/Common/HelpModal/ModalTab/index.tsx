import {Tab} from "@headlessui/react";

type Props = {
    title: string;
}

export const ModalTab = ({ title }: Props) =>
    (
        <Tab className={'w-1/2'}>
            {({ selected }) => (
                <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-400 outline-none focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-gray-700'}`}
                >
                    {title}
                </button>
            )}
        </Tab>
    )
