import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    role: 'Backend Developer Internship',
    company: 'PAXTRADE GLOBAL PVT. LTD (Squar FT)',
    period: 'Jan 2026 - Present',
    description: [
      'Working as a Backend Developer on a MERN-based SaaS platform for PG and property owners to manage tenants, wardens, and hostel operations.',
      'Designed and developed RESTful APIs using Node.js and Express.js for hostel patrol management, warden cleaning services, and tenant workflows.',
      'Built dashboard APIs to generate hostel cleaning alerts and operational insights for property owners and wardens.',
      'Implemented APIs to edit property owner details, update property names, and manage property configurations.',
      'Designed database schemas and wrote Prisma ORM queries for PostgreSQL, ensuring efficient relational data modeling and optimized query performance.',
      'Implemented role-based access control (Property Owner, Warden, Tenant) and secure authentication for backend services.',
      'Collaborated in an agile, multi-developer environment using Git, code reviews, and CI/CD workflows to deliver scalable, production-ready backend systems.'
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
