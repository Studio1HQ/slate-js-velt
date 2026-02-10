import { Editor, Transforms, Element as SlateElement } from "slate";
import type { CustomEditor, CustomElement } from "./types";

// Mark utilities
export const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Block utilities
export const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType = "type",
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as Record<string, unknown>)[blockType] === format,
    }),
  );

  return !!match;
};

export const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === "bulleted-list" || format === "numbered-list";

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ["bulleted-list", "numbered-list"].includes((n as CustomElement).type),
    split: true,
  });

  const newProperties: Partial<CustomElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// Alignment utilities
export const isAlignmentActive = (editor: CustomEditor, alignment: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as CustomElement).align === alignment,
    }),
  );

  return !!match;
};

export const toggleAlignment = (
  editor: CustomEditor,
  alignment: "left" | "center" | "right" | "justify",
) => {
  Transforms.setNodes(
    editor,
    { align: alignment },
    { match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n) },
  );
};
