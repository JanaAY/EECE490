import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Eye, Activity, ImageIcon } from "lucide-react"

export default function StatisticsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Model Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">

        {/* DR Detection */}
        <div className="space-y-2 p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-700" />
              <span className="text-sm">DR Detection Accuracy</span>
            </div>
            <span className="text-sm font-medium">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        {/* Vessel Mapping */}
        <div className="space-y-2 p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-700" />
              <span className="text-sm">Vessel Mapping Accuracy</span>
            </div>
            <span className="text-sm font-medium">98.05%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "98.05%" }}></div>
          </div>
        </div>

        {/* Image Generation FID - DR model */}
        <div className="space-y-2 p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-blue-700" />
              <span className="text-sm">Image Generation FID (DR)</span>
            </div>
            <span className="text-sm font-medium">18.97</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "81%" }}></div>
          </div>
        </div>

        {/* Image Generation FID - NoDR model */}
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-blue-700" />
              <span className="text-sm">Image Generation FID (NoDR)</span>
            </div>
            <span className="text-sm font-medium">23.29</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "76%" }}></div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
