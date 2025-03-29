"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function TokenRiskChart() {
  const [data, setData] = useState([
    {
      name: "Very High",
      value: 12,
      color: "#ef4444",
    },
    {
      name: "High",
      value: 18,
      color: "#f97316",
    },
    {
      name: "Medium",
      value: 29,
      color: "#eab308",
    },
    {
      name: "Low",
      value: 35,
      color: "#22c55e",
    },
    {
      name: "Very Low",
      value: 47,
      color: "#10b981",
    },
  ])

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(
        data.map((item) => ({
          ...item,
          value: Math.max(5, item.value + Math.floor(Math.random() * 10) - 5),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [data])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].name} Risk: ${payload[0].value} tokens`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[4, 4, 4, 4]}
            fill="fill"
            fillOpacity={0.9}
            barSize={30}
            label={{ position: "right", fill: "#888", fontSize: 12 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

