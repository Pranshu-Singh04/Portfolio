import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const skills = [
  { name: 'JavaScript', color: '#F7DF1E', icon: '⚡' },
  { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'React', color: '#61DAFB', icon: '⚛' },
  { name: 'Node.js', color: '#339933', icon: '🟢' },
  { name: 'HTML/CSS', color: '#E34F26', icon: '🎨' },
  { name: 'Git', color: '#F05032', icon: '🌿' },
  { name: 'Figma', color: '#F24E1E', icon: '✦' },
  { name: 'SQL', color: '#4479A1', icon: '🗄' },
  { name: 'C++', color: '#00599C', icon: '⚙' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  return (
    <section className="skills-section" id="skills" ref={ref}>
      <div className="skills-header">
        <div>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            02 — Skills & Languages
          </motion.div>
          <motion.h2
            className="section-heading"
            style={{ marginBottom: 0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            My Stack
          </motion.h2>
        </div>

        <motion.button
          className="skills-view-all"
          onClick={() => navigate('/skills')}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          View all with proficiency →
        </motion.button>
      </div>

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06, y: -4 }}
          >
            <span className="skill-icon">{skill.icon}</span>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-glow" style={{ background: skill.color }} />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="skills-note"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        + always learning something new
      </motion.p>
    </section>
  );
}
