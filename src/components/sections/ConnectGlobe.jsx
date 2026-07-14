import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './ConnectGlobe.css';

const XIcon = () => (
    <span className="x-social-mark" aria-hidden="true">X</span>
);

const ConnectGlobe = () => {
    return (
        <div className="connect-globe-section">
            <motion.div
                className="globe-stage"
                initial={{ opacity: 0, scale: 0.92, y: 22 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
            >
                <div className="globe-orbit orbit-one" />
                <div className="globe-orbit orbit-two" />
                <div className="globe-shell">
                    <div className="globe-shadow" />
                    <div className="globe-grid-lines" />
                    <div className="globe-latitudes" />
                    <div className="globe-map" />
                    <span className="globe-glint" />
                </div>
            </motion.div>

            <h2 className="section-title">Let's Connect Globally</h2>
            
            <div className="social-links-row">
                <a href="https://x.com/Paras_Paterya06" className="social-btn" aria-label="X"><XIcon /></a>
                <a href="https://github.com/paraspateriya06" className="social-btn" aria-label="GitHub"><FaGithub size={22} /></a>
                <a href="https://www.linkedin.com/in/parasmpaterya06/" className="social-btn" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
                <a href="mailto:paraspaterya616@gmail.com" className="social-btn" aria-label="Email"><FaEnvelope size={22} /></a>
            </div>
        </div>
    );
};

export default ConnectGlobe;
