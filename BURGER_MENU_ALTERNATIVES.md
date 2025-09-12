# Burger Menu Alternatives

Here are various burger menu designs that match your cyberpunk/retro gaming aesthetic:

## 1. **Matrix Style** - Digital Brackets
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-gray-400 hover:text-white transition-all duration-300 text-lg font-mono group-hover:animate-pulse">
    [ ]
  </span>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-white transition-all duration-300 text-lg font-mono animate-pulse">
    [X]
  </span>
</button>
```

## 2. **Terminal Style** - Command Prompt
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-mono">
    ≡
  </span>
  <span className="text-gray-600 group-hover:text-gray-300 transition-all duration-300 text-xs font-mono animate-pulse">
    _
  </span>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-white transition-all duration-300 text-sm font-mono">
    ×
  </span>
  <span className="text-gray-300 transition-all duration-300 text-xs font-mono animate-pulse">
    _
  </span>
</button>
```

## 3. **Retro Gaming Style** - Pixel Squares
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="flex flex-col gap-1">
    <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
    <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
    <div className="w-5 h-1 bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="relative">
    <div className="w-5 h-1 bg-white transform rotate-45 absolute"></div>
    <div className="w-5 h-1 bg-white transform -rotate-45"></div>
  </div>
</button>
```

## 4. **Cyberpunk Dots** - Circuit Pattern
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="grid grid-cols-3 gap-1">
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
    <div className="w-1 h-1 bg-gray-400 group-hover:bg-white transition-all duration-200 rounded-full"></div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-white text-lg">×</span>
</button>
```

## 5. **Glitch Style** - Distorted Lines
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="flex flex-col gap-1">
    <div className="w-6 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:translate-x-0.5"></div>
    <div className="w-4 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:-translate-x-0.5"></div>
    <div className="w-5 h-0.5 bg-gray-400 group-hover:bg-white transition-all duration-200 transform group-hover:translate-x-1"></div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="relative">
    <div className="w-6 h-0.5 bg-white transform rotate-45 absolute"></div>
    <div className="w-6 h-0.5 bg-white transform -rotate-45"></div>
  </div>
</button>
```

## 6. **Binary Style** - 0s and 1s
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <div className="text-gray-400 group-hover:text-white transition-all duration-300 font-mono text-xs leading-tight">
    <div>101</div>
    <div>010</div>
    <div>111</div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-white font-mono text-lg">×</span>
</button>
```

## 7. **Neon Box Style** - Outlined Square
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-2 border-gray-400 hover:border-white transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-gray-400/25">
  <div className="flex flex-col gap-0.5">
    <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
    <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
    <div className="w-3 h-px bg-gray-400 group-hover:bg-white transition-colors duration-300"></div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-2 border-white transition-all duration-300 cursor-pointer group shadow-lg shadow-white/25">
  <span className="text-white text-sm">×</span>
</button>
```

## 8. **ASCII Art Style** - Text Characters
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-gray-400 group-hover:text-white transition-all duration-300 font-mono text-sm">
    ▦
  </span>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer group">
  <span className="text-white font-mono text-sm">
    ▣
  </span>
</button>
```

## 9. **Minimal Retro** - Simple Styled Lines
```jsx
{/* Closed State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-gray-400 hover:border-gray-300 cursor-pointer group transition-all duration-200 hover:shadow-lg hover:shadow-gray-400/25">
  <div className="flex flex-col gap-1">
    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
  </div>
</button>

{/* Open State */}
<button className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-white cursor-pointer group transition-all duration-200 shadow-lg shadow-white/25">
  <span className="text-white text-xs">×</span>
</button>
```

## Implementation Recommendations:

### **Most Cyberpunk:**
- **#1 Matrix Style** - Perfect with the neural network theme
- **#4 Cyberpunk Dots** - Circuit board aesthetic

### **Best for Retro Gaming:**
- **#3 Retro Gaming Style** - Matches your button style perfectly
- **#9 Minimal Retro** - Same styling as your navigation buttons

### **Most Unique:**
- **#5 Glitch Style** - Dynamic distortion effects
- **#6 Binary Style** - True hacker aesthetic

### **Cleanest/Modern:**
- **#7 Neon Box Style** - Outlined and glowing
- **#2 Terminal Style** - Clean command prompt feel

Which style appeals to you most? I can implement whichever one matches your vision!