"use client";

import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Wind, Droplets, Thermometer } from 'lucide-react';
import WorldMap from '../world-map';
import { GlowingButton } from '../ui/glowing-button';

const AirQualitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
    const stats = statsRef.current;
    
    if (section) observer.observe(section);
    if (stats) observer.observe(stats);

    return () => {
      if (section) observer.unobserve(section);
      if (stats) observer.unobserve(stats);
    };
  }, []);

  return (
    <section id="air-quality" className="py-20 relative">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-teal-950/10 to-black/50 z-0"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={sectionRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="font-share-tech-mono text-3xl md:text-4xl mb-3 text-center bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
            AIR QUALITY CRISIS
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto text-center">
            According to the World Health Organization, 99% of the global population breathes air that exceeds WHO guideline limits. We're building a transparent network to monitor and improve air quality worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-teal-900/50 hover:border-teal-500/30 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-orange-500 mr-3" size={24} />
                <h3 className="font-share-tech-mono text-xl text-white">The Global Impact</h3>
              </div>
              <p className="text-gray-300">
                Air pollution is responsible for an estimated 7 million premature deaths annually. Most affected are low and middle-income countries, where air quality monitoring is often insufficient or non-existent.
              </p>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-red-400 text-4xl font-share-tech-mono">7M+</p>
                  <p className="text-gray-400 text-sm">Annual deaths</p>
                </div>
                <div>
                  <p className="text-orange-400 text-4xl font-share-tech-mono">99%</p>
                  <p className="text-gray-400 text-sm">Affected population</p>
                </div>
                <div>
                  <p className="text-yellow-400 text-4xl font-share-tech-mono">43%</p>
                  <p className="text-gray-400 text-sm">Monitoring gap</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-teal-900/50 hover:border-teal-500/30 transition-colors duration-300">
              <WorldMap />
              <p className="text-gray-400 text-sm mt-4 text-center">
                Interactive map showing air quality monitoring locations and data coverage
              </p>
            </div>
          </div>
          
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 opacity-0 translate-y-10 transition-all duration-1000 delay-300"
          >
            {[
              { icon: <Wind className="text-teal-400" />, title: "PM2.5", value: "36.2 µg/m³", desc: "Particulate matter" },
              { icon: <Droplets className="text-blue-400" />, title: "CO", value: "4.8 ppm", desc: "Carbon monoxide" },
              { icon: <Thermometer className="text-orange-400" />, title: "O3", value: "102 ppb", desc: "Ozone" },
              { icon: <Wind className="text-purple-400" />, title: "NO2", value: "25 ppb", desc: "Nitrogen dioxide" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-900/30 mb-10  backdrop-blur-sm p-6 rounded-xl border border-teal-900/50 hover:border-teal-500/30 transition-colors duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <h4 className="font-share-tech-mono text-lg text-white">{stat.title}</h4>
                <p className="text-2xl font-share-tech-mono bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center ">
            <GlowingButton>View Global Dashboard</GlowingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirQualitySection;