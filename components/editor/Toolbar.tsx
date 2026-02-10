import React from "react";
import { HistoryEditor } from "slate-history";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    MessageSquarePlus,
} from "lucide-react";
import { ToolbarButton, ToolbarDivider } from "./ToolbarButton";
import {
    isMarkActive,
    toggleMark,
    isBlockActive,
    toggleBlock,
    isAlignmentActive,
    toggleAlignment
} from "./utils";
import type { CustomEditor } from "./types";

interface ToolbarProps {
    editor: CustomEditor;
    onAddComment: () => void;
}

export const Toolbar = ({ editor, onAddComment }: ToolbarProps) => {
    return (
        <div className="relative border-b border-zinc-800/50 bg-zinc-900/90 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center gap-1 flex-wrap">
                {/* Text Formatting */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        active={isMarkActive(editor, "bold")}
                        onMouseDown={() => toggleMark(editor, "bold")}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isMarkActive(editor, "italic")}
                        onMouseDown={() => toggleMark(editor, "italic")}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isMarkActive(editor, "underline")}
                        onMouseDown={() => toggleMark(editor, "underline")}
                        title="Underline (Ctrl+U)"
                    >
                        <Underline size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isMarkActive(editor, "strikethrough")}
                        onMouseDown={() => toggleMark(editor, "strikethrough")}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </ToolbarButton>
                </div>

                <ToolbarDivider />

                {/* Headings */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        active={isBlockActive(editor, "heading")}
                        onMouseDown={() => toggleBlock(editor, "heading")}
                        title="Heading 1"
                    >
                        <Heading1 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isBlockActive(editor, "heading-two")}
                        onMouseDown={() => toggleBlock(editor, "heading-two")}
                        title="Heading 2"
                    >
                        <Heading2 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isBlockActive(editor, "heading-three")}
                        onMouseDown={() => toggleBlock(editor, "heading-three")}
                        title="Heading 3"
                    >
                        <Heading3 size={18} />
                    </ToolbarButton>
                </div>

                <ToolbarDivider />

                {/* Alignment */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        active={isAlignmentActive(editor, "left")}
                        onMouseDown={() => toggleAlignment(editor, "left")}
                        title="Align Left"
                    >
                        <AlignLeft size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isAlignmentActive(editor, "center")}
                        onMouseDown={() => toggleAlignment(editor, "center")}
                        title="Align Center"
                    >
                        <AlignCenter size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isAlignmentActive(editor, "right")}
                        onMouseDown={() => toggleAlignment(editor, "right")}
                        title="Align Right"
                    >
                        <AlignRight size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isAlignmentActive(editor, "justify")}
                        onMouseDown={() => toggleAlignment(editor, "justify")}
                        title="Justify"
                    >
                        <AlignJustify size={18} />
                    </ToolbarButton>
                </div>

                <ToolbarDivider />

                {/* Lists & Quote */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        active={isBlockActive(editor, "bulleted-list")}
                        onMouseDown={() => toggleBlock(editor, "bulleted-list")}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isBlockActive(editor, "numbered-list")}
                        onMouseDown={() => toggleBlock(editor, "numbered-list")}
                        title="Numbered List"
                    >
                        <ListOrdered size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        active={isBlockActive(editor, "block-quote")}
                        onMouseDown={() => toggleBlock(editor, "block-quote")}
                        title="Quote"
                    >
                        <Quote size={18} />
                    </ToolbarButton>
                </div>

                <ToolbarDivider />

                {/* Undo/Redo */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        onMouseDown={() => HistoryEditor.undo(editor)}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onMouseDown={() => HistoryEditor.redo(editor)}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <Redo size={18} />
                    </ToolbarButton>
                </div>

                <div className="flex-1" />

                {/* Add Comment Button */}
                <ToolbarButton
                    onMouseDown={onAddComment}
                    title="Add Comment"
                >
                    <div className="flex items-center gap-2">
                        <MessageSquarePlus size={18} />
                        <span className="text-sm font-medium hidden sm:inline">Comment</span>
                    </div>
                </ToolbarButton>
            </div>
        </div>
    );
};
