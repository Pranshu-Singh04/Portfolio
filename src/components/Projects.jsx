import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const projectsData = [
  {
    id: 'alpha',
    title: 'Project Alpha',
    tag: 'Web App',
    year: '2024',
    description: 'A full-stack web application built with React and Node.js. Features real-time updates, user authentication, and a clean dashboard interface.',
    tech: ['React', 'Node.js', 'MongoDB'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
    previewEmoji: '🌐',
    previewLabel: 'Web Dashboard',
    overview: 'Project Alpha is a full-stack web application designed to solve real-world data management problems.',
    features: ['Real-time updates via WebSockets', 'JWT-based authentication', 'Responsive dashboard with charts'],
    challenges: 'The biggest challenge was implementing real-time sync across multiple clients without performance degradation.',
    docs: 'Full documentation available in the GitHub repository README.',
  },
  {
    id: 'beta',
    title: 'Project Beta',
    tag: 'Tool',
    year: '2024',
    description: 'An automation tool that streamlines repetitive workflows. Built with Python, it saves hours of manual work through smart scripting.',
    tech: ['Python', 'Pandas', 'FastAPI'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #06B6D4 0%, #10B981 100%)',
    previewEmoji: '⚙️',
    previewLabel: 'Automation Tool',
    overview: 'Project Beta automates repetitive data workflows saving hours of manual processing.',
    features: ['Batch processing pipeline', 'REST API with FastAPI', 'Pandas data transformation layer'],
    challenges: 'Handling large datasets efficiently required careful memory management and chunked processing.',
    docs: 'See the /docs folder in the repository for full API reference.',
  },
  {
    id: 'gamma',
    title: 'Project Gamma',
    tag: 'Research',
    year: '2023',
    description: 'A research-driven project exploring machine learning applications in a real-world context. Includes data pipeline and visualisation layer.',
    tech: ['Python', 'TensorFlow', 'D3.js'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    previewEmoji: '🧠',
    previewLabel: 'ML Research',
    overview: 'Project Gamma bridges research and production ML with an end-to-end pipeline.',
    features: ['Custom neural network architecture', 'Interactive D3.js visualisations', 'Data preprocessing pipeline'],
    challenges: 'Translating research models into production-ready code while maintaining accuracy.',
    docs: 'Model architecture and training details in the paper linked above.',
  },
  {
    id: 'delta',
    title: 'Project Delta',
    tag: 'Design',
    year: '2023',
    description: 'A design system and component library built from scratch. Focused on accessibility, consistency, and developer experience.',
    tech: ['React', 'TypeScript', 'CSS'],
    liveLink: '#',
    githubLink: '#',
    previewBg: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
    previewEmoji: '✦',
    previewLabel: 'Design System',
    overview: 'A comprehensive design system with 40+ components built for consistency and accessibility.',
    features: ['40+ accessible components', 'Full TypeScript support', 'Storybook documentation'],
    challenges: 'Ensuring WCAG 2.1 AA compliance across all interactive components.',
    docs: 'Live Storybook documentation available at the link above.',
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const project = projectsData[active];

  const prev = () => setActive(i => (i - 1 + projectsData.length) % projectsData.length);
  const next = () => setActive(i => (i + 1) % projectsData.length);

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        03 — Projects
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Things I've Built
      </motion.h2>

      <div className="project-dots">
        {projectsData.map((_, i) => (
          <button key={i} className={`project-dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Carousel row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button className="carousel-arrow" onClick={prev}>‹</button>

        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}
            >
              {/* Text — left */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.9rem', minWidth: 0 }}>
                <div className="project-card-header">
                  <span className="project-tag">{project.tag}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-row">
                  {project.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
                </div>
                <div className="project-card-footer">
                  <a href={project.liveLink} className="project-link-btn">Live Demo ↗</a>
                  <button className="project-details-btn" onClick={() => navigate(`/project/${project.id}`)}>
                    Full Details →
                  </button>
                </div>
              </div>

              {/* Preview image — right, inside card */}
              <div style={{
                width: '220px',
                height: '100%',
                minHeight: '200px',
                flexShrink: 0,
                borderRadius: '12px',
                background: project.previewBg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                alignSelf: 'stretch',
              }}>
                {/* Grid overlay */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
                  {[0,1,2,3].map(i => <line key={`v${i}`} x1={`${i*33}%`} y1="0" x2={`${i*33}%`} y2="100%" stroke="white" strokeWidth="0.5" />)}
                  {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={`${i*25}%`} x2="100%" y2={`${i*25}%`} stroke="white" strokeWidth="0.5" />)}
                </svg>
                {/*
                  Replace emoji with screenshot:
                  <img src={`/screenshots/${project.id}.png`} alt={project.title}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', borderRadius:'12px' }} />
                */}
                <div style={{ fontSize: '2.8rem', position: 'relative', zIndex: 1 }}>{project.previewEmoji}</div>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
                  color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', position: 'relative', zIndex: 1,
                  textAlign: 'center', padding: '0 0.75rem',
                }}>
                  {project.previewLabel}
                </div>
                <div style={{
                  position: 'absolute', bottom: '10px', right: '10px',
                  fontFamily: 'DM Mono, monospace', fontSize: '0.52rem',
                  color: 'rgba(255,255,255,0.45)', background: 'rgba(0,0,0,0.25)',
                  padding: '3px 7px', borderRadius: '4px', zIndex: 1,
                }}>
                  {project.year}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="carousel-arrow" onClick={next}>›</button>
      </div>

      <div className="project-progress" style={{ marginTop: '1.5rem' }}>
        <div className="project-progress-fill" style={{ width: `${((active + 1) / projectsData.length) * 100}%` }} />
      </div>
      <p className="project-counter">{active + 1} / {projectsData.length}</p>
    </section>
  );
}
