import {NextApiRequest, NextApiResponse} from "next";

type ReturnData = {
    messages: Array<{ type: string, text: string, timestamp?: Date }>
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ReturnData>
){
    if (req.method !== 'GET') {
        res.status(405).end();
    }

    return res.status(200).json({ messages: [{ type: 'CHATBOT', text: 'Hello! I am your DHIS2 assistant - ask me anything DHIS2 related 👋', timestamp: new Date() }] });
}
