import { Descendant } from "slate";

export const initialContent: Descendant[] = [
  {
    type: "heading",
    align: "left",
    children: [{ text: "Welcome to the Rich Text Editor", bold: true }],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "This is a " },
      { text: "beautiful", bold: true },
      { text: " and " },
      { text: "powerful", italic: true },
      { text: " rich text editor built with " },
      { text: "Slate.js", bold: true, italic: true },
      {
        text: ". Try selecting some text to see the comment popup, or use the toolbar above for formatting!",
      },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "Key features include: " },
      { text: "Bold", bold: true },
      { text: ", " },
      { text: "Italic", italic: true },
      { text: ", " },
      { text: "Underline", underline: true },
      { text: ", " },
      { text: "Strikethrough", strikethrough: true },
      { text: ", text alignment, headings, and collaborative commenting." },
    ],
  },
];
