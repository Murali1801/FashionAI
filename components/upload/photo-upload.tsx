"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { UploadCloud, Loader2, PartyPopper, AlertCircle, RefreshCcw, Camera } from "lucide-react"
import Image from "next/image"

export function PhotoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "completed" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError(null)
    if (fileRejections.length > 0) {
      setError("File is too large or not a valid image type.")
      return
    }
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
      setStatus("idle")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  const handleAnalyze = async () => {
    if (!file) return
    setStatus("uploading")
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus("analyzing")
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setStatus("completed")
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setStatus("idle")
    setError(null)
  }

  const renderContent = () => {
    switch (status) {
      case "uploading":
      case "analyzing":
        return (
          <div className="text-center space-y-4 py-12">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-purple-600" />
            <p className="text-lg font-semibold">{status === "uploading" ? "Uploading..." : "Analyzing your photo..."}</p>
            <p className="text-muted-foreground">This may take a few moments. Please don't close this window.</p>
          </div>
        )
      case "completed":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center ring-4 ring-green-200 dark:ring-green-800/50">
              <PartyPopper className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Analysis Complete!</h2>
            <p className="text-muted-foreground">
              We've extracted your measurements. You can view them in your profile.
            </p>
            <Card className="text-left shadow-inner bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-100 dark:border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-lg">Your AI-Generated Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-semibold">Height:</span> 175cm</div>
                  <div><span className="font-semibold">Chest:</span> 98cm</div>
                  <div><span className="font-semibold">Waist:</span> 82cm</div>
                  <div><span className="font-semibold">Hips:</span> 95cm</div>
                  <div><span className="font-semibold">Shoulders:</span> 45cm</div>
                  <div><span className="font-semibold">Inseam:</span> 80cm</div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleReset} variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Analyze Another Photo
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">View Recommendations</Button>
            </div>
          </div>
        )
      case "error":
      case "idle":
      default:
        return (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center cursor-pointer transition-colors
                ${isDragActive ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30" : "border-muted-foreground/30 hover:border-purple-500"}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-4">
                {preview ? (
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-lg overflow-hidden">
                    <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <p className="font-semibold text-base sm:text-lg">
                  {isDragActive ? "Drop the file here..." : "Drag & drop a photo, or click to select"}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">PNG or JPG (max. 5MB)</p>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
              </div>
            )}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" onClick={handleReset} disabled={!file}>Cancel</Button>
              <Button 
                onClick={handleAnalyze} 
                disabled={!file}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Camera className="mr-2 h-4 w-4" />
                Analyze Photo
              </Button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Photo Analysis</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Upload your full-body photo for AI-powered measurements and personalized style recommendations
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-purple-50/20 via-transparent to-blue-50/20 dark:from-purple-950/10 dark:via-transparent dark:to-blue-950/10">
          <CardContent className="p-4 sm:p-6">
            {renderContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
