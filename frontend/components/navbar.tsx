"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Eye } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-blue-700" />
          <span className="text-xl font-bold">DR Research</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                isActive(route.path) ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
              Register
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                  isActive(route.path) ? "text-blue-700" : "text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="w-full bg-blue-700 hover:bg-blue-800">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
