"use client";

import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { useCommentAnnotations } from "@veltdev/react";
import {
  withVeltComments,
  addComment,
  renderComments,
} from "@veltdev/slate-velt-comments";

// Components
import { Toolbar } from "./Toolbar";
import { BubbleMenu } from "./BubbleMenu";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { EditorFooter } from "./EditorFooter";

// Types, utils, and constants
import type { CustomEditor } from "./types";
import { toggleMark } from "./utils";
import { initialContent } from "./constants";

export function RichTextEditor() {
  const [value, setValue] = useState<Descendant[]>(initialContent);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const editor = useMemo(() => {
    const baseEditor = createEditor();
    return withVeltComments(withReact(withHistory(baseEditor)), {
      HistoryEditor: HistoryEditor,
    }) as CustomEditor;
  }, []);

  const commentAnnotations = useCommentAnnotations();

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations });
    }
  }, [editor, commentAnnotations]);

  const handleAddComment = useCallback(() => {
    if (editor) {
      addComment({ editor });
    }
  }, [editor]);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      switch (event.key) {
        case "b": {
          event.preventDefault();
          toggleMark(editor, "bold");
          break;
        }
        case "i": {
          event.preventDefault();
          toggleMark(editor, "italic");
          break;
        }
        case "u": {
          event.preventDefault();
          toggleMark(editor, "underline");
          break;
        }
        case "z": {
          if (event.shiftKey) {
            event.preventDefault();
            HistoryEditor.redo(editor);
          } else {
            event.preventDefault();
            HistoryEditor.undo(editor);
          }
          break;
        }
      }
    },
    [editor]
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Editor Container */}
      <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
        {/* Decorative gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 dark:from-violet-500/10 via-transparent to-purple-500/5 dark:to-purple-500/10 pointer-events-none" />

        {/* Toolbar */}
        <Toolbar editor={editor} onAddComment={handleAddComment} />

        {/* Editor Content */}
        <div ref={editorContainerRef} className="relative p-8 sm:p-12 min-h-[500px] bg-white/50 dark:bg-transparent">
          <Slate
            editor={editor}
            initialValue={value}
            onChange={handleChange}
          >
            <Editable
              className="outline-none min-h-[400px] text-zinc-800 dark:text-zinc-200 leading-relaxed text-lg selection:bg-violet-500/30"
              renderElement={Element}
              renderLeaf={Leaf}
              onKeyDown={handleKeyDown}
              placeholder="Start writing something amazing..."
              spellCheck
              autoFocus
            />

            {/* Selection Bubble Menu with Comment Option */}
            <BubbleMenu />
          </Slate>
        </div>

        {/* Footer */}
        <EditorFooter />
      </div>
    </div>
  );
}
