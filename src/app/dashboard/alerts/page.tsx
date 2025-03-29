"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  BellOff,
  ChevronRight,
  ExternalLink,
  MailWarning,
  MessageSquare,
  Search,
  Shield,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export default function Alerts() {
  const [activeTab, setActiveTab] = useState("all")
  const [twitterAlerts, setTwitterAlerts] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [browserAlerts, setBrowserAlerts] = useState(true)
  const [riskThreshold, setRiskThreshold] = useState([60])
  const [alertFilter, setAlertFilter] = useState("")

  const mockAlerts = [
    {
      id: 1,
      type: "token",
      risk: "high",
      title: "High Risk Token Detected",
      description: "A token you recently interacted with has been flagged as high risk by our security system.",
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      time: "2 hours ago",
      status: "unread",
    },
    {
      id: 2,
      type: "wallet",
      risk: "medium",
      title: "Approval Risk Detected",
      description: "You have granted unlimited spending approval to a medium-risk contract.",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      time: "5 hours ago",
      status: "read",
    },
    {
      id: 3,
      type: "community",
      risk: "info",
      title: "Community Report",
      description: "A token you're monitoring has been reported by 15 community members.",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      time: "1 day ago",
      status: "read",
    },
    {
      id: 4,
      type: "token",
      risk: "critical",
      title: "Critical Security Alert",
      description: "A token in your wallet has been identified as a potential scam.",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      time: "1 day ago",
      status: "unread",
    },
    {
      id: 5,
      type: "system",
      risk: "info",
      title: "Security Scan Completed",
      description: "Weekly security scan completed with 2 recommendations.",
      address: "",
      time: "2 days ago",
      status: "read",
    },
  ]

  const filteredAlerts = mockAlerts
    .filter((alert) => {
      if (activeTab === "all") return true
      if (activeTab === "high") return alert.risk === "high" || alert.risk === "critical"
      if (activeTab === "community") return alert.type === "community"
      return true
    })
    .filter((alert) => {
      if (!alertFilter) return true
      return (
        alert.title.toLowerCase().includes(alertFilter.toLowerCase()) ||
        alert.description.toLowerCase().includes(alertFilter.toLowerCase())
      )
    })

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Alerts</h1>
        <p className="text-muted-foreground">Security notifications and risk alerts</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Security Alerts</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Filter alerts..."
                    className="w-full pl-8 md:w-[250px]"
                    value={alertFilter}
                    onChange={(e) => setAlertFilter(e.target.value)}
                  />
                </div>
              </div>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                  <TabsTrigger value="high">High Risk</TabsTrigger>
                  <TabsTrigger value="community">Community Reports</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "flex gap-4 p-4 border rounded-lg",
                        alert.status === "unread" ? "bg-primary/5 border-primary/10" : "bg-background",
                      )}
                    >
                      <div className="mt-0.5">
                        {alert.risk === "high" || alert.risk === "critical" ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : alert.type === "community" ? (
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Shield className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {alert.status === "unread" && (
                              <div className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></div>
                            )}
                            {alert.title}
                          </h4>
                          <Badge className={getRiskBadgeColor(alert.risk)}>
                            {alert.risk === "info"
                              ? "Info"
                              : `${alert.risk.charAt(0).toUpperCase() + alert.risk.slice(1)} Risk`}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        {alert.address && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>
                              Address: {alert.address.substring(0, 8)}...
                              {alert.address.substring(alert.address.length - 6)}
                            </span>
                            <a href="#" className="ml-1 hover:text-primary">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                          <Link href="#">
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                              View Report
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No alerts found</h3>
                    <p className="text-muted-foreground max-w-sm">
                      No matching alerts based on your current filters. Try adjusting your filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>Configure your security notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Twitter Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via Twitter DM</p>
                  </div>
                  <Switch checked={twitterAlerts} onCheckedChange={setTwitterAlerts} />
                </div>
                {twitterAlerts && (
                  <div className="rounded-md border p-3 bg-muted/50">
                    <div className="flex items-center gap-2 text-sm">
                      <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                      <span className="font-medium">Sentinel_Bot</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        Connected
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>
                {emailAlerts && (
                  <div className="rounded-md border p-3 bg-muted/50">
                    <div className="flex items-center gap-2 text-sm">
                      <MailWarning className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">alerts@sentryshield.io</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts in browser</p>
                  </div>
                  <Switch checked={browserAlerts} onCheckedChange={setBrowserAlerts} />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <Label className="text-base">Minimum Risk Score (50-100)</Label>
                  <p className="text-sm text-muted-foreground">Only alert for risks above threshold</p>
                </div>
                <Slider
                  defaultValue={[60]}
                  max={100}
                  min={50}
                  step={5}
                  value={riskThreshold}
                  onValueChange={setRiskThreshold}
                />
                <div className="text-center text-sm">
                  Current threshold: <span className="font-medium">{riskThreshold[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Recent alert statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Alerts</span>
                  <span className="font-medium">27</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Risk Alerts</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Community Reports</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unread Alerts</span>
                  <span className="font-medium text-primary">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

