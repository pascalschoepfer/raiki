# API Documentation

This document provides technical specifications for the Raiki application's architecture, configuration, and development guidelines.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Runtime**: React 19.1.0 with concurrent features
- **Styling**: Tailwind CSS 4 with utility-first approach
- **Web3**: RainbowKit + wagmi + viem stack
- **State Management**: React Query for server state
- **Build Tool**: Turbopack for fast development builds

### Project Structure
```
raiki/
├── src/app/                    # Next.js App Router directory
│   ├── components/            # Reusable UI components
│   ├── contact/              # Contact page route
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.js           # Root layout with metadata
│   ├── page.js            # Home page component
│   └── providers.js      # Web3 and query providers
├── public/              # Static assets
├── Configuration files...
└── Documentation files...
```

## 🎨 Component API

### RaikiLogo Component

#### Type Definition
```typescript
interface RaikiLogoProps {
  className?: string;
}

declare function RaikiLogo(props: RaikiLogoProps): JSX.Element;
```

#### Usage Examples
```jsx
// Basic usage
<RaikiLogo />

// With custom styling
<RaikiLogo className="scale-150 opacity-80" />

// In navigation
<nav>
  <RaikiLogo className="h-8" />
</nav>
```

#### Styling Classes
- Default size: `w-6 h-6` (24x24px)
- Scalable via Tailwind scale utilities
- White color scheme (`#FFFFFF`)
- Monospace font for brand text

---

### NeuralNetwork (MouseTrail) Component

#### Type Definition
```typescript
declare function NeuralNetwork(): JSX.Element;
```

#### Configuration Constants
```javascript
// Performance settings
const THROTTLE_DELAY = 120;        // Mouse event throttling (ms)
const PARTICLE_LIMIT = 45;         // Maximum active particles
const CONNECTION_DISTANCE = 90;    // Neural connection range (px)

// Visual settings
const COLOR_CYCLE_DURATION = 10000; // Color transition duration (ms)
const CRACKLE_INTENSITY = 1.5;     // Electrical jitter strength
const SPARK_PROBABILITY = 0.22;    // Chance of spark generation per frame
```

#### ElectricalParticle Class
```typescript
class ElectricalParticle {
  x: number;              // Current X position
  y: number;              // Current Y position
  vx: number;             // X velocity
  vy: number;             // Y velocity
  life: number;           // Life span (0-1)
  decay: number;          // Life decay rate
  size: number;           // Particle radius
  intensity: number;      // Brightness multiplier
  cracklePhase: number;   // Electrical effect phase

  constructor(x: number, y: number);
  update(): void;
  draw(color: {r: number, g: number, b: number}): void;
}
```

#### Color System
The component cycles between two primary colors over a 10-second period:

```javascript
// Color definitions
const YELLOW = { r: 255, g: 193, b: 7 };   // Primary electrical color
const GREEN = { r: 76, g: 175, b: 80 };    // Secondary electrical color

// Interpolation function
function interpolateColor(phase: number): {r: number, g: number, b: number} {
  const r = Math.round(255 - (255 - 76) * phase);
  const g = Math.round(193 + (175 - 193) * phase);
  const b = Math.round(7 + (80 - 7) * phase);
  return { r, g, b };
}
```

#### Performance Monitoring
```javascript
// Key metrics to monitor
const metrics = {
  particleCount: particles.length,
  frameRate: '~60 FPS',
  memoryUsage: 'Auto-managed',
  throttledEvents: 'Mouse moves < 120ms ignored',
  canvasSize: 'Auto-responsive'
};
```

---

### Providers Component

#### Type Definition
```typescript
interface ProvidersProps {
  children: React.ReactNode;
}

declare function Providers(props: ProvidersProps): JSX.Element;
```

#### Configuration Object
```javascript
const wagmiConfig = {
  appName: 'Raiki Blockchain Services',
  projectId: string,          // WalletConnect project ID
  chains: Chain[],           // Supported blockchain networks
  ssr: boolean              // Server-side rendering support
};
```

#### Supported Networks
```javascript
const supportedChains = [
  {
    id: 1,
    name: 'Ethereum',
    network: 'homestead',
    rpcUrls: ['https://mainnet.infura.io/v3/...']
  },
  {
    id: 137,
    name: 'Polygon',
    network: 'matic',
    rpcUrls: ['https://polygon-rpc.com']
  },
  {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    rpcUrls: ['https://mainnet.optimism.io']
  },
  {
    id: 42161,
    name: 'Arbitrum',
    network: 'arbitrum',
    rpcUrls: ['https://arb1.arbitrum.io/rpc']
  },
  {
    id: 8453,
    name: 'Base',
    network: 'base',
    rpcUrls: ['https://mainnet.base.org']
  },
  {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    rpcUrls: ['https://sepolia.infura.io/v3/...']
  }
];
```

## 🎯 Page Components

### Home Page (`/`)

#### Features
- Hero section with neural network background
- Interactive navigation menu
- Services preview section
- Responsive design with mobile optimization

#### State Management
```javascript
const homePageState = {
  formData: {
    name: string,
    email: string, 
    company: string,
    message: string
  },
  isMenuOpen: boolean
};
```

### Contact Page (`/contact`)

#### Features
- Full-screen contact form
- Form validation and error handling
- Loading states and success messages
- Form submission simulation

#### Form Validation Rules
```javascript
const validationRules = {
  name: { required: true, minLength: 1 },
  email: { required: true, type: 'email' },
  company: { required: false },
  message: { required: true, minLength: 10 }
};
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Currently using default configuration
  // Future enhancements can be added here
};

export default nextConfig;
```

### PostCSS Configuration (`postcss.config.mjs`)
```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

### ESLint Configuration (`eslint.config.mjs`)
```javascript
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
```

## 🎨 Styling System

### Tailwind CSS Classes

#### Layout & Spacing
```css
/* Common layout patterns */
.container-pattern { @apply max-w-7xl mx-auto px-6; }
.section-spacing { @apply py-20; }
.element-spacing { @apply mb-8; }
```

#### Color Palette
```css
/* Cyberpunk color scheme */
.bg-primary { background: linear-gradient(to bottom right, #000000, #1f2937, #374151); }
.text-primary { @apply text-white; }
.text-secondary { @apply text-gray-300; }
.text-muted { @apply text-gray-400; }
.accent-line { @apply bg-gradient-to-r from-transparent via-gray-600 to-transparent; }
```

#### Animations
```css
/* Custom animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Animation classes */
.animate-fade-in { animation: fade-in 1s ease-out; }
.animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
```

### Responsive Breakpoints
```css
/* Tailwind default breakpoints */
sm: '640px',   /* Small devices */
md: '768px',   /* Medium devices */
lg: '1024px',  /* Large devices */
xl: '1280px',  /* Extra large devices */
2xl: '1536px'  /* 2X large devices */
```

## 🚀 Performance Specifications

### Bundle Size Targets
- **Main Bundle**: < 200KB gzipped
- **CSS Bundle**: < 50KB gzipped
- **JavaScript Runtime**: < 300KB total
- **Image Assets**: WebP/AVIF formats preferred

### Performance Metrics
```javascript
const performanceTargets = {
  FCP: '<1.5s',        // First Contentful Paint
  LCP: '<2.5s',        // Largest Contentful Paint
  FID: '<100ms',       // First Input Delay
  CLS: '<0.1',         // Cumulative Layout Shift
  TTFB: '<600ms'       // Time to First Byte
};
```

### Optimization Features
- Automatic code splitting via Next.js
- Image optimization with next/image
- Font optimization with next/font
- Static generation where possible
- Turbopack for fast development builds

## 🔒 Security Considerations

### Web3 Security
- Never expose private keys in client code
- Validate all transaction parameters
- Use secure RPC endpoints
- Implement proper error boundaries

### General Security
- No server-side secrets in client bundle
- Validate all form inputs
- Implement proper CORS policies
- Use HTTPS in production

## 📊 Monitoring & Analytics

### Performance Monitoring
```javascript
// Web Vitals tracking
const vitals = {
  CLS: 'Cumulative Layout Shift',
  FID: 'First Input Delay', 
  FCP: 'First Contentful Paint',
  LCP: 'Largest Contentful Paint',
  TTFB: 'Time to First Byte'
};
```

### Error Tracking
- Console error monitoring
- Network request failures
- Web3 transaction errors
- Component error boundaries

## 🔄 Development Workflow

### Commands
```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build production bundle
npm run start           # Start production server
npm run lint           # Run ESLint checks

# Analysis
npm run build && npm run analyze  # Bundle analysis (if configured)
```

### Environment Variables
```env
# Production environment
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NODE_ENV=production

# Development environment  
NODE_ENV=development
```

This API documentation provides the technical foundation for understanding and extending the Raiki application's codebase.