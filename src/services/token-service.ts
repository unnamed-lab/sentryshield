import type {
  Token,
  TokenCheck,
  TrendingToken,
  VerifiedTokenSimple,
} from "@/types";

// Mock data for development purposes
const mockNewTokens: TokenCheck[] = [
  {
    mint: "0x1234567890abcdef1234567890abcdef12345678",
    tokenMeta: {
      name: "New Token 1",
      symbol: "NT1",
      mutable: true,
      updateAuthority: "0xauth1",
      uri: "https://example.com/token1",
    },
    creator: "0xcreator1",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    score: 85,
    score_normalised: 85,
    price: 0.05,
    totalHolders: 120,
    totalMarketLiquidity: 50000,
    risks: [
      {
        name: "New Token Risk",
        level: "low",
        score: 15,
        description: "Recently created token",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
  {
    mint: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenMeta: {
      name: "New Token 2",
      symbol: "NT2",
      mutable: true,
      updateAuthority: "0xauth2",
      uri: "https://example.com/token2",
    },
    creator: "0xcreator2",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    score: 72,
    score_normalised: 72,
    price: 0.12,
    totalHolders: 85,
    totalMarketLiquidity: 25000,
    risks: [
      {
        name: "New Token Risk",
        level: "medium",
        score: 35,
        description: "Recently created token",
        value: "medium",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
  {
    mint: "0x7890abcdef1234567890abcdef1234567890abcd",
    tokenMeta: {
      name: "New Token 3",
      symbol: "NT3",
      mutable: true,
      updateAuthority: "0xauth3",
      uri: "https://example.com/token3",
    },
    creator: "0xcreator3",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    score: 65,
    score_normalised: 65,
    price: 0.03,
    totalHolders: 42,
    totalMarketLiquidity: 15000,
    risks: [
      {
        name: "New Token Risk",
        level: "high",
        score: 65,
        description: "Very recently created token",
        value: "high",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
];

export const mockTrendingTokens: TrendingToken[] = [
  {
    mint: "0x2345678901abcdef2345678901abcdef23456789",
    up_count: 1250,
    vote_count: 1500,
  },
  {
    mint: "0x3456789012abcdef3456789012abcdef34567890",
    up_count: 980,
    vote_count: 1200,
  },
  {
    mint: "0x4567890123abcdef4567890123abcdef45678901",
    up_count: 850,
    vote_count: 1000,
  },
  {
    mint: "0x5678901234abcdef5678901234abcdef56789012",
    up_count: 720,
    vote_count: 900,
  },
];

const mockTrendingTokenDetails: TokenCheck[] = [
  {
    mint: "0x2345678901abcdef2345678901abcdef23456789",
    tokenMeta: {
      name: "Trending Token 1",
      symbol: "TT1",
      mutable: true,
      updateAuthority: "0xauth4",
      uri: "https://example.com/token4",
    },
    creator: "0xcreator4",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    score: 92,
    score_normalised: 92,
    price: 1.25,
    totalHolders: 5600,
    totalMarketLiquidity: 2500000,
    risks: [
      {
        name: "Liquidity Risk",
        level: "low",
        score: 10,
        description: "High liquidity",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: true,
      jup_verified: true,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
  {
    mint: "0x3456789012abcdef3456789012abcdef34567890",
    tokenMeta: {
      name: "Trending Token 2",
      symbol: "TT2",
      mutable: true,
      updateAuthority: "0xauth5",
      uri: "https://example.com/token5",
    },
    creator: "0xcreator5",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
    score: 88,
    score_normalised: 88,
    price: 0.85,
    totalHolders: 3200,
    totalMarketLiquidity: 1800000,
    risks: [
      {
        name: "Liquidity Risk",
        level: "low",
        score: 15,
        description: "Good liquidity",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: true,
      jup_verified: true,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
];

export const mockVerifiedTokens: VerifiedTokenSimple[] = [
  {
    mint: "0x6789012345abcdef6789012345abcdef67890123",
    name: "Verified Token 1",
    symbol: "VT1",
    domain: "verifiedtoken1.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
  },
  {
    mint: "0x7890123456abcdef7890123456abcdef78901234",
    name: "Verified Token 2",
    symbol: "VT2",
    domain: "verifiedtoken2.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
  },
  {
    mint: "0x8901234567abcdef8901234567abcdef89012345",
    name: "Verified Token 3",
    symbol: "VT3",
    domain: "verifiedtoken3.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days ago
  },
  {
    mint: "0x9012345678abcdef9012345678abcdef90123456",
    name: "Verified Token 4",
    symbol: "VT4",
    domain: "verifiedtoken4.com",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), // 90 days ago
  },
];

const mockVerifiedTokenDetails: TokenCheck[] = [
  {
    mint: "0x6789012345abcdef6789012345abcdef67890123",
    tokenMeta: {
      name: "Verified Token 1",
      symbol: "VT1",
      mutable: false,
      updateAuthority: "0xauth6",
      uri: "https://example.com/token6",
    },
    creator: "0xcreator6",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    score: 98,
    score_normalised: 98,
    price: 5.75,
    totalHolders: 12500,
    totalMarketLiquidity: 8500000,
    risks: [
      {
        name: "Liquidity Risk",
        level: "low",
        score: 5,
        description: "Very high liquidity",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],

    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "Official token of Verified Token 1",
      jup_strict: true,
      jup_verified: true,
      links: [],
      mint: "0x6789012345abcdef6789012345abcdef67890123",
      name: "Verified Token 1",
      payer: "",
      symbol: "VT1",
    },
  },
  {
    mint: "0x7890123456abcdef7890123456abcdef78901234",
    tokenMeta: {
      name: "Verified Token 2",
      symbol: "VT2",
      mutable: false,
      updateAuthority: "0xauth7",
      uri: "https://example.com/token7",
    },
    creator: "0xcreator7",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
    score: 96,
    score_normalised: 96,
    price: 3.25,
    totalHolders: 9800,
    totalMarketLiquidity: 6200000,
    risks: [
      {
        name: "Liquidity Risk",
        level: "low",
        score: 8,
        description: "Very high liquidity",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "Official token of Verified Token 2",
      jup_strict: true,
      jup_verified: true,
      links: [],
      mint: "0x7890123456abcdef7890123456abcdef78901234",
      name: "Verified Token 2",
      payer: "",
      symbol: "VT2",
    },
  },
];

const mockRecentTokens: TokenCheck[] = [
  {
    mint: "0xa123456789abcdefa123456789abcdefa1234567",
    tokenMeta: {
      name: "Recent Token 1",
      symbol: "RT1",
      mutable: true,
      updateAuthority: "0xauth8",
      uri: "https://example.com/token8",
    },
    creator: "0xcreator8",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    score: 78,
    score_normalised: 78,
    price: 0.15,
    totalHolders: 320,
    totalMarketLiquidity: 85000,
    risks: [
      {
        name: "New Token Risk",
        level: "medium",
        score: 40,
        description: "Recently created token",
        value: "medium",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
  {
    mint: "0xb123456789abcdefb123456789abcdefb1234567",
    tokenMeta: {
      name: "Recent Token 2",
      symbol: "RT2",
      mutable: true,
      updateAuthority: "0xauth9",
      uri: "https://example.com/token9",
    },
    creator: "0xcreator9",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    score: 82,
    score_normalised: 82,
    price: 0.28,
    totalHolders: 450,
    totalMarketLiquidity: 120000,
    risks: [
      {
        name: "New Token Risk",
        level: "low",
        score: 25,
        description: "Recently created token",
        value: "low",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
  {
    mint: "0xc123456789abcdefc123456789abcdefc1234567",
    tokenMeta: {
      name: "Recent Token 3",
      symbol: "RT3",
      mutable: true,
      updateAuthority: "0xauth10",
      uri: "https://example.com/token10",
    },
    creator: "0xcreator10",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    score: 75,
    score_normalised: 75,
    price: 0.09,
    totalHolders: 280,
    totalMarketLiquidity: 65000,
    risks: [
      {
        name: "New Token Risk",
        level: "medium",
        score: 35,
        description: "Recently created token",
        value: "medium",
      },
    ],
    tokenProgram: "solana",
    tokenType: "spl",
    // Other required properties with placeholder values
    creatorTokens: [],
    events: [],
    fileMeta: { description: "", image: "", name: "", symbol: "" },
    freezeAuthority: "",
    graphInsidersDetected: 0,
    insiderNetworks: [],
    knownAccounts: {},
    lockerOwners: {},
    lockers: {},
    markets: [],
    mintAuthority: "",
    rugged: false,
    token: "",
    token_extensions: "",
    topHolders: [],
    totalLPProviders: 0,
    transferFee: { authority: "", maxAmount: 0, pct: 0 },
    verification: {
      description: "",
      jup_strict: false,
      jup_verified: false,
      links: [],
      mint: "",
      name: "",
      payer: "",
      symbol: "",
    },
  },
];

// Service functions
export const getNewTokens = async (): Promise<Token[]> => {
  const response = await fetch("https://api.rugcheck.xyz/v1/stats/new_tokens", {
    next: { revalidate: 60000 },
  });

  if (!response.ok) return [];

  const data: Token[] = await response.json();
  return data;
};

export const getTrendingTokens = async (): Promise<TrendingToken[]> => {
  const response = await fetch("https://api.rugcheck.xyz/v1/stats/recent", {
    next: { revalidate: 60000 },
  });

  if (!response.ok) return [];

  const data: TrendingToken[] = await response.json();
  return data;
};

export const getTrendingTokenDetails = async (): Promise<TokenCheck[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTrendingTokenDetails), 500);
  });
};

export const getVerifiedTokens = async (): Promise<VerifiedTokenSimple[]> => {
  const response = await fetch("https://api.rugcheck.xyz/v1/stats/verified", {
    next: { revalidate: 60000 },
  });

  if (!response.ok) return [];

  const data: VerifiedTokenSimple[] = await response.json();
  return data;
};

export const getVerifiedTokenDetails = async (): Promise<TokenCheck[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVerifiedTokenDetails), 500);
  });
};

export const getRecentTokens = async (): Promise<TokenCheck[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecentTokens), 500);
  });
};

export const getTokenDetails = async (
  address: string
): Promise<TokenCheck | null> => {
  // In a real app, this would fetch from an API
  const allTokens = [
    ...mockNewTokens,
    ...mockTrendingTokenDetails,
    ...mockVerifiedTokenDetails,
    ...mockRecentTokens,
  ];

  const token = allTokens.find((t) => t.mint === address);

  return new Promise((resolve) => {
    setTimeout(() => resolve(token || null), 500);
  });
};
