"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PortfolioValueChartProps {
  isLoading?: boolean
}

export function PortfolioValueChart({ isLoading = false }: PortfolioValueChartProps) {
  // Mock data - replace with actual data in production
  const portfolioData = [
    { date: "Apr 1", value: 2100 },
    { date: "Apr 2", value: 2200 },
    { date: "Apr 3", value: 2150 },
    { date: "Apr 4", value: 2300 },
    { date: "Apr 5", value: 2400 },
    { date: "Apr 6", value: 2350 },
    { date: "Apr 7", value: 2500 },
    { date: "Apr 8", value: 2450 },
    { date: "Apr 9", value: 2550 },
    { date: "Apr 10", value: 2600 },
    { date: "Apr 11", value: 2650 },
    { date: "Apr 12", value: 2700 },
    { date: "Apr 13", value: 2750 },
    { date: "Apr 14", value: 2800 },
    { date: "Apr 15", value: 2750 },
    { date: "Apr 16", value: 2800 },
    { date: "Apr 17", value: 2850 },
    { date: "Apr 18", value: 2900 },
    { date: "Apr 19", value: 2950 },
    { date: "Apr 20", value: 2900 },
    { date: "Apr 21", value: 2850 },
    { date: "Apr 22", value: 2800 },
    { date: "Apr 23", value: 2750 },
    { date: "Apr 24", value: 2800 },
    { date: "Apr 25", value: 2850 },
    { date: "Apr 26", value: 2900 },
    { date: "Apr 27", value: 2950 },
    { date: "Apr 28", value: 3000 },
    { date: "Apr 29", value: 2950 },
    { date: "Apr 30", value: 2726.65 },
  ]

  if (isLoading) {
    return <Skeleton className="h-[200px] sm:h-[250px] md:h-[300px] w-full" />
  }

  return (
    <div className="h-[200px] sm:h-[250px] md:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={portfolioData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Show fewer ticks on smaller screens
              const index = portfolioData.findIndex((item) => item.date === value)
              const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200
              const divisor = screenWidth < 640 ? 10 : screenWidth < 1024 ? 7 : 5
              return index % divisor === 0 ? value : ""
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={["dataMin - 100", "dataMax + 100"]}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Portfolio Value"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
