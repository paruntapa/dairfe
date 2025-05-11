"use client";

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const WalletDisplay: React.FC = () => {
  const { publicKey, disconnect } = useWallet();
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  if (!publicKey) return null;

  // Format wallet address (first 5 and last 5 characters)
  const formattedAddress = `${publicKey.toString().substring(0, 5)}...${publicKey.toString().substring(publicKey.toString().length - 5)}`;

  // Handle disconnection and clear token
  const handleDisconnect = () => {
    localStorage.removeItem('token');
    router.push(window.location.pathname);
    setIsAuthenticated(false);
    if (disconnect) disconnect();
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(138,43,226,0.5)] group"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-white"
          >
            <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
            <path d="M15 9h2" />
          </svg>
        </div>
        <span className="text-sm text-white font-mono group-hover:text-purple-300">
          {formattedAddress}
        </span>
        <button 
          onClick={handleDisconnect}
          className="ml-2 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded-md px-2 py-1"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}; 