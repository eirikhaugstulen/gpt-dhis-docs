import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/UI/command";
import { mdxComponents } from "@/components/UI/mdxComponents/mdxComponents";
import {
    ChartBarIcon,
    PaintBrushIcon,
    PencilSquareIcon,
    TableCellsIcon
} from "@heroicons/react/24/outline"
import { useCompletion } from "ai/react";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    graphData: Object[],
}

export const GraphDataDisplay = ({ graphData }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const {
        complete,
        completion,
    } = useCompletion({
        api: '/api/format-data',
        body: {
            graphData: graphData
        }
    })

    if (!graphData) {
        return null
    }

    const onSelectCommand = (command: string) => {
        complete(command)
    }

    return (
        <>
            <div className="flex justify-end pb-10">
                <button
                    className={'flex items-center text-sm justify-center gap-2 border hover:bg-gray-100 text-gray-500 rounded py-1.5 px-3'}
                    onClick={() => setDialogOpen(prevState => !prevState)}
                >
                    <PaintBrushIcon className={'w-5 h-5'} />
                    <p>Format response</p>
                </button>
            </div>
            <p>
                {!completion ?
                    JSON.stringify(graphData?.slice(-1), null, 2) :
                    (
                        <ReactMarkdown
                            components={mdxComponents}
                            // eslint-disable-next-line react/no-children-prop
                            children={completion}
                            remarkPlugins={[remarkGfm]}
                        />
                    )
                }
            </p>

            <CommandDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            >
                {/* @ts-ignore */}
                <CommandInput onSelect={onSelectCommand} placeholder="Type a custom prompt..." />

                <CommandList>
                    <CommandEmpty>
                        Click {' '}
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">Enter</span>
                        </kbd>
                        {' '}to use a custom prompt
                    </CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={onSelectCommand}>
                            <TableCellsIcon className="mr-2 h-4 w-4" />
                            <span>Format as a table</span>
                        </CommandItem>
                        <CommandItem onSelect={onSelectCommand}>
                            <ChartBarIcon className="mr-2 h-4 w-4" />
                            <span>Format as a bar chart</span>
                        </CommandItem>
                        <CommandItem onSelect={onSelectCommand}>
                            <PencilSquareIcon className={'mr-2 h-4 w-4'} />
                            <span>Write a text report that highlights some key insights and actionable points</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
