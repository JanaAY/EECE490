"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, ExternalLink, Loader2, BookOpen } from "lucide-react"
import { toast } from "sonner"

const SUGGESTIONS = [
  "diabetic retinopathy",
  "retinal vessel segmentation",
  "early detection of DR",
  "fundus imaging AI",
  "eye disease biomarkers",
  "DR grading",
]

export default function AcademicSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sourceTab, setSourceTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{
    title: string
    authors: string
    journal: string
    year: string
    abstract: string
    url: string
  }> | null>(null)

  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      handleTabSwitchSearch()
    }
  }, [sourceTab])
  

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length < 3) {
      toast.error("Please enter at least 3 characters.")
      return
    }
    await fetchResults()
  }

  const handleTabSwitchSearch = async () => {
    if (searchQuery.trim().length < 3) return
    await fetchResults()
  }

  const fetchResults = async () => {
    setIsSearching(true)
    setSearchResults(null)

    try {
      let results = []

      if (sourceTab === "all" || sourceTab === "google-scholar") {
        const res = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(searchQuery)}&limit=5&fields=title,authors,year,venue,abstract,url`)
        const data = await res.json()

        results = data.data.map((paper: any) => ({
          title: paper.title,
          authors: paper.authors.map((a: any) => a.name).join(", "),
          journal: paper.venue || "Unknown",
          year: paper.year?.toString() || "N/A",
          abstract: paper.abstract || "No abstract available.",
          url: paper.url || "#",
        }))
      } else if (sourceTab === "pubmed") {
        const res = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchQuery)}&retmode=json&retmax=5`)
        const ids = (await res.json()).esearchresult.idlist

        const summaryRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`)
        const summaryData = await summaryRes.json()

        results = Object.values(summaryData.result)
          .filter((item: any) => item.uid)
          .map((item: any) => ({
            title: item.title,
            authors: (item.authors || []).map((a: any) => a.name).join(", "),
            journal: item.source || "PubMed",
            year: item.pubdate?.split(" ")[0] || "N/A",
            abstract: "Abstract not available.",
            url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid}/`
          }))
      } else if (sourceTab === "arxiv") {
        const res = await fetch(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(searchQuery)}&start=0&max_results=5`)
        const text = await res.text()

        const parser = new DOMParser()
        const xml = parser.parseFromString(text, "application/xml")
        const entries = xml.querySelectorAll("entry")

        results = Array.from(entries).map((entry: any) => ({
          title: entry.querySelector("title")?.textContent || "No title",
          authors: Array.from(entry.querySelectorAll("author > name")).map((n: any) => n.textContent).join(", "),
          journal: "arXiv",
          year: entry.querySelector("published")?.textContent.slice(0, 4) || "N/A",
          abstract: entry.querySelector("summary")?.textContent || "No abstract",
          url: entry.querySelector("id")?.textContent || "#",
        }))
      }

      setSearchResults(results)
    } catch (err) {
      console.error(err)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const exportToCSV = () => {
    if (!searchResults || searchResults.length === 0) return

    const csvContent = [
      ["Title", "Authors", "Journal", "Year", "Abstract", "URL"],
      ...searchResults.map(r => [
        `"${r.title}"`,
        `"${r.authors}"`,
        `"${r.journal}"`,
        r.year,
        `"${r.abstract}"`,
        `"${r.url}"`
      ])
    ].map(e => e.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "search_results.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const loadingLabel = {
    "all": "Searching...",
    "pubmed": "Searching PubMed...",
    "google-scholar": "Searching Google Scholar...",
    "arxiv": "Searching arXiv...",
  }[sourceTab] || "Searching..."

  return (
    <main className="container px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">Academic Search</h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Search across PubMed, Google Scholar, and arXiv for diabetic retinopathy research
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search diabetic retinopathy papers..."
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
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSourceTab(value)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pubmed">PubMed</TabsTrigger>
            <TabsTrigger value="google-scholar">Google Scholar</TabsTrigger>
            <TabsTrigger value="arxiv">arXiv</TabsTrigger>
          </TabsList>

          <TabsContent value={sourceTab} className="space-y-6">
            {isSearching ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-700" />
                  <p className="text-gray-600">{loadingLabel}</p>
                </div>
              </div>
            ) : searchResults ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Found {searchResults.length} results for "{searchQuery}"
                  </p>
                  <Button variant="outline" size="sm" onClick={exportToCSV}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {searchResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-blue-900">{result.title}</h3>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={result.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-700" />
                          {result.authors} • {result.journal} • {result.year}
                        </div>
                        <p className="text-sm text-gray-700">{result.abstract}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50">
                <div className="text-center space-y-2 max-w-md px-4">
                  <Search className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">Start Searching</h3>
                  <p className="text-sm text-gray-500">
                    Enter keywords to find diabetic retinopathy papers from PubMed, Scholar, and arXiv.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
