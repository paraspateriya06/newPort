import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Quick Blog',
    subtitle: 'AI Blogging Application',
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'Gemini API'],
    description: 'A full-stack blogging platform integrated with Gemini AI. Features user authentication (JWT), role-based access, and interactive state management.',
    github: 'https://github.com/paraspaterya', // Placeholder
    demo: '#'
  },
  {
    title: 'HealthYoga',
    subtitle: 'Problem-Focused Yoga Guidance',
    tech: ['React', 'Firebase', 'Node.js', 'Express', 'Tailwind'],
    description: 'Wellness platform offering personalized yoga plans. Implements secure Firebase authentication and real-time cloud data synchronization.',
    github: 'https://github.com/paraspaterya',
    demo: '#'
  },
  {
    title: 'Mooney BookStore',
    subtitle: 'Library Book Management',
    tech: ['React', 'Express', 'Node.js', 'MongoDB'],
    description: 'Comprehensive bookstore management system with full CRUD operations for inventory, utilizing clean RESTful architecture.',
    github: 'https://github.com/paraspaterya',
    demo: '#'
  }
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
             <motion.div 
               key={index}
               className="project-card glass-card"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.2 }}
               viewport={{ once: true }}
             >
               <h3 className="project-title">{project.title}</h3>
               <span className="project-subtitle">{project.subtitle}</span>
               
               <p className="project-desc">{project.description}</p>
               
               <div className="project-tags">
                 {project.tech.map(t => (
                   <span key={t} className="tag">{t}</span>
                 ))}
               </div>
               
               <div className="project-links">
                 <a href={project.github} className="link-btn" title="View Code" target="_blank" rel="noopener noreferrer">
                   <FaGithub /> Code
                 </a>
                 {/* <a href={project.demo} className="link-btn" title="Live Demo"><FaExternalLinkAlt /> Demo</a> */}
                 {/* Demo link commented out if not available, but UI should support it */}
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
