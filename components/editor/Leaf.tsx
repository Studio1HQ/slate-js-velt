import React from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    let processedChildren = children;

    if (leaf.bold) {
        processedChildren = <strong className="font-bold">{processedChildren}</strong>;
    }

    if (leaf.italic) {
        processedChildren = <em className="italic">{processedChildren}</em>;
    }

    if (leaf.underline) {
        processedChildren = <u className="underline decoration-violet-400/50">{processedChildren}</u>;
    }

    if (leaf.strikethrough) {
        processedChildren = <s className="line-through text-zinc-500">{processedChildren}</s>;
    }

    return <span {...attributes}>{processedChildren}</span>;
};
