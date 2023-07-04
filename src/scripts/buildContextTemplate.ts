
export const buildContextTemplate = (context: string) => {
    return `
Fetched context based on user query: """
${context.replaceAll('\n', ' ').trim()}
"""
`
}
