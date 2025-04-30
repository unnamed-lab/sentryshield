"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { tokenVerificationSchema, type TokenVerificationFormValues } from "@/lib/validations/form-schemas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { TokenVerificationRequest } from "@/types"

interface TokenVerificationFormProps {
  onSubmit: (data: TokenVerificationRequest) => Promise<void>
  defaultValues?: Partial<TokenVerificationFormValues>
}

export function TokenVerificationForm({ onSubmit, defaultValues }: TokenVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [links, setLinks] = useState<{ key: string; value: string }[]>([{ key: "website", value: "" }])

  const form = useForm<TokenVerificationFormValues>({
    resolver: zodResolver(tokenVerificationSchema),
    defaultValues: {
      mint: "",
      description: "",
      solDomain: "",
      dataIntegrityAccepted: false,
      termsAccepted: false,
      links: {},
      ...defaultValues,
    },
  })

  const handleAddLink = () => {
    setLinks([...links, { key: "", value: "" }])
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleLinkChange = (index: number, field: "key" | "value", value: string) => {
    const newLinks = [...links]
    newLinks[index][field] = value
    setLinks(newLinks)
  }

  const handleSubmit = async (values: TokenVerificationFormValues) => {
    try {
      setIsSubmitting(true)

      // Convert links array to record
      const linksRecord: Record<string, string> = {}
      links.forEach((link) => {
        if (link.key && link.value) {
          linksRecord[link.key] = link.value
        }
      })

      // Create verification request
      const verificationRequest: TokenVerificationRequest = {
        mint: values.mint,
        payer: "PLACEHOLDER_WALLET_ADDRESS", // This would come from the connected wallet
        signature: "PLACEHOLDER_SIGNATURE", // This would be generated on submission
        data: {
          description: values.description,
          solDomain: values.solDomain || "",
          dataIntegrityAccepted: values.dataIntegrityAccepted,
          termsAccepted: values.termsAccepted,
          links: linksRecord,
        },
      }

      await onSubmit(verificationRequest)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Verification</CardTitle>
        <CardDescription>Verify your token to increase trust and visibility in the ecosystem</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Mint Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter token mint address" {...field} />
                  </FormControl>
                  <FormDescription>The mint address of the token you want to verify</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your token and its purpose" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>{"Provide a clear description of your token's purpose and utility"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SOL Domain (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="yourtoken.sol" {...field} />
                  </FormControl>
                  <FormDescription>Link a SOL domain to your token for additional verification</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Project Links</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddLink} className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Add Link</span>
                </Button>
              </div>

              {links.map((link, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Type (e.g., website, twitter)"
                      value={link.key}
                      onChange={(e) => handleLinkChange(index, "key", e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.value}
                      onChange={(e) => handleLinkChange(index, "value", e.target.value)}
                    />
                  </div>
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLink(index)}
                      className="h-10 w-10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Alert className="bg-muted">
              <AlertDescription>
                By verifying your token, you agree to our verification process and community guidelines. Verified tokens
                receive a badge and are prioritized in search results.
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="dataIntegrityAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I confirm that all information provided is accurate and complete</FormLabel>
                    <FormDescription>
                      Providing false information may result in verification being revoked
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the Terms of Service and Privacy Policy</FormLabel>
                    <FormDescription>You must agree to our terms to proceed with verification</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Verification Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

