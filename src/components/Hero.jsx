import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Decrypt animation ──────────────────────────────────────────
function DecryptedText({ text, speed = 120, delay = 0, className = '', encryptedClassName = '', parentClassName = '' }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const rand = () => chars[Math.floor(Math.random() * chars.length)];

  const [display, setDisplay] = useState(() => text.split('').map(rand));
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let rev = 0;
    let scrambleCount = 0;
    const SCRAMBLE_ROUNDS = 6;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        scrambleCount++;
        setDisplay(prev => {
          const next = [...prev];
          for (let i = rev; i < text.length; i++) next[i] = rand();
          return next;
        });
        if (scrambleCount % SCRAMBLE_ROUNDS === 0 && rev < text.length) {
          rev++;
          setRevealed(rev);
          setDisplay(prev => { const next = [...prev]; next[rev - 1] = text[rev - 1]; return next; });
        }
        if (rev >= text.length) clearInterval(interval);
      }, speed / SCRAMBLE_ROUNDS);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <span ref={ref} className={parentClassName} style={{ whiteSpace: 'pre' }}>
      {display.map((char, i) => (
        <span key={i} className={i < revealed ? className : encryptedClassName}>
          {text[i] === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ── Cycling typewriter tagline ─────────────────────────────────
const PHRASES = [
  'ML Enthusiast',
  'Problem Solver',
  'Full-Stack Developer',
  'Researcher',
  'Open Source Contributor',
  'Building at the edge of ideas',
];

function TypewriterTagline() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'erasing'

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (phase === 'typing') {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('erasing'), 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, phraseIdx]);

  return (
    <p className="hero-tagline">
      <span style={{ color: 'var(--cyan)' }}>{displayed}</span>
      <span className="typewriter-cursor">|</span>
    </p>
  );
}

// ── Aurora ─────────────────────────────────────────────────────
function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />
      <div className="aurora-noise" />
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="hero-section">
      <AuroraBackground />
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-tag"
        >
          <span className="hero-tag-dot" />
          Available for work
        </motion.div>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.6 }}
        >
          <DecryptedText
            text="Pranshu"
            speed={120}
            delay={700}
            className="hero-name-revealed"
            encryptedClassName="hero-name-encrypted"
            parentClassName="hero-name-wrap"
          />
          <br />
          <DecryptedText
            text="Singh."
            speed={120}
            delay={1600}
            className="hero-name-revealed accent"
            encryptedClassName="hero-name-encrypted"
            parentClassName="hero-name-wrap"
          />
        </motion.h1>

        {/* Cycling typewriter — starts after name finishes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <TypewriterTagline />
        </motion.div>

        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3 }}
        >
          <a href="#projects" className="hero-btn primary">View Projects</a>
          <a href="#contact" className="hero-btn ghost">Get in Touch</a>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
