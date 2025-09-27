'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';
import MatrixText from '../components/MatrixText';

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
  const menuRef = useRef(null);
  const turnstileRef = useRef(null);

  // Load Turnstile script - TEMPORARILY DISABLED FOR TESTING
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => {
  //     setIsTurnstileLoaded(true);
  //   };
  //   document.head.appendChild(script);

  //   return () => {
  //     if (script.parentNode) {
  //       script.parentNode.removeChild(script);
  //     }
  //   };
  // }, []);

  // Initialize Turnstile widget when script is loaded - TEMPORARILY DISABLED FOR TESTING
  // useEffect(() => {
  //   if (isTurnstileLoaded && window.turnstile && turnstileRef.current) {
  //     const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      
  //     // Skip Turnstile setup if no site key available
  //     if (!sitekey) {
  //       console.warn('Turnstile site key not available');
  //       return;
  //     }
      
  //     window.turnstile.render(turnstileRef.current, {
  //       sitekey: sitekey,
  //       callback: (token) => {
  //         setTurnstileToken(token);
  //       },
  //       'error-callback': () => {
  //         setTurnstileToken(null);
  //       },
  //       'expired-callback': () => {
  //         setTurnstileToken(null);
  //       },
  //       theme: 'dark',
  //       size: 'compact' // Changed from invisible to compact
  //     });
  //   }
  // }, [isTurnstileLoaded]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetStatusMessage = () => {
    setTimeout(() => {
      setSubmitStatus(null);
      setStatusMessage('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Please fill in all required fields.');
      resetStatusMessage();
      return;
    }

    if (formData.name.length > 100) {
      setSubmitStatus('error');
      setStatusMessage('Name must be less than 100 characters.');
      resetStatusMessage();
      return;
    }

    if (formData.message.length > 2000) {
      setSubmitStatus('error');
      setStatusMessage('Message must be less than 2000 characters.');
      resetStatusMessage();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      // TEMPORARILY BYPASS TURNSTILE FOR TESTING
      let finalToken = 'dev-bypass-testing';

      // // Execute Turnstile challenge
      // if (window.turnstile && !turnstileToken) {
      //   try {
      //     window.turnstile.execute();
          
      //     // Wait for token with timeout
      //     const waitForToken = new Promise((resolve, reject) => {
      //       const checkToken = () => {
      //         if (turnstileToken) {
      //           resolve(turnstileToken);
      //         } else {
      //           setTimeout(checkToken, 100);
      //         }
      //       };
      //       checkToken();
            
      //       // 10 second timeout
      //       setTimeout(() => reject(new Error('Turnstile timeout')), 10000);
      //     });

      //     try {
      //       finalToken = await waitForToken;
      //     } catch (error) {
      //       // In development, use bypass token if Turnstile fails
      //       if (process.env.NODE_ENV === 'development') {
      //         console.warn('Turnstile failed in development, using bypass token');
      //         finalToken = 'dev-bypass';
      //       } else {
      //         setSubmitStatus('error');
      //         setStatusMessage('Security verification failed. Please try again.');
      //         setIsSubmitting(false);
      //         resetStatusMessage();
      //         return;
      //       }
      //     }
      //   } catch (error) {
      //     // In development, use bypass token if Turnstile fails
      //     if (process.env.NODE_ENV === 'development') {
      //       console.warn('Turnstile failed in development, using bypass token');
      //       finalToken = 'dev-bypass';
      //     } else {
      //       setSubmitStatus('error');
      //       setStatusMessage('Security verification failed. Please try again.');
      //       setIsSubmitting(false);
      //       resetStatusMessage();
      //       return;
      //     }
      //   }
      // }

      // // In development, use bypass token if no token available
      // if (!finalToken && process.env.NODE_ENV === 'development') {
      //   finalToken = 'dev-bypass';
      // }

      // if (!finalToken) {
      //   setSubmitStatus('error');
      //   setStatusMessage('Security verification required. Please try again.');
      //   setIsSubmitting(false);
      //   resetStatusMessage();
      //   return;
      // }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          turnstileToken: finalToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTurnstileToken(null);
        
        // Reset Turnstile widget
        if (window.turnstile) {
          window.turnstile.reset();
        }
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      resetStatusMessage();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="relative overflow-hidden h-full">
        <NeuralNetwork />
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-2 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/"><RaikiLogo showText={false} /></Link>
            
            {/* Burger Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 bg-gray-900 border border-gray-400 hover:border-gray-300 cursor-pointer group transition-all duration-200 hover:shadow-lg hover:shadow-gray-400/25"
              >
                {!isMenuOpen ? (
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                    <div className="w-4 h-px bg-gray-400 group-hover:bg-white transition-colors duration-200"></div>
                  </div>
                ) : (
                  <span className="text-white text-xs">×</span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                  <div className="py-2">
                    <a href="/services" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      Services
                    </a>
                    <a href="/about" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      About
                    </a>
                    <a href="/contact" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                      Contact
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* Content - Centered */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6">
          <div className="max-w-md mx-auto w-full text-center space-y-8">
            
            {/* Title */}
            <section>
              <MatrixText 
                text="contact" 
                className="text-4xl md:text-5xl font-mono font-bold text-white tracking-wider"
              />
            </section>
            
            {/* Compact Form */}
            <section>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors font-mono text-sm"
                  placeholder="name"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors font-mono text-sm"
                  placeholder="email"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors font-mono text-sm"
                  placeholder="company (optional)"
                  disabled={isSubmitting}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none font-mono text-sm"
                  placeholder="message"
                  required
                  disabled={isSubmitting}
                />
                
                {/* Status Message */}
                {statusMessage && (
                  <div className={`text-center py-2 px-3 rounded font-mono text-sm ${
                    submitStatus === 'success' 
                      ? 'bg-green-900/50 border border-green-600 text-green-300' 
                      : 'bg-red-900/50 border border-red-600 text-red-300'
                  }`}>
                    {statusMessage}
                  </div>
                )}
                
                {/* Invisible Turnstile widget */}
                <div ref={turnstileRef} className="hidden"></div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full bg-gray-800 border-2 px-5 py-3 relative overflow-hidden transition-all duration-200 flex items-center justify-center ${
                    isSubmitting 
                      ? 'border-gray-600 cursor-not-allowed opacity-70' 
                      : 'border-white/30 hover:border-white/60 hover:scale-105 hover:shadow-lg hover:shadow-white/20 cursor-pointer'
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-white group-hover:text-white text-sm tracking-wider leading-none font-mono font-bold">
                    {isSubmitting ? '>> sending...' : '>> send'}
                  </span>
                </button>
              </form>
            </section>
            
            {/* Navigation Buttons */}
            <section>
              <div className="flex flex-col sm:flex-row gap-2 font-mono">
                <Link href="/" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-4 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center flex-1 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-gray-400 group-hover:text-white text-xs tracking-wider leading-none">{'>> home'}</span>
                </Link>
                <Link href="/services" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-4 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center flex-1 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-gray-400 group-hover:text-white text-xs tracking-wider leading-none">{'>> services'}</span>
                </Link>
                <Link href="/about" className="group bg-gray-900 border-2 border-gray-400 hover:border-gray-300 px-4 py-2 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 cursor-pointer text-center flex-1 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-gray-400 group-hover:text-white text-xs tracking-wider leading-none">{'>> about'}</span>
                </Link>
              </div>
            </section>
            
          </div>
        </div>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
        </div>
    </div>
  );
}