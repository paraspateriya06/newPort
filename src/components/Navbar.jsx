import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
        <div className="container nav-content">
            <div className="logo">Paras.</div>

            {/* Desktop Navigation */}
            <ul className="nav-links desktop-only">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className="nav-link">{item.name}</a>
                    </li>
                ))}
            </ul>

            <div className="desktop-only" style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
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

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="mobile-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul className="mobile-nav-links">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a href={item.href} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                        <li>
                             <a href="#contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact Me</a>
                        </li>
                    </ul>
                    <div className="mobile-socials">
                        <a href="https://github.com/paraspaterya" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
                        <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer"><SiLeetcode size={24} /></a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
