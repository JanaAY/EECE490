"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const API_BASE_URL = "https://5bc9-34-169-51-41.ngrok-free.app"

export default function ImageGenerator() {
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<string[] | null>(null)  // null = haven't generated yet

  const generate = async () => {
    setLoading(true)
    setFiles(null)

    try {
      const res = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_images: count })
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
      setFiles([])  // mark “done but empty” so we fall back to dummy
    } finally {
      setLoading(false)
    }
  }

  // After first render, `files === null` => nothing
  // `files.length > 0` => show real
  // `files.length === 0` => show dummy
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Label htmlFor="count"># Images</Label>
        <Input
          id="count"
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-24"
        />
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
          {/* <p className="text-center text-gray-500">No images returned — showing placeholders</p> */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-2">
                <img
                  src="/images/img008.png"
                  alt="placeholder 1"
                  className="w-full h-auto object-cover rounded"
                />
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-2">
                <img
                  src="/images/img014.png"
                  alt="placeholder 2"
                  className="w-full h-auto object-cover rounded"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
