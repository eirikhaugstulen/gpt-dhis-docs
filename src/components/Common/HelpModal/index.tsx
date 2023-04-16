import {Dialog, Tab} from "@headlessui/react";
import {ModalTab} from "@/components/Common/HelpModal/ModalTab";

type Props = {
    isOpen: boolean;
    setHelpModalOpen: (isOpen: boolean) => void;
}

export const HelpModal = ({ isOpen, setHelpModalOpen }: Props) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setHelpModalOpen(false)}
            className="relative z-50"
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-3xl rounded bg-white">
                    <Dialog.Title
                        className={'text-lg font-bold p-4 border-b'}
                    >
                        Help center
                    </Dialog.Title>
                    <Dialog.Description
                        className={'p-4'}
                    >
                        <Tab.Group>
                            <Tab.List className="flex w-5/6 mx-auto space-x-1 rounded-xl bg-blue-900/20 p-1">
                                <ModalTab title={'What is DHIS2 Chatbot?'} />
                                <ModalTab title={'Contribute'} />
                            </Tab.List>
                            <Tab.Panels className={'mt-4'}>
                                <Tab.Panel>
                                    <div className={'px-2 py-4 flex flex-col gap-5'}>
                                        <div>
                                            <h1 className={'text-lg border-b text-gray-600 font-bold'}>What is <span className={'text-sky-500'}>DHIS2 Chatbot</span>?</h1>
                                            <p
                                                className={'text-sm mt-2'}
                                            >
                                                DHIS2-GPT-DOCS is an application that provides users with an intuitive conversational interface with knowledge of the DHIS2 documentation. It is built on top of advanced natural language processing techniques that enable users to ask questions and receive relevant information from the DHIS2 documentation without the need for extensive technical knowledge.
                                            </p>
                                        </div>

                                        <div>
                                            <h1 className={'text-lg text-gray-600 border-b font-bold'}>How is it built?</h1>
                                            <p
                                                className={'text-sm mt-2'}
                                            >
                                                This application uses the following techniques to provide users with meaningful answers:
                                            </p>

                                            <ul className={'max-w-xl p-4 pl-6'}>
                                                <li className={'list-decimal text-sm mt-2'}>DHIS2-GPT-DOCS leverages vectorization techniques to break down the DHIS2 documentation into smaller parts that can be easily indexed and searched.</li>
                                                <li className={'list-decimal text-sm mt-2'}>The vectorized documentation is stored in a Supabase backend for ease of use.</li>
                                                <li className={'list-decimal text-sm mt-2'}>The application uses Top-K Cosine similarity search to match user queries with relevant parts of the DHIS2 documentation.</li>
                                                <li className={'list-decimal text-sm mt-2'}>The user query and the related context is then wrapped in a pre-formatted prompt and sent to ChatGPT to answer in a user-centric way.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 className={'text-lg text-gray-600 border-b font-bold'}>️Disclaimer</h1>
                                            <p className={'text-sm mt-2'}>
                                                This application is still in its early stages and is not yet ready for production use. It is currently being used as a proof of concept to demonstrate the potential of conversational interfaces in the DHIS2 ecosystem.
                                            </p>
                                            <p
                                                className={'text-sm mt-2 font-semibold italic'}
                                            >
                                                It is not built by or related to the DHIS2 core team.
                                            </p>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className={'px-2 py-4 flex flex-col gap-5'}>
                                        <h1
                                            className={'text-lg text-gray-600 font-bold'}
                                        >
                                            Want to contribute?
                                        </h1>
                                        <p
                                            className={'text-sm mt-2 min-h-[300px]'}
                                        >
                                            This application is open source and you can contribute to it by visiting the <a
                                                href={'https://github.com/eirikhaugstulen/gpt-dhis-docs'}
                                                target={'_blank'}
                                                className={'text-sky-500'}
                                            >
                                                Github repository
                                            </a>.
                                        </p>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Dialog.Description>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
