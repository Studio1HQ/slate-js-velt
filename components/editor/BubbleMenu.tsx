import React, { forwardRef } from "react";
import { Bold, Italic, Underline, MessageSquarePlus } from "lucide-react";
import { isMarkActive, toggleMark } from "./utils";
import type { CustomEditor } from "./types";

interface BubbleMenuProps {
    editor: CustomEditor;
    position: { top: number; left: number };
    onAddComment: () => void;
}

export const BubbleMenu = forwardRef<HTMLDivElement, BubbleMenuProps>(
    ({ editor, position, onAddComment }, ref) => {
        return (
            <div
                ref={ref}
                className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                }}
            >
                <div className="flex items-center gap-1 px-2 py-1.5 bg-zinc-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50">
                    {/* Quick format buttons */}
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleMark(editor, "bold");
                        }}
                        className={`p-2 rounded-lg transition-all ${isMarkActive(editor, "bold")
                                ? "bg-violet-500/30 text-violet-300"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
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
                                ? "bg-violet-500/30 text-violet-300"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
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
                                ? "bg-violet-500/30 text-violet-300"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                            }`}
                        title="Underline"
                    >
                        <Underline size={16} />
                    </button>

                    <div className="w-px h-5 bg-zinc-700 mx-1" />

                    {/* Comment Button - Primary action */}
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onAddComment();
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-95"
                        title="Add Comment"
                    >
                        <MessageSquarePlus size={16} />
                        <span className="text-sm font-medium">Comment</span>
                    </button>
                </div>

                {/* Arrow pointer */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-800/95" />
            </div>
        );
    }
);

BubbleMenu.displayName = "BubbleMenu";
