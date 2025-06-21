"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { User, Settings, LogOut, Home, Wand2, Menu, Camera, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 group">
            <div className="flex aspect-square size-8 sm:size-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <Wand2 className="size-4 sm:size-5" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-semibold text-lg md:text-xl">FashionAI</h2>
              <p className="text-xs text-muted-foreground">Style Assistant</p>
            </div>
            <div className="sm:hidden">
              <h2 className="font-semibold text-base">FashionAI</h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} size="sm">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant={pathname === "/upload" ? "secondary" : "ghost"} size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
            </Link>
            <Link href="/recommendations">
              <Button variant={pathname === "/recommendations" ? "secondary" : "ghost"} size="sm">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Recommendations
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant={pathname === "/profile" ? "secondary" : "ghost"} size="sm">
                {user?.photoURL ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.photoURL}
                      alt={user.name || "Profile"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </>
                )}
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant={pathname === "/settings" ? "secondary" : "ghost"} size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <div className="relative" ref={menuRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Mobile Dropdown Menu */}
              {mobileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-background border rounded-lg shadow-lg py-2 z-50">
                  <div className="px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer ${pathname === "/dashboard" ? "bg-muted font-semibold" : ""}`}>
                        <Home className="mr-3 h-4 w-4" />
                        Dashboard
                      </div>
                    </Link>
                    <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer ${pathname === "/upload" ? "bg-muted font-semibold" : ""}`}>
                        <Camera className="mr-3 h-4 w-4" />
                        Upload Photo
                      </div>
                    </Link>
                    <Link href="/recommendations" onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer ${pathname === "/recommendations" ? "bg-muted font-semibold" : ""}`}>
                        <ShoppingBag className="mr-3 h-4 w-4" />
                        Recommendations
                      </div>
                    </Link>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer ${pathname === "/profile" ? "bg-muted font-semibold" : ""}`}>
                        <User className="mr-3 h-4 w-4" />
                        Profile
                      </div>
                    </Link>
                    <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer ${pathname === "/settings" ? "bg-muted font-semibold" : ""}`}>
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </div>
                    </Link>
                  </div>
                  
                  <div className="border-t pt-1">
                    <div 
                      className="flex items-center px-3 py-2 text-sm hover:bg-muted cursor-pointer text-red-600 hover:text-red-700"
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
