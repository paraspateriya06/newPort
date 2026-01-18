import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBrain, FaMedal } from 'react-icons/fa';

const Journey = () => {
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <h2 className="section-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>My Journey</h2>
      
      <div className="journey-timeline">
         <motion.div 
            className="journey-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
         >
             <div className="icon-box-small"><FaGraduationCap /></div>
             <div className="journey-content">
                 <h3 style={{fontSize: '1.1rem', fontWeight: '600'}}>Institute of Engineering and Technology</h3>
                 <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>B.Tech in Information Technology</p>
                 <span style={{color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: '500'}}>2022 - 2026 Batch</span>
                 <p style={{marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.4'}}>
                     Maintained a strong academic record while actively leading technical clubs and winning multiple hackathons.
                 </p>
             </div>
         </motion.div>
         
         {/* We can add more journey items here later */}
      </div>
    </div>
  );
};

export default Journey;
