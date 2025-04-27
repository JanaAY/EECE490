"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download } from "lucide-react"
import { toast } from "sonner"
import JSZip from "jszip"
import { saveAs } from "file-saver"

const API_BASE_URL = "http://localhost:5000"

export default function ImageGenerator() {
  const [drCount, setDrCount] = useState(5)
  const [noDrCount, setNoDrCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [drFiles, setDrFiles] = useState<string[]>([])
  const [noDrFiles, setNoDrFiles] = useState<string[]>([])

  const generate = async () => {
    setLoading(true)
    setDrFiles([])
    setNoDrFiles([])

    try {
      const res = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dr_count: drCount, no_dr_count: noDrCount })
      })
      const data = await res.json()
      if (res.ok) {
        setDrFiles(data.dr_images || [])
        setNoDrFiles(data.no_dr_images || [])
        toast.success(`✅ ${data.dr_images.length + data.no_dr_images.length} images generated`)
      } else {
        throw new Error(data.error || "Bad response")
      }
    } catch (err) {
      console.error(err)
      toast.error("❌ Generation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadAll = async () => {
    const zip = new JSZip()

    drFiles.forEach((base64, index) => {
      zip.file(`dr_image_${index + 1}.png`, base64ToBlob(base64), { binary: true })
    })
    noDrFiles.forEach((base64, index) => {
      zip.file(`nodr_image_${index + 1}.png`, base64ToBlob(base64), { binary: true })
    })

    const blob = await zip.generateAsync({ type: "blob" })
    saveAs(blob, "generated_images.zip")
  }

  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: "image/png" })
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
            max={1000}
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
            max={1000}
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
      </div>

      {/* Generated Images */}
      {(drFiles.length > 0 || noDrFiles.length > 0) && (
        <div className="space-y-6">
          {/* DR images */}
          {drFiles.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-blue-800">DR Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {drFiles.map((base64, i) => (
                  <Card key={`dr-${i}`} className="overflow-hidden">
                    <CardContent className="p-2">
                      <img
                        src={`data:image/png;base64,${base64}`}
                        alt={`dr-image-${i}`}
                        className="w-full aspect-square object-cover rounded"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* NoDR images */}
          {noDrFiles.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-blue-800">NoDR Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {noDrFiles.map((base64, i) => (
                  <Card key={`nodr-${i}`} className="overflow-hidden">
                    <CardContent className="p-2">
                      <img
                        src={`data:image/png;base64,${base64}`}
                        alt={`nodr-image-${i}`}
                        className="w-full aspect-square object-cover rounded"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Download All Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleDownloadAll} className="bg-blue-700 hover:bg-blue-800 text-white" size="sm">  
              <Download className="h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>
      )}

      {/* About Section */}
      <div className="bg-blue-50 rounded-md p-6 max-w-2xl mx-auto text-center">
        <h3 className="text-sm font-medium text-blue-800 mb-2">About Image Generation</h3>
        <p className="text-xs text-blue-700 mb-4">
          The synthetic fundus images are generated using two separate <strong>StyleGAN3</strong> models:
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
