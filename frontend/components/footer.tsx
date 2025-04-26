import Link from "next/link"
import { Eye } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-700" />
              <span className="text-lg font-bold">RETINALAB</span>
            </Link>
            <p className="text-sm text-gray-500">
              Advanced platform for diabetic retinopathy research, detection, and analysis.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-blue-700">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-500 hover:text-blue-700">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tools</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/chatbot" className="text-sm text-gray-500 hover:text-blue-700">
                    AI Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="/vessel-mapping" className="text-sm text-gray-500 hover:text-blue-700">
                    Vessel Mapping
                  </Link>
                </li>
                <li>
                  <Link href="/detection" className="text-sm text-gray-500 hover:text-blue-700">
                    DR Detection
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Subscribe</h3>
            <p className="text-sm text-gray-500">Stay updated with the latest research and tools.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <button type="submit" className="rounded-md bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} DR Research Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
