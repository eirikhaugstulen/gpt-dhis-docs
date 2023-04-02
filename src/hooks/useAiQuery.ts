import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import {Message, MessageTypes} from "../components/UI/Chat/ChatBubble/ChatBubble.types";
import {generateId} from "../utils/generateId";

export type MutationVariables = {
    query: string;
    isFollowUp?: boolean;
    messages?: Message[];
}

export const useAiQuery = () => {
    const queryClient = useQueryClient()

    const { data: messages } = useQuery({
        queryKey: ['messages'],
        queryFn: () => axios.get('/api/messages')
            .then((response) => response.data?.messages),
        staleTime: Infinity,
        cacheTime: Infinity,
    })

    const {
        mutate: queryGPT,
        isLoading: isQuerying,
        isSuccess,
        isError,
    } = useMutation<AxiosResponse, unknown, MutationVariables>({
        mutationFn: ({ query, isFollowUp, messages }: any) => axios.post('/api/query', { query, isFollowUp, messages }),
        onMutate: ({ query }) => {
            queryClient.setQueryData(['messages'], (oldData: Message[] | undefined) => {
                const newMessages = [
                    {
                        id: generateId(),
                        type: MessageTypes.USER,
                        text: query,
                        timestamp: new Date(),
                    }
                ]

                if (!oldData) return newMessages;

                return [
                    ...oldData,
                    ...newMessages,
                ]
            })
        },
        onSuccess: (response) => {
            queryClient.setQueryData(['messages'], (oldData: Message[] | undefined): Message[] => {
                const newMessages = [
                    {
                        id: generateId(),
                        type: MessageTypes.CHATBOT,
                        text: response?.data?.text ?? 'There was an error processing your request. Please try again.',
                        timestamp: new Date(),
                    }
                ];

                if (!oldData) return newMessages;

                return [
                    ...oldData,
                    ...newMessages,
                ]
            })
        }
    })

    return {
        messages,
        isQuerying,
        queryGPT,
        isFetched: !!(isError || isSuccess || isQuerying),
    }
}
