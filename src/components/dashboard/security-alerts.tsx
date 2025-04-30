import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Shield, Wallet } from "lucide-react"

export function SecurityAlerts() {
  const alerts = [
    {
      title: "High Risk Token Detected",
      description: "A token you interacted with has been flagged as high risk by the community.",
      time: "10 minutes ago",
      severity: "High",
      severityColor: "bg-red-500",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    },
    {
      title: "Unlimited Approval Found",
      description: "You have granted unlimited spending approval to Uniswap V2 Router.",
      time: "2 hours ago",
      severity: "Medium",
      severityColor: "bg-yellow-500",
      icon: <Wallet className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Security Scan Completed",
      description: "Your wallet security scan has been completed with 2 recommendations.",
      time: "1 day ago",
      severity: "Info",
      severityColor: "bg-blue-500",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
    },
  ]

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
          <div className="mt-0.5">{alert.icon}</div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{alert.title}</h4>
              <Badge className={alert.severityColor}>{alert.severity}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{alert.time}</span>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                View Details
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
