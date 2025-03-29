"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  publicKey: string
  username?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isConnecting: boolean
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("sentryshield-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("sentryshield-user")
      }
    }
  }, [])

  // Mock Civic Auth SDK integration
  const connectWallet = async () => {
    try {
      setIsConnecting(true)

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create mock user
      const mockUser = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        publicKey: `0x${Math.random().toString(36).substr(2, 40)}`,
        username: "Demo User",
      }

      // Save user to state and localStorage
      setUser(mockUser)
      localStorage.setItem("sentryshield-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setUser(null)
    localStorage.removeItem("sentryshield-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isConnecting,
        isConnected: !!user,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

