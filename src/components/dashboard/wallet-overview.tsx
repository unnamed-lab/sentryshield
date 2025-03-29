import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Shield } from "lucide-react"

export function WalletOverview() {
  const securityItems = [
    {
      name: "Contract Approvals",
      status: "Warning",
      statusColor: "bg-yellow-500",
      progress: 65,
      message: "12 active approvals found",
    },
    {
      name: "Phishing Protection",
      status: "Secure",
      statusColor: "bg-green-500",
      progress: 100,
      message: "Protection active",
    },
    {
      name: "Transaction Screening",
      status: "Secure",
      statusColor: "bg-green-500",
      progress: 100,
      message: "All transactions screened",
    },
    {
      name: "Exposure Risk",
      status: "Low Risk",
      statusColor: "bg-green-400",
      progress: 85,
      message: "3 low-risk interactions",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Connected Wallet</h3>
            <Badge variant="outline" className="text-xs">
              Ethereum
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            0x71C7656EC7ab88b098defB751B7401B5f6d8976F
            <ExternalLink className="h-3 w-3" />
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Shield className="h-4 w-4" />
          Secure
        </Button>
      </div>

      <div className="space-y-4">
        {securityItems.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <Badge className={item.statusColor}>{item.status}</Badge>
            </div>
            <Progress value={item.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

