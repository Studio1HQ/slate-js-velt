"use client"

import React from "react"
import { useSlate } from "slate-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Save,
    Download,
    LucideIcon,
} from "lucide-react"
import { toggleMark, isMarkActive, toggleBlock, isBlockActive, toggleAlign } from "./utils"
import type { CustomElement } from "./types"

interface ToolbarButtonProps {
    active: boolean
    onMouseDown: (event: React.MouseEvent) => void
    icon: LucideIcon
    tooltip: string
}

const ToolbarButton = ({ active, onMouseDown, icon: Icon, tooltip }: ToolbarButtonProps) => (
    <Button
        variant={active ? "default" : "ghost"}
        size="sm"
        onMouseDown={onMouseDown}
        className={`h-9 w-9 p-0 transition-all duration-200 ${active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-muted hover:scale-105"
            }`}
        title={tooltip}
    >
        <Icon className="h-4 w-4" />
    </Button>
)

interface MarkButtonProps {
    format: string
    icon: LucideIcon
    tooltip: string
}

const MarkButton = ({ format, icon, tooltip }: MarkButtonProps) => {
    const editor = useSlate()
    return (
        <ToolbarButton
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            icon={icon}
            tooltip={tooltip}
        />
    )
}

interface BlockButtonProps {
    format: CustomElement["type"]
    icon: LucideIcon
    tooltip: string
}

const BlockButton = ({ format, icon, tooltip }: BlockButtonProps) => {
    const editor = useSlate()
    return (
        <ToolbarButton
            active={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
            icon={icon}
            tooltip={tooltip}
        />
    )
}

interface AlignButtonProps {
    align: CustomElement["align"]
    icon: LucideIcon
    tooltip: string
}

const AlignButton = ({ align, icon, tooltip }: AlignButtonProps) => {
    const editor = useSlate()
    return (
        <ToolbarButton
            active={false}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleAlign(editor, align)
            }}
            icon={icon}
            tooltip={tooltip}
        />
    )
}


export const EditorToolbar = () => {
    return (
        <div className="flex flex-wrap items-center gap-1 p-3 bg-muted/30 rounded-lg border">
            {/* Text formatting */}
            <div className="flex items-center gap-1 mr-3">
                <MarkButton format="bold" icon={Bold} tooltip="Bold" />
                <MarkButton format="italic" icon={Italic} tooltip="Italic" />
                <MarkButton format="underline" icon={Underline} tooltip="Underline" />
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Alignment */}
            <div className="flex items-center gap-1 mr-3">
                <AlignButton align="left" icon={AlignLeft} tooltip="Align Left" />
                <AlignButton align="center" icon={AlignCenter} tooltip="Align Center" />
                <AlignButton align="right" icon={AlignRight} tooltip="Align Right" />
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Block types */}
            <div className="flex items-center gap-1 mr-3">
                <BlockButton format="list-item" icon={List} tooltip="Bullet List" />
                <BlockButton format="numbered-list-item" icon={ListOrdered} tooltip="Numbered List" />
                <BlockButton format="quote" icon={Quote} tooltip="Quote" />
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Actions */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 hover:bg-muted hover:scale-105 transition-all duration-200"
                >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 hover:bg-muted hover:scale-105 transition-all duration-200"
                >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                </Button>
            </div>
        </div>
    )
}
