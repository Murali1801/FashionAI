# FashionAI - AI-Powered Fashion Recommendations

A Next.js application that provides AI-powered fashion recommendations based on user body measurements.

## Features

- 🔐 **Firebase Authentication** - Secure user authentication with email/password
- 📸 **Photo Analysis** - Upload photos for AI-powered body measurement detection
- 👔 **Personalized Recommendations** - Fashion items tailored to your measurements
- 🎨 **Modern UI** - Beautiful glass-morphism design with dark/light mode
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔄 **Real-time Updates** - Firebase Firestore for data persistence

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FashionAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Firebase**

   Create a `.env.local` file in the root directory with your Firebase configuration:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Configure Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Get your configuration from Project Settings > General > Your apps

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup

### Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Email/Password provider
3. Configure any additional settings (password reset, etc.)

### Firestore Database
1. Go to Firestore Database
2. Create a database in production mode
3. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Project Structure

```
FashionAI/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Main dashboard
│   ├── login/            # Authentication pages
│   ├── signup/
│   ├── profile/          # User profile management
│   ├── recommendations/  # Fashion recommendations
│   ├── settings/         # App settings
│   └── upload/           # Photo upload & analysis
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── profile/         # Profile components
│   ├── recommendations/ # Recommendation components
│   ├── settings/        # Settings components
│   ├── upload/          # Upload components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility functions
│   ├── firebase.ts      # Firebase configuration
│   └── utils.ts         # General utilities
└── hooks/               # Custom React hooks
```

## Environment Variables

Make sure to set up these environment variables in your `.env.local` file:

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Your Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Your Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Your Firebase measurement ID (optional)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 