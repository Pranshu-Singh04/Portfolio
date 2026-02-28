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
      <span className="live-age-decimal">.----</span>
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
                  <img 
                    src={profile}
                    alt="Profile" 
                    className="flip-photo-img"
                  />
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
          {/* Age counter only ticks once user scrolls to this section */}
          <LiveAge started={inView} />
          <p className="about-bio">
            I'm a developer and researcher passionate about building experiences
            that live at the intersection of technology and ideas. Whether it's
            crafting performant web apps or diving deep into research, I bring
            the same obsessive attention to detail to everything I make.
          </p>
          <div className="about-links">
            <a href="https://github.com/Pranshu-Singh04" target="_blank" rel="noreferrer" className="about-link">GitHub ↗</a>
            <a href="https://linkedin.com/in/pranshu-singh-ps04" target="_blank" rel="noreferrer" className="about-link">LinkedIn ↗</a>
            <a href={`${process.env.PUBLIC_URL}/Resume11.pdf`} target="_blank" rel="noreferrer" className="about-link">Résumé ↗</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
