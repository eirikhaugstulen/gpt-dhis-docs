import {NextApiRequest, NextApiResponse} from "next";
import {importDocument} from "../../scripts/importDocument";

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const response = await importDocument();

        console.log('Response', response);

        res.status(200).json({ data: response });
    } else {
        res.status(405).end();
    }
}
