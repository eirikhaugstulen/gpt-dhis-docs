
export const getProgramById = async (functionArgs: unknown) => {
    if (typeof functionArgs !== 'object') throw new Error('Invalid function arguments');
    const { programId } = functionArgs as { programId: string };
    if (!programId) throw new Error('No program type provided');
    console.log('Getting info for programId: ', programId);

    const headers = { Authorization: `Basic YWRtaW46ZGlzdHJpY3Q=`};
    const { programs } = await fetch(`http://localhost:8080/api/programs/${programId}`, {
        headers,
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error getting programs', err);
            throw new Error('Error getting programs');
        });

    return {
        followUpInstructions: 'This is the raw program details. Rewrite it into a more readable format.',
        programId,
        programs,
    }
}
