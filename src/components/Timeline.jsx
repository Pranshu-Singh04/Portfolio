import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
  { year: '2025', title: 'Your Most Recent Role', place: 'Organisation / Institution', description: 'What you did, built, or achieved. Replace with your actual experience.' },
  { year: '2024', title: 'Previous Role or Achievement', place: 'Organisation / Institution', description: 'Description of this experience. What did you contribute and what did you learn?' },
  { year: '2023', title: 'Earlier Experience', place: 'School / Project / Competition', description: 'An earlier milestone — hackathon win, project launch, etc.' },
  { year: '2024', title: 'Started College', place: 'Jaipur, India', description: 'My journey started at Manipal University Jaipur, where I wrote my first line of code and realized this was more than just a subject — it was something I wanted to master. What began as curiosity quickly turned into late-night debugging sessions, small projects, and a growing obsession with building things that actually work. Every bug fixed and every concept understood shaped the way I think today.' },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="timeline-section" id="experience" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        06 — Experience
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        My Journey
      </motion.h2>

      <div className="timeline">
        <div className="timeline-line" />
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="timeline-dot">
              <div className="timeline-dot-inner" />
            </div>
            <div className="timeline-body">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <span className="timeline-place">{item.place}</span>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
