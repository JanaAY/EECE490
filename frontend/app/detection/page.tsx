"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Eye, Loader2, AlertCircle, CheckCircle } from "lucide-react"

export default function DetectionPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<{
    prediction: string
    confidence: number
    severity?: string
    features?: string[]
  } | null>(null)

  const handleImageUpload = () => {
    setIsUploading(true)

    // Simulate image upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadedImage("/placeholder.svg?height=400&width=400&text=Retina+Image")
    }, 1500)
  }

  const handleAnalyzeImage = () => {
    setIsAnalyzing(true)

    // Simulate image analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisResult({
        prediction: "DR Detected",
        confidence: 0.94,
        severity: "Moderate NPDR",
        features: ["Microaneurysms", "Dot and blot hemorrhages", "Hard exudates", "Cotton wool spots"],
      })
    }, 2500)
  }

  const resetAnalysis = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
  }

  return (
    <main className="container px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">DR Detection</h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Upload retinal images for automated diabetic retinopathy detection and grading
          </p>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="detection">DR Detection</TabsTrigger>
            <TabsTrigger value="vessel-mapping">Vessel Mapping</TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Retinal Image</CardTitle>
                  <CardDescription>Upload a retinal image for diabetic retinopathy detection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                      <div className="space-y-4">
                        <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Upload Image</h3>
                          <p className="text-sm text-gray-500 mt-1">Drag and drop or click to upload a retinal image</p>
                        </div>
                        <div>
                          <Button
                            onClick={handleImageUpload}
                            disabled={isUploading}
                            className="bg-blue-700 hover:bg-blue-800"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              "Select Image"
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">Supported formats: JPEG, PNG, TIFF (max 10MB)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded retinal image"
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={resetAnalysis} size="sm">
                          Remove
                        </Button>
                        <Button
                          onClick={handleAnalyzeImage}
                          disabled={isAnalyzing}
                          size="sm"
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

                  <div className="bg-blue-50 rounded-md p-4">
                    <h3 className="text-sm font-medium text-blue-800">About Our DR Detection</h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Our AI model has been trained on over 100,000 labeled retinal images and can detect diabetic
                      retinopathy with 97.8% accuracy. The system can identify microaneurysms, hemorrhages, exudates,
                      and neovascularization.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Automated detection and grading of diabetic retinopathy</CardDescription>
                </CardHeader>
                <CardContent>
                  {!analysisResult ? (
                    <div className="h-[300px] flex items-center justify-center border rounded-lg bg-gray-50">
                      <div className="text-center space-y-2">
                        <Eye className="h-12 w-12 text-gray-300 mx-auto" />
                        <p className="text-gray-500">
                          {uploadedImage
                            ? "Click 'Analyze Image' to start detection"
                            : "Upload an image to begin analysis"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div
                        className={`p-4 rounded-lg ${
                          analysisResult.prediction === "DR Detected"
                            ? "bg-amber-50 border border-amber-200"
                            : "bg-green-50 border border-green-200"
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
                            <p className="text-sm">Confidence: {(analysisResult.confidence * 100).toFixed(1)}%</p>
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
                            {analysisResult.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-700" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="font-medium">Recommendation</h3>
                        <div className="p-3 bg-gray-50 rounded-md text-sm">
                          <p>
                            Based on the detected moderate NPDR, we recommend a follow-up with an ophthalmologist within
                            3-6 months. Regular monitoring is essential to track progression and adjust treatment as
                            needed.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Download Report
                        </Button>
                        <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                          Share with Doctor
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vessel-mapping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Retinal Vessel Mapping</CardTitle>
                <CardDescription>
                  Generate detailed maps of retinal vasculature for research and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                      <div className="space-y-4">
                        <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Upload Retinal Image</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Upload a high-quality retinal image for vessel mapping
                          </p>
                        </div>
                        <div>
                          <Button className="bg-blue-700 hover:bg-blue-800">Select Image</Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Vessel Mapping Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="vessel-thickness" className="text-sm">
                            Vessel Thickness Detection
                          </label>
                          <input type="checkbox" id="vessel-thickness" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="tortuosity" className="text-sm">
                            Tortuosity Analysis
                          </label>
                          <input type="checkbox" id="tortuosity" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="branching" className="text-sm">
                            Branching Pattern Analysis
                          </label>
                          <input type="checkbox" id="branching" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="avr" className="text-sm">
                            Arteriovenous Ratio (AVR)
                          </label>
                          <input type="checkbox" id="avr" className="rounded" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-700 hover:bg-blue-800">Generate Vessel Map</Button>

                    <div className="bg-blue-50 rounded-md p-4">
                      <h3 className="text-sm font-medium text-blue-800">About Vessel Mapping</h3>
                      <p className="text-xs text-blue-700 mt-1">
                        Our vessel mapping technology uses deep learning to precisely segment and analyze retinal
                        vasculature. This can help identify early vascular changes associated with diabetic retinopathy
                        before clinical signs become apparent.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-[300px] flex items-center justify-center border rounded-lg bg-gray-50">
                      <div className="text-center space-y-2">
                        <Eye className="h-12 w-12 text-gray-300 mx-auto" />
                        <p className="text-gray-500">Upload an image and generate a vessel map to see results</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500">VESSEL DENSITY</h4>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-gray-400 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">N/A</p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500">TORTUOSITY INDEX</h4>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-gray-400 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500">A/V RATIO</h4>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-gray-400 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">N/A</p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-500">BRANCHING COMPLEXITY</h4>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-gray-400 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500">N/A</p>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                      No vessel map generated yet. Upload an image to begin.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
