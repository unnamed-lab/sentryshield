"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { NotificationList } from "@/components/ui/notifications"

export default function NotificationsPage() {
  const { notifications, markAsRead, deleteNotification, clearAllNotifications } = useNotifications()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">View and manage your notifications and alerts</p>
        </div>
        <Button variant="outline" onClick={clearAllNotifications} disabled={notifications.length === 0}>
          Clear All Notifications
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Stay informed about security risks, token alerts, and system updates</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No notifications</h3>
              <p className="text-muted-foreground max-w-sm">
                You don't have any notifications yet. Check back later for updates.
              </p>
            </div>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onDeleteNotification={deleteNotification}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

