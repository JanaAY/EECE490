"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

// TODO: Replace this with your current ngrok URL from Colab
const API_BASE_URL = "https://b9b7-34-138-12-188.ngrok-free.app"

export default function ImageGenerator() {
  const [imageCount, setImageCount] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setImageCount(value)
    }
  }

  const handleGenerate = async () => {
    console.log("Button clicked, starting generation...")
    setIsGenerating(true)
    setGeneratedImages([]) // Clear previous images
    
    const apiUrl = `${API_BASE_URL}/generate`
    console.log("Making request to:", apiUrl)
    console.log("Request payload:", { dr_count: 0, non_dr_count: imageCount })

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          dr_count: 0,
          non_dr_count: imageCount
        })
      })

      console.log("Response status:", response.status)

      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate images")
      }

      if (data.non_dr_images && data.non_dr_images.length > 0) {
        setGeneratedImages(data.non_dr_images)
        toast.success(`Generated ${data.non_dr_images.length} images successfully`)
      } else {
        throw new Error("No images were generated")
      }
    } catch (error) {
      console.error("Generation error:", error)
      let errorMessage = "Failed to generate images. Please try again."
      
      if (error instanceof Error) {
        if (error.message.includes("network-snapshot-000720.pkl") || error.message.includes("dr_model.pkl")) {
          errorMessage = "Model file not found. Please ensure the model file is properly loaded in Colab."
        } else if (error.message.includes("generated_images")) {
          errorMessage = "Output directory issue. Please check Colab notebook permissions."
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-count">Number of Images to Generate</Label>
            <Input
              id="image-count"
              type="number"
              min={0}
              max={100}
              value={imageCount}
              onChange={handleCountChange}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || imageCount === 0}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Images...
              </>
            ) : (
              "Generate Images"
            )}
          </Button>

          <div className="text-sm text-gray-500 mt-2">
            API Status: {API_BASE_URL ? "URL Configured" : "No API URL Set"}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Generation Summary</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Images to Generate:</span>
              <span className="font-medium">{imageCount}</span>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Model Information</h4>
            <p className="text-xs text-gray-600">
              Using DR model to generate high-quality retinal images.
            </p>
          </div>
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Generated Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {generatedImages.map((src, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="relative aspect-square">
                    <img
                      src={`data:image/png;base64,${src}`}
                      alt={`Generated image ${index + 1}`}
                      className="object-cover rounded-sm"
                      onError={(e) => {
                        console.error("Image failed to load:", src)
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
