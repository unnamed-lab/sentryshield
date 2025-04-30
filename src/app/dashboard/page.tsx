/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  fetchNewTokens,
  fetchRecentTokens,
  fetchTrendingTokens,
  fetchVerifiedTokens,
  fetchWalletHoldings,
  fetchWalletRiskScore,
} from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AccountInfo from "./component/account-info";

interface Token {
  mint: string;
  decimals: number;
  symbol: string;
  creator: string;
  mintAuthority: string;
  freezeAuthority: string;
  program: string;
  createAt: string;
  updatedAt: string;
  events: null;
  riskScore: number;
  verified?: boolean;
  views?: number;
  downVotes?: number;
}

interface WalletHolding {
  token: {
    mint: string;
    symbol: string;
    decimals: number;
    verified: boolean;
  };
  balance: number;
  value: number;
  price: number;
  change24h: number;
  allocation: number;
}

interface WalletRiskScore {
  securityScore: number;
  securityStatus: string;
  securityTrend: string;
  exposureScore: number;
  exposureStatus: string;
  exposureTrend: string;
  approvalScore: number;
  approvalStatus: string;
  trustScore: number;
  trustStatus: string;
  trustTrend: string;
  details: Record<string, any>;
}

export default function Dashboard() {
  // const [isLoading, setIsLoading] = useState(true);

  // const [newTokens, setNewTokens] = useState<Token[]>([]);
  // const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  // const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  // const [verifiedTokens, setVerifiedTokens] = useState<Token[]>([]);
  // const [walletHoldings, setWalletHoldings] = useState<WalletHolding[]>([]);
  // const [walletRiskScore, setWalletRiskScore] =
  //   useState<WalletRiskScore | null>(null);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [activeTab, setActiveTab] = useState("overview");
  // const [tokenView, setTokenView] = useState("grid");
  // const [copied, setCopied] = useState(false);
  // const { toast } = useToast();

  // Mock wallet data - replace with actual data in production
  const walletAddress = "C89CN6hBQm4hLEEX5jeKgBpFXXJ6RnDSehqcnqUZL6yn";
  const walletBalance = 2726.65;
  const walletNetwork = "Solana";
  const walletChange = 8.71;

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const [
  //         newTokensData,
  //         recentTokensData,
  //         trendingTokensData,
  //         verifiedTokensData,
  //         holdingsData,
  //         riskScoreData,
  //       ] = await Promise.all([
  //         fetchNewTokens(),
  //         fetchRecentTokens(),
  //         fetchTrendingTokens(),
  //         fetchVerifiedTokens(),
  //         fetchWalletHoldings(),
  //         fetchWalletRiskScore(),
  //       ]);

  //       setNewTokens(newTokensData);
  //       setRecentTokens(recentTokensData);
  //       setTrendingTokens(trendingTokensData);
  //       setVerifiedTokens(verifiedTokensData);
  //       setWalletHoldings(holdingsData);
  //       setWalletRiskScore(riskScoreData);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //       toast({
  //         title: "Error loading dashboard data",
  //         description: "Please try again later",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, [toast]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement search functionality
    // console.log("Searching for:", searchQuery);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    // setCopied(true);
    // setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Wallet Header Card */}
      <AccountInfo />

      {/* Dashboard Search and Filters */}
      {/* <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <form
          onSubmit={handleSearch}
          className="relative w-full flex-1 max-w-xl"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tokens, addresses, or transactions..."
            className="pl-10 pr-4 h-11 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8"
          >
            Scan
          </Button>
        </form>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="h-9 w-full sm:w-auto">
              <TabsTrigger
                value="all"
                className="text-xs flex-1 sm:flex-initial"
              >
                All Networks
              </TabsTrigger>
              <TabsTrigger
                value="sol"
                className="text-xs flex-1 sm:flex-initial"
              >
                Solana
              </TabsTrigger>
              <TabsTrigger
                value="eth"
                className="text-xs flex-1 sm:flex-initial"
              >
                Ethereum
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div> */}

      {/* Risk Score Cards */}
      {/* <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        <RiskScoreCard
          title="Wallet Security"
          score={walletRiskScore?.securityScore || 92}
          status={walletRiskScore?.securityStatus || "Safe"}
          icon={<Shield className="h-4 w-4" />}
          trend={walletRiskScore?.securityTrend || "+5%"}
          description="Overall wallet security assessment"
          isLoading={isLoading}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/10 border-green-200 dark:border-green-900/50"
          accentColor="text-green-600 dark:text-green-400"
        />
        <RiskScoreCard
          title="Exposure Risk"
          score={walletRiskScore?.exposureScore || 3}
          status={walletRiskScore?.exposureStatus || "Low"}
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={walletRiskScore?.exposureTrend || "-2%"}
          description="Risk from token exposure"
          isLoading={isLoading}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-900/50"
          accentColor="text-blue-600 dark:text-blue-400"
        />
        <RiskScoreCard
          title="Contract Approvals"
          score={walletRiskScore?.approvalScore || 12}
          status={walletRiskScore?.approvalStatus || "Medium"}
          icon={<Lock className="h-4 w-4" />}
          trend={walletRiskScore?.approvalTrend || "+8%"}
          description="Smart contract approval risk"
          isLoading={isLoading}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-900/50"
          accentColor="text-yellow-600 dark:text-yellow-400"
        />
        <RiskScoreCard
          title="Community Trust"
          score={walletRiskScore?.trustScore || 87}
          status={walletRiskScore?.trustStatus || "High"}
          icon={<ThumbsUp className="h-4 w-4" />}
          trend={walletRiskScore?.trustTrend || "+3%"}
          description="Based on community reports"
          isLoading={isLoading}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-900/50"
          accentColor="text-purple-600 dark:text-purple-400"
        />
      </div> */}

      {/* Main Dashboard Content */}
    </div>
  );
}
