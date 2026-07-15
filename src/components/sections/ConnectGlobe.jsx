import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaSpinner, FaTimes } from 'react-icons/fa';
import './ConnectGlobe.css';

const XIcon = () => (
    <span className="x-social-mark" aria-hidden="true">X</span>
);

const ConnectGlobe = () => {
    const globeRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });
    const [submitState, setSubmitState] = useState({
        status: 'idle',
        message: '',
    });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handlePointerMove = (event) => {
        const globe = globeRef.current;
        if (!globe) return;

        const rect = globe.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        globe.style.setProperty('--globe-tilt-x', `${(-y * 5).toFixed(2)}deg`);
        globe.style.setProperty('--globe-tilt-y', `${(x * 7).toFixed(2)}deg`);
        globe.style.setProperty('--globe-light-x', `${(32 + x * 10).toFixed(2)}%`);
        globe.style.setProperty('--globe-light-y', `${(28 + y * 8).toFixed(2)}%`);
    };

    const handlePointerLeave = () => {
        const globe = globeRef.current;
        if (!globe) return;

        globe.style.setProperty('--globe-tilt-x', '0deg');
        globe.style.setProperty('--globe-tilt-y', '0deg');
        globe.style.setProperty('--globe-light-x', '32%');
        globe.style.setProperty('--globe-light-y', '28%');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitState({ status: 'loading', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Unable to send message right now.');
            }

            setSubmitState({
                status: 'success',
                message: data.message || 'Message sent successfully.',
            });
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                website: '',
            });
        } catch (error) {
            setSubmitState({
                status: 'error',
                message: error.message || 'Something went wrong. Please try again.',
            });
        }
    };

    const openForm = () => {
        setSubmitState({ status: 'idle', message: '' });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div className="connect-globe-section">
            <div className={`connect-globe-layout ${isFormOpen ? 'form-open' : ''}`}>
                <div className="connect-copy">
                    <motion.div
                        ref={globeRef}
                        className="globe-stage"
                        onPointerMove={handlePointerMove}
                        onPointerLeave={handlePointerLeave}
                        initial={{ opacity: 0, scale: 0.92, y: 22 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <div className="globe-orbit orbit-one" />
                        <div className="globe-orbit orbit-two" />
                        <div className="globe-shell">
                            <div className="globe-surface">
                                <div className="globe-map" />
                                <div className="globe-grid-lines" />
                            </div>
                            <div className="globe-latitudes" />
                            <div className="globe-meridian meridian-primary" />
                            <div className="globe-meridian meridian-secondary" />
                            <div className="globe-shadow" />
                            <span className="globe-glint" />
                        </div>
                    </motion.div>

                    <h2 className="section-title">Let&apos;s Build Something Memorable</h2>
                    <p className="connect-intro">
                        Share your idea, product, or collaboration plan. Your message will land directly in my inbox with a polished, real-time contact experience.
                    </p>

                    <button type="button" className="contact-launch-button" onClick={openForm}>
                        <FaPaperPlane />
                        Get In Touch
                    </button>

                    <div className="social-links-row">
                        <a href="https://x.com/Paras_Paterya06" className="social-btn" aria-label="X"><XIcon /></a>
                        <a href="https://github.com/paraspateriya06" className="social-btn" aria-label="GitHub"><FaGithub size={22} /></a>
                        <a href="https://www.linkedin.com/in/parasmpaterya06/" className="social-btn" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
                        <a href="mailto:paraspaterya74@gmail.com" className="social-btn" aria-label="Email"><FaEnvelope size={22} /></a>
                    </div>
                </div>

                <AnimatePresence>
                    {isFormOpen ? (
                        <motion.div
                            className="contact-form-shell"
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 80 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.form
                                className="contact-form-panel"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.35 }}
                            >
                                <div className="contact-form-header">
                                    <div className="form-chip">Get In Touch</div>
                                    <button type="button" className="contact-close-button" onClick={closeForm} aria-label="Close contact form">
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className="contact-form-grid">
                                    <label className="contact-field">
                                        <span>Your Name</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Paras, let's talk..."
                                            required
                                        />
                                    </label>

                                    <label className="contact-field">
                                        <span>Email Address</span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </label>

                                    <label className="contact-field contact-field-full">
                                        <span>Subject</span>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="What do you want to build?"
                                            required
                                        />
                                    </label>

                                    <label className="contact-field contact-field-full">
                                        <span>Message</span>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your idea, timeline, and goals."
                                            rows="6"
                                            required
                                        />
                                    </label>

                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="contact-honeypot"
                                        tabIndex="-1"
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="contact-form-footer">
                                    <button
                                        type="submit"
                                        className="contact-submit-button"
                                        disabled={submitState.status === 'loading'}
                                    >
                                        {submitState.status === 'loading' ? (
                                            <>
                                                <FaSpinner className="spin-icon" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    <motion.p
                                        key={submitState.status + submitState.message}
                                        className={`contact-status contact-status-${submitState.status}`}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: submitState.message ? 1 : 0, y: submitState.message ? 0 : 8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {submitState.message || ' '}
                                    </motion.p>
                                </div>
                            </motion.form>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ConnectGlobe;
