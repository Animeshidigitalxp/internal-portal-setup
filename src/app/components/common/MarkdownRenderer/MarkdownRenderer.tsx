"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
    content: string
}

export default function MarkdownRenderer({ content }: Props) {
    const formatted = content.replace(/\\n/g, "\n")

    return (
        <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {formatted}
            </ReactMarkdown>
        </div>
    )
}