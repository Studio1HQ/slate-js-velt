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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Rich Text Editor Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Powered by Slate.js, Radix UI, and Tailwind CSS
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Production Ready
            </Badge>
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
