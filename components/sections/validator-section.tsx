"use client";

import React, { useEffect, useRef } from 'react';
import { Wallet, Cloud, Database, Coins } from 'lucide-react';
import ValidatorSteps from '../validator-steps';
import { GlowingButton } from '../ui/glowing-button';

const ValidatorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="become-a-validator" className="py-20 relative">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-950/10 to-black/50 z-0"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={sectionRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="font-share-tech-mono text-3xl md:text-4xl mb-3 text-center bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            BECOME A VALIDATOR
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto text-center">
            Join our network of validators and earn rewards for providing accurate air quality data from your location.
            Help build a transparent, decentralized environmental monitoring system.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-purple-900/50 hover:border-purple-500/30 transition-colors duration-300">
              <h3 className="font-share-tech-mono text-2xl mb-6 text-white">Why Become a Validator?</h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Coins className="text-yellow-400" />,
                    title: "Earn Rewards",
                    description: "Receive 0.0008175892220810245 SOL for each validated air quality reading that meets our quality standards."
                  },
                  {
                    icon: <Cloud className="text-blue-400" />,
                    title: "Environmental Impact",
                    description: "Contribute to a global database of air quality information that helps researchers and policymakers."
                  },
                  {
                    icon: <Database className="text-teal-400" />,
                    title: "Decentralization",
                    description: "Be part of a network that ensures air quality data is transparent, accurate, and tamper-proof."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-share-tech-mono text-lg text-white mb-1">{item.title}</h4>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <GlowingButton variant="phantom">Apply to Become a Validator</GlowingButton>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <ValidatorSteps />
            </div>
          </div>
          
          <div className="bg-gray-900/20 border border-purple-900/30 rounded-xl p-8 mb-8">
            <h3 className="font-share-tech-mono text-xl mb-4 text-center text-white">Validator Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                <h4 className="font-share-tech-mono text-purple-400 mb-2">Hardware</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Air quality sensor compatible with our network</li>
                  <li>• Reliable internet connection</li>
                  <li>• Computer or IoT device for running validator software</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                <h4 className="font-share-tech-mono text-blue-400 mb-2">Software</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Phantom wallet for receiving rewards</li>
                  <li>• OpenWeather API key for location validation</li>
                  <li>• DAIR validator application (provided after approval)</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                <h4 className="font-share-tech-mono text-teal-400 mb-2">Commitment</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Minimum uptime of 90% for your validator node</li>
                  <li>• Regular calibration of sensors (guidance provided)</li>
                  <li>• Participation in network governance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2 text-sm">Our validator network is currently active in 37 countries</p>
            <p className="font-share-tech-mono text-2xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-6">
              1,239 active validators and growing
            </p>
            <GlowingButton>View Network Status</GlowingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValidatorSection;