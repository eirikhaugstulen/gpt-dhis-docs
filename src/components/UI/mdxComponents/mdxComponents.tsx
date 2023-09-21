import {Components} from "react-markdown";

export const mdxComponents: Components = {
    h1: ({children}) => <h1 className={'text-2xl font-bold my-4'}>{children}</h1>,
    h2: ({children}) => <h2 className={'text-xl font-semibold mt-6 mb-4'}>{children}</h2>,
    h3: ({children}) => <h3 className={'text-lg font-semibold mt-6 mb-4'}>{children}</h3>,
    ul: ({children}) => <ul className={'my-4 list-disc px-4'}>{children}</ul>,
    ol: ({children}) => <ol className={'my-4 list-decimal px-4'}>{children}</ol>,
    li: ({children}) => <li className={'my-2 list-item'}>{children}</li>,
    p: ({children}) => <p className={'text-sm'}>{children}</p>,
    text: ({children}) => <span className={'text-sm'}>{children}</span>,
    code: ({children}) => <code  className={'bg-sky-100 px-2 py-0.5 whitespace-pre-wrap rounded'}>{children}</code>,
    table: ({children}) => <table className={'table-auto w-full border my-4 py-1'}>{children}</table>,
    thead: ({children}) => <thead className={'bg-gray-50 text-left'}>{children}</thead>,
    tbody: ({children}) => <tbody className={'bg-white'}>{children}</tbody>,
    tr: ({children}) => <tr className={'border'}>{children}</tr>,
    th: ({children}) => <th className={'border p-2'}>{children}</th>,
    td: ({children}) => <td className={'border p-2 text-left'}>{children}</td>,
    a: ({ children, href }) => <a href={href} className={'text-sky-600 hover:underline'}>{children}</a>,
}
