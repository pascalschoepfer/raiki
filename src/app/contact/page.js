'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import RaikiLogo from '../components/RaikiLogo';
import MatrixText from '../components/MatrixText';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
  const turnstileRef = useRef(null);

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsTurnstileLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize Turnstile widget when script is loaded
  useEffect(() => {
    if (isTurnstileLoaded && window.turnstile && turnstileRef.current) {
      const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

      // Skip Turnstile setup if no site key available
      if (!sitekey) {
        console.warn('Turnstile site key not available');
        return;
      }

      window.turnstile.render(turnstileRef.current, {
        sitekey: sitekey,
        callback: (token) => {
          setTurnstileToken(token);
        },
        'error-callback': () => {
          setTurnstileToken(null);
        },
        'expired-callback': () => {
          setTurnstileToken(null);
        },
        theme: 'dark',
        size: 'normal'
      });
    }
  }, [isTurnstileLoaded]);

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
      let finalToken = turnstileToken;

      // Execute Turnstile challenge if no token yet
      if (window.turnstile && !turnstileToken) {
        try {
          window.turnstile.execute();

          // Wait for token with timeout
          const waitForToken = new Promise((resolve, reject) => {
            const checkToken = () => {
              if (turnstileToken) {
                resolve(turnstileToken);
              } else {
                setTimeout(checkToken, 100);
              }
            };
            checkToken();

            // 10 second timeout
            setTimeout(() => reject(new Error('Turnstile timeout')), 10000);
          });

          try {
            finalToken = await waitForToken;
          } catch (error) {
            // In development, use bypass token if Turnstile fails
            if (process.env.NODE_ENV === 'development') {
              console.warn('Turnstile failed in development, using bypass token');
              finalToken = 'dev-bypass';
            } else {
              setSubmitStatus('error');
              setStatusMessage('Security verification failed. Please try again.');
              setIsSubmitting(false);
              resetStatusMessage();
              return;
            }
          }
        } catch (error) {
          // In development, use bypass token if Turnstile fails
          if (process.env.NODE_ENV === 'development') {
            console.warn('Turnstile failed in development, using bypass token');
            finalToken = 'dev-bypass';
          } else {
            setSubmitStatus('error');
            setStatusMessage('Security verification failed. Please try again.');
            setIsSubmitting(false);
            resetStatusMessage();
            return;
          }
        }
      }

      // In development, use bypass token if no token available
      if (!finalToken && process.env.NODE_ENV === 'development') {
        finalToken = 'dev-bypass';
      }

      if (!finalToken) {
        setSubmitStatus('error');
        setStatusMessage('Security verification required. Please try again.');
        setIsSubmitting(false);
        resetStatusMessage();
        return;
      }

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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#100c08] via-[#1a1510] to-[#251c15]">
        <div className="relative overflow-hidden h-full">
        
        {/* Header with Navigation */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-3 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/"><RaikiLogo showText={false} /></Link>

            {/* Navigation Buttons */}
            <div className="flex gap-2 font-mono">
              <a href="/services" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">services</a>
              <span className="text-[#4a4035]">|</span>
              <a href="/about" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">about</a>
              <span className="text-[#4a4035]">|</span>
              <a href="/" className="text-[#a09080] hover:text-[#e8e0d5] text-xs sm:text-sm tracking-wider transition-colors">home</a>
            </div>
          </nav>
        </header>

        {/* Title - same height as other pages */}
        <div className="absolute left-0 right-0 z-10 px-6 top-[12vh] sm:top-[15vh] flex items-center justify-center">
          <MatrixText
            text="contact"
            className="text-4xl md:text-5xl font-mono font-bold text-[#d0c8b8] tracking-wider"
          />
        </div>

        {/* Form Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6 pt-16">
          <div className="max-w-md mx-auto w-full text-center space-y-6">
            
            {/* Compact Form */}
            <section>
              <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#151210]/50 border border-[#4a4035] text-[#e8e0d5] placeholder-[#8a8070] focus:outline-none focus:border-[#6b6055] transition-colors font-mono text-sm"
                  placeholder="name"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#151210]/50 border border-[#4a4035] text-[#e8e0d5] placeholder-[#8a8070] focus:outline-none focus:border-[#6b6055] transition-colors font-mono text-sm"
                  placeholder="email"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#151210]/50 border border-[#4a4035] text-[#e8e0d5] placeholder-[#8a8070] focus:outline-none focus:border-[#6b6055] transition-colors font-mono text-sm"
                  placeholder="company (optional)"
                  disabled={isSubmitting}
                />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#151210]/50 border border-[#4a4035] text-[#e8e0d5] placeholder-[#8a8070] focus:outline-none focus:border-[#6b6055] transition-colors resize-none font-mono text-sm"
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
                
                {/* Turnstile widget */}
                <div ref={turnstileRef} className="flex justify-center scale-[0.85] -my-4 mb-2"></div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full bg-[#1a1815] border-2 px-5 py-3 relative overflow-hidden transition-all duration-200 flex items-center justify-center ${
                    isSubmitting 
                      ? 'border-[#4a4035] cursor-not-allowed opacity-70' 
                      : 'border-[#F0E8D8]/30 hover:border-[#F0E8D8]/60 hover:scale-105 hover:shadow-lg hover:shadow-[#F0E8D8]/20 cursor-pointer'
                  }`}
                >
                  <div className="absolute inset-0 bg-[#F0E8D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative text-[#d0c8b8] group-hover:text-[#e8e0d5] text-sm tracking-wider leading-none font-mono font-bold">
                    {isSubmitting ? '>> sending...' : '>> send'}
                  </span>
                </button>
              </form>
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