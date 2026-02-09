"use client"

import React, { useState, useCallback, useMemo } from "react"
import { createEditor, Descendant } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Type } from "lucide-react"
import { Element } from "./Element"
import { Leaf } from "./Leaf"
import { EditorToolbar } from "./Toolbar"
import "./types" // Import for type augmentation side effects

const initialValue: Descendant[] = [
    {
        type: "heading",
        children: [{ text: "Welcome to the Rich Text Editor Demo", bold: true }],
    },
    {
        type: "paragraph",
        children: [
            { text: "This is a " },
            { text: "beautiful", bold: true },
            { text: " and " },
            { text: "powerful", italic: true },
            { text: " rich text editor built with " },
            { text: "Slate.js", bold: true, italic: true },
            { text: ". Try out the formatting options above!" },
        ],
    },
    { type: "paragraph", children: [{ text: "" }] },
    {
        type: "quote",
        children: [
            {
                text: "Great design is not just what it looks like and feels like — great design is how it works.",
            },
        ],
    },
    {
        type: "quote",
        children: [{ text: "— Steve Jobs", italic: true }],
    },
    { type: "paragraph", children: [{ text: "" }] },
    { type: "paragraph", children: [{ text: "Features you can try:" }] },
    { type: "list-item", children: [{ text: "✨ Bold, italic, and underline formatting" }] },
    { type: "list-item", children: [{ text: "📝 Multiple text alignment options" }] },
    { type: "list-item", children: [{ text: "📋 Lists and quotes" }] },
    { type: "list-item", children: [{ text: "🎨 Beautiful, responsive design" }] },
]

const getInitialEditorValue = (): Descendant[] => {
    if (Array.isArray(initialValue) && initialValue.length > 0) return initialValue
    return [{ type: "paragraph", children: [{ text: "" }] }]
}

interface RichTextEditorProps {
    onWordCountChange?: (count: number) => void
}

export const RichTextEditor = ({ onWordCountChange }: RichTextEditorProps) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const initialEditorValue = useMemo(() => getInitialEditorValue(), [])
    const [value, setValue] = useState<Descendant[]>(initialEditorValue)

    const renderElement = useCallback((props: any) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

    const handleChange = (newValue: Descendant[]) => {
        setValue(newValue)

        const text = newValue
            .map((node: any) =>
                Array.isArray(node.children)
                    ? node.children.map((child: any) => child?.text ?? "").join("")
                    : ""
            )
            .join(" ")

        const words = text.trim().split(/\s+/).filter(Boolean)
        onWordCountChange?.(words.length)
    }

    return (
        <Card className="shadow-xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Editor
                </CardTitle>

                <Slate editor={editor} initialValue={initialEditorValue} onChange={handleChange}>
                    <EditorToolbar />

                    <CardContent className="pt-4 px-0">
                        <div className="border rounded-lg p-6 min-h-[400px] bg-background/50 focus-within:bg-background transition-colors duration-200 overflow-y-auto">
                            <Editable
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                                placeholder="Start writing your content here..."
                                className="outline-none min-h-[350px] max-h-[400px] overflow-y-auto prose prose-lg max-w-none
                  prose-headings:text-foreground 
                  prose-p:text-foreground 
                  prose-blockquote:text-muted-foreground
                  prose-strong:text-foreground
                  prose-em:text-foreground"
                                spellCheck
                            />
                        </div>
                    </CardContent>
                </Slate>
            </CardHeader>
        </Card>
    )
}
