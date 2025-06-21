"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { Camera, User, Sparkles, TrendingUp, ShoppingBag, Clock, Activity } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    if (user?.inAppNotificationsEnabled) {
      toast.success(`Welcome to your dashboard, ${user?.name || 'style seeker'}!`)
    }
  }, [user?.name, user?.inAppNotificationsEnabled])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Ready to discover your perfect style today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Quick Actions */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Camera className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Upload Photo
              </CardTitle>
              <CardDescription>
                Get AI-powered measurements and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Start Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Style Recommendations
              </CardTitle>
              <CardDescription>View your personalized outfit suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/recommendations">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  View Outfits
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <User className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Profile Settings
              </CardTitle>
              <CardDescription>Update your measurements and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/profile">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="shadow-lg border-0 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-100/80 to-purple-50/80 dark:from-purple-950/30 dark:to-purple-900/30">
            <div className="text-center">
              <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
              <div className="text-xl sm:text-2xl font-bold">12</div>
              <div className="text-muted-foreground text-xs sm:text-sm">Recommendations</div>
            </div>
          </Card>

          <Card className="shadow-lg border-0 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-950/30 dark:to-blue-900/30">
            <div className="text-center">
              <ShoppingBag className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-xl sm:text-2xl font-bold">5</div>
              <div className="text-muted-foreground text-xs sm:text-sm">Saved Items</div>
            </div>
          </Card>

          <Card className="shadow-lg border-0 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-indigo-100/80 to-indigo-50/80 dark:from-indigo-950/30 dark:to-indigo-900/30">
            <div className="text-center">
              <Camera className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
              <div className="text-xl sm:text-2xl font-bold">3</div>
              <div className="text-muted-foreground text-xs sm:text-sm">Photos Analyzed</div>
            </div>
          </Card>

          <Card className="shadow-lg border-0 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-pink-100/80 to-pink-50/80 dark:from-pink-950/30 dark:to-pink-900/30">
            <div className="text-center">
              <Sparkles className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-pink-600 dark:text-pink-400" />
              <div className="text-2xl sm:text-xl font-bold">95%</div>
              <div className="text-muted-foreground text-xs sm:text-sm">Match Score</div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 dark:from-purple-950/10 dark:via-transparent dark:to-blue-950/10">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest style discoveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
                <div className="flex items-center space-x-3">
                  <Camera className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Photo analyzed</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">2 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">New recommendations available</p>
                    <p className="text-muted-foreground text-sm">1 day ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
