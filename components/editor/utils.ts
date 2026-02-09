import { Editor, Transforms, Element as SlateElement } from "slate";
import type { CustomElement } from "./types";

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
};

export const toggleBlock = (editor: Editor, format: CustomElement["type"]) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(
    editor,
    { type: isActive ? "paragraph" : format },
    { match: (n) => SlateElement.isElement(n) },
  );
};

export const isBlockActive = (
  editor: Editor,
  format: CustomElement["type"],
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

export const toggleAlign = (editor: Editor, align: CustomElement["align"]) => {
  Transforms.setNodes(
    editor,
    { align: align === "left" ? undefined : align },
    { match: (n) => SlateElement.isElement(n) },
  );
};
