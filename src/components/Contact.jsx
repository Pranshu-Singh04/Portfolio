import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <motion.div className="section-label" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        07 — Contact
      </motion.div>

      <motion.h2 className="contact-heading" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
        Let's build<br /><span className="contact-accent">something great.</span>
      </motion.h2>

      <motion.p className="contact-sub" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }}>
        Open to internships, collaborations, and interesting projects.
      </motion.p>

      <motion.div className="contact-links" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
        <a href="mailto:actuallypranshu@email.com" className="contact-email">actuallypranshu@email.com ↗</a>
        <div className="contact-socials">
          <a href="https://github.com/Pranshu-Singh04" target="_blank" rel="noreferrer" className="contact-social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/pranshu-singh-ba6661287" target="_blank" rel="noreferrer" className="contact-social-link">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact-social-link">Twitter</a>
        </div>
      </motion.div>

      <motion.div className="contact-footer" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
        <p>Designed & built by Pranshu Singh © 2025</p>
      </motion.div>
    </section>
  );
}
