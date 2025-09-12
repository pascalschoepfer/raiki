'use client';

// Import RainbowKit styles for wallet connection UI
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,    // Ethereum Mainnet
  polygon,    // Polygon (formerly Matic)
  optimism,   // Optimism Layer 2
  arbitrum,   // Arbitrum Layer 2  
  base,       // Base Layer 2
  sepolia,    // Sepolia Testnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

/**
 * Web3 Configuration
 * 
 * Configures wagmi with RainbowKit for multi-chain wallet connections.
 * Supports 6 different networks including mainnet and popular L2 solutions.
 * 
 * IMPORTANT: Replace 'YOUR_PROJECT_ID' with actual WalletConnect project ID
 * from https://cloud.walletconnect.com for production use.
 */
const config = getDefaultConfig({
  appName: 'Raiki Blockchain Services',
  projectId: 'YOUR_PROJECT_ID', // Get this from https://cloud.walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // Enable server-side rendering support
});

/**
 * React Query Client
 * 
 * Manages server state, caching, and synchronization for the application.
 * Provides automatic background updates, error handling, and optimistic updates.
 */
const queryClient = new QueryClient();

/**
 * Providers Component
 * 
 * Root-level provider component that wraps the entire application with
 * Web3 functionality and state management. This component should be used
 * in the root layout to provide blockchain and query capabilities to all
 * child components.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * 
 * @returns {JSX.Element} Provider wrapper with Web3 and query capabilities
 * 
 * @example
 * // In layout.js
 * import { Providers } from './providers';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <Providers>
 *           {children}
 *         </Providers>
 *       </body>
 *     </html>
 *   );
 * }
 * 
 * Provider Hierarchy:
 * 1. WagmiProvider - Core Web3 functionality and chain management
 * 2. QueryClientProvider - Server state management and caching
 * 3. RainbowKitProvider - Wallet connection UI and user experience
 * 
 * Supported Features:
 * - Multi-chain wallet connections (6 networks)
 * - Automatic wallet state management
 * - Transaction handling and signing
 * - Balance and token queries
 * - Network switching capabilities
 * - Server-side rendering support
 */
export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}