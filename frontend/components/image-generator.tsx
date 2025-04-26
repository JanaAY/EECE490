"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download } from "lucide-react"
import { toast } from "sonner"

const API_BASE_URL = "https://5bc9-34-169-51-41.ngrok-free.app"

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
        body: JSON.stringify({ num_dr: drCount, num_no_dr: noDrCount })
      })
      const data = await res.json()
      if (res.ok && Array.isArray(data.files)) {
        setFiles(data.files)
        toast.success(`✅ ${data.files.length} images generated`)
      } else {
        throw new Error(data.error || "Bad response")
      }
    } catch (err) {
      console.error(err)
      toast.error("❌ Generation failed — showing placeholders")
      setFiles([])
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadAll = () => {
    if (!files || files.length === 0) return
    files.forEach(f => {
      const link = document.createElement('a')
      link.href = `${API_BASE_URL}/content/generated_images/${f}`
      link.download = f
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
          {files.map((f, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-2">
                <img
                  src={`${API_BASE_URL}/content/generated_images/${f}`}
                  alt={`retina-${i}`}
                  className="w-full aspect-square object-cover rounded"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* You can add placeholders if you want here */}
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
