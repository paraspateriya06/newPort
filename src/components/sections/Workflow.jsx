import React from 'react';
import { motion } from 'framer-motion';
import { FaCogs, FaBug, FaRocket, FaTools } from 'react-icons/fa';

const Workflow = () => {
    const steps = [
        { name: 'Prototype', icon: <FaTools />, color: '#94a3b8' },
        { name: 'Build', icon: <FaCogs />, color: '#60a5fa' },
        { name: 'Debug', icon: <FaBug />, color: '#f87171' },
        { name: 'Refine', icon: <FaRocket />, color: '#34d399' }
    ];

  return (
    <div style={{height: '100%'}}>
      <h2 className="section-title" style={{textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem'}}>
          How I Work
      </h2>
      
      <div className="workflow-steps" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
         <div style={{position: 'absolute', top: '25px', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0}} />
         
         {steps.map((step, i) => (
             <motion.div 
                key={i} 
                className="step-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.5rem'}}
             >
                 <div className="step-icon" style={{
                     width: '50px', 
                     height: '50px', 
                     borderRadius: '50%', 
                     background: 'rgba(30, 41, 59, 0.8)',
                     border: `1px solid ${step.color}`,
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     color: step.color
                 }}>
                     {step.icon}
                 </div>
                 <span style={{fontSize: '0.9rem', fontWeight: '500'}}>{step.name}</span>
             </motion.div>
         ))}
      </div>
      
      <div style={{marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>
          <p>Iterative development with a focus on stability.</p>
      </div>
    </div>
  );
};

export default Workflow;
