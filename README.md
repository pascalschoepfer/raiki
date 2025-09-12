# Raiki

A modern, cyberpunk-inspired website for cybersecurity, digital experiences, and web3 services. Built with Next.js 15, React 19, and featuring interactive neural network animations with blockchain integration via RainbowKit.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd raiki

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework

### Web3 Integration
- **@rainbow-me/rainbowkit 2.2.8** - Web3 wallet connection UI
- **wagmi 2.16.9** - React hooks for Ethereum
- **viem 2.37.5** - TypeScript interface for Ethereum
- **@tanstack/react-query 5.87.1** - Data fetching and state management

### Development Tools
- **ESLint 9** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── MouseTrail.js          # Interactive neural network animation
│   │   └── RaikiLogo.js           # Company logo component
│   ├── contact/
│   │   └── page.js                # Contact form page
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.js                  # Root layout with providers
│   ├── page.js                    # Home page
│   └── providers.js               # Web3 and query client providers
├── public/
│   └── favicon.svg                # Site icon
└── Configuration files...
```

## 🎨 Features

### Interactive Design
- **Neural Network Animation**: Real-time particle system that responds to mouse movement
- **Electrical Effects**: Dynamic color transitions between yellow and green
- **Cyberpunk Aesthetic**: Dark gradient backgrounds with electrical particle trails
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Web3 Integration
- **Multi-chain Support**: Mainnet, Polygon, Optimism, Arbitrum, Base, Sepolia
- **Wallet Connection**: RainbowKit integration for seamless wallet connection
- **Modern Web3 Stack**: Latest wagmi and viem for type-safe Ethereum interactions

### Form Handling
- **Contact Form**: Fully functional contact form with validation
- **Loading States**: Visual feedback during form submission
- **Success Messages**: User-friendly confirmation messages

## 🎯 Components Documentation

### MouseTrail Component (`src/app/components/MouseTrail.js`)
Interactive canvas-based neural network animation.

**Features:**
- Real-time particle generation on mouse movement
- Electrical crackling effects with sparks
- Dynamic connections between nearby particles
- Smooth color transitions (yellow ↔ green)
- Performance optimized with throttling and particle limits

**Props:** None

### RaikiLogo Component (`src/app/components/RaikiLogo.js`)
SVG-based company logo with cyberpunk styling and scramble/glitch text effects.

**Features:**
- Scalable SVG icon with geometric hexagonal patterns
- ScrambleGlitchText effect for header logo (25% chance, 50% character scrambling)
- RGB glitch shadows with red/blue offset animations
- Customizable via className prop
- Consistent branding across pages

**Props:**
- `className` (string, optional): Additional CSS classes

### MatrixText Component (`src/app/components/MatrixText.js`)
Authentic matrix-style text reveal animation using Japanese characters.

**Features:**
- One-time reveal animation (runs once, stays revealed)
- Japanese character scrambling for authentic cyberpunk aesthetic
- Layout-stable design prevents text shifting
- Two-phase animation: scrambling → progressive reveal
- Performance optimized with consistent 120ms timing

**Props:**
- `text` (string): The text to animate
- `className` (string, optional): Additional CSS classes

### Providers Component (`src/app/providers.js`)
Web3 and query client providers wrapper.

**Features:**
- RainbowKit wallet connection setup
- Multi-chain configuration
- React Query integration
- SSR compatibility

## 📝 Configuration

### Web3 Setup
Update the `projectId` in `src/app/providers.js`:

```javascript
const config = getDefaultConfig({
  appName: 'Raiki Blockchain Services',
  projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});
```

### Styling
The project uses Tailwind CSS 4 with custom color schemes and animations:
- Dark mode support
- Custom gradient backgrounds
- Cyberpunk color palette
- Smooth animations and transitions

## 🚦 Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🌐 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The application can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Performance Optimizations

- **Turbopack Integration**: Fast development builds
- **Component Optimization**: Efficient re-renders and state management
- **Canvas Performance**: Throttled mouse events and particle limits
- **Next.js Features**: Automatic code splitting and optimization

## 🔧 Customization

### Colors
Modify the color scheme in the `MouseTrail` component's `getColorAtTime()` function:

```javascript
// Current: Yellow (255, 193, 7) ↔ Green (76, 175, 80)
const r = Math.round(255 - (255 - 76) * colorPhase);
const g = Math.round(193 + (175 - 193) * colorPhase);
const b = Math.round(7 + (80 - 7) * colorPhase);
```

### Particle Effects
Adjust animation parameters in `MouseTrail.js`:
- `throttleDelay`: Mouse movement throttling (default: 120ms)
- `particleLimit`: Maximum particles (default: 45)
- `connectionDistance`: Connection range (default: 90px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

This project is private and proprietary to Raiki.

## 📞 Support

For questions or support, visit the contact page or reach out through the provided channels.