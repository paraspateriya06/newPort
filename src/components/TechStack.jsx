import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiExpress, SiMongodb, 
  SiPython, SiCplusplus, SiHtml5, SiCss3, 
  SiPostman, SiGit, SiFirebase, SiJavascript,
  SiPrisma, SiDocker, SiApachekafka,
  SiSpring, SiSpringboot
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import './TechStack.css';

const skills = [
  { name: 'React', icon: <SiReact color="#61DAFB" /> },
  { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
  { name: 'Spring Boot', icon: <SiSpringboot color="#6DB33F" /> }, // Spring Boot Green
  { name: 'Spring', icon: <SiSpring color="#6DB33F" /> },
  { name: 'Express', icon: <SiExpress color="white" /> }, 
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
  { name: 'Prisma', icon: <SiPrisma color="#2D3748" /> }, // ORM
  { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
  { name: 'Kafka', icon: <SiApachekafka color="#231F20" /> }, // Kafka
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
  { name: 'HTML5', icon: <SiHtml5 color="#E34F26" /> },
  { name: 'CSS3', icon: <SiCss3 color="#1572B6" /> },
  { name: 'Git', icon: <SiGit color="#F05032" /> },
  { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
  // { name: 'SQL', icon: <FaDatabase color="#f2f2f2" /> },
];

const TechStack = () => {
  return (
    <section className="skills-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{marginBottom: '1.5rem'}}
        >
          Tech Universe
        </motion.h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="skill-card glass-card"
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.05, 
                type: "spring", 
                stiffness: 100 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5, 
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" 
              }}
            >
              <div className="skill-icon" style={{color: skill.icon.props.color || 'inherit'}}>
                {skill.icon}
              </div>
              <span className="skill-name">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
