import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    role: 'Backend Developer Internship',
    company: 'Minimal Hollc',
    period: 'May 2025 - July 2025',
    description: [
      'Technologies Used: Java, SQL, REST APIs, Git, Nodejs, Express js, Axios.',
      'Designed and implemented REST APIs using Node Js , Express Js and SQL with role based access control and secure authentication.',
      'Collaborated in an agile, multi-developer environment with code reviews, version control, and CI/CD workflows.'
    ]
  }
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content glass-card">
                <div className="job-header">
                  <div>
                    <h3 className="job-role">{exp.role}</h3>
                    <h4 className="job-company">{exp.company}</h4>
                  </div>
                  <span className="job-period">{exp.period}</span>
                </div>
                <ul className="job-details">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
