// Fetch new tokens from /stats/new_tokens
export async function fetchNewTokens() {
  try {
    // In production, replace with:
    // const response = await fetch('/api/stats/new_tokens')
    // return await response.json()

    // Mock data for development
    return mockNewTokens
  } catch (error) {
    console.error("Error fetching new tokens:", error)
    return []
  }
}

// Fetch recent tokens from /stats/recent
export async function fetchRecentTokens() {
  try {
    // In production, replace with:
    // const response = await fetch('/api/stats/recent')
    // return await response.json()

    // Mock data for development
    return mockRecentTokens
  } catch (error) {
    console.error("Error fetching recent tokens:", error)
    return []
  }
}

// Fetch trending tokens from /stats/trending
export async function fetchTrendingTokens() {
  try {
    // In production, replace with:
    // const response = await fetch('/api/stats/trending')
    // return await response.json()

    // Mock data for development
    return mockTrendingTokens
  } catch (error) {
    console.error("Error fetching trending tokens:", error)
    return []
  }
}

// Fetch verified tokens from /stats/verified
export async function fetchVerifiedTokens() {
  try {
    // In production, replace with:
    // const response = await fetch('/api/stats/verified')
    // return await response.json()

    // Mock data for development
    return mockVerifiedTokens
  } catch (error) {
    console.error("Error fetching verified tokens:", error)
    return []
  }
}

// Fetch token report from /tokens/{id}/report
export async function fetchTokenReport(tokenId: string) {
  try {
    // In production, replace with:
    // const response = await fetch(`/api/tokens/${tokenId}/report`)
    // return await response.json()

    // Mock data for development
    return mockTokenReports.find((report) => report.id === tokenId) || null
  } catch (error) {
    console.error(`Error fetching token report for ${tokenId}:`, error)
    return null
  }
}

// Fetch token report summary from /tokens/{id}/report/summary
export async function fetchTokenReportSummary(tokenId: string) {
  try {
    // In production, replace with:
    // const response = await fetch(`/api/tokens/${tokenId}/report/summary`)
    // return await response.json()

    // Mock data for development
    const report = mockTokenReports.find((report) => report.id === tokenId)
    return report ? { summary: report.summary } : null
  } catch (error) {
    console.error(`Error fetching token report summary for ${tokenId}:`, error)
    return null
  }
}

// Fetch token insider graph from /tokens/{id}/insiders/graph
export async function fetchTokenInsiderGraph(tokenId: string) {
  try {
    // In production, replace with:
    // const response = await fetch(`/api/tokens/${tokenId}/insiders/graph`)
    // return await response.json()

    // Mock data for development
    return { nodes: [], edges: [] } // Replace with actual mock data structure
  } catch (error) {
    console.error(`Error fetching token insider graph for ${tokenId}:`, error)
    return null
  }
}

// Fetch wallet holdings
export async function fetchWalletHoldings() {
  try {
    // In production, replace with actual API call
    // const response = await fetch('/api/wallet/holdings')
    // return await response.json()

    // Mock data for development
    return mockWalletHoldings
  } catch (error) {
    console.error("Error fetching wallet holdings:", error)
    return []
  }
}

// Fetch wallet risk score
export async function fetchWalletRiskScore() {
  try {
    // In production, replace with actual API call
    // const response = await fetch('/api/wallet/risk')
    // return await response.json()

    // Mock data for development
    return mockWalletRiskScore
  } catch (error) {
    console.error("Error fetching wallet risk score:", error)
    return null
  }
}

// Mock data
const mockNewTokens = [
  {
    mint: "4kuHNqqXPQmGYjfbdGSFvmTFs6xeQbDHt1hGJPoFpump",
    decimals: 6,
    symbol: "DEAL",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:13.034782426Z",
    updatedAt: "2025-04-01T09:42:13.034823614Z",
    events: null,
    riskScore: 78,
    price: 0.0023,
    marketCap: 230000,
    volume24h: 45000,
    holders: 120,
    verified: false,
  },
  {
    mint: "9tBsqPQxiZUXYgeCncaqhezsAPinxN4yHrRqXeihpump",
    decimals: 6,
    symbol: "PGFY",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:09.9495869Z",
    updatedAt: "2025-04-01T09:42:09.949630316Z",
    events: null,
    riskScore: 65,
    price: 0.0045,
    marketCap: 450000,
    volume24h: 120000,
    holders: 320,
    verified: false,
  },
  {
    mint: "GubKGjHaavRV2nNpAQZHZY4ngdjSQwyyxFcLbPSN9rN5",
    decimals: 6,
    symbol: "TOASTY",
    creator: "FvEszABhiLVXd43whCvEZUTSTq4TqV3T61agEMgUvo7Y",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:07.540064217Z",
    updatedAt: "2025-04-01T09:42:07.540104399Z",
    events: null,
    riskScore: 82,
    price: 0.0012,
    marketCap: 120000,
    volume24h: 35000,
    holders: 95,
    verified: false,
  },
  {
    mint: "2Todo1ZehbJoHoWUURfsgtuxtEY6kj9Uhtp46FCwpump",
    decimals: 6,
    symbol: "TUB",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:07.256667911Z",
    updatedAt: "2025-04-01T09:42:07.256716374Z",
    events: null,
    riskScore: 45,
    price: 0.0078,
    marketCap: 780000,
    volume24h: 230000,
    holders: 450,
    verified: false,
  },
]

const mockRecentTokens = [
  {
    mint: "FFPFcVi1HKbG5RRy6CMDq6mDmgJizynA98CiRTDLpump",
    decimals: 6,
    symbol: "PEPE",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:41:57.070585309Z",
    updatedAt: "2025-04-01T09:41:57.070640079Z",
    events: null,
    riskScore: 72,
    price: 0.0056,
    marketCap: 560000,
    volume24h: 180000,
    holders: 780,
    verified: false,
    views: 1240,
  },
  {
    mint: "CDxsR8QRLemdxEu14VXzzPEakoCaH14rC5JRFe9gpump",
    decimals: 6,
    symbol: "AF",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:41:52.666747562Z",
    updatedAt: "2025-04-01T09:41:52.666818863Z",
    events: null,
    riskScore: 68,
    price: 0.0034,
    marketCap: 340000,
    volume24h: 95000,
    holders: 520,
    verified: false,
    views: 980,
  },
  {
    mint: "5WJNMRACU5VpHC6bEVWY1WTLEDckFrbd8BRwo54apump",
    decimals: 6,
    symbol: "RUPT",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:01.31175838Z",
    updatedAt: "2025-04-01T09:42:01.311825021Z",
    events: null,
    riskScore: 75,
    price: 0.0089,
    marketCap: 890000,
    volume24h: 320000,
    holders: 650,
    verified: false,
    views: 850,
  },
]

const mockTrendingTokens = [
  {
    mint: "G9EfV6RYW2rux8HcsZnvvnukkfoc4MFFnRRa4Gx2pump",
    decimals: 6,
    symbol: "COINIFY",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:41:59.770885513Z",
    updatedAt: "2025-04-01T09:41:59.770939716Z",
    events: null,
    riskScore: 88,
    price: 0.0125,
    marketCap: 1250000,
    volume24h: 750000,
    holders: 1850,
    verified: true,
    upVotes: 2450,
    downVotes: 120,
  },
  {
    mint: "4ieEHoWkSR8kQR3s6g2SkihhwzLKbVFK5f8fcZeUpump",
    decimals: 6,
    symbol: "RAGNAR",
    creator: "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2025-04-01T09:42:00.0544525Z",
    updatedAt: "2025-04-01T09:42:00.05448702Z",
    events: null,
    riskScore: 92,
    price: 0.0345,
    marketCap: 3450000,
    volume24h: 1250000,
    holders: 3200,
    verified: true,
    upVotes: 1980,
    downVotes: 85,
  },
  {
    mint: "32XkcN1MM2DymDTidwrhEEFFxN316hBrFRV2bhMdkhtY",
    decimals: 0,
    symbol: "SOL20",
    creator: "",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    createAt: "2025-04-01T09:41:52.421234067Z",
    updatedAt: "2025-04-01T09:41:52.421295173Z",
    events: null,
    riskScore: 95,
    price: 0.0567,
    marketCap: 5670000,
    volume24h: 2300000,
    holders: 5600,
    verified: true,
    upVotes: 1750,
    downVotes: 65,
  },
]

const mockVerifiedTokens = [
  {
    mint: "So11111111111111111111111111111111111111112",
    decimals: 9,
    symbol: "SOL",
    creator: "",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2020-01-01T00:00:00.000000000Z",
    updatedAt: "2020-01-01T00:00:00.000000000Z",
    events: null,
    riskScore: 98,
    price: 142.75,
    marketCap: 62500000000,
    volume24h: 1850000000,
    holders: 3500000,
    verified: true,
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    symbol: "USDC",
    creator: "",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2020-01-01T00:00:00.000000000Z",
    updatedAt: "2020-01-01T00:00:00.000000000Z",
    events: null,
    riskScore: 99,
    price: 1.0,
    marketCap: 32500000000,
    volume24h: 950000000,
    holders: 2800000,
    verified: true,
  },
  {
    mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    decimals: 9,
    symbol: "mSOL",
    creator: "",
    mintAuthority: "",
    freezeAuthority: "",
    program: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    createAt: "2021-06-01T00:00:00.000000000Z",
    updatedAt: "2021-06-01T00:00:00.000000000Z",
    events: null,
    riskScore: 96,
    price: 152.3,
    marketCap: 1850000000,
    volume24h: 125000000,
    holders: 450000,
    verified: true,
  },
]

const mockTokenReports = [
  {
    id: "4kuHNqqXPQmGYjfbdGSFvmTFs6xeQbDHt1hGJPoFpump",
    summary: {
      riskScore: 78,
      riskLevel: "Medium",
      warnings: ["Token was created recently", "Low liquidity", "Small holder base"],
      recommendations: [
        "Exercise caution when trading",
        "Set strict stop-loss orders",
        "Limit exposure to less than 1% of portfolio",
      ],
    },
    details: {
      // Additional details would go here
    },
  },
  {
    id: "G9EfV6RYW2rux8HcsZnvvnukkfoc4MFFnRRa4Gx2pump",
    summary: {
      riskScore: 88,
      riskLevel: "Low",
      warnings: ["Moderate concentration among top holders"],
      recommendations: ["Monitor whale movements", "Consider dollar-cost averaging for entry"],
    },
    details: {
      // Additional details would go here
    },
  },
]

const mockWalletHoldings = [
  {
    token: {
      mint: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      decimals: 9,
      verified: true,
    },
    balance: 12.45,
    value: 1777.24,
    price: 142.75,
    change24h: 3.2,
    allocation: 65.2,
  },
  {
    token: {
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      decimals: 6,
      verified: true,
    },
    balance: 450.75,
    value: 450.75,
    price: 1.0,
    change24h: 0.0,
    allocation: 16.5,
  },
  {
    token: {
      mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
      symbol: "mSOL",
      decimals: 9,
      verified: true,
    },
    balance: 2.35,
    value: 357.91,
    price: 152.3,
    change24h: 4.1,
    allocation: 13.1,
  },
  {
    token: {
      mint: "G9EfV6RYW2rux8HcsZnvvnukkfoc4MFFnRRa4Gx2pump",
      symbol: "COINIFY",
      decimals: 6,
      verified: true,
    },
    balance: 8500.0,
    value: 106.25,
    price: 0.0125,
    change24h: 15.8,
    allocation: 3.9,
  },
  {
    token: {
      mint: "4ieEHoWkSR8kQR3s6g2SkihhwzLKbVFK5f8fcZeUpump",
      symbol: "RAGNAR",
      decimals: 6,
      verified: true,
    },
    balance: 1000.0,
    value: 34.5,
    price: 0.0345,
    change24h: 8.2,
    allocation: 1.3,
  },
]

const mockWalletRiskScore = {
  securityScore: 92,
  securityStatus: "Safe",
  securityTrend: "+5%",
  exposureScore: 3,
  exposureStatus: "Low",
  exposureTrend: "-2%",
  approvalScore: 12,
  approvalStatus: "Medium",
  approvalTrend: "+8%",
  trustScore: 87,
  trustStatus: "High",
  trustTrend: "+3%",
  details: {
    approvals: [
      {
        program: "Jupiter Aggregator",
        risk: "Low",
        approved: "2025-03-15T10:23:45Z",
      },
      {
        program: "Raydium Swap",
        risk: "Low",
        approved: "2025-03-10T14:12:30Z",
      },
      {
        program: "Unknown Program",
        risk: "High",
        approved: "2025-04-01T08:45:12Z",
      },
    ],
    exposures: [
      {
        category: "Meme Tokens",
        percentage: 5.2,
        risk: "Medium",
      },
      {
        category: "New Tokens (<30 days)",
        percentage: 3.9,
        risk: "High",
      },
    ],
  },
}
