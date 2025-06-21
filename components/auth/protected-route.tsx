"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Wand2 } from "lucide-react"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-6" />
              </div>
            </div>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we verify your authentication</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-6" />
              </div>
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need to be logged in to access this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login" className="block">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
