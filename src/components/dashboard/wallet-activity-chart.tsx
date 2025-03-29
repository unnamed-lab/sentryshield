"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function WalletActivityChart() {
  const [data, setData] = useState([
    { day: "1", transactions: 5 },
    { day: "2", transactions: 3 },
    { day: "3", transactions: 7 },
    { day: "4", transactions: 2 },
    { day: "5", transactions: 5 },
    { day: "6", transactions: 9 },
    { day: "7", transactions: 6 },
    { day: "8", transactions: 4 },
    { day: "9", transactions: 8 },
    { day: "10", transactions: 12 },
    { day: "11", transactions: 7 },
    { day: "12", transactions: 3 },
    { day: "13", transactions: 5 },
    { day: "14", transactions: 8 },
    { day: "15", transactions: 10 },
    { day: "16", transactions: 6 },
    { day: "17", transactions: 4 },
    { day: "18", transactions: 9 },
    { day: "19", transactions: 7 },
    { day: "20", transactions: 5 },
    { day: "21", transactions: 3 },
    { day: "22", transactions: 5 },
    { day: "23", transactions: 8 },
    { day: "24", transactions: 10 },
    { day: "25", transactions: 9 },
    { day: "26", transactions: 6 },
    { day: "27", transactions: 8 },
    { day: "28", transactions: 12 },
    { day: "29", transactions: 7 },
    { day: "30", transactions: 4 },
  ])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`Day ${payload[0].payload.day}: ${payload[0].value} transactions`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              // Show fewer ticks to avoid crowding
              return +value % 5 === 0 ? value : ""
            }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

