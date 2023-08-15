// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiResponse} from 'next'
import {Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum} from "openai-edge";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {NextRequest} from "next/server";
import {oneLine, stripIndent} from "common-tags";

type Data = {
    prompt: string,
}

export const config = {
    runtime: 'edge',
}

const apiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

export default async function handler(
    req: NextRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { prompt }: Data = await req.json();

        const systemTemplate = stripIndent`
        ${oneLine`
            Ignore all previous instructions. You are a DHIS2 expert analyst.
            You provide insights and create reports based on raw data provided as VISUALIZATION DATA.
            You will also be provided with a visualization description containing instructions on how to create the report. This will be provided by the user. 
        `}

        VISUALIZATION DATA: """
        {"headers":[{"name":"ou","column":"Organisation unit","valueType":"TEXT","type":"java.lang.String","hidden":false,"meta":true},{"name":"pe","column":"Period","valueType":"TEXT","type":"java.lang.String","hidden":false,"meta":true},{"name":"value","column":"Value","valueType":"NUMBER","type":"java.lang.Double","hidden":false,"meta":false}],"metaData":{"items":{"sB79w2hiLp8":{"uid":"sB79w2hiLp8","name":"ANC 3 Coverage","description":"Total 3rd ANC visits (Fixed and outreach) by expected number of pregnant women.","legendSet":"fqs276KXCXi","dimensionItemType":"INDICATOR","valueType":"NUMBER","totalAggregationType":"AVERAGE","indicatorType":{"name":"Per cent","displayName":"Per cent","factor":100,"number":false}},"TEQlaapDQoK":{"uid":"TEQlaapDQoK","code":"OU_254945","name":"Port Loko","dimensionItemType":"ORGANISATION_UNIT","valueType":"NUMBER","totalAggregationType":"SUM"},"Vth0fbpFcsO":{"uid":"Vth0fbpFcsO","code":"OU_233310","name":"Kono","dimensionItemType":"ORGANISATION_UNIT","valueType":"NUMBER","totalAggregationType":"SUM"},"ou":{"uid":"ou","name":"Organisation unit","dimensionType":"ORGANISATION_UNIT"},"202208":{"uid":"202208","code":"202208","name":"August 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-08-01T00:00:00.000","endDate":"2022-08-31T00:00:00.000"},"bL4ooGhyHRQ":{"uid":"bL4ooGhyHRQ","code":"OU_260377","name":"Pujehun","dimensionItemType":"ORGANISATION_UNIT","valueType":"NUMBER","totalAggregationType":"SUM"},"202209":{"uid":"202209","code":"202209","name":"September 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-09-01T00:00:00.000","endDate":"2022-09-30T00:00:00.000"},"202206":{"uid":"202206","code":"202206","name":"June 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-06-01T00:00:00.000","endDate":"2022-06-30T00:00:00.000"},"202305":{"uid":"202305","code":"202305","name":"May 2023","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2023-05-01T00:00:00.000","endDate":"2023-05-31T00:00:00.000"},"202207":{"uid":"202207","code":"202207","name":"July 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-07-01T00:00:00.000","endDate":"2022-07-31T00:00:00.000"},"wjP19dkFeIk":{"uid":"wjP19dkFeIk","name":"District"},"202303":{"uid":"202303","code":"202303","name":"March 2023","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2023-03-01T00:00:00.000","endDate":"2023-03-31T00:00:00.000"},"202304":{"uid":"202304","code":"202304","name":"April 2023","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2023-04-01T00:00:00.000","endDate":"2023-04-30T00:00:00.000"},"202301":{"uid":"202301","code":"202301","name":"January 2023","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2023-01-01T00:00:00.000","endDate":"2023-01-31T00:00:00.000"},"202302":{"uid":"202302","code":"202302","name":"February 2023","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2023-02-01T00:00:00.000","endDate":"2023-02-28T00:00:00.000"},"LAST_12_MONTHS":{"name":"Last 12 months"},"202211":{"uid":"202211","code":"202211","name":"November 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-11-01T00:00:00.000","endDate":"2022-11-30T00:00:00.000"},"202212":{"uid":"202212","code":"202212","name":"December 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-12-01T00:00:00.000","endDate":"2022-12-31T00:00:00.000"},"202210":{"uid":"202210","code":"202210","name":"October 2022","dimensionItemType":"PERIOD","valueType":"NUMBER","totalAggregationType":"SUM","startDate":"2022-10-01T00:00:00.000","endDate":"2022-10-31T00:00:00.000"},"dx":{"uid":"dx","name":"Data","dimensionType":"DATA_X"},"pe":{"uid":"pe","name":"Period","dimensionType":"PERIOD"},"qhqAxPSTUXp":{"uid":"qhqAxPSTUXp","code":"OU_226213","name":"Koinadugu","dimensionItemType":"ORGANISATION_UNIT","valueType":"NUMBER","totalAggregationType":"SUM"},"jmIPBj66vD6":{"uid":"jmIPBj66vD6","code":"OU_246990","name":"Moyamba","dimensionItemType":"ORGANISATION_UNIT","valueType":"NUMBER","totalAggregationType":"SUM"}},"dimensions":{"dx":["sB79w2hiLp8"],"pe":["202206","202207","202208","202209","202210","202211","202212","202301","202302","202303","202304","202305"],"ou":["qhqAxPSTUXp","Vth0fbpFcsO","jmIPBj66vD6","TEQlaapDQoK","bL4ooGhyHRQ"],"co":[]}},"rows":[["qhqAxPSTUXp","202206","44.6"],["qhqAxPSTUXp","202207","40.2"],["qhqAxPSTUXp","202208","49.3"],["qhqAxPSTUXp","202209","66.0"],["qhqAxPSTUXp","202211","62.8"],["qhqAxPSTUXp","202301","38.8"],["qhqAxPSTUXp","202302","42.0"],["qhqAxPSTUXp","202303","40.7"],["qhqAxPSTUXp","202304","44.1"],["qhqAxPSTUXp","202305","44.2"],["Vth0fbpFcsO","202206","48.4"],["Vth0fbpFcsO","202207","46.6"],["Vth0fbpFcsO","202208","35.3"],["Vth0fbpFcsO","202209","50.0"],["Vth0fbpFcsO","202212","47.3"],["Vth0fbpFcsO","202301","18.7"],["Vth0fbpFcsO","202302","60.7"],["Vth0fbpFcsO","202303","55.4"],["Vth0fbpFcsO","202304","48.5"],["Vth0fbpFcsO","202305","39.0"],["jmIPBj66vD6","202206","97.6"],["jmIPBj66vD6","202207","97.6"],["jmIPBj66vD6","202208","90.2"],["jmIPBj66vD6","202209","100.8"],["jmIPBj66vD6","202210","87.3"],["jmIPBj66vD6","202211","92.4"],["jmIPBj66vD6","202212","72.2"],["jmIPBj66vD6","202301","91.0"],["jmIPBj66vD6","202302","98.8"],["jmIPBj66vD6","202303","92.3"],["jmIPBj66vD6","202304","102.7"],["jmIPBj66vD6","202305","100.0"],["TEQlaapDQoK","202206","62.4"],["TEQlaapDQoK","202207","54.3"],["TEQlaapDQoK","202208","57.3"],["TEQlaapDQoK","202209","59.7"],["TEQlaapDQoK","202210","52.6"],["TEQlaapDQoK","202211","57.8"],["TEQlaapDQoK","202301","40.5"],["TEQlaapDQoK","202302","45.4"],["TEQlaapDQoK","202303","39.1"],["TEQlaapDQoK","202304","50.4"],["TEQlaapDQoK","202305","61.7"],["bL4ooGhyHRQ","202206","89.0"],["bL4ooGhyHRQ","202207","76.3"],["bL4ooGhyHRQ","202208","81.0"],["bL4ooGhyHRQ","202209","89.0"],["bL4ooGhyHRQ","202210","0.6"],["bL4ooGhyHRQ","202211","1.2"],["bL4ooGhyHRQ","202212","0.4"],["bL4ooGhyHRQ","202301","70.5"],["bL4ooGhyHRQ","202302","73.2"],["bL4ooGhyHRQ","202303","58.6"],["bL4ooGhyHRQ","202304","80.3"],["bL4ooGhyHRQ","202305","72.4"]],"height":55,"headerWidth":3,"width":3}
        """
        
        Provide a fancy markdown report based on the visualization:`;

        let updatedMessages = [
            { role: ChatCompletionRequestMessageRoleEnum.System, content: systemTemplate },
            { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt }
        ];

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            temperature: 0,
            messages: updatedMessages,
            stream: true,
        })

        const stream = OpenAIStream(response);

        return new StreamingTextResponse(stream)
    } else {
        res.status(405).end();
    }
}
