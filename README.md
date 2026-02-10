# Word-A-Day

A modern vocabulary building web application that helps users learn a new word every day, track their progress, and compete with others through gamification.

## 🌟 Features

### Core Learning Features
- **Daily Word Discovery** - Get a new word every day with definitions, phonetics, and audio pronunciation
- **Personal Vocabulary** - Build and manage your personal word collection
- **Interactive Quiz** - Test your knowledge with multiple-choice questions
- **Progress Tracking** - Monitor your learning streak and XP points
- **Audio Pronunciation** - Listen to correct word pronunciations

### Gamification & Social
- **Leaderboard System** - Compete with other learners and climb the rankings
- **Streak Tracking** - Maintain daily learning habits
- **XP Points** - Earn experience points for learning activities
- **Achievement Celebrations** - Confetti animations for milestones

### User Experience
- **Dark Theme** - Beautiful dark mode design with gradient backgrounds
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Authentication** - Secure user login with Firebase Auth

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - Modern React with latest features
- **TypeScript** - Type-safe development experience

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.19.1** - Smooth animations and transitions
- **Inter Font** - Clean, modern typography

### Backend & Database
- **Firebase** - Authentication and real-time database
- **Firestore** - NoSQL document database for user data
- **Dictionary API** - External API for word definitions

### Additional Libraries
- **React Feather** - Beautiful icon components
- **Canvas Confetti** - Celebration animations
- **Lucide React** - Additional icon set

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Its-BB/word-a-day.git
   cd word-a-day
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
word-a-day/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── components/         # Reusable React components
│   │   │   ├── AuthStatusBar.tsx
│   │   │   ├── ClientLayout.tsx
│   │   │   ├── FloatingIcons.tsx
│   │   │   └── NavBar.tsx
│   │   ├── daily-word/         # Daily word feature
│   │   ├── vocab/              # Vocabulary management
│   │   ├── quiz/               # Quiz functionality
│   │   ├── leaderboard/        # Leaderboard display
│   │   ├── providers/          # React context providers
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   └── firebase.ts             # Firebase configuration
├── public/                     # Static assets
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Key Components

### Homepage (`src/app/page.tsx`)
- Landing page with navigation cards
- Feature overview with icons and descriptions
- Smooth animations and hover effects
- Call-to-action to start learning

### Daily Word (`src/app/daily-word/page.tsx`)
- Displays a new word each day
- Shows definition, phonetic, and pronunciation
- Add words to personal vocabulary
- Audio pronunciation support
- Streak tracking integration

### Vocabulary Management (`src/app/vocab/page.tsx`)
- Personal word collection display
- Mark words as mastered or for review
- Audio pronunciation for each word
- Bulk operations for word management
- Visual indicators for learning status

### Quiz System (`src/app/quiz/page.tsx`)
- Multiple-choice questions from vocabulary
- Randomized answer options
- Score tracking and feedback
- Confetti celebrations for correct answers
- XP points integration

### Authentication (`src/app/providers/AuthProvider.tsx`)
- Firebase Authentication integration
- User session management
- Streak and XP tracking
- Anonymous user support

## 🎨 Design System

### Color Palette
- **Background**: Dark gradient from black to gray
- **Primary Text**: Light gray (#ededed)
- **Secondary Text**: Medium gray (#bfc1c6)
- **Accent**: Interactive hover states

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (regular), 700 (bold)
- **Sizes**: Responsive scaling from mobile to desktop

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Hover States**: Scale and shadow transformations
- **Micro-interactions**: Button press and card hover effects
- **Celebrations**: Confetti for achievements

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (recommended)

### Firebase Configuration
The app uses Firebase for:
- **Authentication**: User login and session management
- **Firestore**: Store user vocabulary, streaks, and progress
- **Real-time Updates**: Sync data across devices

## 🎮 Game Mechanics

### Streak System
- **Daily Check-in**: Maintain streak by visiting daily
- **Streak Reset**: Missing a day resets the streak
- **Visual Indicators**: Fire icons and streak counters

### XP Points
- **Daily Word**: Points for discovering new words
- **Quiz Completion**: Bonus points for correct answers
- **Vocabulary Building**: Points for adding words to collection

### Leaderboard
- **Global Ranking**: See top performers
- **Personal Ranking**: Track your position
- **Competition**: Motivation through social comparison

## 🌐 External APIs

### Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Purpose**: Fetch word definitions, phonetics, and audio
- **Fallback**: Local word list if API is unavailable

### Firebase Services
- **Authentication**: User login and session management
- **Firestore**: Real-time database for user data
- **Hosting**: Optional for production deployment

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Other Platforms
- **Netlify**: Compatible with Next.js
- **AWS**: Can be deployed with serverless functions
- **Docker**: Containerized deployment available

## 🔧 Environment Variables

### Required Variables
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password and Google providers)
3. Create Firestore database
4. Configure security rules for user data access
5. Copy configuration values to environment variables

## 📱 Features in Detail

### Daily Word Learning
- **Word Selection**: Curated vocabulary with varying difficulty
- **Definitions**: Clear, concise explanations
- **Phonetics**: Pronunciation guides
- **Audio**: Native speaker pronunciation
- **Context**: Usage examples and part of speech

### Vocabulary Management
- **Personal Collection**: Save words for later review
- **Learning States**: New, Learning, Mastered
- **Review Queue**: Words needing reinforcement
- **Search & Filter**: Find specific words quickly

### Quiz System
- **Adaptive Difficulty**: Questions based on your vocabulary
- **Multiple Choice**: 4 options per question
- **Instant Feedback**: Know immediately if you're correct
- **Progress Tracking**: See improvement over time

## 🎯 User Journey

1. **Sign Up**: Create account or continue as guest
2. **Daily Visit**: Check in for new word and maintain streak
3. **Learn**: Read definition, listen to pronunciation
4. **Save**: Add interesting words to personal vocabulary
5. **Practice**: Take quizzes to reinforce learning
6. **Compete**: Climb leaderboard and earn achievements
7. **Review**: Manage and master personal vocabulary

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test features thoroughly
- Maintain code consistency

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Dictionary API** - For comprehensive word definitions
- **Firebase** - Authentication and real-time database services
- **Next.js Team** - Excellent React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animation library
- **React Feather** - Beautiful icon components

## 📞 Support & Feedback

For questions, suggestions, or bug reports:
- Open an issue on GitHub
- Contact the development team
- Join our community discussions

---

Made for a project
