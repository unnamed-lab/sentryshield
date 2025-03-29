"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function WalletExposureChart() {
  const data = [
    { name: "High Risk", value: 2, color: "#ef4444" },
    { name: "Medium Risk", value: 5, color: "#eab308" },
    { name: "Low Risk", value: 15, color: "#10b981" },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1)
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value} contracts`}</p>
          <p className="text-xs text-muted-foreground">{`${percentage}% of total exposure`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[250px] flex items-center justify-center">
      <div className="w-full max-w-xs">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center items-center gap-6 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

