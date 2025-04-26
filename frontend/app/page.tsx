import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, BarChart2, MessageSquare, Search, FileText, ImageIcon } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageGenerator from "@/components/image-generator"
import StatisticsSection from "@/components/statistics-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900">
                  Advanced Diabetic Retinopathy Research Platform
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Empowering researchers and doctors with cutting-edge tools for diabetic retinopathy analysis,
                  detection, and research.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#image-generator">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    Generate DR Images
                  </Button>
                </Link>
                <Link href="/chatbot">
                  <Button size="lg" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                    Ask Our AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/blog_what-is-ophthalmology_1.jpg?height=400&width=500"
                alt="Diabetic Retinopathy Visualization"
                width={500}
                height={400}
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Vertical Navigation Menu */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Tools</CardTitle>
              <CardDescription>Access our specialized DR research tools</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Link href="/chatbot" className="flex items-center gap-2 p-3 hover:bg-gray-100 border-b">
                  <MessageSquare className="h-5 w-5 text-blue-700" />
                  <span>AI Chatbot Assistant</span>
                </Link>
                <Link href="/vessel-mapping" className="flex items-center gap-2 p-3 hover:bg-gray-100 border-b">
                  <ImageIcon className="h-5 w-5 text-blue-700" />
                  <span>Vessel Mapping</span>
                </Link>
                <Link href="/detection" className="flex items-center gap-2 p-3 hover:bg-gray-100 border-b">
                  <Eye className="h-5 w-5 text-blue-700" />
                  <span>DR Detection</span>
                </Link>
                <Link href="/academic-search" className="flex items-center gap-2 p-3 hover:bg-gray-100">
                  <Search className="h-5 w-5 text-blue-700" />
                  <span>Academic Search</span>
                </Link>
              </nav>
            </CardContent>
          </Card>

          <StatisticsSection />
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          <Card id="image-generator">
            <CardHeader>
              <CardTitle>DR Image Generator</CardTitle>
              <CardDescription>Generate diabetic retinopathy and non-DR images for research purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageGenerator />
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  )
}
