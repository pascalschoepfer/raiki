# Development Guide

A comprehensive guide for developers working on the Raiki project.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.17 or later
- **Package Manager**: npm (recommended), yarn, pnpm, or bun
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd raiki

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🏗️ Project Architecture

### File Organization
```
src/app/
├── components/          # Reusable UI components
│   ├── RaikiLogo.js    # Brand logo component
│   └── MouseTrail.js   # Neural network animation
├── contact/            # Contact page route
│   └── page.js        # Contact page component  
├── globals.css        # Global styles and Tailwind
├── layout.js         # Root layout with providers
├── page.js          # Home page component
└── providers.js    # Web3 and React Query providers
```

### Naming Conventions
- **Components**: PascalCase (`RaikiLogo.js`)
- **Pages**: lowercase (`page.js`, `layout.js`)
- **Utilities**: camelCase (`utils/formatPrice.js`)
- **Constants**: UPPER_SNAKE_CASE (`const MAX_PARTICLES = 45`)
- **CSS Classes**: kebab-case (`neural-network`)

## 🎨 Styling Guidelines

### Tailwind CSS Approach
```jsx
// ✅ Preferred: Utility classes
<div className="flex items-center justify-between p-6 bg-gray-900">

// ✅ Acceptable: Complex combinations with variables
<div className={`${baseClasses} ${isActive ? activeClasses : ''}`}>

// ❌ Avoid: Inline styles (use only for dynamic values)
<div style={{backgroundColor: dynamicColor}}>
```

### Color Palette
```javascript
// Primary colors (cyberpunk theme)
const colors = {
  background: {
    primary: '#000000',      // Pure black
    secondary: '#1f2937',    // Dark gray
    tertiary: '#374151'      // Medium gray
  },
  text: {
    primary: '#ffffff',      // Pure white
    secondary: '#d1d5db',    // Light gray
    muted: '#9ca3af'         // Medium gray
  },
  accent: {
    yellow: '#ffc107',       // Electric yellow
    green: '#4caf50',        // Electric green
    blue: '#2196f3'          // Electric blue
  }
};
```

### Responsive Design Patterns
```jsx
// Mobile-first approach
<div className="
  w-full px-4 py-2          // Mobile: full width, small padding
  sm:px-6 sm:py-4          // Small: increase padding  
  md:w-auto md:px-8        // Medium: auto width, more padding
  lg:max-w-4xl lg:mx-auto  // Large: max width with center
">
```

## 🧩 Component Development

### Component Template
```jsx
/**
 * ComponentName - Brief description
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered component
 */
export default function ComponentName({ 
  className = "",
  ...otherProps 
}) {
  return (
    <div className={`base-classes ${className}`}>
      {/* Component content */}
    </div>
  );
}
```

### State Management Patterns
```jsx
// Local state for UI-only concerns
const [isOpen, setIsOpen] = useState(false);

// Form state with validation
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

// Derived state
const isValid = useMemo(() => 
  formData.name && formData.email && formData.message
, [formData]);
```

### Custom Hooks Pattern
```jsx
// Custom hook for form handling
function useContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle submission...
  };

  return { formData, setFormData, handleSubmit, isSubmitting };
}
```

## 🎭 Animation Guidelines

### Canvas Animation Best Practices
```javascript
// Performance-optimized animation loop
const animate = useCallback(() => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update particles (batch operations)
  particles.forEach(particle => particle.update());
  
  // Draw particles (minimize state changes)
  ctx.save();
  particles.forEach(particle => particle.draw(currentColor));
  ctx.restore();
  
  // Schedule next frame
  animationRef.current = requestAnimationFrame(animate);
}, [currentColor]);

// Throttle mouse events
const handleMouseMove = useMemo(
  () => throttle((e) => {
    // Handle mouse movement
  }, 120),
  []
);
```

### CSS Animation Patterns
```css
/* Entrance animations */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover interactions */
.interactive-element {
  @apply transition-all duration-300 ease-in-out;
}

.interactive-element:hover {
  @apply transform scale-105 brightness-110;
}
```

## 🌐 Web3 Integration

### RainbowKit Setup
```jsx
// Provider configuration
const config = getDefaultConfig({
  appName: 'Raiki Blockchain Services',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

// Custom wallet connection button
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div>
            {!connected ? (
              <button onClick={openConnectModal}>
                Connect Wallet
              </button>
            ) : (
              <button onClick={openChainModal}>
                {chain.name}
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
```

### Using Wagmi Hooks
```jsx
import { useAccount, useBalance, useContractRead } from 'wagmi';

function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  
  if (!isConnected) return <div>Not connected</div>;
  
  return (
    <div>
      <p>Address: {address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
    </div>
  );
}
```

## 🧪 Testing Strategy

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import RaikiLogo from '../components/RaikiLogo';

describe('RaikiLogo', () => {
  it('renders logo with default styling', () => {
    render(<RaikiLogo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('raiki')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<RaikiLogo className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});
```

### Animation Testing
```javascript
// Mock canvas context for testing
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  save: jest.fn(),
  restore: jest.fn()
};

HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

describe('NeuralNetwork', () => {
  it('initializes canvas correctly', () => {
    render(<NeuralNetwork />);
    expect(mockContext.clearRect).toHaveBeenCalled();
  });
});
```

## 🔧 Build & Deployment

### Build Optimization
```javascript
// next.config.mjs
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Bundle analyzer (development)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  },
};
```

### Environment Configuration
```bash
# .env.local (development)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=development_project_id

# .env.production (production)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=production_project_id
NODE_ENV=production
```

### Deployment Checklist
- [ ] Update WalletConnect project ID
- [ ] Test all Web3 functionality
- [ ] Verify responsive design on all breakpoints
- [ ] Check performance metrics
- [ ] Validate SEO metadata
- [ ] Test form submissions
- [ ] Verify neural network animation performance

## 🐛 Debugging

### Common Issues & Solutions

#### Canvas Animation Issues
```javascript
// Issue: Animation not starting
// Solution: Ensure useEffect cleanup
useEffect(() => {
  const animate = () => {
    // Animation logic
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, []);
```

#### Web3 Connection Issues
```javascript
// Issue: Wallet not connecting
// Solution: Check project ID and network configuration
const config = getDefaultConfig({
  appName: 'Raiki Blockchain Services',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // Must be set
  chains: [...supportedChains],
});
```

#### Styling Issues
```jsx
// Issue: Tailwind classes not applying
// Solution: Ensure proper import order
// In globals.css:
@import "tailwindcss";

// Component imports should come after Tailwind
@import "./custom-components.css";
```

### Development Tools
```bash
# Performance profiling
npm run build && npm run analyze

# Bundle size analysis
npx @next/bundle-analyzer

# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# TypeScript checking (if using TS)
npx tsc --noEmit
```

## 📊 Performance Monitoring

### Key Metrics to Track
```javascript
const performanceMetrics = {
  // Core Web Vitals
  LCP: 'Largest Contentful Paint < 2.5s',
  FID: 'First Input Delay < 100ms', 
  CLS: 'Cumulative Layout Shift < 0.1',
  
  // Additional metrics
  FCP: 'First Contentful Paint < 1.8s',
  TTFB: 'Time to First Byte < 0.8s',
  
  // Custom metrics
  particleCount: 'Active particles < 50',
  frameRate: 'Animation FPS > 55',
  memoryUsage: 'Heap size < 100MB'
};
```

### Performance Optimization Checklist
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] JavaScript code split
- [ ] Canvas animations throttled
- [ ] Event listeners optimized
- [ ] Bundle size analyzed

## 🤝 Contribution Guidelines

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write descriptive commit messages
- Add JSDoc comments for functions
- Include prop types or TypeScript interfaces

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-animation
git add .
git commit -m "feat: add new particle animation effect"
git push origin feature/new-animation

# Bug fixes
git checkout -b fix/canvas-memory-leak
git commit -m "fix: prevent canvas memory leak in animation cleanup"
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Verified responsive design
- [ ] Checked Web3 functionality

## Screenshots
Include before/after screenshots for UI changes
```

This development guide provides the foundation for consistent, high-quality development on the Raiki project.