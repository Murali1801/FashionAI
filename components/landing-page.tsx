"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  Sparkles, 
  Camera, 
  Zap, 
  Users, 
  ArrowRight, 
  Star, 
  Check, 
  Play, 
  Shield, 
  Smartphone, 
  Palette, 
  Heart, 
  Wand2,
  TrendingUp,
  Target,
  Award,
  Clock,
  Eye,
  Plus,
  Share2,
  Download,
  Settings,
  Menu,
  ChevronDown
} from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("features")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const features = [
    {
      icon: <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-violet-500" />,
      title: "AI Photo Analysis",
      description: "Upload your photo and our advanced AI instantly detects your body measurements with 95% accuracy.",
      category: "AI",
      progress: 100,
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
      title: "Style Recommendations",
      description: "Get personalized outfit suggestions based on your measurements, style preferences, and current trends.",
      category: "Style",
      progress: 100,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
      title: "Mobile First",
      description: "Access your style recommendations anywhere with our mobile-optimized platform.",
      category: "Mobile",
      progress: 100,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never share your personal information.",
      category: "Security",
      progress: 100,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />,
      title: "Instant Results",
      description: "Get your personalized fashion recommendations in seconds, not minutes.",
      category: "Speed",
      progress: 100,
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />,
      title: "Style Community",
      description: "Join thousands of users discovering their perfect style with FashionAI.",
      category: "Social",
      progress: 85,
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "FashionAI completely transformed my shopping experience. The recommendations are spot-on!",
      rating: 5,
      avatar: "SJ",
      verified: true
    },
    {
      name: "Mike Chen",
      role: "Tech Professional",
      content: "Finally, a fashion app that actually understands my body type. The AI is incredibly accurate.",
      rating: 5,
      avatar: "MC",
      verified: true
    },
    {
      name: "Emma Davis",
      role: "Student",
      content: "I love how easy it is to use. The recommendations have helped me build a better wardrobe.",
      rating: 5,
      avatar: "ED",
      verified: true
    }
  ]

  const stats = [
    { label: "Happy Users", value: "50K+", icon: <Users className="h-4 w-4" /> },
    { label: "Recommendations", value: "1M+", icon: <Sparkles className="h-4 w-4" /> },
    { label: "Accuracy Rate", value: "95%", icon: <Target className="h-4 w-4" /> },
    { label: "Rating", value: "4.9", icon: <Star className="h-4 w-4" /> }
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-radial-hero-animation" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex aspect-square size-8 sm:size-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-4 sm:size-5" />
              </div>
              <div className="hidden sm:block">
                <h2 className="font-semibold text-lg md:text-xl">FashionAI</h2>
                <p className="text-xs text-muted-foreground">Style Assistant</p>
              </div>
              <div className="sm:hidden">
                <h2 className="font-semibold text-base">FashionAI</h2>
        </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
                <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 p-2">
                  <div className="space-y-2">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full h-10 text-base">Login</Button>
                    </Link>
                    <Link href="/signup" className="block">
                      <Button className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base">Get Started</Button>
          </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-4 text-xs sm:text-sm">
              <Sparkles className="mr-2 h-3 w-3" />
              AI-Powered Fashion
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Your Personal
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Style Assistant
            </span>
          </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Upload your photo and get AI-powered fashion recommendations tailored to your body measurements and style preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-auto">
              Start Your Style Journey
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-auto">
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Watch Demo
          </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-12 sm:mb-16 md:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-base sm:text-lg px-4">Everything you need to discover your perfect style</p>
        </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-sm sm:max-w-md mx-auto grid-cols-3 h-10 sm:h-11">
              <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-xs sm:text-sm">Reviews</TabsTrigger>
              <TabsTrigger value="stats" className="text-xs sm:text-sm">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 p-4 sm:p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="p-2 rounded-lg bg-muted">
                            {feature.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {feature.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-2" />
                        </div>
                      </CardContent>
          </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 p-4 sm:p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardDescription className="italic text-sm">
                          "{testimonial.content}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {testimonial.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                          </div>
                          {testimonial.verified && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </CardContent>
          </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 p-4 sm:p-6">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-center mb-2">
                          {stat.icon}
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
          </Card>
                  </motion.div>
                ))}
        </div>
            </TabsContent>
          </Tabs>
      </section>

        {/* CTA Section */}
        <section className="mb-12 sm:mb-16 md:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to Transform Your Style?</h2>
            <p className="text-muted-foreground text-base sm:text-lg px-4">Join thousands of users who have discovered their perfect style with FashionAI</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 border-0 shadow-2xl">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-400/5 dark:to-blue-400/5" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl" />
              
              <CardContent className="relative p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                  {/* Left side - Content */}
                  <div className="text-left space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <Badge variant="outline" className="w-fit text-xs sm:text-sm">
                        <Sparkles className="mr-2 h-3 w-3" />
                        Get Started Today
                      </Badge>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Start Your Style Journey
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                        Upload your first photo and get instant AI-powered fashion recommendations. 
                        Join our community of style enthusiasts and discover your perfect look.
                      </p>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium">Free to get started</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium">Instant AI analysis</span>
          </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
          </div>
                        <span className="text-xs sm:text-sm font-medium">Privacy guaranteed</span>
            </div>
          </div>
        </div>
                  
                  {/* Right side - CTA */}
                  <div className="flex flex-col items-center lg:items-end space-y-4 sm:space-y-6">
                    <div className="text-center lg:text-right space-y-3 sm:space-y-4">
                      <div className="space-y-2">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Free Forever
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          No credit card required
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/signup" className="w-full sm:w-auto">
                          <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12 sm:h-auto">
                            <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Get Started Free
            </Button>
          </Link>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-auto">
                          <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Watch Demo
                        </Button>
                      </div>
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>50K+ users</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.9 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
        </Card>
          </motion.div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-xl mt-12 sm:mt-16 md:mt-24">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              &copy; 2024 FashionAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
