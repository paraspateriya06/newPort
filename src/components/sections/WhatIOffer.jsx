import React from 'react';
import { motion } from 'framer-motion';
import { FaLayerGroup, FaBolt, FaCode } from 'react-icons/fa';

const WhatIOffer = () => {
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <h2 className="section-title" style={{fontSize: '1.8rem', textAlign: 'left', marginBottom: '0'}}>
            Build & Create
        </h2>
        <p style={{fontStyle: 'italic', color: 'var(--primary-accent)'}}>
            "I don't just code, I build with purpose."
        </p>

        <div style={{display: 'grid', gap: '1rem'}}>
            <motion.div className="offer-item" whileHover={{x: 5}}>
                <FaBolt color="#fbbf24" style={{marginTop: '3px'}} />
                <div>
                    <h4 style={{fontWeight: '600'}}>Consistency</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Delivering reliable code, day in, day out.</p>
                </div>
            </motion.div>
            <motion.div className="offer-item" whileHover={{x: 5}}>
               <FaLayerGroup color="#34d399" style={{marginTop: '3px'}} />
                <div>
                    <h4 style={{fontWeight: '600'}}>Scalable Architecture</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Designing systems that grow with your needs.</p>
                </div>
            </motion.div>
            <motion.div className="offer-item" whileHover={{x: 5}}>
               <FaCode color="#60a5fa" style={{marginTop: '3px'}} />
                <div>
                    <h4 style={{fontWeight: '600'}}>Clean Code</h4>
                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Readable, maintainable, and efficient solutions.</p>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default WhatIOffer;
