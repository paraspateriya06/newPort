import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Timezone.css';

const Timezone = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time for India (IST)
  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const timeGreeting = () => {
    const hour = parseInt(time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }));
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div 
      className="glass-card timezone-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="globe-container">
        <div className="globe gray-theme">
          <div className="globe-grid"></div>
        </div>
      </div>
      
      <div>
        <h3 className="section-title" style={{fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center'}}>
            {timeGreeting()}
        </h3>
        <div className="time-display">{formattedTime}</div>
        <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem'}}>
            Indore, India (IST)
        </p>
      </div>

      <div className="location-tag">
        <FaMapMarkerAlt /> Remote Friendly
      </div>

      <p className="availability-status">
        Open to work across time zones
      </p>
    </motion.div>
  );
};

export default Timezone;
