"use client";

import React, { useState } from 'react';
import { Wallet, Key, Database, Coins } from 'lucide-react';

const ValidatorSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: <Wallet className="text-purple-400" />,
      title: "Connect Phantom Wallet",
      description: "Create and connect your Phantom wallet to receive SOL rewards for your validator contributions.",
      detail: "The Phantom wallet securely stores your private keys and enables you to receive rewards in SOL cryptocurrency."
    },
    {
      icon: <Key className="text-blue-400" />,
      title: "Get OpenWeather API Key",
      description: "Sign up for an OpenWeather account and generate an API key for location validation.",
      detail: "Your OpenWeather API key helps verify the geographic data of your air quality readings, ensuring accurate global mapping."
    },
    {
      icon: <Database className="text-teal-400" />,
      title: "Submit Validation Data",
      description: "Connect your air quality sensor and submit readings to our decentralized network.",
      detail: "Your sensor data is cryptographically signed and verified before being added to our immutable air quality database."
    },
    {
      icon: <Coins className="text-yellow-400" />,
      title: "Receive SOL Rewards",
      description: "Get paid 0.0008175892220810245 SOL for each successful validation.",
      detail: "Rewards are automatically sent to your connected Phantom wallet after your data passes our quality and consistency checks."
    }
  ];

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-purple-900/50">
      <h3 className="font-share-tech-mono text-2xl mb-8 text-white">Onboarding Process</h3>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-700 -translate-x-1/2 z-0"></div>
        
        {/* Steps */}
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex gap-4 cursor-pointer transition-all duration-300 ${activeStep === index ? 'scale-105' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="relative">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                    index <= activeStep 
                      ? 'bg-gray-800 border-2 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                      : 'bg-gray-800 border border-gray-700'
                  }`}
                >
                  {step.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-share-tech-mono text-lg text-white mb-1">{step.title}</h4>
                <p className="text-gray-300 mb-2">{step.description}</p>
                
                {activeStep === index && (
                  <div className="bg-gray-800/50 p-3 rounded-md border border-purple-900/50 text-gray-400 text-sm animate-fade-in">
                    {step.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          className="px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        
        <button 
          className={`px-4 py-2 text-sm bg-gradient-to-r rounded-md ${
            activeStep === steps.length - 1 
              ? 'from-purple-500 to-blue-500 text-white' 
              : 'from-purple-600 to-blue-600 text-white'
          }`}
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default ValidatorSteps;