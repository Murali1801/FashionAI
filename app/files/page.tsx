"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { db } from "@/lib/firebase"
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Camera } from "lucide-react"

export default function FilesPage() {
  const { user } = useAuth()
  const [photos, setPhotos] = useState<{ id: string; url: string; uploadedAt?: any }[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

  const handleDelete = async (photoId: string) => {
    if (!user?.id) return
    setDeletingId(photoId)
    await deleteDoc(doc(db, "users", user.id, "photos", photoId))
    setPhotos(photos => photos.filter(photo => photo.id !== photoId))
    setDeletingId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40 dark:from-blue-950/10 dark:to-purple-950/10">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Camera className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              Files Uploaded
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : !user?.id ? (
              <div className="text-center text-muted-foreground">Please log in to view your uploaded files.</div>
            ) : photos.length === 0 ? (
              <div className="text-center text-muted-foreground">No photos uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, idx) => (
                  <div key={photo.id} className="flex flex-col items-center w-full">
                    <img
                      src={photo.url}
                      alt="Uploaded"
                      className="rounded-lg w-full h-40 object-cover mb-2 border cursor-pointer"
                      onClick={() => setPreviewUrl(photo.url)}
                      style={{ maxWidth: '100%' }}
                    />
                    <span className="text-xs text-muted-foreground mb-2 text-center w-full break-words">
                      {photo.uploadedAt?.toDate ? photo.uploadedAt.toDate().toLocaleString() : ""}
                    </span>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      disabled={deletingId === photo.id}
                      className="text-xs text-red-600 border border-red-200 rounded px-2 py-1 hover:bg-red-50 disabled:opacity-50 w-full"
                    >
                      {deletingId === photo.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {previewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-4 max-w-full w-full sm:max-w-lg relative flex flex-col items-center">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl sm:text-xl"
                onClick={() => setPreviewUrl(null)}
                aria-label="Close preview"
              >
                &times;
              </button>
              <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] rounded object-contain" />
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 