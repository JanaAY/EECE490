import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart, Activity } from "lucide-react"

export default function StatisticsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Model Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4 text-blue-700" />
              <span className="text-sm">DR Detection</span>
            </div>
            <span className="text-sm font-medium">97.8%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "97.8%" }}></div>
          </div>
        </div>

        <div className="space-y-2 p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-700" />
              <span className="text-sm">Grading Accuracy</span>
            </div>
            <span className="text-sm font-medium">94.3%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "94.3%" }}></div>
          </div>
        </div>

        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-700" />
              <span className="text-sm">Vessel Mapping</span>
            </div>
            <span className="text-sm font-medium">95.2%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: "95.2%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
