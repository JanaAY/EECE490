"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download } from "lucide-react"
import { toast } from "sonner"

// LOCAL connection (not ngrok)
const API_BASE_URL = "http://localhost:5000"

export default function ImageGenerator() {
  const [drCount, setDrCount] = useState(5)
  const [noDrCount, setNoDrCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<string[] | null>(null)

  const generate = async () => {
    setLoading(true)
    setFiles(null)
  
    try {
      const res = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dr_count: drCount, no_dr_count: noDrCount }) // <--- BOTH
      })
      const data = await res.json()
      if (res.ok) {
        const drFiles = data.dr_images || []
        const noDrFiles = data.no_dr_images || []
        setFiles([...drFiles, ...noDrFiles])
        toast.success(`✅ ${drFiles.length + noDrFiles.length} images generated`)
      } else {
        throw new Error(data.error || "Bad response")
      }
    } catch (err) {
      console.error(err)
      toast.error("❌ Generation failed")
      setFiles([])
    } finally {
      setLoading(false)
    }
  }
  

  const handleDownloadAll = () => {
    if (!files || files.length === 0) return
    files.forEach((base64, index) => {
      const link = document.createElement('a')
      link.href = `data:image/png;base64,${base64}`
      link.download = `generated_image_${index}.png`
      link.click()
    })
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="drCount"># DR Images</Label>
          <Input
            id="drCount"
            type="number"
            min={0}
            max={20}
            value={drCount}
            onChange={e => setDrCount(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="noDrCount"># NoDR Images</Label>
          <Input
            id="noDrCount"
            type="number"
            min={0}
            max={20}
            value={noDrCount}
            onChange={e => setNoDrCount(Number(e.target.value))}
            className="w-24"
          />
        </div>

        <Button onClick={generate} disabled={loading} className="bg-blue-700 hover:bg-blue-800">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>

        {files && files.length > 0 && (
          <Button variant="outline" onClick={handleDownloadAll} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        )}
      </div>

      {/* Generated Images */}
      {files === null ? null : files.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((base64, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-2">
                <img
                  src={`data:image/png;base64,${base64}`}
                  alt={`generated-${i}`}
                  className="w-full aspect-square object-cover rounded"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm">
          No images yet
        </div>
      )}

      {/* About Section */}
      <div className="bg-blue-50 rounded-md p-6 max-w-2xl mx-auto text-center">
        <h3 className="text-sm font-medium text-blue-800 mb-2">About Image Generation</h3>
        <p className="text-xs text-blue-700 mb-4">
          The synthetic fundus images are generated using two separate StyleGAN3 models:
          one specialized for Diabetic Retinopathy (DR) and one for No Diabetic Retinopathy (NoDR).
          These models enable high-quality and diverse generation of retinal images, helping balance datasets for research.
        </p>
        <div className="mt-4 text-xs text-blue-700 text-left space-y-1">
          <p><strong>Model Performance (FID Scores):</strong></p>
          <p>• <strong>DR Images:</strong> 18.97</p>
          <p>• <strong>NoDR Images:</strong> 23.29</p>
        </div>
      </div>

    </div>
  )
}
