"use client"

import { useState, useEffect } from "react"
import type { Notification } from "@/components/ui/notifications"

// Mock notifications data
const getMockNotifications = (): Notification[] => {
  const now = new Date()

  return [
    {
      id: "1",
      title: "High Risk Token Detected",
      message:
        "We've detected a high-risk token (0x7a250d5...) in your wallet. This token shows patterns consistent with scam tokens.",
      type: "warning",
      read: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 30), // 30 minutes ago
      actionUrl: "/dashboard/token-scanner",
      actionLabel: "Scan Token",
    },
    {
      id: "2",
      title: "Unlimited Token Approval",
      message:
        "You have an unlimited spending approval for USDT to Uniswap router. Consider revoking or limiting this approval.",
      type: "security",
      read: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      actionUrl: "/dashboard/wallets/approvals",
      actionLabel: "Manage Approvals",
    },
    {
      id: "3",
      title: "Security Scan Completed",
      message: "Your weekly security scan has been completed. No critical issues were found.",
      type: "success",
      read: true,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      actionUrl: "/dashboard/reports",
      actionLabel: "View Report",
    },
    {
      id: "4",
      title: "Wallet Profile Updated",
      message: "Your wallet profiling has been updated with the latest on-chain data.",
      type: "info",
      read: true,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "5",
      title: "New Token Verification",
      message: "A token you track (UNI) has been verified by the team.",
      type: "info",
      read: true,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      actionUrl: "/dashboard/tokens/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      actionLabel: "View Token",
    },
  ]
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications
  useEffect(() => {
    // In a real app, we'd fetch notifications from an API
    // For now, we'll use mock data
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      try {
        // Parse dates correctly
        const parsed = JSON.parse(storedNotifications, (key, value) => {
          if (key === "createdAt") {
            return new Date(value)
          }
          return value
        })
        setNotifications(parsed)
      } catch (error) {
        console.error("Failed to parse stored notifications:", error)
        const mockData = getMockNotifications()
        setNotifications(mockData)
        localStorage.setItem("notifications", JSON.stringify(mockData))
      }
    } else {
      const mockData = getMockNotifications()
      setNotifications(mockData)
      localStorage.setItem("notifications", JSON.stringify(mockData))
    }
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification,
      ),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      read: false,
      ...notification,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    clearAllNotifications,
  }
}

