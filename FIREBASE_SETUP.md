# Firebase Setup Guide for FashionAI

This guide will walk you through setting up Firebase for your FashionAI application.

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `fashionai-a4f24` (or your preferred name)
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

## 🔐 Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

### Enable Google Authentication
1. In the same **Sign-in method** tab, click on **Google**
2. Toggle "Enable"
3. Add your **Project support email** (your email address)
4. Click **Save**

### Optional: Enable Additional Providers
- **Password reset** (for forgot password functionality)
- **Email verification** (for email verification)

## 🗄️ Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (choose closest to your users)
5. Click **Done**

## 📁 Step 4: Set Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the content from `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to update their own profile data
      allow update: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(['name', 'email', 'photoURL', 'measurements', 'preferences', 'updatedAt']);
    }
    
    // User measurements collection (if you want to separate measurements)
    match /users/{userId}/measurements/{measurementId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User photos collection (for uploaded photos)
    match /users/{userId}/photos/{photoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User recommendations collection (for saved recommendations)
    match /users/{userId}/recommendations/{recommendationId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User favorites collection (for saved items)
    match /users/{userId}/favorites/{favoriteId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public fashion items collection (read-only for authenticated users)
    match /fashion-items/{itemId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can modify fashion items
    }
    
    // Public categories collection (read-only for authenticated users)
    match /categories/{categoryId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can modify categories
    }
    
    // User activity logs (for analytics)
    match /users/{userId}/activity/{activityId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User settings collection
    match /users/{userId}/settings/{settingId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

## 📦 Step 5: Set up Storage (Optional)

If you plan to handle photo uploads:

1. In Firebase Console, go to **Storage**
2. Click **Get started**
3. Choose **Start in production mode**
4. Select a location (same as Firestore)
5. Go to **Rules** tab and add the content from `storage.rules`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile photos - users can only upload/access their own photos
    match /users/{userId}/profile-photos/{photoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User measurement photos - for AI analysis
    match /users/{userId}/measurement-photos/{photoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate file type (only images)
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 10 * 1024 * 1024 // 10MB max
        && request.resource.contentType.matches('image/.*');
    }
    
    // User outfit photos - for style tracking
    match /users/{userId}/outfit-photos/{photoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate file type and size
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024 // 5MB max
        && request.resource.contentType.matches('image/.*');
    }
    
    // Public fashion item images (read-only for authenticated users)
    match /fashion-items/{itemId}/images/{imageId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can upload fashion item images
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish**

## 🔑 Step 6: Get Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** and choose **Web** (</>)
4. Register app with name: `FashionAI Web App`
5. Copy the configuration object

## 📝 Step 7: Environment Variables

Create a `.env.local` file in your project root with the Firebase config:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDgik6kVfoMifhkK2KEqszVqLo3CcE-KE0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fashionai-a4f24.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fashionai-a4f24
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fashionai-a4f24.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=542194531131
NEXT_PUBLIC_FIREBASE_APP_ID=1:542194531131:web:f71559a060413b0a2a551e
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-PGML810W0Y
```

## 🧪 Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000`

3. Try to:
   - Sign up with a new email account
   - Sign in with Google account
   - Log in with the created account
   - Update profile information
   - Upload a photo (if storage is configured)

## 🔒 Security Best Practices

### Firestore Rules
- ✅ Users can only access their own data
- ✅ Public collections are read-only for authenticated users
- ✅ File type and size validation for uploads
- ✅ Deny all by default
- ✅ Support for Google authentication data (photoURL)

### Authentication
- ✅ Email/password authentication enabled
- ✅ Google authentication enabled
- ✅ Password minimum length enforced (6 characters)
- ✅ Rate limiting on failed attempts
- ✅ Pop-up handling for Google sign-in

### Storage
- ✅ File size limits (5-10MB)
- ✅ Image file type validation
- ✅ User-specific access control

## 🚀 Deployment Considerations

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy your application
3. Firebase will work automatically

### Other Platforms
- Ensure environment variables are set
- Firebase works with any hosting platform

## 📊 Monitoring

1. **Authentication**: Monitor sign-ups and sign-ins in Firebase Console
2. **Firestore**: Check database usage and performance
3. **Storage**: Monitor file uploads and storage usage
4. **Analytics**: Track user behavior (if enabled)

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase App not initialized"**
   - Check environment variables are correct
   - Ensure `.env.local` file exists

2. **"Permission denied"**
   - Verify Firestore rules are published
   - Check user authentication status

3. **"Storage not configured"**
   - Enable Firebase Storage
   - Set up storage rules

4. **"Authentication failed"**
   - Enable Email/Password provider
   - Enable Google provider
   - Check Firebase project configuration

5. **"Google sign-in popup blocked"**
   - Allow pop-ups for your domain
   - Check browser settings
   - Try in incognito mode

6. **"Google sign-in not working"**
   - Verify Google provider is enabled in Firebase Console
   - Check project support email is set
   - Ensure domain is authorized (for production)

### Debug Mode:
Add this to your `lib/firebase.ts` for debugging:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig);
}
```

## 🔧 Google Authentication Setup

### Additional Configuration for Production:

1. **Authorized Domains**:
   - Go to Authentication → Settings → Authorized domains
   - Add your production domain (e.g., `your-app.vercel.app`)

2. **OAuth Consent Screen** (if needed):
   - Go to Google Cloud Console
   - Configure OAuth consent screen
   - Add necessary scopes

3. **API Keys** (if needed):
   - Ensure Google Sign-In API is enabled
   - Check API quotas and limits

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify all configuration steps are completed
3. Test with a simple Firebase app first
4. Check Firebase documentation for updates
5. For Google auth issues, check Google Cloud Console 