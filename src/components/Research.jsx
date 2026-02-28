import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const researchData = [
  {
    id: 'paper-1',
    title: 'Your Research Paper Title Here',
    journal: 'Journal / Conference Name · 2024',
    abstract: 'A compelling abstract summarizing the key contributions of your research. What problem does it solve, what methods did you use, and what were the findings?',
    tags: ['Machine Learning', 'Data Analysis', 'Systems'],
    pdfLink: '#',
    overview: 'This paper explores...',
    methodology: 'We used a mixed-methods approach...',
    findings: 'Our results demonstrate...',
    flip: false,
  },
  {
    id: 'paper-2',
    title: 'Second Paper or Ongoing Research',
    journal: 'Working Paper · 2025',
    abstract: 'Description of your second paper or ongoing research. Can be a preprint, submitted paper, or work in progress.',
    tags: ['Research', 'Methodology'],
    pdfLink: '#',
    overview: 'This work investigates...',
    methodology: 'The research employs...',
    findings: 'Preliminary findings suggest...',
    flip: true,
  },
];

export default function Research() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="research-section" id="research" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        04 — Research
      </motion.div>

      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Published Work
      </motion.h2>

      <div className="research-list">
        {researchData.map((paper, i) => (
          <motion.div
            key={paper.id}
            className={`research-card ${paper.flip ? 'flip-layout' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(paper.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/research/${paper.id}`)}
          >
            <div className="research-image-side">
              <div className="research-img-placeholder">
                <AnimatePresence>
                  {hovered === paper.id && (
                    <motion.div
                      className="research-hover-label"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      View Paper ↗
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="research-text-side">
              <span className="research-journal">{paper.journal}</span>
              <h3 className="research-title">{paper.title}</h3>
              <p className="research-abstract">{paper.abstract}</p>
              <div className="research-tags">
                {paper.tags.map(t => <span key={t} className="research-tag">{t}</span>)}
              </div>
              <span className="research-link">Read full paper ↗</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
