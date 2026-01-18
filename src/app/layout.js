import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import FullscreenLoader from './components/FullscreenLoader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "raiki",
    template: "%s | raiki",
  },
  description: "cybersecurity - digital experiences - web3 services",
  keywords: ["cybersecurity", "web3", "blockchain", "crypto", "digital services", "switzerland"],
  authors: [{ name: "Raiki GmbH" }],
  creator: "Raiki GmbH",
  metadataBase: new URL("https://raiki.vercel.app"),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raiki.vercel.app",
    siteName: "raiki",
    title: "raiki",
    description: "cybersecurity - digital experiences - web3 services",
  },
  twitter: {
    card: "summary_large_image",
    title: "raiki",
    description: "cybersecurity - digital experiences - web3 services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <FullscreenLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
