"use client";

import React, { useEffect, useRef } from 'react';
import { Code, Users, Globe, BookOpen } from 'lucide-react';
import { GlowingButton } from '../ui/glowing-button';

const ContributeSection = () => {
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
    <section id="contribute" className="py-20 relative">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-cyan-950/10 to-black/50 z-0"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={sectionRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="font-share-tech-mono text-3xl md:text-4xl mb-3 text-center bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            CONTRIBUTE TO DAIR
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto text-center">
            Beyond being a validator, there are many ways to contribute to the DAIR ecosystem and help build a cleaner, healthier future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-cyan-900/50 hover:border-cyan-500/30 transition-colors duration-300">
              <h3 className="font-share-tech-mono text-2xl mb-6 text-white text-center">Our Vision</h3>
              
              <p className="text-gray-300 mb-6 text-center max-w-3xl mx-auto">
                We envision a world where everyone has access to accurate, real-time air quality information. By decentralizing air quality monitoring, we're creating a system that's resistant to censorship, manipulation, and gaps in coverage.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Transparency', 'Accuracy', 'Global Coverage', 'Accessibility', 'Community-Driven'].map((value, index) => (
                  <span key={index} className="bg-gray-800/70 text-cyan-400 px-4 py-2 rounded-full text-sm font-share-tech-mono">
                    {value}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 flex-1">
                  <h4 className="font-share-tech-mono text-lg text-cyan-400 mb-3">Key Impact Areas</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Public health awareness and pollution reduction initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Environmental policy advocacy based on reliable data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Research and development of air quality improvement technologies</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 flex-1">
                  <h4 className="font-share-tech-mono text-lg text-blue-400 mb-3">Success Metrics</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Global coverage: Validators in 100+ countries by 2026</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Data reliability: 99.9% uptime and verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Adoption: Integration with 50+ climate action platforms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-cyan-900/50 hover:border-cyan-500/30 transition-colors duration-300">
              <h3 className="font-share-tech-mono text-2xl mb-6 text-white">Ways to Contribute</h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Code className="text-cyan-400" />,
                    title: "Developer Contributions",
                    description: "Help improve our open-source code, build new features, or create tools that leverage our air quality data API."
                  },
                  {
                    icon: <Users className="text-blue-400" />,
                    title: "Community Outreach",
                    description: "Spread awareness about air quality issues, organize local monitoring initiatives, and educate others about our platform."
                  },
                  {
                    icon: <Globe className="text-green-400" />,
                    title: "Data Analysis",
                    description: "Use our data to create visualizations, research papers, or predictive models that help communities understand and address air pollution."
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
                <GlowingButton>Join Our Community</GlowingButton>
              </div>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-cyan-900/50 hover:border-cyan-500/30 transition-colors duration-300">
              <h3 className="font-share-tech-mono text-2xl mb-6 text-white">Resources & Documentation</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: <BookOpen className="text-cyan-400" />,
                    title: "Developer Docs",
                    description: "Complete API documentation, integration guides, and SDK references."
                  },
                  {
                    icon: <Code className="text-blue-400" />,
                    title: "GitHub Repository",
                    description: "Access our open-source codebase, submit issues, and contribute pull requests."
                  },
                  {
                    icon: <Users className="text-purple-400" />,
                    title: "Community Forum",
                    description: "Join discussions, share ideas, and connect with other contributors."
                  },
                  {
                    icon: <Globe className="text-green-400" />,
                    title: "Data Portal",
                    description: "Access historical and real-time air quality data for research and analysis."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                        {item.icon}
                      </div>
                      <h4 className="font-share-tech-mono text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <GlowingButton>Access Resources</GlowingButton>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="font-share-tech-mono text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-6">
              Join us in building a healthier planet
            </p>
            <GlowingButton>Get Started Today</GlowingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;