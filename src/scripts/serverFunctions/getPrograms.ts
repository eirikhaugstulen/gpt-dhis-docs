
const ProgramTypes = {
    'EVENT': 'WITHOUT_REGISTRATION',
    'TRACKER': 'WITH_REGISTRATION',
};

export const getPrograms = async (functionArgs: unknown) => {
    if (typeof functionArgs !== 'object') throw new Error('Invalid function arguments');
    const { programType } = functionArgs as { programType: string };
    if (!programType) throw new Error('No program type provided');
    console.log('Getting programs for type', programType);

    const headers = { Authorization: `Basic YWRtaW46ZGlzdHJpY3Q=`};
    // @ts-ignore
    const { programs } = await fetch(`https://debug.dhis2.org/2.40dev/api/40/programs?filter=programType:eq:${ProgramTypes[programType]}`, {
        headers,
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error getting programs', err);
            throw new Error('Error getting programs');
        });

    return {
        followUpInstructions: 'Format the list of programs as a bullet list of program names with the ID in parentheses. For example:\n- Test Program 1 (testid1)\n- Test Program 2 (testid2)',
        programType,
        programs,
    }
}
