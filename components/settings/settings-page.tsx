"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Lock, Bell, Palette, Save, Loader2, ShieldCheck, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { requestNotificationPermission } from "@/lib/fcm"

export function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [emailUpdates, setEmailUpdates] = useState(false)
  const [inAppNotifications, setInAppNotifications] = useState(user?.inAppNotificationsEnabled ?? true)
  const [pushNotifications, setPushNotifications] = useState(!!user?.fcmToken)

  useEffect(() => {
    if (user) {
      setInAppNotifications(user.inAppNotificationsEnabled ?? true)
      setPushNotifications(!!user.fcmToken)
    }
    // You could also fetch and set emailUpdates from user settings here
  }, [user])

  const handlePasswordChange = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.")
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.")
      setLoading(false)
      return
    }
    
    // Simulate API call for password change
    await new Promise(resolve => setTimeout(resolve, 1500))

    // This is where you would integrate with Firebase Auth to update password
    console.log("Password changed")
    
    setSuccess("Password updated successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setLoading(false)
  }

  const handleInAppNotificationToggle = async (checked: boolean) => {
    setInAppNotifications(checked)
    try {
      await updateUser({ inAppNotificationsEnabled: checked })
      toast.success("Notification settings updated!")
    } catch (error) {
      toast.error("Failed to update settings.")
      // Revert state on error
      setInAppNotifications(!checked)
    }
  }

  const handlePushNotificationToggle = async (checked: boolean) => {
    setPushNotifications(checked)
    if (checked) {
      const fcmToken = await requestNotificationPermission()
      if (fcmToken) {
        await updateUser({ fcmToken })
        toast.success("Push notifications enabled!")
      } else {
        setPushNotifications(false)
        toast.error("Failed to enable push notifications.")
      }
    } else {
      await updateUser({ fcmToken: null })
      toast.success("Push notifications disabled.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Customize your FashionAI experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Security Settings */}
          <Card className="shadow-lg border-0 lg:col-span-2 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Lock className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="text-green-700 dark:text-green-400 text-sm">{success}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              <Button 
                onClick={handlePasswordChange} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Palette className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Theme</Label>
                  <p className="text-muted-foreground text-sm">Switch between light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-lg border-0 lg:col-span-2 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Bell className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Notifications
              </CardTitle>
              <CardDescription>Control how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive alerts even when the app is closed</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={handlePushNotificationToggle}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">In-App Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive notifications inside the app</p>
                </div>
                <Switch 
                  checked={inAppNotifications} 
                  onCheckedChange={handleInAppNotificationToggle}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Email Updates</Label>
                  <p className="text-muted-foreground text-sm">Get weekly style tips and updates</p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50/50 via-transparent to-orange-50/50 dark:from-pink-950/20 dark:via-transparent dark:to-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Settings className="mr-2 h-5 w-5 text-pink-600 dark:text-pink-400" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your style preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Preferred Style</Label>
                <Select defaultValue="casual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="trendy">Trendy</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Budget Range</Label>
                 <Select defaultValue="mid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget ($0-$50)</SelectItem>
                    <SelectItem value="mid">Mid-range ($50-$150)</SelectItem>
                    <SelectItem value="premium">Premium ($150+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
