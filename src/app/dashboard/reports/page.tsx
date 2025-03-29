"use client";

import { TabsContent } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  Download,
  FileText,
  Filter,
  Search,
  Share2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TokenCheck } from "@/types";
import {
  getNewTokens,
  getRecentTokens,
  getTrendingTokenDetails,
  getVerifiedTokenDetails,
} from "@/services/token-service";
import { TokenList } from "@/components/tokens/token-list";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("month");
  const [reportFilter, setReportFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [newTokens, setNewTokens] = useState<TokenCheck[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<TokenCheck[]>([]);
  const [verifiedTokens, setVerifiedTokens] = useState<TokenCheck[]>([]);
  const [recentTokens, setRecentTokens] = useState<TokenCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          newTokensData,
          trendingTokensData,
          verifiedTokensData,
          recentTokensData,
        ] = await Promise.all([
          getNewTokens(),
          getTrendingTokenDetails(),
          getVerifiedTokenDetails(),
          getRecentTokens(),
        ]);

        setNewTokens(newTokensData);
        setTrendingTokens(trendingTokensData);
        setVerifiedTokens(verifiedTokensData);
        setRecentTokens(recentTokensData);
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mockReports = [
    {
      id: "REP-001",
      title: "Weekly Security Summary",
      description:
        "Overview of security incidents and risk detections for the week",
      date: "March 21, 2025",
      type: "Automated",
      format: "PDF",
      size: "3.2 MB",
    },
    {
      id: "REP-002",
      title: "Monthly Risk Analysis",
      description: "Comprehensive analysis of token and wallet security risks",
      date: "March 15, 2025",
      type: "Detailed",
      format: "PDF",
      size: "5.7 MB",
    },
    {
      id: "REP-003",
      title: "Token Security Audit",
      description: "In-depth security audit of UNI token contract",
      date: "March 10, 2025",
      type: "Audit",
      format: "PDF",
      size: "4.1 MB",
    },
    {
      id: "REP-004",
      title: "Wallet Exposure Report",
      description: "Analysis of wallet interactions with high-risk contracts",
      date: "March 5, 2025",
      type: "Detailed",
      format: "PDF",
      size: "2.8 MB",
    },
    {
      id: "REP-005",
      title: "Security Incident Report",
      description: "Post-mortem analysis of recent phishing attempt",
      date: "February 28, 2025",
      type: "Incident",
      format: "PDF",
      size: "2.3 MB",
    },
    {
      id: "REP-006",
      title: "Community Scam Reports",
      description: "Summary of community-reported scams and suspicious tokens",
      date: "February 20, 2025",
      type: "Community",
      format: "PDF",
      size: "1.9 MB",
    },
  ];

  const filteredReports = mockReports.filter((report) => {
    if (!reportFilter) return true;
    return (
      report.title.toLowerCase().includes(reportFilter.toLowerCase()) ||
      report.description.toLowerCase().includes(reportFilter.toLowerCase()) ||
      report.type.toLowerCase().includes(reportFilter.toLowerCase())
    );
  });

  const getReportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "automated":
        return "bg-blue-500";
      case "detailed":
        return "bg-purple-500";
      case "audit":
        return "bg-green-500";
      case "incident":
        return "bg-red-500";
      case "community":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reports
        </h1>
        <p className="text-muted-foreground">
          Security reports and risk analysis documents
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="tokens">Token Reports</TabsTrigger>
            <TabsTrigger value="wallets">Wallet Reports</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-8 md:w-[250px]"
              value={reportFilter}
              onChange={(e) => setReportFilter(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select
              defaultValue="month"
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "tokens" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Security Reports</CardTitle>
              <CardDescription>
                Analysis of token security and risk factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="new" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="new">New Tokens</TabsTrigger>
                  <TabsTrigger value="trending">Trending Tokens</TabsTrigger>
                  <TabsTrigger value="verified">Verified Tokens</TabsTrigger>
                  <TabsTrigger value="high-risk">High Risk Tokens</TabsTrigger>
                </TabsList>

                <TabsContent value="new" className="space-y-4">
                  <TokenList tokens={newTokens} isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="trending" className="space-y-4">
                  <TokenList tokens={trendingTokens} isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="verified" className="space-y-4">
                  <TokenList tokens={verifiedTokens} isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="high-risk" className="space-y-4">
                  <TokenList
                    tokens={[
                      ...newTokens,
                      ...trendingTokens,
                      ...recentTokens,
                    ].filter((token) => token.score < 70)}
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Risk Distribution</CardTitle>
                <CardDescription>Overview of token risk levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "High Risk Tokens",
                      count: 18,
                      percentage: 15,
                      color: "bg-red-500",
                    },
                    {
                      name: "Medium Risk Tokens",
                      count: 42,
                      percentage: 35,
                      color: "bg-yellow-500",
                    },
                    {
                      name: "Low Risk Tokens",
                      count: 60,
                      percentage: 50,
                      color: "bg-green-500",
                    },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <span className="text-sm">{category.count} tokens</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} rounded-full`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-right text-muted-foreground">
                        {category.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Verification Status</CardTitle>
                <CardDescription>
                  Distribution of verified vs unverified tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Verified Tokens",
                      count: 45,
                      percentage: 37.5,
                      color: "bg-green-500",
                    },
                    {
                      name: "Unverified Tokens",
                      count: 75,
                      percentage: 62.5,
                      color: "bg-gray-500",
                    },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <span className="text-sm">{category.count} tokens</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} rounded-full`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-right text-muted-foreground">
                        {category.percentage}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium mb-3">
                    Token Verification Sources
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: "Jupiter", count: 32, percentage: 71 },
                      { name: "SolanaFM", count: 8, percentage: 18 },
                      { name: "Other", count: 5, percentage: 11 },
                    ].map((source, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>{source.name}</span>
                        <span>
                          {source.count} ({source.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab !== "tokens" && (
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              {filteredReports.length} reports available for selected time
              period
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredReports.length > 0 ? (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">{report.title}</h4>
                        <Badge className={getReportTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No reports found</h3>
                <p className="text-muted-foreground max-w-sm">
                  No matching reports based on your current filters. Try
                  adjusting your filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab !== "tokens" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
              <CardDescription>
                Distribution of reports by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Security Summaries", count: 12, percentage: 40 },
                  { name: "Token Audits", count: 8, percentage: 27 },
                  { name: "Wallet Analysis", count: 5, percentage: 17 },
                  { name: "Incident Reports", count: 3, percentage: 10 },
                  { name: "Community Reports", count: 2, percentage: 6 },
                ].map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-sm">{category.count} reports</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-right text-muted-foreground">
                      {category.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Report Activity</CardTitle>
              <CardDescription>
                Summary of recent reporting activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Weekly Security Report Generated",
                    time: "2 hours ago",
                    icon: BarChart3,
                  },
                  {
                    action: "Token Audit Completed",
                    time: "1 day ago",
                    icon: FileText,
                  },
                  {
                    action: "Incident Report Published",
                    time: "3 days ago",
                    icon: AlertTriangle,
                  },
                  {
                    action: "Monthly Analysis Downloaded",
                    time: "5 days ago",
                    icon: Download,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
