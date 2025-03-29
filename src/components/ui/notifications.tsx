"use client"

import * as React from "react"
import { Bell, Check, X, AlertTriangle, Info, Shield, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"

// Type for notification
export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error" | "security"
  read: boolean
  createdAt: Date
  actionUrl?: string
  actionLabel?: string
}

// Notification dropdown
interface NotificationDropdownProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

export function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      case "security":
        return <Shield className="h-4 w-4 text-primary" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[300px] overflow-y-auto py-1">
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-3 gap-1 cursor-default",
                  !notification.read && "bg-muted/50",
                )}
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex w-full items-start gap-2">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {!notification.read && (
                          <span className="inline-block h-2 w-2 rounded-full bg-primary mr-1"></span>
                        )}
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(notification.createdAt, "MMM d, h:mm a")}
                      </span>
                      {notification.actionUrl && (
                        <Link href={notification.actionUrl} className="text-xs text-primary hover:underline">
                          {notification.actionLabel || "View details"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground text-sm">No notifications</p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 flex items-center justify-between">
              <Link href="/dashboard/notifications">
                <Button variant="link" size="sm" className="h-8 p-0 text-xs">
                  View all notifications
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={onClearAll}
              >
                Clear all
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Notification dialog
interface NotificationDialogProps {
  notification: Notification
  onClose: () => void
  onMarkAsRead: (id: string) => void
}

export function NotificationDialog({ notification, onClose, onMarkAsRead }: NotificationDialogProps) {
  React.useEffect(() => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }, [notification, onMarkAsRead])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      case "security":
        return <Shield className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getNotificationIcon(notification.type)}
            {notification.title}
          </DialogTitle>
          <DialogDescription>{format(notification.createdAt, "MMMM d, yyyy h:mm a")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>{notification.message}</p>
          {notification.actionUrl && (
            <div className="flex justify-end">
              <Link href={notification.actionUrl}>
                <Button>{notification.actionLabel || "View details"}</Button>
              </Link>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Notification list
interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDeleteNotification: (id: string) => void
}

export function NotificationList({ notifications, onMarkAsRead, onDeleteNotification }: NotificationListProps) {
  const [selectedNotification, setSelectedNotification] = React.useState<Notification | null>(null)
  const [activeTab, setActiveTab] = React.useState("all")

  const filteredNotifications = React.useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read)
      case "read":
        return notifications.filter((n) => n.read)
      case "security":
        return notifications.filter((n) => n.type === "security")
      default:
        return notifications
    }
  }, [notifications, activeTab])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      case "security":
        return <Shield className="h-4 w-4 text-primary" />
    }
  }

  return (
    <>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/50",
                    !notification.read && "bg-muted/30 border-primary/20",
                  )}
                  onClick={() => setSelectedNotification(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-primary mr-1"></span>
                            )}
                            {notification.title}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onMarkAsRead(notification.id)
                                }}
                              >
                                {notification.read ? "Mark as unread" : "Mark as read"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDeleteNotification(notification.id)
                                }}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {format(notification.createdAt, "MMM d, yyyy h:mm a")}
                          </span>
                          {notification.actionUrl && (
                            <Link
                              href={notification.actionUrl}
                              className="text-xs text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {notification.actionLabel || "View details"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-muted-foreground max-w-sm">
                  {activeTab === "all"
                    ? "You don't have any notifications yet."
                    : `You don't have any ${activeTab} notifications.`}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedNotification && (
        <NotificationDialog
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onMarkAsRead={onMarkAsRead}
        />
      )}
    </>
  )
}

