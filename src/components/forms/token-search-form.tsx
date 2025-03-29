"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { tokenSearchSchema, type TokenSearchFormValues } from "@/lib/validations/form-schemas"

interface TokenSearchFormProps {
  onSubmit: (data: TokenSearchFormValues) => Promise<void>
  defaultValues?: Partial<TokenSearchFormValues>
}

export function TokenSearchForm({ onSubmit, defaultValues }: TokenSearchFormProps) {
  const [isSearching, setIsSearching] = useState(false)

  const form = useForm<TokenSearchFormValues>({
    resolver: zodResolver(tokenSearchSchema),
    defaultValues: {
      query: "",
      ...defaultValues,
    },
  })

  const handleSubmit = async (values: TokenSearchFormValues) => {
    try {
      setIsSearching(true)
      await onSubmit(values)
    } catch (error) {
      console.error("Error submitting search:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2 w-full">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input placeholder="Enter token address or ENS name..." className="w-full pl-8" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSearching}>
          {isSearching ? "Scanning..." : "Scan"}
        </Button>
      </form>
    </Form>
  )
}

