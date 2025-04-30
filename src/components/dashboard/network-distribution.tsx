"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface NetworkDistributionProps {
  isLoading?: boolean
}

export function NetworkDistribution({ isLoading = false }: NetworkDistributionProps) {
  // Mock data - replace with actual data in production
  const networkData = [
    { name: "Solana", value: 2100, color: "#9945FF" },
    { name: "Ethereum", value: 450, color: "#6E56CF" },
    { name: "Binance", value: 120, color: "#F0B90B" },
    { name: "Polygon", value: 56.65, color: "#8247E5" },
  ]

  // Make the chart responsive with better height handling
  if (isLoading) {
    return <Skeleton className="h-[200px] sm:h-[250px] md:h-[300px] w-full" />
  }

  return (
    <div className="h-[200px] sm:h-[250px] md:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={networkData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => {
              // On small screens, only show percentage
              const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200
              return screenWidth < 640 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
            }}
            labelLine={false}
          >
            {networkData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => {
              return <span className="text-sm">{value}</span>
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
