// Base Interfaces
export interface AuthMessage {
  message: string
  publicKey: string
  timestamp: number
}

export interface Signature {
  data: number[]
  type: string
}

// Authentication
export interface AuthRequest {
  message: AuthMessage
  signature: Signature
  wallet: string
}

export interface AuthResponse {
  token: string
}

// Token Interfaces
export interface Risk {
  description: string
  level: string
  name: string
  score: number
  value: string
}

export interface TokenCheckSummary {
  risks: Risk[]
  score: number
  score_normalised: number
  tokenProgram: string
  tokenType: string
}

export interface TokenMetadata {
  mutable: boolean
  name: string
  symbol: string
  updateAuthority: string
  uri: string
}

export interface TokenInfoAgg {
  metadata: TokenMetadata
  mint: string
  score: number
  user_visits: number
  visits: number
}

// Verification
export interface TokenVerificationData {
  dataIntegrityAccepted: boolean
  description: string
  links: Record<string, string>
  solDomain: string
  termsAccepted: boolean
}

export interface TokenVerificationRequest {
  data: TokenVerificationData
  mint: string
  payer: string
  signature: string
}

export interface TokenVerificationTransactionRequest {
  data: TokenVerificationData
  mint: string
  payer: string
  priority_fee?: number
}

export interface TokenVerificationTransactionResponse {
  transaction: string
}

// Eligibility
export interface EligibilityResponse {
  created_recently: boolean
  duplicate: boolean
  exists: boolean
  freeze_authority_set: boolean
  liquidity_unlocked: boolean
  metadata_missing: boolean
  mint_authority_set: boolean
  risk_score: number
}

export interface TokenEligibilityResponse {
  criteria: EligibilityResponse
  eligible: boolean
  mint: string
}

// Vault
export interface Locker {
  owner: string
  programID: string
  tokenAccount: string
  type: string
  unlockDate: number
  uri: string
  usdcLocked: number
}

export interface VaultResponseSummary {
  pct: number
  totalUSDC: number
}

export interface VaultResponse {
  lockers: Record<string, Locker>
  total: VaultResponseSummary
}

// Voting
export interface VoteResponse {
  down: number
  up: number
  userVoted: boolean
}

// Domain
export interface VerifiedTokenSimple {
  createdAt: string
  domain: string
  mint: string
  name: string
  symbol: string
}

export interface DomainResponse {
  tokens: VerifiedTokenSimple[]
}

// Error Handling
export interface ErrorResponse {
  error: string
}

// Success Response
export interface SuccessResponse {
  ok: boolean
}

// Ping
export interface Pong {
  message: string
}

// Rugcheck API Specific Interfaces
export interface CreatorToken {
  createdAt: string
  marketCap: number
  mint: string
}

export interface FileMetadata {
  description: string
  image: string
  name: string
  symbol: string
}

export interface InsiderNetwork {
  activeAccounts: number
  id: string
  size: number
  tokenAmount: number
  type: string
}

export interface KnownAccount {
  name: string
  type: string
}

export interface TokenEvent {
  createdAt: string
  event: number
  newValue: string
  oldValue: string
}

export interface TokenHolder {
  address: string
  amount: number
  decimals: number
  insider: boolean
  owner: string
  pct: number
  uiAmount: number
  uiAmountString: string
}

export interface MarketLP {
  base: number
  baseMint: string
  basePrice: number
  baseUSD: number
  currentSupply: number
  holders: TokenHolder[]
  lpCurrentSupply: number
  lpLocked: number
  lpLockedPct: number
  lpLockedUSD: number
  lpMaxSupply: number
  lpMint: string
  lpTotalSupply: number
  lpUnlocked: number
  pctReserve: number
  pctSupply: number
  quote: number
  quoteMint: string
  quotePrice: number
  quoteUSD: number
  reserveSupply: number
  tokenSupply: number
  totalTokensUnlocked: number
}

export interface Market {
  liquidityA: string
  liquidityAAccount: string
  liquidityB: string
  liquidityBAccount: string
  lp: MarketLP
  marketType: string
  mintA: string
  mintAAccount: string
  mintB: string
  mintBAccount: string
  mintLP: string
  mintLPAccount: string
  pubkey: string
}

export interface Token {
  createdAt: string
  creator: string
  decimals: number
  events: TokenEvent[]
  freezeAuthority: string
  mint: string
  mintAuthority: string
  program: string
  symbol: string
  updatedAt: string
}

export interface VerifiedTokenLinks {
  provider: string
  value: string
}

// Verified Token
export interface VerifiedToken {
  description: string
  jup_strict: boolean
  jup_verified: boolean
  links: VerifiedTokenLinks[]
  mint: string
  name: string
  payer: string
  symbol: string
}

export interface TokenCheck {
  creator: string
  creatorTokens: CreatorToken[]
  detectedAt: string
  events: TokenEvent[]
  fileMeta: FileMetadata
  freezeAuthority: string
  graphInsidersDetected: number
  insiderNetworks: InsiderNetwork[]
  knownAccounts: Record<string, KnownAccount>
  lockerOwners: Record<string, boolean>
  lockers: Record<string, Locker>
  markets: Market[]
  mint: string
  mintAuthority: string
  price: number
  risks: Risk[]
  rugged: boolean
  score: number
  score_normalised: number
  token: string
  tokenMeta: TokenMetadata
  tokenProgram: string
  tokenType: string
  token_extensions: string
  topHolders: TokenHolder[]
  totalHolders: number
  totalLPProviders: number
  totalMarketLiquidity: number
  transferFee: {
    authority: string
    maxAmount: number
    pct: number
  }
  verification: VerifiedToken
}

// Trending Tokens
export interface TrendingToken {
  mint: string
  up_count: number
  vote_count: number
}

// User
export interface User {
  username: string
  votes: number
  weight: number
  wins: number
}

