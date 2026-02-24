"use client";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles } from "lucide-react";
import useTheme from "@/components/use-theme";

const Navbar = dynamic(() => import("@/components/navbar").then(mod => mod.Navbar), { ssr: false });
const RichTextEditor = dynamic(() => import("@/components/editor").then(mod => mod.RichTextEditor), { ssr: false });
const VeltComments = dynamic(() => import("@veltdev/react").then(mod => mod.VeltComments), { ssr: false });

export default function Home() {
  const { theme } = useTheme()
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-emerald-50/30 to-teal-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-4">
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Velt Collaboration Demo
            </span>
          </div>


          <h1 className="text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Collaborative Rich Text Editor
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A real-time editing experience built with Slate.js and powered by Velt’s
            collaboration infrastructure.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <span className="px-3 py-1 rounded-md text-sm bg-emerald-600/10 text-emerald-600 border border-emerald-600/20 dark:text-emerald-400 dark:border-emerald-400/20">
              Real-time Sync
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-teal-600/10 text-teal-600 border border-teal-600/20 dark:text-teal-400 dark:border-teal-400/20">
              Cursor Presence
            </span>
            <span className="px-3 py-1 rounded-md text-sm bg-lime-600/10 text-lime-600 border border-lime-600/20 dark:text-lime-400 dark:border-lime-400/20">
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
