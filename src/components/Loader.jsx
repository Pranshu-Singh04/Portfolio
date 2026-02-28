import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      const inc = Math.random() * 3.5 + 1.2;
      p = Math.min(p + inc, 100);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setComplete(true), 400);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!complete && (
        <motion.div
          key="loader"
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: '#ffffff',
          }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Wide progress bar near bottom */}
          <div style={{
            position: 'absolute',
            bottom: '500px', left: '6vw', right: '6vw',
            height: '4px',
            background: '#c3e0b2',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#000000',
              borderRadius: '2px',
              transition: 'width 0.08s linear',
            }} />
          </div>

          {/* % — bottom right, black, big */}
          <div style={{
            position: 'absolute',
            bottom: '2rem', right: '6vw',
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 800,
            color: '#0D0D0D',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}>
            {String(progress).padStart(2, '0')}
            <span style={{ fontSize: '0.38em', opacity: 0.35, letterSpacing: 0 }}>%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
