import {ChatBubbleLeftRightIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {Field, Form, Formik} from "formik";

type Props = {
    handleMessageSubmit: (query: string) => void;
}

export const ChatForm = ({ handleMessageSubmit }: Props) => (
    <Formik
        initialValues={{ query: '' }}
        onSubmit={({ query }, { resetForm }) => {
            handleMessageSubmit(query);
            resetForm();
        }}
    >
        <Form className="relative flex gap-2 items-center px-4 mx-auto max-w-2xl w-full rounded ring-1 ring-opacity-10 ring-black">
            <ChatBubbleLeftRightIcon
                className="pointer-events-none h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
            <Field
                className="h-12 w-full flex-grow focus:outline-none border-0 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Ask me anything..."
                name={'query'}
            />
            <PaperAirplaneIcon
                className={'w-5 h-5 text-gray-400 cursor-pointer hover:text-sky-500 transition-all'}
            />
        </Form>
    </Formik>
)
