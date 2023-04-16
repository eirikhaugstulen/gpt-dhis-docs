import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import {Toaster} from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';

const App = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Component {...pageProps} />
            <Toaster gutter={20} />
            <Analytics />
        </QueryClientProvider>
    )
}

// Forcing client side render because of react-hot-toast hydration issue
export default dynamic(() => Promise.resolve(App), {
    ssr: false,
});
