"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import { ShoppingBag, Star, ExternalLink, Heart, Filter, Target, Sparkles, Palette } from "lucide-react"
import Image from "next/image"

const recommendations = [
  {
    id: 1,
    category: "Shirts",
    items: [
      {
        id: 1,
        name: "Classic White Oxford Shirt",
        brand: "Premium Brand",
        price: "$89",
        rating: 4.8,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://amazon.com/shirt1",
        match: 95,
      },
      {
        id: 2,
        name: "Navy Blue Casual Shirt",
        brand: "Style Co.",
        price: "$65",
        rating: 4.6,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://myntra.com/shirt2",
        match: 92,
      },
    ],
  },
  {
    id: 2,
    category: "Pants",
    items: [
      {
        id: 3,
        name: "Slim Fit Chinos",
        brand: "Urban Style",
        price: "$75",
        rating: 4.7,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://amazon.com/pants1",
        match: 94,
      },
      {
        id: 4,
        name: "Dark Wash Jeans",
        brand: "Denim Co.",
        price: "$95",
        rating: 4.9,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://myntra.com/jeans1",
        match: 90,
      },
    ],
  },
  {
    id: 3,
    category: "Shoes",
    items: [
      {
        id: 5,
        name: "Leather Oxford Shoes",
        brand: "Classic Footwear",
        price: "$150",
        rating: 4.8,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://amazon.com/shoes1",
        match: 96,
      },
      {
        id: 6,
        name: "White Sneakers",
        brand: "Sport Style",
        price: "$120",
        rating: 4.6,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://myntra.com/sneakers1",
        match: 88,
      },
    ],
  },
  {
    id: 4,
    category: "Accessories",
    items: [
      {
        id: 7,
        name: "Classic Leather Watch",
        brand: "Time Master",
        price: "$200",
        rating: 4.9,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://amazon.com/watch1",
        match: 93,
      },
      {
        id: 8,
        name: "Minimalist Wallet",
        brand: "Leather Craft",
        price: "$45",
        rating: 4.7,
        image: "/placeholder.svg?height=300&width=300",
        buyUrl: "https://myntra.com/wallet1",
        match: 91,
      },
    ],
  },
]

export function RecommendationsPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Your Style Recommendations</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Personalized outfit suggestions based on your measurements and style preferences
          </p>
        </div>

        {/* Filter Bar */}
        <Card className="shadow-lg border-0 mb-6 sm:mb-8 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <Button variant="outline" className="shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  All
                </Button>
                <Button variant="ghost" className="shrink-0">Shirts</Button>
                <Button variant="ghost" className="shrink-0">Pants</Button>
                <Button variant="ghost" className="shrink-0">Shoes</Button>
                <Button variant="ghost" className="shrink-0">Accessories</Button>
              </div>
              <div className="text-muted-foreground text-xs sm:text-sm pt-2 sm:pt-0 text-center sm:text-right">
                Based on your measurements: {user?.measurements?.height}cm height, {user?.measurements?.chest}cm chest
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-8">
          {recommendations.map((category) => (
            <div key={category.id}>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">{category.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm h-8 w-8"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Sparkles className="h-3 w-3 mr-1"/>
                          {item.match}% Match
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.brand}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg">{item.price}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-muted-foreground text-sm ml-1">{item.rating}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        onClick={() => window.open(item.buyUrl, "_blank")}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Buy Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Style Tips */}
        <Card className="shadow-lg border-0 mt-8 sm:mt-12 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Palette className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              Style Tips for Your Body Type
            </CardTitle>
            <CardDescription>Personalized advice based on your measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <Target className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Perfect Fits
                </h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Slim-fit shirts work best with your chest-to-waist ratio</li>
                  <li>• Mid-rise pants complement your torso length</li>
                  <li>• Structured shoulders enhance your natural frame</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Color Recommendations
                </h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Navy and white create a classic, versatile look</li>
                  <li>• Earth tones complement your style preferences</li>
                  <li>• Bold colors can be used as accent pieces</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
