import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="about">
      <div className="glow-bg" />
      <div className="container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="greeting">Hi, I'm</span>
          <h1 className="hero-title">
            Paras Mani <br />
            <span className="name-highlight">Paterya</span>
          </h1>
          <h2 style={{fontSize: '2rem', marginBottom: '1rem', color: '#cbd5e1'}}>
              I'm <span style={{color: '#2dd4bf'}}>The Developer</span>. <br/>
              I'm <span style={{color: '#94a3b8'}}>An Engineer</span>.
          </h2>
          <p className="hero-description">
            I turn complex ideas into <strong style={{color: '#f1f5f9'}}>effortless experiences</strong>. 
            Backend Specialist building with purpose.
          </p>
          
          <div className="hero-buttons">
            <a href="#projects" className="cta-button" style={{fontSize: '1.1rem', padding: '1rem 2.5rem'}}>
              View Projects
            </a>
            <a href="#contact" className="secondary-button" style={{fontSize: '1.1rem', padding: '1rem 2.5rem'}}>
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
