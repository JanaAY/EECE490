"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Loader2 } from "lucide-react" // Importing Download icon

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function VesselMapPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [vesselMap, setVesselMap] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      setUploadedFileName(file.name.split(".")[0]) // Save file name without extension

      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/vessel-map`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate vessel map')
      }

      const data = await response.json()
      setVesselMap(`data:image/png;base64,${data.vessel_map}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setVesselMap(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setVesselMap(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="container px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">
            Retinal Vessel Mapping
          </h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Upload retinal images for automated vessel segmentation and mapping.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Retinal Image</CardTitle>
              <CardDescription>Upload a retinal image for vessel mapping</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
                {uploadedImage ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Original Image */}
                      <div>
                        <h3 className="text-lg font-medium mb-2">Original Image</h3>
                        <div className="rounded-lg overflow-hidden border">
                          <img
                            src={uploadedImage}
                            alt="Uploaded retinal image"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>

                      {/* Vessel Map */}
                      {vesselMap && (
                        <div>
                          <h3 className="text-lg font-medium mb-2">Vessel Map</h3>
                          <div className="rounded-lg overflow-hidden border">
                            <img
                              src={vesselMap}
                              alt="Generated vessel map"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="mt-4 flex justify-center">
                            <a
                              href={vesselMap}
                              download={`${uploadedFileName || "image"}_vessel_map.png`}
                            >
                              <Button variant="outline" className="bg-blue-700 hover:bg-blue-800 text-white">
                                Download Vessel Map
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Centered Remove Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={resetAnalysis} size="sm" className="mt-4">
                        Remove
                      </Button>
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="text-red-500 text-sm text-center mt-2">
                        {error}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">
                      <Upload className="h-10 w-10 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Upload Retinal Image</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Click the button below to select an image
                      </p>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/tiff,image/jpg"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      <Button 
                        onClick={handleButtonClick}
                        disabled={isUploading}
                        className="bg-blue-700 hover:bg-blue-800"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Select Image"
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPEG, PNG, TIFF, JPG (max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">About Vessel Mapping</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      The purpose of vessel mapping is to extract detailed vascular structures,
                      which help in distinguishing between Diabetic Retinopathy (DR) and non-DR cases.
                      Features like vessel elongation, tortuosity, and vessel density are critical
                      indicators for early diagnosis.
                    </p>
                    <p className="mb-4">
                      This mapping is powered by the <strong>DA-Res2UNet</strong> model, evaluated with the following metrics:
                    </p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>Dice Score:</strong> 84.25%</li>
                      <li><strong>Accuracy:</strong> 98.05%</li>
                      <li><strong>Sensitivity:</strong> 79.91%</li>
                      <li><strong>Specificity:</strong> 99.32%</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Image Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      For optimal vessel mapping:
                    </p>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>High-quality retinal fundus images</li>
                      <li>Clear vessel visibility</li>
                      <li>Proper illumination</li>
                      <li>Minimal artifacts or noise</li>
                      <li>Recommended resolution: 2048x2048 pixels</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
