import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const achievements = [
  { icon: '🏆', title: 'Achievement One', desc: 'Description of this achievement — award, competition, recognition, etc.' },
  { icon: '📄', title: 'Published Research', desc: 'Published a research paper in [journal/conference].' },
  { icon: '🚀', title: 'Shipped Product', desc: 'Launched a product used by real users.' },
  { icon: '🎓', title: 'Academic Recognition', desc: "Dean's list / scholarship / academic award." },
];

// Magazine pages content
const pages = [
  {
    type: 'cover',
    bg: 'linear-gradient(145deg, #7C3AED 0%, #2563EB 40%, #06B6D4 70%, #10B981 100%)',
  },
  {
    type: 'inner',
    title: 'Chapter 1',
    subtitle: 'The Work',
    body: 'Replace this with your actual achievements, projects, and milestones. This is your story — make it count.',
    bg: 'linear-gradient(160deg, #1a0a3a 0%, #0a1628 100%)',
  },
  {
    type: 'inner',
    title: 'Chapter 2',
    subtitle: 'The Research',
    body: 'Your research publications, papers, and academic contributions go here. Document your intellectual journey.',
    bg: 'linear-gradient(160deg, #050d1a 0%, #0a1a10 100%)',
  },
  {
    type: 'inner',
    title: 'Chapter 3',
    subtitle: 'The Impact',
    body: 'Awards, recognitions, and the real-world impact of your work. What difference have you made?',
    bg: 'linear-gradient(160deg, #1a0a0a 0%, #1a0a3a 100%)',
  },
  {
    type: 'back',
    bg: 'linear-gradient(145deg, #10B981 0%, #06B6D4 40%, #2563EB 70%, #7C3AED 100%)',
  },
];

function Magazine({ onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentPage < pages.length - 1 && !flipping) {
      setDirection(1);
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p + 1);
        setFlipping(false);
      }, 400);
    }
  };

  const goPrev = () => {
    if (currentPage > 0 && !flipping) {
      setDirection(-1);
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p - 1);
        setFlipping(false);
      }, 400);
    }
  };

  const page = pages[currentPage];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
      }}
    >
      {/* Close hint */}
      <div style={{
        position: 'absolute', top: '2rem', right: '2rem',
        fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
      }}>
        click outside to close
      </div>

      {/* Page counter */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em',
      }}>
        {currentPage + 1} / {pages.length}
      </div>

      <div
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: '2rem', cursor: 'default' }}
      >
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: currentPage === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
            color: currentPage === 0 ? 'rgba(255,255,255,0.2)' : 'white',
            fontSize: '1.4rem', cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          ‹
        </button>

        {/* Magazine book */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '360px',
              height: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: page.bg,
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              transformStyle: 'preserve-3d',
              perspective: '1200px',
            }}
          >
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, zIndex: 0 }}>
              {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={`${i*25}%`} y1="0" x2={`${i*25}%`} y2="100%" stroke="white" strokeWidth="0.5"/>)}
              {[0,1,2,3,4,5].map(i => <line key={`h${i}`} x1="0" y1={`${i*20}%`} x2="100%" y2={`${i*20}%`} stroke="white" strokeWidth="0.5"/>)}
            </svg>

            {/* Top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
              padding: '14px 18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,0,0,0.2)',
            }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}>
                <span style={{ color: '#06B6D4' }}>VOL.</span> 01
              </span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' }}>2025</span>
            </div>

            {/* Content */}
            {page.type === 'cover' && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', padding: '0 2rem',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '3.2rem', fontWeight: 800,
                  color: 'white', lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 30px rgba(0,0,0,0.2)',
                }}>
                  BUILT<br />
                  <span style={{ fontSize: '2.2rem', opacity: 0.75 }}>&amp;</span><br />
                  EARNED
                </div>
                <div style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginTop: '0.5rem',
                }}>
                  A record of achievements
                </div>
                {/* Click me hint */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '8px 14px', borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <span>→</span> click right to open
                </motion.div>
              </div>
            )}

            {page.type === 'inner' && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', padding: '4rem 2rem 2rem',
                gap: '1rem',
              }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'var(--cyan)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {page.title}
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {page.subtitle}
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, letterSpacing: '0.02em' }}>
                  {page.body}
                </p>
              </div>
            )}

            {page.type === 'back' && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: 'white', letterSpacing: '0.1em' }}>
                  PRANSHU SINGH
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
                  portfolio.dev
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
              padding: '12px 18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,0,0,0.25)',
            }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                PRANSHU SINGH
              </span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                pg. {currentPage + 1}
              </span>
            </div>

            {/* Left/right click zones inside magazine */}
            <div
              onClick={goPrev}
              style={{
                position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '35%',
                zIndex: 3, cursor: currentPage > 0 ? 'w-resize' : 'default',
              }}
            />
            <div
              onClick={goNext}
              style={{
                position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '35%',
                zIndex: 3, cursor: currentPage < pages.length - 1 ? 'e-resize' : 'default',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: currentPage === pages.length - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
            color: currentPage === pages.length - 1 ? 'rgba(255,255,255,0.2)' : 'white',
            fontSize: '1.4rem', cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}

function MagazineCover({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover="true"
      style={{
        width: '300px', height: '420px',
        borderRadius: '14px', overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(145deg, #7C3AED 0%, #2563EB 35%, #06B6D4 65%, #10B981 100%)',
        boxShadow: hovered
          ? '0 0 100px rgba(124,58,237,0.4), 10px 10px 50px rgba(0,0,0,0.6)'
          : '0 0 60px rgba(124,58,237,0.2), 8px 8px 40px rgba(0,0,0,0.4)',
        cursor: 'pointer', flexShrink: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px) rotate(-1deg)' : 'none',
      }}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={`${i*25}%`} y1="0" x2={`${i*25}%`} y2="100%" stroke="white" strokeWidth="0.5"/>)}
        {[0,1,2,3,4,5].map(i => <line key={`h${i}`} x1="0" y1={`${i*20}%`} x2="100%" y2={`${i*20}%`} stroke="white" strokeWidth="0.5"/>)}
      </svg>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '12px 16px', display: 'flex', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', zIndex: 2,
      }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em' }}>
          <span style={{ color: '#06B6D4' }}>VOL.</span> 01
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em' }}>2025</span>
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-58%)', padding: '0 20px', textAlign: 'center', zIndex: 2,
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: '2.8rem', fontWeight: 800,
          color: 'white', lineHeight: 0.92, letterSpacing: '-0.02em',
        }}>
          BUILT<br />
          <span style={{ fontSize: '2rem', opacity: 0.8 }}>&amp;</span><br />
          EARNED
        </div>
        <div style={{
          marginTop: '0.8rem', fontFamily: 'DM Mono, monospace', fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          A record of achievements
        </div>
      </div>

      {/* Click me badge */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            style={{
              position: 'absolute', bottom: '52px',
              left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px',
              padding: '7px 14px', zIndex: 3,
              fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
              color: 'white', letterSpacing: '0.1em', whiteSpace: 'nowrap',
            }}
          >
            ✦ click to open
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(0,0,0,0.28)', display: 'flex', justifyContent: 'space-between', zIndex: 2,
      }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>
          PRANSHU SINGH
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.35)' }}>
          portfolio.dev
        </span>
      </div>
    </div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [magazineOpen, setMagazineOpen] = useState(false);

  return (
    <section className="achievements-section" id="achievements" ref={ref}>
      <motion.div className="section-label"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        05 — Achievements
      </motion.div>
      <motion.h2 className="section-heading"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
        Milestones
      </motion.h2>

      <div className="achievements-layout">
        <motion.div className="magazine-container"
          initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <MagazineCover onClick={() => setMagazineOpen(true)} />
        </motion.div>

        <div className="achievements-list">
          {achievements.map((item, i) => (
            <motion.div key={i} className="achievement-item"
              initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="achievement-icon">{item.icon}</div>
              <div>
                <div className="achievement-title">{item.title}</div>
                <div className="achievement-desc">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {magazineOpen && <Magazine onClose={() => setMagazineOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
