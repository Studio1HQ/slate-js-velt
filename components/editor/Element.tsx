import React from "react";
import { RenderElementProps } from "slate-react";
import { SlateVeltComment } from "@veltdev/slate-velt-comments";
import type { VeltCommentsElement } from "@veltdev/slate-velt-comments";
import type { CustomElement } from "./types";

export const Element = ({ attributes, children, element }: RenderElementProps) => {
    const style = { textAlign: (element as CustomElement).align || "left" };

    if (element.type === "veltComment") {
        return (
            <SlateVeltComment
                {...{ attributes, children, element: element as VeltCommentsElement }}
            />
        );
    }

    switch (element.type) {
        case "heading":
            return (
                <h1 {...attributes} style={style} className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {children}
                </h1>
            );
        case "heading-two":
            return (
                <h2 {...attributes} style={style} className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                    {children}
                </h2>
            );
        case "heading-three":
            return (
                <h3 {...attributes} style={style} className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                    {children}
                </h3>
            );
        case "block-quote":
            return (
                <blockquote
                    {...attributes}
                    style={style}
                    className="border-l-4 border-violet-500/50 pl-4 my-4 italic text-zinc-600 dark:text-zinc-300 bg-violet-500/5 py-2 rounded-r-lg"
                >
                    {children}
                </blockquote>
            );
        case "bulleted-list":
            return (
                <ul {...attributes} style={style} className="list-disc list-inside mb-4 text-zinc-800 dark:text-zinc-200">
                    {children}
                </ul>
            );
        case "numbered-list":
            return (
                <ol {...attributes} style={style} className="list-decimal list-inside mb-4 text-zinc-800 dark:text-zinc-200">
                    {children}
                </ol>
            );
        case "list-item":
            return (
                <li {...attributes} style={style} className="mb-1">
                    {children}
                </li>
            );
        default:
            return (
                <p {...attributes} style={style} className="mb-3 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {children}
                </p>
            );
    }
};
