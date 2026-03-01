import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import profile from "../images/profile.jpg";

function LiveAge({ started }) {
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (!started) return;
    const birthday = new Date(2005, 10, 4);
    const calc = () => (new Date() - birthday) / (365.25 * 24 * 60 * 60 * 1000);
    setAge(calc());
    const iv = setInterval(() => setAge(calc()), 100);
    return () => clearInterval(iv);
  }, [started]);

  if (age === null) return (
    <div className="live-age">
      <span className="live-age-number">--</span>
      <span className="live-age-decimal">.--</span>
      <span className="live-age-label">years old</span>
    </div>
  );

  const [whole, decimal] = age.toFixed(2).split('.');
  return (
    <div className="live-age">
      <span className="live-age-number">{whole}</span>
      <span className="live-age-decimal">.{decimal}</span>
      <span className="live-age-label">years old</span>
    </div>
  );
}

// Contact card like the image — icon + label + value
const contactItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'actuallypranshu@email.com',
    href: 'mailto:actuallypranshu@email.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'Pranshu-Singh04',
    href: 'https://github.com/Pranshu-Singh04',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'pranshu-singh-ps04',
    href: 'https://linkedin.com/in/pranshu-singh-ps04',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section className="about-section" id="about" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        01 — About Me
      </motion.div>

      <div className="about-grid">
        {/* Flip card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              {/* FRONT */}
              <div className="flip-card-front">
                <div className="flip-card-header">
                  <div>
                    <div className="flip-header-company">Pranshu Singh</div>
                    <div className="flip-header-sub">3D Identification Card</div>
                  </div>
                  <span className="flip-header-version">v1.0</span>
                </div>
                <div className="flip-card-photo-wrap">
                  <img src={profile} alt="Profile" className="flip-photo-img" />
                </div>
                <div className="flip-front-bottom">
                  <div className="flip-front-name">Pranshu Singh</div>
                  <div className="flip-front-role">Developer & Researcher</div>
                </div>
                <div className="flip-hint">hover for more info ↻</div>
              </div>

              {/* BACK */}
              <div className="flip-card-back">
                <div className="flip-back-visual">
                  <div className="flip-back-visual-placeholder">✦</div>
                </div>
                <div className="flip-back-body">
                  <div className="flip-back-stats-row">
                    {[
                      { val: '2', label: 'Projects' },
                      { val: '1', label: 'Papers' },
                      { val: 'IN', label: 'Origin' },
                      { val: '✓', label: 'Available' },
                    ].map(s => (
                      <div key={s.label} className="flip-back-stat">
                        <span className="flip-back-stat-val">{s.val}</span>
                        <span className="flip-back-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flip-back-details">
                    {[
                      { label: 'From', value: 'India' },
                      { label: 'Born', value: '04 Nov 2005' },
                      { label: 'Role', value: 'Dev / Researcher' },
                      { label: 'Status', value: 'Available', cyan: true },
                    ].map(d => (
                      <div key={d.label} className="flip-back-detail-item">
                        <span className="flip-back-label">{d.label}</span>
                        <span className="flip-back-value" style={d.cyan ? { color: 'var(--cyan)' } : {}}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flip-card-hash">fa00aa · 8t2336 · e1244d · d0ff00 · 000faa · a13t1</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side */}
        <motion.div
          className="about-info"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="about-name">Pranshu Singh</h2>
          <LiveAge started={inView} />

          <p className="about-bio">
            I'm a developer and researcher passionate about building experiences
            that live at the intersection of technology and ideas. Whether it's
            crafting performant web apps or diving deep into research, I bring
            the same obsessive attention to detail to everything I make.
          </p>

          {/* "Find me on" contact cards */}
          <div className="about-contact-block">
            <span className="about-contact-title">FIND ME ON</span>
            <div className="about-contact-list">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="about-contact-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="about-contact-icon">{item.icon}</span>
                  <div className="about-contact-text">
                    <span className="about-contact-label">{item.label}</span>
                    <span className="about-contact-value">{item.value}</span>
                  </div>
                  <span className="about-contact-arrow">↗</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
