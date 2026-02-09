"use client"

import React from "react"
import { RenderLeafProps } from "slate-react"
import type { CustomText } from "./types"

interface LeafProps extends RenderLeafProps {
    leaf: CustomText
}

export const Leaf = ({ attributes, children, leaf }: LeafProps) => {
    if (leaf.bold) {
        children = <strong className="font-bold">{children}</strong>
    }
    if (leaf.italic) {
        children = <em className="italic">{children}</em>
    }
    if (leaf.underline) {
        children = <u className="underline">{children}</u>
    }
    return <span {...attributes}>{children}</span>
}
