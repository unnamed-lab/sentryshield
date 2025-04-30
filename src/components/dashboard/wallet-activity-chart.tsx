"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface WalletActivityChartProps {
  isLoading?: boolean
}

export function WalletActivityChart({ isLoading = false }: WalletActivityChartProps) {
  // Mock data - replace with actual data in production
  const activityData = [
    { date: "Apr 1", transactions: 5, value: 1200 },
    { date: "Apr 2", transactions: 3, value: 800 },
    { date: "Apr 3", transactions: 7, value: 1800 },
    { date: "Apr 4", transactions: 2, value: 500 },
    { date: "Apr 5", transactions: 4, value: 1100 },
    { date: "Apr 6", transactions: 8, value: 2200 },
    { date: "Apr 7", transactions: 6, value: 1600 },
  ]

  // Make the chart responsive with better height handling
  if (isLoading) {
    return <Skeleton className="h-[200px] sm:h-[250px] md:h-[300px] w-full" />
  }

  return (
    <div className="h-[200px] sm:h-[250px] md:h-[300px]">
      <Tabs defaultValue="value">
        <TabsList className="mb-4 h-8 p-1">
          <TabsTrigger value="value" className="text-xs h-6">
            Value
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-xs h-6">
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="value" className="h-[150px] sm:h-[200px] md:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
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
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="transactions" className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [value, "Transactions"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, stroke: "#8b5cf6", fill: "white" }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
