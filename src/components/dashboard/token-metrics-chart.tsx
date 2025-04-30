"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface TokenMetricsChartProps {
  isLoading?: boolean
}

export function TokenMetricsChart({ isLoading = false }: TokenMetricsChartProps) {
  // Mock data - replace with actual data in production
  const volumeData = [
    { name: "SOL", volume: 1850000 },
    { name: "USDC", volume: 950000 },
    { name: "mSOL", volume: 125000 },
    { name: "COINIFY", volume: 75000 },
    { name: "RAGNAR", volume: 45000 },
  ]

  const holdersData = [
    { name: "SOL", value: 65.2 },
    { name: "USDC", value: 16.5 },
    { name: "mSOL", value: 13.1 },
    { name: "COINIFY", value: 3.9 },
    { name: "RAGNAR", value: 1.3 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"]

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="h-[300px]">
      <Tabs defaultValue="volume">
        <TabsList className="mb-4">
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) =>
                  value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`
                }
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value >= 1000000 ? `${(value / 1000000).toFixed(2)}M` : `${(value / 1000).toFixed(1)}K`}`,
                  "Volume",
                ]}
                labelFormatter={(label) => `Token: ${label}`}
              />
              <Bar dataKey="volume" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="allocation" className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={holdersData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {holdersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
                labelFormatter={(label) => `Token: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
