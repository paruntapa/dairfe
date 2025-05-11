"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, CircuitBoard } from 'lucide-react';
import { cn } from '../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-teal-500/20" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <CircuitBoard className="h-8 w-8 text-teal-400" />
          <span className="font-share-tech-mono text-xl md:text-2xl bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text">
            DAIR
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {['Home', 'Air Quality', 'Become a Validator', 'Contribute'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-share-tech-mono text-gray-300 hover:text-teal-400 transition-colors py-2 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <button 
          className="block md:hidden text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['Home', 'Air Quality', 'Become a Validator', 'Contribute'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-share-tech-mono text-gray-300 hover:text-teal-400 transition-colors py-2 border-b border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;