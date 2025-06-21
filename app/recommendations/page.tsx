import { RecommendationsPage } from "@/components/recommendations/recommendations-page"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function Recommendations() {
  return (
    <ProtectedRoute>
      <RecommendationsPage />
    </ProtectedRoute>
  )
}
