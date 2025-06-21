"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { User, Save, Edit, Loader2, AlertCircle, Settings, Target, TrendingUp, Heart } from "lucide-react"

export function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    height: user?.measurements?.height || 0,
    chest: user?.measurements?.chest || 0,
    waist: user?.measurements?.waist || 0,
    hips: user?.measurements?.hips || 0,
    shoulders: user?.measurements?.shoulders || 0,
  })

  const handleSave = async () => {
    setLoading(true)
    setError("")

    try {
      await updateUser({
      name: formData.name,
      email: formData.email,
      measurements: {
        height: formData.height,
        chest: formData.chest,
        waist: formData.waist,
        hips: formData.hips,
        shoulders: formData.shoulders,
      },
    })
    setEditing(false)
    } catch (error) {
      console.error("Update failed:", error)
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Manage your personal information and measurements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Personal Information */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <span className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Personal Information
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(!editing)}
                  disabled={loading}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {editing ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
              <CardDescription>Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing || loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!editing || loading}
                />
              </div>
              {editing && (
                <Button 
                  onClick={handleSave} 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Body Measurements */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Target className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Body Measurements
              </CardTitle>
              <CardDescription>
                Your measurements for accurate recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    disabled={!editing || loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    value={formData.chest}
                    onChange={(e) => setFormData({ ...formData, chest: Number(e.target.value) })}
                    disabled={!editing || loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={formData.waist}
                    onChange={(e) => setFormData({ ...formData, waist: Number(e.target.value) })}
                    disabled={!editing || loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    value={formData.hips}
                    onChange={(e) => setFormData({ ...formData, hips: Number(e.target.value) })}
                    disabled={!editing || loading}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="shoulders">Shoulders (cm)</Label>
                  <Input
                    id="shoulders"
                    type="number"
                    value={formData.shoulders}
                    onChange={(e) => setFormData({ ...formData, shoulders: Number(e.target.value) })}
                    disabled={!editing || loading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Stats */}
        <Card className="shadow-lg border-0 mt-6 sm:mt-8 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 dark:from-purple-950/10 dark:via-transparent dark:to-blue-950/10">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <TrendingUp className="mr-2 h-5 w-5" />
              Profile Statistics
            </CardTitle>
            <CardDescription>Your FashionAI journey overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-purple-100/80 to-purple-50/80 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
                <div className="text-xl sm:text-2xl font-bold mb-1">15</div>
                <div className="text-muted-foreground text-xs sm:text-sm">Photos Analyzed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                <div className="text-xl sm:text-2xl font-bold mb-1">42</div>
                <div className="text-muted-foreground text-xs sm:text-sm">Recommendations</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-indigo-100/80 to-indigo-50/80 dark:from-indigo-950/30 dark:to-indigo-900/30 rounded-lg border border-indigo-200/50 dark:border-indigo-800/30">
                <div className="text-xl sm:text-2xl font-bold mb-1">8</div>
                <div className="text-muted-foreground text-xs sm:text-sm">Saved Outfits</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-100/80 to-pink-50/80 dark:from-pink-950/30 dark:to-pink-900/30 rounded-lg border border-pink-200/50 dark:border-pink-800/30">
                <div className="text-xl sm:text-2xl font-bold mb-1">96%</div>
                <div className="text-muted-foreground text-xs sm:text-sm">Style Match</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
