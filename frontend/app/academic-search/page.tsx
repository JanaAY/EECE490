"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, ExternalLink, Loader2, BookOpen } from "lucide-react"

export default function AcademicSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{
    title: string
    authors: string
    journal: string
    year: number
    abstract: string
    url: string
  }> | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call to search engines
    setTimeout(() => {
      setIsSearching(false)

      // Mock search results
      setSearchResults([
        {
          title: "Deep Learning for Automated Detection of Diabetic Retinopathy: A Systematic Review",
          authors: "Johnson M, Chen L, Patel A, et al.",
          journal: "Journal of Medical Imaging",
          year: 2023,
          abstract:
            "This systematic review evaluates the performance of deep learning algorithms for automated detection of diabetic retinopathy. We analyzed 45 studies published between 2015 and 2022, finding that convolutional neural networks achieve high sensitivity and specificity in DR detection across diverse populations.",
          url: "#",
        },
        {
          title: "Vessel Segmentation in Retinal Images for Early Detection of Diabetic Retinopathy",
          authors: "Smith K, Zhang W, Rodriguez J, et al.",
          journal: "IEEE Transactions on Medical Imaging",
          year: 2022,
          abstract:
            "This paper presents a novel approach to retinal vessel segmentation using a U-Net architecture with attention mechanisms. The proposed method achieves state-of-the-art performance on multiple public datasets and demonstrates improved detection of subtle vascular changes associated with early diabetic retinopathy.",
          url: "#",
        },
        {
          title: "Clinical Validation of AI-Based Diabetic Retinopathy Screening in Primary Care Settings",
          authors: "Williams R, Gupta S, Lee H, et al.",
          journal: "JAMA Ophthalmology",
          year: 2023,
          abstract:
            "This prospective study evaluated the real-world performance of an AI-based diabetic retinopathy screening system across 12 primary care clinics. The system demonstrated 92.5% sensitivity and 94.3% specificity compared to expert grading, with significant reduction in referral wait times.",
          url: "#",
        },
        {
          title: "Explainable AI for Diabetic Retinopathy Grading: Enhancing Clinical Trust and Adoption",
          authors: "Garcia N, Thompson B, Kim J, et al.",
          journal: "Nature Digital Medicine",
          year: 2022,
          abstract:
            "This study introduces an explainable AI framework for diabetic retinopathy grading that provides visual explanations for its decisions. A randomized trial with 42 ophthalmologists showed significantly increased trust and adoption when AI systems provided explanations for their classifications.",
          url: "#",
        },
        {
          title: "Longitudinal Analysis of Retinal Vascular Changes in Diabetic Patients Using Deep Learning",
          authors: "Brown T, Nakamura K, Wilson P, et al.",
          journal: "Diabetes Care",
          year: 2023,
          abstract:
            "This 5-year longitudinal study tracked retinal vascular changes in 1,200 diabetic patients using deep learning analysis. Results show that quantifiable vascular alterations precede clinically detectable diabetic retinopathy by an average of 2.3 years, suggesting potential for earlier intervention.",
          url: "#",
        },
      ])
    }, 1500)
  }

  return (
    <main className="container px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">Academic Search</h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Search across multiple academic databases for diabetic retinopathy research
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search for diabetic retinopathy research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="bg-blue-700 hover:bg-blue-800"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="pubmed">PubMed</TabsTrigger>
            <TabsTrigger value="google-scholar">Google Scholar</TabsTrigger>
            <TabsTrigger value="arxiv">arXiv</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isSearching ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-700" />
                  <p className="text-gray-600">Searching across academic databases...</p>
                </div>
              </div>
            ) : searchResults ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Found {searchResults.length} results for "{searchQuery}"
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </div>

                {searchResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-blue-900">{result.title}</h3>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-700" />
                          <span>
                            {result.authors} • {result.journal} • {result.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{result.abstract}</p>
                        <div className="pt-2">
                          <Button variant="link" className="p-0 h-auto text-blue-700">
                            View Full Paper
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50">
                <div className="text-center space-y-2 max-w-md px-4">
                  <Search className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">Search for Diabetic Retinopathy Research</h3>
                  <p className="text-sm text-gray-500">
                    Enter keywords to search across PubMed, Google Scholar, arXiv, and other academic databases
                  </p>
                  <div className="pt-4">
                    <p className="text-xs text-gray-500">Popular searches:</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery("deep learning diabetic retinopathy")}
                      >
                        Deep Learning DR
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSearchQuery("vessel segmentation retina")}>
                        Vessel Segmentation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery("early detection DR biomarkers")}
                      >
                        Early Detection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pubmed" className="space-y-6">
            <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50">
              <div className="text-center space-y-2 max-w-md px-4">
                <Search className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="text-lg font-medium">Search PubMed</h3>
                <p className="text-sm text-gray-500">
                  Search the National Library of Medicine's database of biomedical literature
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="google-scholar" className="space-y-6">
            <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50">
              <div className="text-center space-y-2 max-w-md px-4">
                <Search className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="text-lg font-medium">Search Google Scholar</h3>
                <p className="text-sm text-gray-500">
                  Search across a wide variety of academic papers, theses, books, and preprints
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="arxiv" className="space-y-6">
            <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50">
              <div className="text-center space-y-2 max-w-md px-4">
                <Search className="h-12 w-12 text-gray-300 mx-auto" />
                <h3 className="text-lg font-medium">Search arXiv</h3>
                <p className="text-sm text-gray-500">
                  Search for preprints in physics, mathematics, computer science, and more
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
