"use client"

type Props = {
    content: string
}

function parseInline(text: string): string {
    return text
        // Bold + Italic
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        // Strikethrough
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
}

function parseMarkdown(raw: string): string {
    const lines = raw.replace(/\\n/g, "\n").split("\n")
    const html: string[] = []

    let inCodeBlock = false
    let codeContent: string[] = []
    let codeLang = ""

    let inTable = false
    let tableRows: string[] = []

    let inBlockquote = false
    let blockquoteLines: string[] = []

    let inUL = false
    let inOL = false
    let listBuffer: string[] = []

    const flushList = () => {
        if (inUL) {
            html.push(`<ul>${listBuffer.map(i => `<li>${parseInline(i)}</li>`).join("")}</ul>`)
            inUL = false
        } else if (inOL) {
            html.push(`<ol>${listBuffer.map(i => `<li>${parseInline(i)}</li>`).join("")}</ol>`)
            inOL = false
        }
        listBuffer = []
    }

    const flushBlockquote = () => {
        if (inBlockquote) {
            html.push(`<blockquote>${parseMarkdown(blockquoteLines.join("\n"))}</blockquote>`)
            inBlockquote = false
            blockquoteLines = []
        }
    }

    const flushTable = () => {
        if (!inTable || tableRows.length < 2) return
        const [headerRow, , ...bodyRows] = tableRows
        const headers = headerRow.split("|").map(h => h.trim()).filter(Boolean)
        const theadCells = headers.map(h => `<th>${parseInline(h)}</th>`).join("")
        const tbodyRows = bodyRows.map(row => {
            const cells = row.split("|").map(c => c.trim()).filter(Boolean)
            return `<tr>${cells.map(c => `<td>${parseInline(c)}</td>`).join("")}</tr>`
        }).join("")
        html.push(`<table><thead><tr>${theadCells}</tr></thead><tbody>${tbodyRows}</tbody></table>`)
        inTable = false
        tableRows = []
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Code block
        if (line.startsWith("```")) {
            if (!inCodeBlock) {
                flushList(); flushBlockquote(); flushTable()
                inCodeBlock = true
                codeLang = line.slice(3).trim()
                codeContent = []
            } else {
                const escaped = codeContent.join("\n")
                    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                html.push(`<pre><code class="language-${codeLang}">${escaped}</code></pre>`)
                inCodeBlock = false
                codeContent = []
                codeLang = ""
            }
            continue
        }

        if (inCodeBlock) { codeContent.push(line); continue }

        // Table
        if (line.includes("|")) {
            flushList(); flushBlockquote()
            inTable = true
            tableRows.push(line)
            continue
        } else if (inTable) {
            flushTable()
        }

        // Blockquote
        if (line.startsWith(">")) {
            flushList()
            inBlockquote = true
            blockquoteLines.push(line.slice(1).trim())
            continue
        } else if (inBlockquote) {
            flushBlockquote()
        }

        // Horizontal rule
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
            flushList()
            html.push("<hr />")
            continue
        }

        // Headings
        const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
        if (headingMatch) {
            flushList()
            const level = headingMatch[1].length
            html.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`)
            continue
        }

        // Unordered list
        const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)/)
        if (ulMatch) {
            flushBlockquote()
            if (inOL) flushList()
            inUL = true
            listBuffer.push(ulMatch[2])
            continue
        }

        // Ordered list
        const olMatch = line.match(/^\d+\.\s+(.+)/)
        if (olMatch) {
            flushBlockquote()
            if (inUL) flushList()
            inOL = true
            listBuffer.push(olMatch[1])
            continue
        }

        // Empty line
        if (line.trim() === "") {
            flushList(); flushBlockquote(); flushTable()
            html.push("<br />")
            continue
        }

        // Paragraph
        flushList(); flushBlockquote(); flushTable()
        html.push(`<p>${parseInline(line)}</p>`)
    }

    // Flush any remaining open blocks
    flushList(); flushBlockquote(); flushTable()
    if (inCodeBlock && codeContent.length) {
        html.push(`<pre><code>${codeContent.join("\n")}</code></pre>`)
    }

    return html.join("")
}

export default function MarkdownRenderer({ content }: Props) {
    const html = parseMarkdown(content)

    return (
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}