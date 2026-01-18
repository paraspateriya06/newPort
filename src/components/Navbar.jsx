import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
        <div className="container nav-content">
            <div className="logo">Paras.</div>
            <ul className="nav-links">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className="nav-link">{item.name}</a>
                    </li>
                ))}
            </ul>
            <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                <div className="social-links" style={{display: 'flex', gap: '1rem'}}>
                    <a href="https://github.com/paraspaterya" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <SiLeetcode size={20} />
                    </a>
                </div>
                <a href="#contact" className="cta-button">Contact Me</a>
            </div>
        </div>
    </motion.nav>
  );
};

export default Navbar;
