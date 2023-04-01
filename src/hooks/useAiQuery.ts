import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {MessageTypes} from "@/Components/UI/Chat/ChatBubble/ChatBubble.types";

export const useAiQuery = () => {
    const queryClient = useQueryClient()

    const { data: messages } = useQuery({
        queryKey: ['messages'],
        queryFn: () => axios.get('/api/messages')
            .then((response) => response.data?.messages),
        staleTime: Infinity,
        cacheTime: Infinity,
    })

    const { mutate: queryGPT } = useMutation({
        mutationFn: (query: string) => axios.post('/api/query', {
            query,
        }),
        onMutate: (query: string) => {
            queryClient.setQueryData(['messages'], (oldData: any) => {
                return [
                    ...oldData,
                    {
                        type: MessageTypes.USER,
                        text: query,
                        timestamp: new Date(),
                    }
                ]
            })
        },
        onSuccess: (response) => {
            queryClient.setQueryData(['messages'], (oldData: any) => {
                return [
                    ...oldData,
                    {
                        type: MessageTypes.CHATBOT,
                        text: response?.data?.text,
                        timestamp: new Date(),
                    }
                ]
            })
        }
    })

    return {
        messages,
        queryGPT,
    }
}
