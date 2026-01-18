import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const ConnectGlobe = () => {
    // We could implement a pseudo-CSS globe or just a nice map graphic
    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div className="globe-container-large" style={{
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                background: 'radial-gradient(circle at 30% 30%, #4c1d95, #000)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)',
                marginBottom: '2rem'
            }}>
                {/* Simulated continents/grid */}
                <div className="globe-grid" style={{opacity: 0.5}}></div>
                <div style={{
                    position: 'absolute', inset: 0, 
                    background: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png")',
                    backgroundSize: 'cover',
                    opacity: 0.3,
                    filter: 'invert(1)',
                    animation: 'spinMap 20s linear infinite'
                }}></div>
            </div>

            <h2 className="section-title">Let's Connect Globally</h2>
            
            <div className="social-links-row" style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
                <a href="https://twitter.com/paraspaterya" className="social-btn"><FaTwitter size={24} /></a>
                <a href="https://github.com/paraspaterya" className="social-btn"><FaGithub size={24} /></a>
                <a href="https://linkedin.com" className="social-btn"><FaLinkedin size={24} /></a>
                <a href="mailto:paraspaterya616@gmail.com" className="social-btn"><FaEnvelope size={24} /></a>
            </div>
            
            <style>{`
                @keyframes spinMap {
                    from { background-position: 0 0; }
                    to { background-position: 400px 0; }
                }
                .social-btn {
                    color: var(--text-secondary);
                    transition: all 0.3s;
                }
                .social-btn:hover {
                    color: var(--primary-accent);
                    transform: translateY(-3px);
                }
            `}</style>
        </div>
    );
};

export default ConnectGlobe;
