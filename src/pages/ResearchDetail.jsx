import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { researchData } from '../components/Research';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const paper = researchData.find(p => p.id === id);

  if (!paper) return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate('/')}>← Back</button>
      <p style={{ color: 'var(--text-muted)' }}>Paper not found.</p>
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
        {paper.tags.map(t => <span key={t} className="detail-tag">{t}</span>)}
      </div>

      <h1 className="detail-title"><span>{paper.title}</span></h1>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: '2rem' }}>
        {paper.journal}
      </p>

      <div className="detail-links">
        <a href={paper.pdfLink} className="detail-link-btn primary">Read Paper ↗</a>
        <a href="#" className="detail-link-btn ghost">Cite ↗</a>
      </div>

      <div className="detail-divider" />

      <div className="detail-section-title">Abstract</div>
      <p className="detail-body">{paper.abstract}</p>

      <div className="detail-divider" />

      <div className="detail-section-title">Overview</div>
      <p className="detail-body">{paper.overview}</p>

      <div className="detail-section-title">Methodology</div>
      <p className="detail-body">{paper.methodology}</p>

      <div className="detail-section-title">Findings</div>
      <p className="detail-body">{paper.findings}</p>

      <div className="detail-divider" />

      <div className="detail-section-title">Tags</div>
      <div className="detail-tech-grid">
        {paper.tags.map(t => <span key={t} className="detail-tech-chip">{t}</span>)}
      </div>
    </motion.div>
  );
}
