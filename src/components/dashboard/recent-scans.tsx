import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function RecentScans() {
  const scans = [
    {
      type: "Token",
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "Uniswap V2 Router",
      timestamp: "2 minutes ago",
      risk: "Low",
      riskColor: "bg-green-500",
    },
    {
      type: "Wallet",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      name: "Unknown Wallet",
      timestamp: "15 minutes ago",
      risk: "Medium",
      riskColor: "bg-yellow-500",
    },
    {
      type: "Token",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "WETH",
      timestamp: "1 hour ago",
      risk: "Very Low",
      riskColor: "bg-green-600",
    },
    {
      type: "Token",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "DAI Stablecoin",
      timestamp: "3 hours ago",
      risk: "Low",
      riskColor: "bg-green-500",
    },
    {
      type: "Wallet",
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "Suspicious Wallet",
      timestamp: "5 hours ago",
      risk: "High",
      riskColor: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-4">
      {scans.map((scan, index) => (
        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{scan.name}</span>
              <Badge variant="outline">{scan.type}</Badge>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {scan.address.substring(0, 6)}...{scan.address.substring(scan.address.length - 4)}
              <ExternalLink className="h-3 w-3" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{scan.timestamp}</span>
            <Badge className={scan.riskColor}>{scan.risk}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
