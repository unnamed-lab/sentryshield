import * as z from "zod"

// Token verification form schema
export const tokenVerificationSchema = z.object({
  mint: z.string().min(1, "Token mint address is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  solDomain: z.string().optional(),
  dataIntegrityAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the data integrity statement",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  links: z.record(z.string().url("Please enter a valid URL")).optional(),
})

export type TokenVerificationFormValues = z.infer<typeof tokenVerificationSchema>

// User settings form schema
export const userSettingsSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  timezone: z.string().min(1, "Please select a timezone"),
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme",
  }),
  notifications: z.object({
    email: z.boolean().default(true),
    browser: z.boolean().default(true),
    twitter: z.boolean().default(false),
  }),
  securityAlerts: z.boolean().default(true),
  riskWarnings: z.boolean().default(true),
  systemNotifications: z.boolean().default(true),
  riskThreshold: z.number().min(50).max(100),
})

export type UserSettingsFormValues = z.infer<typeof userSettingsSchema>

// Wallet monitoring form schema
export const walletMonitoringSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  autoScan: z.boolean().default(true),
  scanFrequency: z.enum(["hourly", "daily", "weekly"], {
    required_error: "Please select a scan frequency",
  }),
  approvalMonitoring: z.boolean().default(true),
  transactionAlerts: z.boolean().default(true),
})

export type WalletMonitoringFormValues = z.infer<typeof walletMonitoringSchema>

// Token search form schema
export const tokenSearchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
})

export type TokenSearchFormValues = z.infer<typeof tokenSearchSchema>

