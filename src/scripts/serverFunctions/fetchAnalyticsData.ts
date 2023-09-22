

export const fetchAnalyticsData = async (functionArgs: unknown, streamData: any) => {
    if (typeof functionArgs !== 'object') throw new Error('Invalid function arguments');
    const { organisationUnitIds, indicatorIds } = functionArgs as { organisationUnitIds: string[], indicatorIds: string[] };
    console.log('Fetching analytics data for organisation units', organisationUnitIds, 'and indicators', indicatorIds);

    const headers = { Authorization: `Basic YWRtaW46ZGlzdHJpY3Q=`};
    // @ts-ignore
    const response = await fetch(`https://debug.dhis2.org/2.40dev/api/40/analytics?dimension=ou:${organisationUnitIds.join(';')},dx:${indicatorIds.join(';')},pe:LAST_3_MONTHS&displayProperty=SHORTNAME&includeNumDen=false`, {
        headers,
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error getting analytics data: ', err);
            throw new Error('Error getting analytics data: ');
        });

    streamData.append({
        graphData: response
    })

    return {
        followUpInstructions: 'You have successfully fetched the analytics data. Provide an helpful answer to the user and ask a follow up question to continue the conversation. Do not display any data or summary of the data in this output',
    }
}
