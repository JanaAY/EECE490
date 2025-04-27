"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Eye, Loader2, AlertCircle, CheckCircle } from "lucide-react"

export default function DetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<{
    prediction: string
    confidence: number
    severity?: string
    features?: string[]
  } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setAnalysisResult(null)
    }
  }

  const handleAnalyzeImage = async () => {
    if (!selectedFile) return
    setIsAnalyzing(true)
    const form = new FormData()
    form.append("image", selectedFile)

    try {
      const res = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Detection failed")
      setAnalysisResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysisResult(null)
  }

  return (
    <main className="container px-4 md:px-6 py-8">
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/tiff"
        hidden
        ref={fileInputRef}
        onChange={onFileChange}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl text-blue-900">DR Detection</h1>
          <p className="text-gray-600 md:text-lg">
            Upload retinal images for automated diabetic retinopathy detection
          </p>
        </div>

        <Tabs defaultValue="detection" className="w-full">

          <TabsContent value="detection" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Upload / Preview Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Retinal Image</CardTitle>
                  <CardDescription>
                    Upload a retinal image for diabetic retinopathy detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!previewUrl ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                      <div className="space-y-4">
                        <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-300" />
                        </div>
                        <h3 className="text-lg font-medium">Upload Image</h3>
                        <p className="text-sm text-gray-500">Supported: JPEG, PNG, TIFF, JPG (≤10MB)</p>
                        <Button onClick={handleImageUpload} className="bg-blue-700 hover:bg-blue-800">
                          Select Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="w-full h-auto" />
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={resetAnalysis}>
                          Remove
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAnalyzeImage}
                          disabled={isAnalyzing}
                          className="bg-blue-700 hover:bg-blue-800"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze Image"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* About Section */}
                  <div className="flex justify-center">
                    <div className="bg-blue-50 rounded-md p-6 max-w-2xl text-center">
                    <h3 className="text-sm font-medium text-blue-800">About Our DR Detection</h3>
                    <p className="text-xs text-blue-700">
                      Our detection system is powered by the <strong>RSGNet</strong> model,
                      specifically designed for binary-class classification of diabetic retinopathy (DR vs. No DR).
                      The model achieved a <strong>75% validation accuracy</strong> during evaluation.
                      Further improvements are ongoing in collaboration with medical specialists to enhance diagnostic reliability.
                    </p>
                  </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Automated detection and grading</CardDescription>
                </CardHeader>
                <CardContent>
                  {!analysisResult ? (
                    <div className="h-[300px] flex items-center justify-center border rounded-lg bg-gray-50">
                      <div className="text-center space-y-2">
                        <Eye className="h-12 w-12 text-gray-300 mx-auto" />
                        <p className="text-gray-500">
                          {previewUrl
                            ? "Click ‘Analyze Image’ to run detection"
                            : "Upload an image to begin"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div
                        className={`p-4 rounded-lg ${
                          analysisResult.prediction === "DR Detected"
                            ? "bg-amber-50 border-amber-200 border"
                            : "bg-green-50 border-green-200 border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {analysisResult.prediction === "DR Detected" ? (
                            <AlertCircle className="h-6 w-6 text-amber-500" />
                          ) : (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                          <div>
                            <h3 className="font-bold text-lg">{analysisResult.prediction}</h3>
                            <p className="text-sm">
                              Confidence: {(analysisResult.confidence * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {analysisResult.severity && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Severity Grade</h3>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <p className="font-medium text-lg">{analysisResult.severity}</p>
                          </div>
                        </div>
                      )}

                      {analysisResult.features && (
                        <div className="space-y-2">
                          <h3 className="font-medium">Detected Features</h3>
                          <ul className="space-y-1">
                            {analysisResult.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-700" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="font-medium">Recommendation</h3>
                        <div className="p-3 bg-gray-50 rounded-md text-sm">
                          Based on these findings, please follow up with an ophthalmologist within 3–6 months.
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
