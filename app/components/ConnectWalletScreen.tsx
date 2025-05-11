"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ConnectWalletScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md w-full">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-6 h-6 text-white"
          >
            <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
            <path d="M15 9h2" />
          </svg>
        </div>
        
        <h2 className="text-xl font-medium text-white text-center">Connect Wallet</h2>
        
        <p className="text-gray-400 text-center text-sm">
          Connect your wallet to access the air quality data platform.
        </p>
        
        <div className="w-full">
          <div className="flex justify-center">
            <div className="wallet-adapter-button-wrapper">
              <WalletMultiButton 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-md transition-all duration-200 w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 