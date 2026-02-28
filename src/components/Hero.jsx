import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function DecryptedText({ text, speed = 120, delay = 0, className = '', encryptedClassName = '', parentClassName = '' }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const rand = () => chars[Math.floor(Math.random() * chars.length)];

  const [display, setDisplay] = useState(() => text.split('').map(rand));
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let rev = 0;
    let scrambleCount = 0;
    const SCRAMBLE_ROUNDS = 6; // scramble each unrevealed char 6 times before revealing next

    const t = setTimeout(() => {
      const interval = setInterval(() => {
        scrambleCount++;

        setDisplay(prev => {
          const next = [...prev];
          // Scramble all unrevealed positions
          for (let i = rev; i < text.length; i++) {
            next[i] = rand();
          }
          return next;
        });

        if (scrambleCount % SCRAMBLE_ROUNDS === 0 && rev < text.length) {
          rev++;
          setRevealed(rev);
          setDisplay(prev => {
            const next = [...prev];
            next[rev - 1] = text[rev - 1];
            return next;
          });
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
          {/* 120ms per char × 7 chars = ~840ms just for reveal, plus scramble = ~4s total */}
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

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8 }}
        >
          Developer & Researcher — building things at the edge of ideas.
        </motion.p>

        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.1 }}
        >
          <a href="#projects" className="hero-btn primary">View Projects</a>
          <a href="#contact" className="hero-btn ghost">Get in Touch</a>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
