"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db, googleProvider } from "@/lib/firebase"

interface User {
  id: string
  email: string
  name: string
  photoURL?: string
  measurements?: {
    height: number
    chest: number
    waist: number
    hips: number
    shoulders: number
  }
  inAppNotificationsEnabled?: boolean
  fcmToken?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        const userData = userDoc.data()
        
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || userData?.name || "",
          photoURL: firebaseUser.photoURL || undefined,
          measurements: userData?.measurements || undefined,
          inAppNotificationsEnabled: userData?.inAppNotificationsEnabled ?? true,
          fcmToken: userData?.fcmToken || undefined,
        }
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Update display name
      await updateProfile(firebaseUser, { displayName: name })

      // Create user document in Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name,
        email,
        createdAt: new Date(),
      })

      return true
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
      
      if (!userDoc.exists()) {
        // Create new user document for Google sign-in
        await setDoc(doc(db, "users", firebaseUser.uid), {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          createdAt: new Date(),
          provider: 'google'
        })
      }

      return true
    } catch (error) {
      console.error("Google login failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      try {
        // Update Firestore document
        const userRef = doc(db, "users", user.id)
        const updateData: any = {}
        
        if (userData.name) {
          updateData.name = userData.name
          // Also update Firebase Auth display name
          if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: userData.name })
          }
        }
        
        if (userData.email) {
          updateData.email = userData.email
        }
        
        if (userData.photoURL) {
          updateData.photoURL = userData.photoURL
          // Also update Firebase Auth photo URL
          if (auth.currentUser) {
            await updateProfile(auth.currentUser, { photoURL: userData.photoURL })
          }
        }
        
        if (userData.measurements) {
          updateData.measurements = userData.measurements
        }

        if (userData.inAppNotificationsEnabled !== undefined) {
          updateData.inAppNotificationsEnabled = userData.inAppNotificationsEnabled
        }

        if (userData.fcmToken !== undefined) {
          updateData.fcmToken = userData.fcmToken
        }

        updateData.updatedAt = new Date()

        await setDoc(userRef, updateData, { merge: true })

        // Update local state
        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)
      } catch (error) {
        console.error("Update user failed:", error)
        throw error
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
