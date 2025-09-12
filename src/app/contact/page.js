'use client';

import { useState, useEffect, useRef } from 'react';
import RaikiLogo from '../components/RaikiLogo';
import NeuralNetwork from '../components/MouseTrail';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const menuRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Hero Section with Neural Network */}
      <div className="relative overflow-hidden">
        <NeuralNetwork />
        
        {/* Header - positioned over neural network */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-transparent">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/"><RaikiLogo /></a>
            
            {/* Burger Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-0 cursor-pointer"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
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
        <section className="relative px-6 py-12 z-10">
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              get in touch
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              ready to start your project? let's discuss how we can help bring your vision to life
            </p>
          </div>
        </section>
      </div>

      {/* Visual Break */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      {/* Contact Form Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
              message sent successfully
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all duration-300"
                placeholder="name"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all duration-300"
                placeholder="email"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all duration-300"
                placeholder="company (optional)"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition-all duration-300 resize-none"
                placeholder="message"
                required
              ></textarea>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'sending...' : 'send'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}