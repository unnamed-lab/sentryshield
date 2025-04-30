import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RiskScoreCardProps {
  title: string
  score: number
  status: string
  icon: ReactNode
  trend: string
  description: string
  isLoading?: boolean
  className?: string
  accentColor?: string
}

export function RiskScoreCard({
  title,
  score,
  status,
  icon,
  trend,
  description,
  isLoading = false,
  className,
  accentColor,
}: RiskScoreCardProps) {
  const getScoreColor = (score: number, isPositive = true) => {
    if (accentColor) return accentColor

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
    if (accentColor) return accentColor

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
    if (accentColor && !trend.startsWith("-")) return accentColor
    return trend.startsWith("+") ? "text-green-500" : "text-red-500"
  }

  const isPositiveMetric = !title.toLowerCase().includes("risk")

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium leading-none">{title}</p>
          <div className={cn("rounded-full p-1", accentColor ? "bg-background/80" : "bg-primary/10")}>{icon}</div>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <h3 className={cn("text-xl sm:text-2xl font-bold", getScoreColor(score, isPositiveMetric))}>{score}</h3>
            <span className={cn("text-xs sm:text-sm font-medium", getStatusColor(status))}>{status}</span>
          </div>
          <p className={cn("text-xs font-medium", getTrendColor(trend))}>{trend}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  )
}
