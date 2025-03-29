"use client"

import { useState } from "react"
import { UserSettingsForm } from "@/components/forms/user-settings-form"
import type { UserSettingsFormValues } from "@/lib/validations/form-schemas"
import { TokenVerificationForm } from "@/components/forms/token-verification-form"
import type { TokenVerificationRequest } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account")

  const handleSettingsSubmit = async (data: UserSettingsFormValues) => {
    console.log("Settings form submitted:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    console.log("Settings updated successfully")
  }

  const handleVerificationSubmit = async (data: TokenVerificationRequest) => {
    console.log("Verification form submitted:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    console.log("Verification request submitted successfully")
  }

  // Default values for the settings form
  const defaultSettings: Partial<UserSettingsFormValues> = {
    displayName: "John Doe",
    email: "john.doe@example.com",
    timezone: "utc-5",
    theme: "dark",
    notifications: {
      email: true,
      browser: true,
      twitter: false,
    },
    securityAlerts: true,
    riskWarnings: true,
    systemNotifications: true,
    riskThreshold: 60,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="verification">Token Verification</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <UserSettingsForm onSubmit={handleSettingsSubmit} defaultValues={defaultSettings} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Security settings coming soon
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Notification settings coming soon
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <TokenVerificationForm onSubmit={handleVerificationSubmit} />
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Subscription settings coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

