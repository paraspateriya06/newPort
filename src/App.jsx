import React, { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Layout.css';

const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

const Background3D = lazyWithPreload(() => import('./components/Background3D'));
const TechStack = lazyWithPreload(() => import('./components/TechStack'));
const Experience = lazyWithPreload(() => import('./components/Experience'));
const Projects = lazyWithPreload(() => import('./components/Projects'));
const Timezone = lazyWithPreload(() => import('./components/Timezone'));
const SoundControl = lazyWithPreload(() => import('./components/SoundControl'));
const Journey = lazyWithPreload(() => import('./components/sections/Journey'));
const WhatIOffer = lazyWithPreload(() => import('./components/sections/WhatIOffer'));
const Workflow = lazyWithPreload(() => import('./components/sections/Workflow'));
const ConnectGlobe = lazyWithPreload(() => import('./components/sections/ConnectGlobe'));

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

const SectionFallback = ({ title, lines = 3, compact = false }) => (
  <div className={`section-fallback ${compact ? 'compact' : ''}`}>
    <div className="section-fallback-title shimmer-block" style={{ width: title || '40%' }} />
    <div className="section-fallback-grid">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="section-fallback-line shimmer-block" />
      ))}
    </div>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [pointerGlow, setPointerGlow] = useState({ x: 50, y: 18 });

  useEffect(() => {
    const preload = () => {
      [
        Background3D,
        SoundControl,
        TechStack,
        Timezone,
        WhatIOffer,
        Journey,
        Workflow,
        Experience,
        Projects,
        ConnectGlobe,
      ].forEach((component) => component.preload?.());
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1500 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      setPointerGlow({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      className="App"
      style={{
        position: 'relative',
        overflowX: 'hidden',
        '--pointer-x': `${pointerGlow.x}%`,
        '--pointer-y': `${pointerGlow.y}%`,
      }}
    >
       <div className="app-spotlight" aria-hidden="true" />
       <Suspense fallback={null}>
         <Background3D />
       </Suspense>
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
      
      <Suspense fallback={null}>
        <SoundControl />
      </Suspense>
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
                    <Suspense fallback={<SectionFallback title="32%" lines={5} compact />}>
                      <TechStack />
                    </Suspense>
                </SectionCard>
            </div>

            {/* Timezone */}
            <div className="col-span-4" style={{height: '100%'}}>
                 <SectionCard theme="blue" delay={0.2} style={{height: '100%'}}>
                    <Suspense fallback={<SectionFallback title="46%" lines={4} compact />}>
                      <Timezone />
                    </Suspense>
                 </SectionCard>
            </div>

            {/* What I Offer - New */}
            <div className="col-span-4" style={{height: '100%'}}>
                 <SectionCard theme="orange" delay={0.1} style={{height: '100%'}}>
                    <Suspense fallback={<SectionFallback title="38%" lines={4} compact />}>
                      <WhatIOffer />
                    </Suspense>
                 </SectionCard>
            </div>

            {/* Journey - New */}
            <div className="col-span-8" style={{height: '100%'}}>
                 <SectionCard theme="green" delay={0.2} style={{height: '100%'}}>
                    <Suspense fallback={<SectionFallback title="36%" lines={5} compact />}>
                      <Journey />
                    </Suspense>
                 </SectionCard>
            </div>

             {/* Workflow - New */}
             <div className="col-span-12">
                 <SectionCard theme="blue" delay={0.1}>
                    <Suspense fallback={<SectionFallback title="34%" lines={4} />}>
                      <Workflow />
                    </Suspense>
                 </SectionCard>
            </div>

            {/* Experience */}
            <div className="col-span-12">
                <SectionCard theme="green" id="experience" delay={0.1}>
                    <Suspense fallback={<SectionFallback title="42%" lines={6} />}>
                      <Experience />
                    </Suspense>
                </SectionCard>
            </div>

            {/* Projects */}
            <div className="col-span-12">
                <SectionCard theme="orange" id="projects" delay={0.1}>
                    <Suspense fallback={<SectionFallback title="36%" lines={5} />}>
                      <Projects />
                    </Suspense>
                </SectionCard>
            </div>

            {/* Connect Globe - Replaces old Contact */}
            <div className="col-span-12">
                <SectionCard theme="violet" id="contact" delay={0.2}>
                    <Suspense fallback={<SectionFallback title="33%" lines={4} />}>
                      <ConnectGlobe />
                    </Suspense>
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
