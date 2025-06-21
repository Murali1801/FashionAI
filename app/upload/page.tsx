import { PhotoUpload } from "@/components/upload/photo-upload"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <PhotoUpload />
    </ProtectedRoute>
  )
}
