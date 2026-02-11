"use client";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles } from "lucide-react";
import { RichTextEditor } from "@/components/editor";
import { VeltComments } from "@veltdev/react";
import useTheme from "@/components/use-theme";

export default function Home() {
  const { theme } = useTheme()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 mb-4">
            <span className="text-sm font-medium text-indigo-600">
              Velt Collaboration Demo
            </span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Collaborative Rich Text Editor
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A real-time editing experience built with Slate.js and powered by Velt’s
            collaboration infrastructure.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <span className="px-3 py-1 rounded-md text-sm bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">
              Real-time Sync
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-blue-600/10 text-blue-600 border border-blue-600/20">
              Cursor Presence
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-sky-600/10 text-sky-600 border border-sky-600/20">
              Slate.js
            </span>
          </div>
        </div>


        {/* Editor */}
        <RichTextEditor />
        <VeltComments textMode={false} darkMode={theme === "dark"} />

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Built with ❤️ using Next.js 13, Slate.js, Radix UI, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
