"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Editor, Range } from "slate";
import { useSlate, useFocused } from "slate-react";
import { Bold, Italic, Underline, MessageSquarePlus } from "lucide-react";
import { isMarkActive, toggleMark } from "./utils";
import { addComment } from "@veltdev/slate-velt-comments";
import type { CustomEditor } from "./types";

export const BubbleMenu = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const editor = useSlate() as CustomEditor;
    const inFocus = useFocused();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const el = ref.current;
        const { selection } = editor;

        if (!el) {
            return;
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ""
        ) {
            el.removeAttribute("style");
            return;
        }

        const domSelection = window.getSelection();
        if (!domSelection || domSelection.rangeCount === 0) {
            el.removeAttribute("style");
            return;
        }

        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = "1";
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 8}px`;
        el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
    });

    const handleAddComment = (e: React.MouseEvent) => {
        e.preventDefault();
        addComment({ editor });
    };

    if (!mounted) return null;

    return createPortal(
        <div
            ref={ref}
            className="absolute z-50 -top-[10000px] -left-[10000px] opacity-0 transition-opacity duration-200"
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="flex items-center gap-1 px-2 py-1.5 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50">
                {/* Quick format buttons */}
                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleMark(editor, "bold");
                    }}
                    className={`p-2 rounded-lg transition-all ${isMarkActive(editor, "bold")
                        ? "bg-violet-500/20 dark:bg-violet-500/30 text-violet-600 dark:text-violet-300"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                        }`}
                    title="Bold"
                >
                    <Bold size={16} />
                </button>
                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleMark(editor, "italic");
                    }}
                    className={`p-2 rounded-lg transition-all ${isMarkActive(editor, "italic")
                        ? "bg-violet-500/20 dark:bg-violet-500/30 text-violet-600 dark:text-violet-300"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                        }`}
                    title="Italic"
                >
                    <Italic size={16} />
                </button>
                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleMark(editor, "underline");
                    }}
                    className={`p-2 rounded-lg transition-all ${isMarkActive(editor, "underline")
                        ? "bg-violet-500/20 dark:bg-violet-500/30 text-violet-600 dark:text-violet-300"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                        }`}
                    title="Underline"
                >
                    <Underline size={16} />
                </button>

                <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

                {/* Comment Button - Primary action */}
                <button
                    onMouseDown={handleAddComment}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-95"
                    title="Add Comment"
                >
                    <MessageSquarePlus size={16} />
                    <span className="text-sm font-medium">Comment</span>
                </button>
            </div>
        </div>,
        document.body
    );
};
