import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const response = await axios.get('https://debug.dhis2.org/2.40dev/api/39/visualizations', {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: 'admin',
                password: 'district',
            }
        });

        res.status(200).json(response.data.visualizations);
    } else {
        res.status(405).end();
    }
}
