"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { db } from "@/lib/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Ruler, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyzePage() {
  // --- State and logic ---
  const { user } = useAuth()
  const [photos, setPhotos] = useState<{ id: string; url: string; uploadedAt?: any }[]>([])
  const [loading, setLoading] = useState(true)
  const [selectModalOpen, setSelectModalOpen] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  useEffect(() => {
    if (user?.id) {
      const fetchPhotos = async () => {
        setLoading(true)
        const q = query(collection(db, "users", user.id, "photos"), orderBy("uploadedAt", "desc"))
        const snapshot = await getDocs(q)
        setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; url: string; uploadedAt?: any }[])
        setLoading(false)
      }
      fetchPhotos()
    } else {
      setLoading(false)
    }
  }, [user?.id])

  // --- UI ---
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40 dark:from-blue-950/10 dark:to-purple-950/10">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Ruler className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              Analyze Uploaded Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 1. Select Photo Button */}
            <section className="flex flex-col items-center gap-6 mb-6">
              <Button
                variant="outline"
                className="max-w-xs w-full border-2 border-purple-300 text-purple-700 font-semibold shadow-sm hover:bg-purple-50 transition"
                onClick={() => setSelectModalOpen(true)}
                disabled={loading || analyzing}
              >
                <Ruler className="mr-2 h-5 w-5" />
                Select Photo from Your Files
              </Button>
            </section>

            {/* 2. Modal for Photo Selection */}
            {selectModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-2 sm:p-4 max-w-full w-full sm:max-w-2xl relative shadow-2xl animate-fade-in">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
                    onClick={() => setSelectModalOpen(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h3 className="text-lg font-bold mb-4 text-center">Select a Photo</h3>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-2" />
                      <span className="text-muted-foreground">Loading your photos...</span>
                    </div>
                  ) : photos.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">No photos uploaded yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {photos.map(photo => (
                        <div
                          key={photo.id}
                          className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedPhotoId === photo.id ? 'border-purple-500 ring-2 ring-purple-400' : 'border-transparent hover:border-purple-300'}`}
                          onClick={() => {
                            setSelectedPhotoId(photo.id)
                            setResult(null)
                            setSelectModalOpen(false)
                          }}
                        >
                          <img src={photo.url} alt="Uploaded" className="w-full h-32 object-cover" />
                          {selectedPhotoId === photo.id && (
                            <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-green-500 bg-white rounded-full shadow" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Preview and Analyze UI */}
            {selectedPhotoId && (
              <section className="flex flex-col items-center gap-4 mt-4 w-full">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-purple-200 bg-white dark:bg-gray-900 animate-fade-in p-2 sm:p-4 mb-4">
                  <img
                    src={photos.find(p => p.id === selectedPhotoId)?.url || ''}
                    alt="Selected Preview"
                    className="w-full h-auto max-w-full max-h-[60vh] object-contain"
                  />
                </div>
                <Button
                  className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-md text-lg py-2"
                  onClick={async () => {
                    setAnalyzing(true)
                    setResult(null)
                    try {
                      const photoUrl = photos.find(p => p.id === selectedPhotoId)?.url
                      if (!photoUrl) throw new Error('No photo selected')
                      // Fetch the image as a blob
                      const imgRes = await fetch(photoUrl)
                      const imgBlob = await imgRes.blob()
                      // Send to analysis API
                      const formData = new FormData()
                      formData.append('file', imgBlob, 'photo.jpg')
                      const apiRes = await fetch('https://body-measurements-api.onrender.com/predict', {
                        method: 'POST',
                        body: formData,
                      })
                      if (!apiRes.ok) throw new Error('Failed to analyze photo')
                      const json = await apiRes.json()
                      setResult(json)
                    } catch (err: any) {
                      setResult({ error: err.message })
                    }
                    setAnalyzing(false)
                  }}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <span className="flex items-center justify-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</span>
                  ) : (
                    "Analyze Photo"
                  )}
                </Button>
              </section>
            )}

            {/* 4. Results */}
            {result && !analyzing && (
              <section className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 text-sm bg-gradient-to-br from-purple-100/80 to-blue-100/80 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-3 sm:p-4 shadow animate-fade-in mx-auto">
                <div className="font-semibold mb-2 text-center text-purple-700 dark:text-purple-300">Measurements</div>
                {result.error ? (
                  <div className="text-red-600 text-center">{result.error}</div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(result)
                      .filter(([k]) => k !== 'skin_complexion')
                      .map(([k, v]) => (
                        <div key={k} className="capitalize"><span className="font-medium">{k}:</span> {v}</div>
                      ))}
                  </div>
                )}
              </section>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 