import React from "react";

interface ToolbarButtonProps {
    active?: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    title: string;
}

export const ToolbarButton = ({
    active,
    onMouseDown,
    children,
    title,
}: ToolbarButtonProps) => (
    <button
        onMouseDown={(e) => {
            e.preventDefault();
            onMouseDown(e);
        }}
        title={title}
        className={`
      relative p-2.5 rounded-lg transition-all duration-200 ease-out
      ${active
                ? "bg-gradient-to-br from-violet-500/20 dark:from-violet-500/30 to-purple-600/20 dark:to-purple-600/30 text-violet-600 dark:text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/10"
            }
      hover:scale-105 active:scale-95
      group
    `}
    >
        {children}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {title}
        </span>
    </button>
);

export const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-600 to-transparent mx-1" />
);
