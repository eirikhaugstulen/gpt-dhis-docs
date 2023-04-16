import {Components} from "react-markdown";

export const mdxComponents: Components = {
    h1: ({children}) => <h1 className={'text-2xl font-bold'}>{children}</h1>,
    h2: ({children}) => <h2 className={'text-xl font-bold'}>{children}</h2>,
    h3: ({children}) => <h3 className={'text-lg font-bold'}>{children}</h3>,
    ul: ({children}) => <ul className={'list-disc list-inside'}>{children}</ul>,
    ol: ({children}) => <ol className={'list-decimal list-inside'}>{children}</ol>,
    li: ({children}) => <li className={'my-1'}>{children}</li>,
    p: ({children}) => <p className={'text-sm'}>{children}</p>,
    text: ({children}) => <span className={'text-sm'}>{children}</span>,
    code: ({children}) => <code className={'bg-sky-100 px-2 py-0.5 rounded'}>{children}</code>,
    table: ({children}) => <table className={'table-auto border my-4 px-3 py-1'}>{children}</table>,
    thead: ({children}) => <thead className={'bg-sky-50 text-left'}>{children}</thead>,
    tbody: ({children}) => <tbody className={'bg-white'}>{children}</tbody>,
    tr: ({children}) => <tr className={'border'}>{children}</tr>,
    th: ({children}) => <th className={'border p-2'}>{children}</th>,
    td: ({children}) => <td className={'border p-2'}>{children}</td>,
}
