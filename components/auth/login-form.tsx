"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles, Loader2, AlertCircle, Wand2, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { FirebaseError } from "firebase/app"
import { motion } from "framer-motion"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
        router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setError("No account found with this email address")
            break
          case "auth/wrong-password":
            setError("Incorrect password")
            break
          case "auth/invalid-email":
            setError("Invalid email address")
            break
          case "auth/too-many-requests":
            setError("Too many failed attempts. Please try again later")
            break
          default:
            setError("Login failed. Please try again")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError("")

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error) {
      console.error("Google login failed:", error)
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            setError("Sign-in was cancelled")
            break
          case "auth/popup-blocked":
            setError("Pop-up was blocked. Please allow pop-ups for this site")
            break
          case "auth/cancelled-popup-request":
            setError("Sign-in was cancelled")
            break
          default:
            setError("Google sign-in failed. Please try again")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-2xl">
            {/* Card background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl" />
            
            <CardHeader className="relative text-center pb-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center mb-4"
              >
                <div className="relative">
                  <div className="flex aspect-square size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg">
                    <Wand2 className="size-7" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 opacity-20 blur-xl"></div>
        </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-1"
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  FashionAI
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Style Assistant</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4"
              >
                <Badge variant="outline" className="mb-2 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Welcome Back
                </Badge>
                <CardTitle className="text-xl font-bold">Sign in to your account</CardTitle>
                <CardDescription className="text-muted-foreground mt-1 text-sm">
                  Continue your style journey with personalized recommendations
        </CardDescription>
              </motion.div>
      </CardHeader>
            
            <CardContent className="relative space-y-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</span>
                </motion.div>
              )}
              
              {/* Google Sign-in Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={loading || googleLoading}
                  className="w-full h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 font-medium"
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in with Google...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-3 text-muted-foreground font-medium">Or continue with email</span>
                </div>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                onSubmit={handleSubmit} 
                className="space-y-3"
              >
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Email address
            </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
                      className="h-11 pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
            />
          </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="password"
                      type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
                      className="h-11 pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
          </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg" 
                  disabled={loading || googleLoading}
                >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
                    "Sign In with Email"
            )}
          </Button>
              </motion.form>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
                  <Link href="/signup" className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                    Create one now
            </Link>
          </p>
              </motion.div>
      </CardContent>
    </Card>
        </motion.div>
      </div>
    </div>
  )
}
