"use client"

import React from "react"
import { RenderElementProps } from "slate-react"
import type { CustomElement } from "./types"

interface ElementProps extends RenderElementProps {
    element: CustomElement
}

export const Element = ({ attributes, children, element }: ElementProps) => {
    const style = { textAlign: element.align || "left" } as React.CSSProperties

    switch (element.type) {
        case "quote":
            return (
                <blockquote
                    {...attributes}
                    className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r"
                    style={style}
                >
                    {children}
                </blockquote>
            )
        case "heading":
            return (
                <h1
                    {...attributes}
                    className="text-2xl font-bold mb-4 text-foreground"
                    style={style}
                >
                    {children}
                </h1>
            )
        case "list-item":
            return (
                <div {...attributes} className="ml-6 mb-2 list-disc" style={style}>
                    • {children}
                </div>
            )
        case "numbered-list-item":
            return (
                <div {...attributes} className="ml-6 mb-2" style={style}>
                    {children}
                </div>
            )
        default:
            return (
                <p {...attributes} className="mb-2 leading-relaxed" style={style}>
                    {children}
                </p>
            )
    }
}
