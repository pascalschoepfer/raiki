# Components Documentation

This document provides detailed documentation for all components in the Raiki application.

## 🎨 UI Components

### RaikiLogo (`src/app/components/RaikiLogo.js`)

A scalable SVG logo component featuring a cyberpunk geometric design.

#### Usage
```jsx
import RaikiLogo from './components/RaikiLogo';

// Basic usage
<RaikiLogo />

// With custom styling
<RaikiLogo className="scale-[240%]" />
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes for styling |

#### Features
- **Scalable SVG**: Vector-based design that scales without quality loss
- **Geometric Pattern**: Hexagonal design with nested shapes and center dot
- **Cyberpunk Styling**: White stroke with opacity variations
- **Responsive**: Adapts to different screen sizes
- **Brand Consistency**: Maintains visual identity across pages

#### Design Elements
- Outer hexagon with 1.5px stroke width
- Inner hexagon with 1px stroke width and 60% opacity
- Central circle filled with white
- Vertical connection lines at top and bottom
- Monospace font for text branding

---

## 🎭 Animation Components

### MatrixText (`src/app/components/MatrixText.js`)

Creates an authentic matrix-style reveal animation using Japanese characters, running once and revealing permanently.

#### Usage
```jsx
import MatrixText from './components/MatrixText';

<MatrixText 
  text="raiki" 
  className="text-xl font-mono font-bold text-gray-300 tracking-wider" 
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | The text to display with matrix effect |
| `className` | `string` | `""` | CSS classes for styling |

#### Features
- **One-time Animation**: Runs once on load, then stays revealed permanently
- **Japanese Characters**: Uses authentic matrix characters (`01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン`)
- **Two Phases**: 
  - Scrambling phase: 20 frames of random Japanese characters
  - Reveal phase: Progressive character-by-character reveal (40% chance per frame)
- **Layout Stable**: Fixed width container prevents layout shifts
- **No Flickering**: Consistent 120ms timing with overflow protection

#### Technical Implementation
```javascript
// Animation phases
const maxScrambles = 20;  // Scrambling duration
const revealChance = 0.4; // Character reveal probability
const animationSpeed = 120; // Frame timing in ms
```

#### Layout Protection
```javascript
// Prevents text wrapping and movement
<span 
  className={`${className} inline-block overflow-hidden`} 
  style={{ 
    width: `${text.length * 1.2}em`,
    height: '1.2em',
    lineHeight: '1.2em'
  }}
>
```

---

### ScrambleGlitchText (within RaikiLogo component)

Combines character scrambling with RGB glitch effects for the header logo.

#### Features
- **Moderate Frequency**: 25% chance to scramble every 400-900ms
- **Balanced Intensity**: 50% of characters affected during scrambling
- **RGB Glitch Effects**: Red and blue shadows with offset animations
- **Quick Reset**: 60-110ms scramble duration for smooth transitions

#### Glitch Animation
```css
@keyframes glitch-red {
  15%, 49% { 
    transform: translate(-1px, -0.5px); 
    opacity: 0.8;
  }
}
@keyframes glitch-blue {
  21%, 62% { 
    transform: translate(1px, 0.5px); 
    opacity: 0.7;
  }
}
```

---

### MouseTrail/NeuralNetwork (`src/app/components/MouseTrail.js`)

An interactive canvas-based neural network animation that responds to mouse movement with electrical particle effects.

#### Usage
```jsx
import NeuralNetwork from './components/MouseTrail';

<div className="relative overflow-hidden">
  <NeuralNetwork />
  {/* Other content here */}
</div>
```

#### Props
None - the component is self-contained.

#### Features

##### Real-time Particle System
- **Mouse Tracking**: Particles generate at cursor position
- **Throttled Events**: 120ms throttling prevents performance issues
- **Particle Limit**: Maximum 45 particles for optimal performance
- **Automatic Cleanup**: Dead particles are removed from memory

##### Electrical Effects
- **Crackling Animation**: Random jitter simulates electrical discharge
- **Sparks**: Secondary particles create authentic electrical look
- **Flickering**: Alpha variations create realistic lighting effects
- **Dynamic Intensity**: Particle brightness varies over time

##### Neural Network Connections
- **Distance-based**: Connections form between nearby particles
- **Dynamic Strength**: Connection opacity based on particle distance and life
- **Electrical Lines**: Connections have random crackle effects
- **Threshold**: 90px maximum connection distance

##### Color System
- **Dynamic Transitions**: Smooth color cycling between yellow and green
- **10-second Cycle**: Complete color transition every 10 seconds
- **Sine Wave Interpolation**: Natural, smooth color changes
- **Color Palette**:
  - Yellow: RGB(255, 193, 7)
  - Green: RGB(76, 175, 80)

#### Performance Optimizations

##### Canvas Management
```javascript
// Automatic canvas resizing
const updateCanvasSize = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};
```

##### Event Throttling
```javascript
// Mouse movement throttling
const throttleDelay = 120;
if (now - lastMouseMoveTime < throttleDelay) return;
```

##### Memory Management
```javascript
// Particle cleanup
if (particles.length > 45) {
  particles.splice(0, particles.length - 45);
}
```

#### Technical Implementation

##### ElectricalParticle Class
```javascript
class ElectricalParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1;        // Velocity X
    this.vy = (Math.random() - 0.5) * 1;        // Velocity Y
    this.life = 1;                              // Life span (0-1)
    this.decay = 0.0017 + Math.random() * 0.0017; // Decay rate
    this.size = Math.random() * 4 + 2;          // Particle size
    this.intensity = Math.random() * 0.6 + 0.6; // Brightness
    this.cracklePhase = Math.random() * Math.PI * 2; // Electrical phase
  }
}
```

##### Animation Loop
- **60 FPS Target**: Uses `requestAnimationFrame` for smooth animation
- **Clear and Redraw**: Full canvas clear each frame
- **Particle Updates**: Position, life, and effects updated per frame
- **Connection Drawing**: Dynamic line rendering between particles

#### Customization Options

##### Modify Colors
```javascript
// In getColorAtTime() function
const r = Math.round(255 - (255 - newR) * colorPhase);
const g = Math.round(193 + (newG - 193) * colorPhase);
const b = Math.round(7 + (newB - 7) * colorPhase);
```

##### Adjust Performance
```javascript
// Particle limits
const particleLimit = 45;          // Max particles
const throttleDelay = 120;         // Mouse throttle (ms)
const connectionDistance = 90;     // Connection range (px)
```

##### Modify Effects
```javascript
// Electrical intensity
const crackleIntensity = 1.5;      // Particle jitter
const sparkProbability = 0.22;     // Spark generation chance
const sparkRadius = 18;            // Spark scatter radius
```

---

## 🌐 Provider Components

### Providers (`src/app/providers.js`)

Root-level provider component that wraps the application with Web3 and query client functionality.

#### Usage
```jsx
// In layout.js
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

#### Features

##### Web3 Integration
- **RainbowKit**: Wallet connection UI with built-in wallet support
- **Wagmi**: React hooks for Ethereum interactions
- **Viem**: Type-safe Ethereum interface
- **Multi-chain**: Support for 6 different networks

##### Supported Networks
```javascript
const chains = [
  mainnet,    // Ethereum Mainnet
  polygon,    // Polygon
  optimism,   // Optimism
  arbitrum,   // Arbitrum
  base,       // Base
  sepolia     // Sepolia (testnet)
];
```

##### Query Client
- **React Query**: Server state management
- **Caching**: Automatic query caching and invalidation
- **Background Updates**: Automatic data synchronization
- **Error Handling**: Built-in error boundaries

#### Configuration

##### WalletConnect Setup
```javascript
const config = getDefaultConfig({
  appName: 'Raiki Blockchain Services',
  projectId: 'YOUR_PROJECT_ID', // Required from WalletConnect Cloud
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // Server-side rendering support
});
```

##### Provider Hierarchy
```jsx
<WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
      {children}
    </RainbowKitProvider>
  </QueryClientProvider>
</WagmiProvider>
```

---

## 📄 Page Components

### Home Page (`src/app/page.js`)

The main landing page featuring hero section, navigation, and services preview.

#### Features
- **Interactive Header**: Burger menu with smooth animations
- **Hero Section**: Large logo display with neural network background
- **Services Preview**: Navigation links with terminal-style formatting
- **Form Handling**: Contact form state management (unused on home page)
- **Responsive Design**: Mobile-first adaptive layouts

#### State Management
```javascript
const [formData, setFormData] = useState({
  name: '', email: '', company: '', message: ''
});
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

#### Custom Animations
- **Fade In**: Entry animations for content sections
- **Burger Menu**: Animated hamburger to X transformation
- **Hover Effects**: Terminal-style link interactions

### Contact Page (`src/app/contact/page.js`)

Dedicated contact form page with full form functionality.

#### Features
- **Form Validation**: Required field validation
- **Loading States**: Visual feedback during submission
- **Success Messages**: Confirmation display after submission
- **Form Reset**: Automatic form clearing after successful submission

#### Form Implementation
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Form submission logic
  setTimeout(() => {
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });
  }, 2000);
};
```

---

## 🎨 Styling System

### Global Styles (`src/app/globals.css`)

#### Tailwind Integration
```css
@import "tailwindcss";
```

#### Custom CSS Variables
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

#### Font Configuration
```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Animation Classes

#### Fade Animations
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}
```

#### Animation Delays
```css
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
```

---

## 🔧 Layout Components

### RootLayout (`src/app/layout.js`)

Root layout component that defines the HTML structure and global providers.

#### Features
- **Font Loading**: Geist Sans and Geist Mono font integration
- **Metadata**: SEO-friendly title, description, and favicon
- **Provider Integration**: Web3 and query client providers
- **Global Styling**: Font variables and antialiasing

#### Font Configuration
```javascript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});
```

#### Metadata
```javascript
export const metadata = {
  title: "raiki",
  description: "cybersecurity - digital experiences - web3 services",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};
```

---

## 🚀 Best Practices

### Component Structure
- **Single Responsibility**: Each component has one clear purpose
- **Prop Validation**: Clear prop documentation and types
- **Error Boundaries**: Proper error handling in critical components
- **Performance**: Optimized rendering and memory management

### State Management
- **Local State**: useState for component-specific state
- **Global State**: React Query for server state
- **Web3 State**: Wagmi hooks for blockchain interactions
- **Form State**: Controlled components with validation

### Styling Approach
- **Utility-First**: Tailwind CSS for consistent styling
- **Component Styles**: styled-jsx for component-specific styles
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference support

### Performance Considerations
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Canvas Optimization**: Throttled animations and particle limits
- **Bundle Size**: Tree shaking and dynamic imports