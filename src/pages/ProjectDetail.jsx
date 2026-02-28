import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../components/Projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);

  if (!project) return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate('/')}>← Back</button>
      <p style={{ color: 'var(--text-muted)' }}>Project not found.</p>
    </div>
  );

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="detail-back" onClick={() => navigate('/')}>← Back to Portfolio</button>

      <div className="detail-tag-row">
        <span className="detail-tag">{project.tag}</span>
        <span className="detail-year">{project.year}</span>
      </div>

      <h1 className="detail-title"><span>{project.title}</span></h1>

      <div className="detail-links">
        <a href={project.liveLink} className="detail-link-btn primary">Live Demo ↗</a>
        <a href={project.githubLink} className="detail-link-btn ghost">GitHub ↗</a>
      </div>

      <div className="detail-divider" />

      <div className="detail-section-title">Overview</div>
      <p className="detail-body">{project.overview}</p>

      <div className="detail-section-title">Tech Stack</div>
      <div className="detail-tech-grid">
        {project.tech.map(t => <span key={t} className="detail-tech-chip">{t}</span>)}
      </div>

      <div className="detail-divider" />

      <div className="detail-section-title">Key Features</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {project.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '2px', flexShrink: 0 }}>→</span>
            <p className="detail-body" style={{ marginBottom: 0 }}>{f}</p>
          </div>
        ))}
      </div>

      <div className="detail-divider" />

      <div className="detail-section-title">Challenges & Solutions</div>
      <p className="detail-body">{project.challenges}</p>

      <div className="detail-section-title">Documentation</div>
      <p className="detail-body">{project.docs}</p>
    </motion.div>
  );
}
