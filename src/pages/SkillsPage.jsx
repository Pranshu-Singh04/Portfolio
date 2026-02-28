import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const allSkills = [
  { name: 'JavaScript', icon: '⚡', level: 'Proficient', pct: 88 },
  { name: 'Python', icon: '🐍', level: 'Proficient', pct: 85 },
  { name: 'React', icon: '⚛', level: 'Proficient', pct: 82 },
  { name: 'HTML / CSS', icon: '🎨', level: 'Proficient', pct: 90 },
  { name: 'Node.js', icon: '🟢', level: 'Intermediate', pct: 68 },
  { name: 'TypeScript', icon: '𝙏𝙎', level: 'Intermediate', pct: 62 },
  { name: 'C++', icon: '⚙', level: 'Intermediate', pct: 55 },
  { name: 'SQL', icon: '🗄', level: 'Intermediate', pct: 60 },
  { name: 'Git', icon: '🌿', level: 'Proficient', pct: 80 },
  { name: 'Figma', icon: '✦', level: 'Intermediate', pct: 65 },
  { name: 'TensorFlow', icon: '🧠', level: 'Beginner', pct: 35 },
  { name: 'Docker', icon: '🐳', level: 'Beginner', pct: 30 },
];

export default function SkillsPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="skills-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="page-back" onClick={() => navigate('/')}>← Back to Portfolio</button>

      <div className="section-label">Skills & Proficiency</div>
      <h1 className="section-heading" style={{ marginBottom: '0.5rem' }}>Full Stack</h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '3.5rem', letterSpacing: '0.05em' }}>
        Beginner → Intermediate → Proficient
      </p>

      <div className="skills-full-list">
        {allSkills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="skill-full-header">
              <span className="skill-full-name">
                {skill.icon} {skill.name}
              </span>
              <span className="skill-full-level">{skill.level}</span>
            </div>
            <div className="skill-bar-track">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${skill.pct}%` }}
                transition={{ duration: 0.9, delay: i * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
