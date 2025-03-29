"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { userSettingsSchema, type UserSettingsFormValues } from "@/lib/validations/form-schemas"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface UserSettingsFormProps {
  onSubmit: (data: UserSettingsFormValues) => Promise<void>
  defaultValues?: Partial<UserSettingsFormValues>
}

export function UserSettingsForm({ onSubmit, defaultValues }: UserSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      displayName: "",
      email: "",
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
      ...defaultValues,
    },
  })

  const handleSubmit = async (values: UserSettingsFormValues) => {
    try {
      setIsSubmitting(true)
      await onSubmit(values)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>We'll use this email for notifications and account recovery</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc-0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>All times will be displayed in your local timezone</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Theme Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="light" />
                        </FormControl>
                        <FormLabel className="font-normal">Light</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dark" />
                        </FormControl>
                        <FormLabel className="font-normal">Dark</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="system" />
                        </FormControl>
                        <FormLabel className="font-normal">System</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how you receive security alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Methods</h3>

              <FormField
                control={form.control}
                name="notifications.email"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Email Notifications</FormLabel>
                      <FormDescription>Receive security alerts via email</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifications.browser"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Browser Notifications</FormLabel>
                      <FormDescription>Receive alerts in browser</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifications.twitter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Twitter Alerts</FormLabel>
                      <FormDescription>Receive alerts via Twitter DM</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Types</h3>

              <FormField
                control={form.control}
                name="securityAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Security Alerts</FormLabel>
                      <FormDescription>Critical security issues affecting your wallet or tokens</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="riskWarnings"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Risk Warnings</FormLabel>
                      <FormDescription>Potential risks with moderate severity</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="systemNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">System Notifications</FormLabel>
                      <FormDescription>Updates, maintenance, and feature announcements</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="riskThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Risk Score (50-100)</FormLabel>
                  <FormControl>
                    <Slider
                      min={50}
                      max={100}
                      step={5}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>Only alert for risks above threshold</FormDescription>
                    <span className="text-sm font-medium">Current: {field.value}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

