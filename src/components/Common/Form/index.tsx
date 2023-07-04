import {ChatBubbleLeftRightIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {ChangeEvent, FormEvent} from "react";

type Props = {
    handleMessageSubmit: ((event: FormEvent<HTMLFormElement>) => void);
    onFieldChange: ((event: ChangeEvent<HTMLInputElement>) => void);
    value: string;
    submitRef: any;
}

export const ChatForm = ({
    handleMessageSubmit,
    onFieldChange,
    value,
    submitRef
}: Props) => (
    <form
        className="relative flex gap-2 items-center px-4 mx-auto max-w-2xl w-full rounded ring-1 ring-opacity-10 ring-black"
        onSubmit={handleMessageSubmit}
    >
        <ChatBubbleLeftRightIcon
            className="pointer-events-none h-5 w-5 text-gray-400"
            aria-hidden="true"
        />
        <input
            className="h-12 w-full flex-grow focus:outline-none border-0 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Ask me anything..."
            onChange={onFieldChange}
            value={value}
        />
        <button
            type="submit"
            ref={submitRef}
        >
            <PaperAirplaneIcon
                className={'w-5 h-5 text-gray-400 cursor-pointer hover:text-sky-500 transition-all'}
            />
        </button>
    </form>
)
