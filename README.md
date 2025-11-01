# 🍂 WealthBridge - Fall Edition

A gamified financial education platform designed to help users in minority communities build credit, learn smart investing, and connect with mentors.

## 🎯 Features

### 1. **Landing Page**
- Animated fall leaves background
- Warm gradient (amber to burnt orange)
- Clear call-to-action buttons
- Mission statement and feature highlights

### 2. **Financial Education Hub**
Two comprehensive learning modules:
- **Credit Repair 101**: Understanding credit scores, reports, building history
- **Investing Basics**: Introduction to stocks, bonds, risk management, portfolio diversification
- Interactive progress tracking
- Gamified quizzes with instant feedback

### 3. **Credit Builder Dashboard**
- Real-time credit score display
- Visual credit factor breakdown (Payment History, Utilization, etc.)
- Personalized action plan with tasks
- Expert tips for credit improvement
- Score trend tracking

### 4. **Smart Investing Simulator**
- Practice investing with virtual currency (Leaf Tokens 🍂)
- Portfolio management interface
- Real-time gain/loss tracking
- Multiple investment options (ETFs, Index Funds, etc.)
- Risk-free environment to learn

### 5. **Wealth Navigator (AI Agent)**
- Chat-style AI financial advisor
- Personalized tips and guidance
- Achievement tracking
- Daily streak counter
- Motivational quotes
- Quick response buttons for common questions

### 6. **Mentorship Hub**
- Grid of expert mentor profiles
- Filter by expertise (Credit, Investing, Real Estate, etc.)
- Detailed mentor bios and ratings
- Session scheduling interface
- Direct messaging capability

### 7. **Achievements Dashboard**
- Level-based progression system
- Unlockable achievements across categories
- Community leaderboard
- Growing autumn tree visualization
- Gold leaf badges

## 🎨 Design Theme

**Fall-Inspired Color Palette:**
- Primary: `#C85C0E` (Pumpkin Orange)
- Secondary: `#8B4513` (Chestnut Brown)
- Accent: `#F2C57C` (Golden Wheat)
- Background: `#FFF8E7` (Cream Beige)
- Highlights: `#6A4E23` (Dark Wood)
- Hover/Glow: `#FFAC4A` (Amber Glow)

**Visual Elements:**
- Falling leaves animation
- Gradient overlays with sunset tones
- Frosted-glass card effects
- Smooth transitions and hover effects
- Responsive design for all devices

**Typography:**
- Sans-serif: Poppins (clean, modern)
- Serif: Merriweather (warm, classic for headings)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Copy environment variables and update them with your Firebase project details:
```bash
cp .env.example .env.local
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

> **Tip:** If Firebase credentials are not provided, the app now falls back to a local "demo mode" that stores authentication data in `localStorage`. This lets you explore the UI without a backend connection.

## 📁 Project Structure

```
wealth-bridge/
├── app/
│   ├── page.tsx                 # Landing/Home page
│   ├── education/               # Financial Education Hub
│   ├── credit-builder/          # Credit Builder Dashboard
│   ├── investing/               # Smart Investing Simulator
│   ├── navigator/               # AI Wealth Navigator
│   ├── mentorship/              # Mentorship Hub
│   ├── achievements/            # Achievements Dashboard
│   ├── layout.tsx               # Root layout with navbar
│   └── globals.css              # Global styles
├── components/
│   ├── Navbar.tsx               # Navigation component
│   └── FallingLeaves.tsx        # Animated leaves component
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Font**: Google Fonts (Poppins, Merriweather)

## ✨ Key Features Implementation

### Interactive Elements
- Clickable lesson completion tracking
- Real-time portfolio value calculations
- Dynamic quiz system with scoring
- Chat interface with AI responses
- Filterable mentor directory

### Gamification
- Point system across all activities
- Achievement unlocking mechanism
- Daily streak tracking
- Level progression
- Visual growth tree
- Community leaderboard

### Animations
- Falling leaves background effect
- Smooth page transitions
- Hover state animations
- Progress bar animations
- Card hover effects

## 🔮 Future Enhancements

- [ ] Winter theme switch (December)
- [ ] Plaid API integration for real credit tracking
- [ ] AI voice companion
- [ ] Background music (fireplace crackle, rustling leaves)
- [ ] User authentication and data persistence
- [ ] Real-time mentor chat functionality
- [ ] Push notifications for achievements
- [ ] Mobile app version

## 📄 License

This project is part of the WealthBridge initiative to provide accessible financial education.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

---

**Built with ❤️ to empower financial freedom in minority communities** 🍂
