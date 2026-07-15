import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = 90;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveSection(targetId);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('about');
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
        <div className="container nav-content">
            <button type="button" className="logo logo-button" onClick={handleLogoClick}>Paras.</button>

            {/* Desktop Navigation */}
            <ul className="nav-links desktop-only">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                            onClick={(event) => handleNavClick(event, item.href)}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="desktop-only" style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                <div className="social-links" style={{display: 'flex', gap: '1rem'}}>
                    <a href="https://github.com/paraspateriya06" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/parasmpaterya06/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://leetcode.com/u/paraspaterya06/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <SiLeetcode size={20} />
                    </a>
                </div>
                <a href="#contact" className="cta-button" onClick={(event) => handleNavClick(event, '#contact')}>Contact Me</a>
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
                                <a
                                    href={item.href}
                                    className={`mobile-nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                                    onClick={(event) => handleNavClick(event, item.href)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mobile-socials">
                        <a href="https://github.com/paraspateriya06" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                        <a href="https://www.linkedin.com/in/parasmpaterya06/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
                        <a href="https://leetcode.com/u/paraspaterya06/" target="_blank" rel="noopener noreferrer"><SiLeetcode size={24} /></a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
