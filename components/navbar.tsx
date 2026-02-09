"use client"

import {
  useVeltClient,
  VeltCommentsSidebar,
  VeltNotificationsTool,
  VeltPresence,
  VeltSidebarButton,
} from "@veltdev/react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Sun,
  Moon,
  FileText,
  Home,
  User,
  Settings,
  HelpCircle,
  Mail,
  Sparkles,
} from "lucide-react"
import { names, userIds, useUserStore } from "@/helper/userdb"
import useTheme, { ThemeToggleButton } from "./use-theme"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, } = useTheme()
  const { user, setUser } = useUserStore()
  const { client } = useVeltClient()
  const prevUserRef = useRef(user)
  const isInitializingRef = useRef(false)

  const predefinedUsers = useMemo(
    () =>
      userIds.map((uid, index) => {
        const avatarUrls = [
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany",
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary",
        ]
        return {
          uid: uid,
          displayName: names[index],
          email: `${names[index].toLowerCase()}@gmail.com`,
          photoUrl: avatarUrls[index],
        }
      }),
    []
  )

  // Initialize user from localStorage if none exists
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const storedUser = localStorage.getItem("user-storage")
      if (!storedUser) {
        setUser(predefinedUsers[0])
      }
    }
  }, [user, setUser, predefinedUsers])

  // Handle Velt client initialization
  useEffect(() => {
    if (!client || !user || isInitializingRef.current) {
      return
    }

    const initializeVelt = async () => {
      isInitializingRef.current = true
      try {
        const isUserSwitch = prevUserRef.current?.uid !== user.uid
        prevUserRef.current = user

        console.log("Starting Velt init for user:", user.uid, { isUserSwitch })

        const veltUser = {
          userId: user.uid,
          organizationId: "organization_id",
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        }
        await client.identify(veltUser)
        console.log("Velt user identified:", veltUser.userId)

        await client.setDocuments([
          {
            id: "slate-js-velt",
            metadata: { documentName: "slate-js-velt" },
          },
        ])
        console.log("Velt documents set: slate-js-velt")
      } catch (error) {
        console.error("Error initializing Velt:", error)
      } finally {
        isInitializingRef.current = false
      }
    }

    initializeVelt()
  }, [client, user])

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Editor", icon: FileText, href: "/editor" },
    { name: "Profile", icon: User, href: "/profile" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TextCraft
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase hidden sm:block">
                  Rich Text Editor
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-muted/50 rounded-full p-1">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="sm"
                    className="relative px-4 py-2 text-sm font-medium rounded-full hover:bg-background hover:shadow-sm transition-all duration-200"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Velt Presence - Shows active users */}
              <div className="hidden sm:flex items-center">
                <VeltPresence />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-border/60" />

              {/* Velt Tools */}
              <div className="flex items-center gap-1">
                <VeltNotificationsTool darkMode={theme === "dark"} />
                <VeltSidebarButton darkMode={theme === "dark"} />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-border/60" />

              {/* Theme Toggle */}
              <ThemeToggleButton />
              {/* Help Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex h-9 w-9 p-0 rounded-full hover:bg-muted transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Help</span>
              </Button>

              {/* Contact Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex h-9 w-9 p-0 rounded-full hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Contact</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-full lg:hidden hover:bg-muted transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center gap-3 p-6 border-b bg-muted/30">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          TextCraft
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Rich Text Editor
                        </span>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 overflow-y-auto py-4">
                      <div className="px-3 space-y-1">
                        {navItems.map((item) => (
                          <Button
                            key={item.name}
                            variant="ghost"
                            className="w-full justify-start px-4 py-3 h-auto text-base font-medium rounded-xl hover:bg-muted transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                            {item.name}
                          </Button>
                        ))}
                      </div>

                      <div className="mx-6 my-4 border-t" />

                      <div className="px-3 space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 py-3 h-auto text-base font-medium rounded-xl hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <HelpCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                          Help Center
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 py-3 h-auto text-base font-medium rounded-xl hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                          Contact Us
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-4 border-t bg-muted/30">
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="h-3 w-3" />
                        <span>Powered by Slate.js & Velt</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Velt Comments Sidebar - placed outside nav for proper z-index */}
      <VeltCommentsSidebar darkMode={theme === "dark"} />
    </>
  )
}