"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { GlowingButton } from '../ui/glowing-button';
import Link from 'next/link';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

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

    const title = titleRef.current;
    if (title) {
      observer.observe(title);
    }

    return () => {
      if (title) {
        observer.unobserve(title);
      }
    };
  }, []);

  return (
    <section id="home" className=" min-h-screen relative flex items-center justify-center overflow-hidden pt-16">
      <div className="container  mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="font-share-tech-mono mb-15 text-4xl md:text-6xl lg:text-7xl opacity-0 transition-all duration-1000 delay-300 translate-y-10 bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text"
          >
            DECENTRALIZED AIR QUALITY MONITORING
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-0 animate-fade-in-up">
            Join a global network of validators to monitor, verify, and share air quality data. 
            Bringing transparency and accuracy to environmental monitoring through decentralized technology.
          </p>
          
          <div className="flex mb-10 flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up-delay">
            <Link href={"/request-data"}>
            <GlowingButton>For Users</GlowingButton>
            </Link>
            <Link href={"/validator"}>
            <GlowingButton variant="phantom">Start Validating</GlowingButton>
            </Link>
          </div>

        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce opacity-70">
            <ArrowDown size={32} className="text-teal-400 mt-10 " />
          </div>
      </div>

      {/* Abstract glowing orb in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-teal-900/20 via-blue-900/10 to-purple-900/20 blur-3xl opacity-20 animate-pulse-slow pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;