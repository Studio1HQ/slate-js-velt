<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/slate-js-velt.webp" alt="Slate.js Editor with Velt Comments: A Slate.js rich text editor with inline comments, presence and notifications" width="100%" />

<br />
<br />

# Slate.js Editor with Velt Comments

### A Slate.js rich text editor with inline comments, presence and notifications

TextCraft is a Next.js rich text editor built on Slate.js. Velt adds inline comments on selected text, a comments sidebar, presence and notifications.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with Velt](https://img.shields.io/badge/Built_with_Velt-141414?style=for-the-badge)](https://velt.dev)
[![Live demo](https://img.shields.io/badge/Live_demo-1c1917?style=for-the-badge&logo=vercel&logoColor=white)](https://slatejs-doc-velt.vercel.app/)

[Velt docs](https://docs.velt.dev) &nbsp;·&nbsp; [Velt](https://velt.dev) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

TextCraft is a minimal rich text editor built with Slate.js, Next.js and [Velt](https://velt.dev). Select text, add a comment from the floating bubble menu, and discuss it with other users in real time.

It shows how to add Velt comments to a Slate.js editor with the `@veltdev/slate-velt-comments` package, plus presence, a comments sidebar and notifications in the navbar.

## Features

- **Inline comments on selected text**: The editor is wrapped with `withVeltComments`, and a bubble menu button starts a comment thread on the selection.
- **Comments sidebar**: `VeltCommentsSidebar` and `VeltSidebarButton` list and manage all comments.
- **Presence**: `VeltPresence` shows who is viewing the document.
- **Notifications**: `VeltNotificationsTool` shows updates on comments and replies.
- **Rich text editing**: Headings (H1 to H3), bulleted and numbered lists, block quotes, bold, italic, underline, strikethrough and text alignment, with undo and redo via `slate-history`.
- **Keyboard shortcuts**: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z and Ctrl+Shift+Z.
- **Two demo users**: Switch between Nany (`user001`) and Mary (`user002`) from the top bar.
- **Theme and layout**: Dark and light mode, responsive layout and a slide-out mobile menu.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router), [React](https://react.dev) 19, TypeScript |
| Editor | [Slate.js](https://www.slatejs.org) |
| Collaboration | [Velt](https://velt.dev) (`@veltdev/react`, `@veltdev/slate-velt-comments`) |
| UI | [Tailwind CSS](https://tailwindcss.com) 4, [shadcn/ui](https://ui.shadcn.com), [Radix UI](https://www.radix-ui.com), [Lucide](https://lucide.dev) |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| Deployment | [Vercel](https://vercel.com) |

## Getting started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- A Velt API key from the [Velt console](https://console.velt.dev)

### Installation

```bash
git clone https://github.com/Studio1HQ/slate-js-velt.git
cd slate-js-velt
npm install
```

### Environment variables

Create a `.env` file in the project root.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_VELT_ID` | Your Velt API key. |

```bash
echo "NEXT_PUBLIC_VELT_ID=your_velt_api_key_here" > .env
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## How it works

```text
app/(app)/layout.tsx          VeltProvider and ThemeProvider
app/(app)/page.tsx            main page with the editor
components/editor/            RichTextEditor, BubbleMenu, Toolbar, Element, Leaf, utils
components/navbar.tsx         Velt presence, notifications, sidebar and user switcher
helper/userdb.ts              hardcoded users and Zustand store
```

- `RichTextEditor.tsx` builds the editor with `withVeltComments(withReact(withHistory(editor)))`.
- `navbar.tsx` calls `client.identify(...)` for the selected user and sets the Velt document `slate-js-velt` (organization ID `organization_id`).
- To try it: switch users from the top bar, select text and use the bubble menu to comment, open the sidebar to see all comments, and watch the other user's avatar in the navbar.

## Resources

- [Live demo](https://slatejs-doc-velt.vercel.app/): the deployed app.
- [Velt documentation](https://docs.velt.dev): SDK guides.
- [Velt text editor setup](https://docs.velt.dev/text-editor-setup/overview): editor integration guides.
- [Velt](https://velt.dev): product site.
- [Slate.js documentation](https://docs.slatejs.org): editor framework.
- [shadcn/ui documentation](https://ui.shadcn.com/docs): UI components.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [Velt](https://velt.dev).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
