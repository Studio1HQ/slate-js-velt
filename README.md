# TextCraft - Collaborative Rich Text Editor

A beautiful, minimal collaborative rich text editor built with Slate.js, Velt, Next.js, and modern web technologies. Features real-time presence, inline commenting, and CRDT-powered collaboration.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)
![Slate.js](https://img.shields.io/badge/Slate.js-0.103-purple)
![Velt](https://img.shields.io/badge/Velt-4.7.8-green)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Rich Text Editor

- **Slate.js Powered** - Production-grade rich text editing framework
- **BubbleMenu** - Floating toolbar appears on text selection for quick formatting
- **Full Toolbar** - Comprehensive formatting bar with all editing options
- **Keyboard Shortcuts** - Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline), Ctrl+Z / Ctrl+Shift+Z (Undo/Redo)

### Real-Time Collaboration (Velt)

- **Presence** - See who's currently viewing the document in real time
- **Inline Comments** - Select text and add comments directly in the editor
- **Popover Comments** - Contextual comment threads on selected text
- **Comments Sidebar** - View and manage all comments in one place
- **Notifications** - Real-time notifications for new comments and replies
- **CRDT Support** - Conflict-free Replicated Data Types for seamless multi-user editing

### CRDT (Conflict-free Replicated Data Types)

The application uses **CRDT** through Velt for real-time collaborative editing. This ensures:

- **Conflict-free merging** - Multiple users can edit simultaneously without conflicts
- **Eventual consistency** - All users converge to the same document state
- **Offline resilience** - Changes sync automatically when reconnected
- **No data loss** - Every edit from every user is preserved

### UI / UX

- **Dark / Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Glassmorphism** - Modern frosted-glass aesthetic with backdrop blur
- **Gradient Accents** - Violet-to-purple gradient for interactive elements
- **Mobile Navigation** - Slide-out sheet menu for small screens

### Modern Tech Stack

- **React 19** - Latest React with hooks and concurrent features
- **Next.js 16** - App Router, server components, and edge runtime
- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS v4** - Modern utility-first styling with CSS variables
- **Slate.js** - Highly customizable rich text editor framework
- **Velt SDK** - Real-time collaboration (presence, comments, CRDT)
- **@veltdev/slate-velt-comments** - Slate.js-specific Velt comment integration
- **Zustand** - Lightweight, performant state management
- **shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Clean, minimal icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Velt API Key (sign up at [velt.dev](https://velt.dev))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd slate-js-velt
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env file
echo "NEXT_PUBLIC_VELT_ID=your_velt_api_key_here" > .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/
│   ├── (app)/                    # App route group
│   │   ├── layout.tsx            # VeltProvider + ThemeProvider wrapper
│   │   └── page.tsx              # Main page with editor
│   ├── hover/                    # Hover interaction routes
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout (HTML, fonts)
│   └── favicon.ico               # App favicon
├── components/
│   ├── editor/                   # Slate.js rich text editor
│   │   ├── RichTextEditor.tsx    # Main editor with Velt comment integration
│   │   ├── BubbleMenu.tsx        # Floating selection toolbar + comment button
│   │   ├── Element.tsx           # Custom Slate element renderer (headings, lists, quotes)
│   │   ├── Leaf.tsx              # Custom Slate leaf renderer (bold, italic, etc.)
│   │   ├── Toolbar.tsx           # Main formatting toolbar
│   │   ├── ToolbarButton.tsx     # Reusable toolbar button component
│   │   ├── EditorFooter.tsx      # Editor footer info bar
│   │   ├── constants.ts          # Initial editor content / sample data
│   │   ├── types.ts              # TypeScript types (CustomEditor, CustomElement, CustomText)
│   │   ├── utils.ts              # Editor utilities (toggleMark, toggleBlock, etc.)
│   │   └── index.ts              # Barrel export
│   ├── ui/                       # shadcn/ui components
│   │   ├── badge.tsx             # Badge component
│   │   ├── button.tsx            # Button with variants
│   │   ├── card.tsx              # Card layout component
│   │   ├── separator.tsx         # Visual separator
│   │   └── sheet.tsx             # Slide-out sheet / drawer
│   ├── navbar.tsx                # Navigation bar (Velt Presence, Notifications, Sidebar)
│   └── use-theme.tsx             # Theme hook + ThemeProvider + toggle button
├── helper/
│   └── userdb.ts                 # Hardcoded users (Nany, Mary) + Zustand store
├── lib/
│   └── utils.ts                  # Utility functions (cn helper for Tailwind)
├── public/                       # Static assets (SVGs)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS + Tailwind plugin
└── eslint.config.mjs             # ESLint configuration
```

## Key Features Explained

### Rich Text Editor (Slate.js)

- Powered by **Slate.js** - a completely customizable framework for building rich text editors
- Custom element types: paragraphs, headings (H1–H3), bulleted lists, numbered lists, list items, block quotes
- Custom leaf rendering: bold, italic, underline, strikethrough
- Text alignment support: left, center, right, justify
- Full undo/redo via `slate-history`
- Extensible architecture using Slate plugins (`withReact`, `withHistory`, `withVeltComments`)

### BubbleMenu (Floating Toolbar)

- Appears automatically when text is selected
- Quick-access formatting: Bold, Italic, Underline
- **Add Comment** button with gradient accent — select text and instantly start a comment thread
- Portal-rendered for proper z-index layering
- Smooth fade-in/out transitions
  **CRDT**

## 🔗 Velt Integration

This project demonstrates **Velt's TipTap integration** for adding collaborative comments to rich text documents.

### Velt Components Used

| Component               | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `VeltProvider`          | Main provider wrapping the app for Velt SDK initialization |
| `VeltPresence`          | Displays active users viewing the document                 |
| `VeltNotificationsTool` | Shows notification bell with comment updates               |
| `VeltSidebarButton`     | Toggle button for comments sidebar                         |
| `VeltCommentsSidebar`   | Sidebar panel showing all comments                         |

### TipTap Velt Plugin

The editor uses `@veltdev/tiptap-velt-comments` for inline comments:

```tsx
import {
  TiptapVeltComments,
  renderComments,
  addComment,
} from "@veltdev/tiptap-velt-comments";
import { useCommentAnnotations } from "@veltdev/react";

// In editor extensions
TiptapVeltComments.configure({ persistVeltMarks: false });

// Render existing comments
renderComments({ editor, editorId, commentAnnotations });

// Add new comment on selected text
addComment({ editor, editorId });
```

### Configuration

| Setting          | Value                              |
| ---------------- | ---------------------------------- |
| Document ID      | `slate-js-velt`                    |
| Organization ID  | `organization_id`                  |
| Predefined Users | Nany (`user001`), Mary (`user002`) |

---

## 🎯 How to Use

1. **Switch Users** — Click the user dropdown in the top bar to switch between Nany and Mary
2. **Add Comments** — Select text in the document, then click the comment button in the bubble menu
3. **View Comments** — Click the sidebar button to see all comments
4. **Toggle Theme** — Use the theme toggle button to switch between light and dark modes
5. **View Presence** — See other active users' avatars in the top bar

## 📚 Documentation & Resources

### Velt

- [Velt Documentation](https://docs.velt.dev)
- [TipTap Integration Guide](https://docs.velt.dev/text-editor-setup/overview)
- [Velt API Reference](https://docs.velt.dev/api-reference/sdk/react)
- [Velt Dashboard](https://app.velt.dev)

### UI Components

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
