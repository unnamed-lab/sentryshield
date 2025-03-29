import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RiskScoreCardProps {
  title: string
  score: number
  status: string
  icon: ReactNode
  trend: string
  description: string
}

export function RiskScoreCard({ title, score, status, icon, trend, description }: RiskScoreCardProps) {
  const getScoreColor = (score: number, isPositive = true) => {
    if (isPositive) {
      if (score >= 80) return "text-green-500"
      if (score >= 60) return "text-green-400"
      if (score >= 40) return "text-yellow-500"
      if (score >= 20) return "text-orange-500"
      return "text-red-500"
    } else {
      if (score >= 80) return "text-red-500"
      if (score >= 60) return "text-orange-500"
      if (score >= 40) return "text-yellow-500"
      if (score >= 20) return "text-green-400"
      return "text-green-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "safe":
      case "high":
      case "very low":
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high risk":
      case "critical":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getTrendColor = (trend: string) => {
    return trend.startsWith("+") ? "text-green-500" : "text-red-500"
  }

  const isPositiveMetric = title.includes("Risk") ? false : true

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium leading-none">{title}</p>
          <div className="rounded-full bg-primary/10 p-1">{icon}</div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <h3 className={cn("text-2xl font-bold", getScoreColor(score, isPositiveMetric))}>{score}</h3>
            <span className={cn("text-sm font-medium", getStatusColor(status))}>{status}</span>
          </div>
          <p className={cn("text-xs", getTrendColor(trend))}>{trend}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  )
}

