import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';

import Timezone from './components/Timezone';
import SoundControl from './components/SoundControl';
import Journey from './components/sections/Journey';
import WhatIOffer from './components/sections/WhatIOffer';
import Workflow from './components/sections/Workflow';
import ConnectGlobe from './components/sections/ConnectGlobe';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Layout.css';

// Wrapper for themed sections
const SectionCard = ({ children, className, theme = "default", id, delay = 0 }) => (
  <motion.div 
    className={`section-card-wrapper theme-${theme} ${className || ''}`}
    id={id}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
    }}
  >
    {children}
  </motion.div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="App">
       {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--primary-accent)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />
      
      <SoundControl />
      <Navbar />
      
      <main className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
        
        {/* Hero Section */}
        <div style={{marginBottom: '2rem'}}>
             <Hero />
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
            
            {/* Tech Stack */}
            <div className="col-span-8">
                <SectionCard theme="violet" delay={0.1}>
                    <TechStack />
                </SectionCard>
            </div>

            {/* Timezone */}
            <div className="col-span-4" style={{height: '100%'}}>
                 <SectionCard theme="blue" delay={0.2} style={{height: '100%'}}>
                    <Timezone />
                 </SectionCard>
            </div>

            {/* What I Offer - New */}
            <div className="col-span-4" style={{height: '100%'}}>
                 <SectionCard theme="orange" delay={0.1} style={{height: '100%'}}>
                    <WhatIOffer />
                 </SectionCard>
            </div>

            {/* Journey - New */}
            <div className="col-span-8" style={{height: '100%'}}>
                 <SectionCard theme="green" delay={0.2} style={{height: '100%'}}>
                    <Journey />
                 </SectionCard>
            </div>

             {/* Workflow - New */}
             <div className="col-span-12">
                 <SectionCard theme="blue" delay={0.1}>
                    <Workflow />
                 </SectionCard>
            </div>

            {/* Experience */}
            <div className="col-span-12">
                <SectionCard theme="green" id="experience" delay={0.1}>
                    <Experience />
                </SectionCard>
            </div>

            {/* Projects */}
            <div className="col-span-12">
                <SectionCard theme="orange" id="projects" delay={0.1}>
                    <Projects />
                </SectionCard>
            </div>

            {/* Connect Globe - Replaces old Contact */}
            <div className="col-span-12">
                <SectionCard theme="violet" id="contact" delay={0.2}>
                    <ConnectGlobe />
                </SectionCard>
            </div>

        </div>

      </main>
      
      <footer style={{
        textAlign: 'center', 
        padding: '2rem 1rem', 
        color: 'var(--text-secondary)', 
        fontSize: '0.9rem',
        borderTop: '1px solid var(--glass-border)',
        marginTop: '2rem'
      }}>
        <p>© {new Date().getFullYear()} Paras Mani Paterya</p>
      </footer>
    </div>
  );
}

export default App;
