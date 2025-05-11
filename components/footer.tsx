"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, CircuitBoard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-teal-500/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CircuitBoard className="h-8 w-8 text-teal-400" />
              <span className="font-share-tech-mono text-xl bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text">
                DAIR
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              A decentralized air quality monitoring network powered by community validators around the world.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-share-tech-mono text-gray-200 mb-4 text-lg">Links</h3>
            <ul className="space-y-2">
              {['Home', 'Air Quality', 'Become a Validator', 'Contribute'].map(item => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-share-tech-mono text-gray-200 mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'API', 'Validator Guide', 'Community Forum'].map(item => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-share-tech-mono text-gray-200 mb-4 text-lg">Connect</h3>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Subscribe to our newsletter for updates
            </p>
            <div className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-900 border border-gray-700 text-gray-300 p-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-500 flex-grow"
              />
              <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-2 text-sm rounded-r-md hover:from-teal-600 hover:to-blue-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DAIR - Decentralized Air Quality Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;