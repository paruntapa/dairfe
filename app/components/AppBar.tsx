"use client";
import React, { useEffect } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { WalletDisplay } from './WalletDisplay';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const AppBar = () => {
  const { publicKey, signMessage } = useWallet();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  async function authenticate() {
    if (!publicKey || isAuthenticated || localStorage.getItem("token")) {
        return;
    }

    try {
      const message = new TextEncoder().encode(
          `Sign into Dair with ${publicKey} at ${new Date().toLocaleString('en-US')}`
      );
      const signature = await signMessage?.(message);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/signin`, {
        signature: { data: Array.from(signature!) },
        publicKey: publicKey?.toString(),
        message: Array.from(message)
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  }

  useEffect(() => {
    if (publicKey && !isAuthenticated) {
      authenticate();
      router.refresh();

    }
  }, [publicKey, isAuthenticated]);
  
  return (
    <div className='flex justify-between border-b m-1 border-gray-700 items-center py-3 px-4'>
        <div>
            <h1 className='text-2xl px-2 font-bold cursor-pointer' onClick={() => router.push('/')}>Dair</h1>
        </div>
        <div className='flex items-center gap-4'>
            {publicKey ? <WalletDisplay /> : <WalletMultiButton />}
        </div>
    </div>
  )
}

export default AppBar