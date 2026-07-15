import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  return (
    <section className="hero-section" id="about">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-orbit hero-orbit-three" />
      <div className="glow-bg" />
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={itemVariants} className="greeting">Hi, I&apos;m</motion.span>
          <motion.h1 variants={itemVariants} className="hero-title">
            Paras Mani <br />
            <span className="name-highlight">Paterya</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-subtitle">
              I&apos;m <span style={{color: 'var(--text-color)'}}>The Developer</span>. <br/>
              I&apos;m <span style={{color: 'var(--text-muted)'}}>An Engineer</span>.
          </motion.h2>
          <motion.p variants={itemVariants} className="hero-description">
            I turn complex ideas into <strong style={{color: 'var(--text-color)'}}>effortless experiences</strong>.
            Backend Specialist building with purpose.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-buttons">
            <a href="#projects" className="cta-button" style={{fontSize: '1.1rem', padding: '1rem 2.5rem'}}>
              View Projects
            </a>
            <a href="#contact" className="secondary-button" style={{fontSize: '1.1rem', padding: '1rem 2.5rem'}}>
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-proof-strip">
            <div className="proof-pill">API-first thinking</div>
            <div className="proof-pill">Smooth UX motion</div>
            <div className="proof-pill">Scalable system design</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
