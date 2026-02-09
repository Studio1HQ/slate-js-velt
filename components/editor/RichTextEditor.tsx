"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { createEditor, Descendant, Editor } from "slate";
import { withHistory, HistoryEditor } from "slate-history";
import { Editable, Slate, withReact, ReactEditor } from "slate-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type } from "lucide-react";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { EditorToolbar } from "./Toolbar";
import "./types";
const EDITOR_ID = "main-rich-text-editor"; // Unique ID for the editor instance
// ✅ Velt
import {
  useCommentAnnotations,
} from "@veltdev/react";
import {
  withVeltComments,
  addComment,
  renderComments,
} from "@veltdev/slate-velt-comments";

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
  {
    type: "list-item",
    children: [{ text: "✨ Bold, italic, and underline formatting" }],
  },
  {
    type: "list-item",
    children: [{ text: "📝 Multiple text alignment options" }],
  },
  { type: "list-item", children: [{ text: "📋 Lists and quotes" }] },
  {
    type: "list-item",
    children: [{ text: "🎨 Beautiful, responsive design" }],
  },
];
const getInitialEditorValue = (): Descendant[] => {
  if (Array.isArray(initialValue) && initialValue.length > 0)
    return initialValue;
  return [{ type: "paragraph", children: [{ text: "" }] }];
};

interface RichTextEditorProps {
  onWordCountChange?: (count: number) => void;
}

type CustomEditor = ReactEditor & HistoryEditor;

export const RichTextEditor = ({ onWordCountChange }: RichTextEditorProps) => {
  // ✅ create editor ONCE
  const editor = useMemo(() => {
    const base = createEditor();
    return withVeltComments(withReact(withHistory(base)), {
      HistoryEditor: HistoryEditor,
    }) as unknown as CustomEditor;
  }, []);

  const initialEditorValue = useMemo(() => getInitialEditorValue(), []);
  const [value, setValue] = useState<Descendant[]>(initialEditorValue);

  // ✅ Velt: live annotations -> render highlights/markers
  const commentAnnotations = useCommentAnnotations();
  useEffect(() => {
    if (commentAnnotations?.length) {
      renderComments({ editor, commentAnnotations });
    }
  }, [editor, commentAnnotations]);

  // ✅ Bubble menu state
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);
  const [bubbleMenuPos, setBubbleMenuPos] = useState({ top: 0, left: 0 });
  const bubbleMenuRef = useRef<HTMLDivElement>(null);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const updateBubbleMenu = useCallback(() => {
    const { selection } = editor;

    // hide if no selection or empty string selection
    if (!selection || Editor.string(editor, selection) === "") {
      setShowBubbleMenu(false);
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount === 0) {
      setShowBubbleMenu(false);
      return;
    }

    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    const menuHeight = bubbleMenuRef.current?.offsetHeight || 40;
    const menuWidth = bubbleMenuRef.current?.offsetWidth || 160;

    setBubbleMenuPos({
      top: rect.top + window.scrollY - menuHeight - 10,
      left: rect.left + window.scrollX + rect.width / 2 - menuWidth / 2,
    });

    setShowBubbleMenu(true);
  }, [editor]);

  const handleAddComment = useCallback(() => {
    console.log(
      "Add comment triggered for selected text in the editor",
      editor,
    );
    if (editor) {
      addComment({ editor, editorId: EDITOR_ID }); // [Velt] Triggers comment creation flow on selected text in the editor
      console.log("Comment added to the selected text in the editor", editor);
    }
  }, [editor]);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);

      // ✅ keep your word count logic
      const text = newValue
        .map((node: any) =>
          Array.isArray(node.children)
            ? node.children.map((child: any) => child?.text ?? "").join("")
            : "",
        )
        .join(" ");

      const words = text.trim().split(/\s+/).filter(Boolean);
      onWordCountChange?.(words.length);

      // ✅ update bubble menu each change (like reference)
      updateBubbleMenu();
    },
    [onWordCountChange, updateBubbleMenu],
  );

  // Optional: keyboard shortcuts for marks (like reference)
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;

      switch (event.key) {
        case "b":
          event.preventDefault();
          Editor.addMark(editor, "bold", true);
          break;
        case "i":
          event.preventDefault();
          Editor.addMark(editor, "italic", true);
          break;
        case "u":
          event.preventDefault();
          Editor.addMark(editor, "underline", true);
          break;
      }
    },
    [editor],
  );

  return (
    <Card className="shadow-xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Type className="h-5 w-5" />
          Editor
        </CardTitle>
        <Slate
          editor={editor}
          initialValue={initialEditorValue}
          onChange={handleChange}
        >
          <EditorToolbar />

          <CardContent className="pt-4 px-0">
            <div className="relative border rounded-lg p-6 min-h-100 bg-background/50 focus-within:bg-background transition-colors duration-200 overflow-y-auto">
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Start writing your content here..."
                className="outline-none min-h-87.5 max-h-100 overflow-y-auto prose prose-lg max-w-none
                  prose-headings:text-foreground 
                  prose-p:text-foreground 
                  prose-blockquote:text-muted-foreground
                  prose-strong:text-foreground
                  prose-em:text-foreground"
                spellCheck
                onKeyDown={handleKeyDown}
                onMouseUp={updateBubbleMenu}
                onKeyUp={updateBubbleMenu}
              />
            </div>
          </CardContent>
        </Slate>
      </CardHeader>
    </Card>
  );
};
