"use client";

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ConnectWalletScreen } from './ConnectWalletScreen';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { publicKey } = useWallet();
  const { isAuthenticated } = useAuth();

  if (!publicKey) {
    return <ConnectWalletScreen />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl text-white text-center">Waiting for signature...</h2>
          <p className="text-gray-400 text-center text-sm">
            Please sign the message in your wallet to authenticate.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}; 