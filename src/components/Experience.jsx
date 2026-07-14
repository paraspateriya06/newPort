import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    role: 'Backend Developer Intern',
    company: 'Occupant',
    period: 'Dec 2025 - Feb 2026',
    description: [
      'Worked on backend services for a MERN-based hostel and PG management SaaS platform used by property owners, wardens, and tenants.',
      'Designed and developed RESTful APIs using Node.js and Express.js for hostel patrol management, warden cleaning services, and tenant workflows.',
      'Built dashboard APIs to generate hostel cleaning alerts and operational insights for property owners and wardens.',
      'Implemented APIs to edit property owner details, update property names, and manage property configurations.',
      'Designed database schemas and wrote Prisma ORM queries for PostgreSQL to support efficient relational data modeling and query performance.',
      'Implemented role-based access control for Property Owner, Warden, and Tenant users with secure authentication for backend services.',
      'Collaborated in an agile development environment using Git, code reviews, and CI/CD workflows to deliver production-ready backend features.'
    ]
  },
  {
    role: 'Backend Developer Intern',
    company: 'Paxtrade Global Pvt Ltd (Squar FT)',
    period: 'Jan 2026 - Jul 2026',
    description: [
      "Developed backend services for Squar FT's real estate property listing platform across the Broker App, Field Officer App, User App, and Admin App.",
      'Implemented role-based access control (RBAC) for brokers, field officers, users, and admins to ensure secure access to property data and application workflows.',
      'Built admin approval and property verification workflows, allowing brokers to edit submitted properties before approval while restricting updates after admin approval.',
      'Worked on multi-step property listing modules covering property type, owner details, location, area details, pricing, payment preferences, images, documents, and submission flows.',
      'Integrated backend APIs with frontend applications to support Add Property, My Added Properties, Edit Property, Admin Review, and property status management screens.',
      'Performed API testing, debugging, request validation, error handling, and database integration to improve reliability, data consistency, and backend performance.',
      'Collaborated in an Agile development environment using Git, pull requests, code reviews, and team coordination to deliver production-ready backend features.'
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
