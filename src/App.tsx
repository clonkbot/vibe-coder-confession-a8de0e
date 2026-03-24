import { useState, useEffect } from 'react';
import './styles.css';

const glitchTexts = [
  "PRODUCTION READY",
  "PR0DUCT10N R3ADY",
  "PROD█CTION RE▓DY",
  "████████ READY",
  "PRODUCTION R̷E̷A̷D̷Y̷",
];

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitched = text.split('').map(char =>
          Math.random() > 0.85 ? String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 10)) : char
        ).join('');
        setDisplayText(glitched);
        setTimeout(() => setDisplayText(text), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

function FakeCounter({ label, fakeValue, realValue }: { label: string; fakeValue: string; realValue: string }) {
  const [showReal, setShowReal] = useState(false);

  return (
    <div
      className="stat-card"
      onMouseEnter={() => setShowReal(true)}
      onMouseLeave={() => setShowReal(false)}
    >
      <div className="stat-value">
        <span className={`fake-value ${showReal ? 'hidden' : ''}`}>{fakeValue}</span>
        <span className={`real-value ${showReal ? 'visible' : ''}`}>{realValue}</span>
      </div>
      <div className="stat-label">{label}</div>
      {showReal && <div className="reality-check">* actual figure</div>}
    </div>
  );
}

function SecurityHole({ delay }: { delay: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  const holes = [
    "SQL_INJECTION_WELCOME",
    "PASSWORD: admin123",
    "API_KEY: sk-live-███████",
    "AUTH: trust_me_bro",
    "XSS: <script>pwned</script>",
    "ENV: production (oops)",
  ];

  const hole = holes[Math.floor(Math.random() * holes.length)];
  const top = 20 + Math.random() * 60;
  const left = 10 + Math.random() * 80;

  return (
    <div
      className="security-hole"
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      {hole}
    </div>
  );
}

function ConfidenceMeter() {
  const [confidence, setConfidence] = useState(100);
  const [reality, setReality] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(95 + Math.random() * 5);
      setReality(1 + Math.random() * 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="confidence-container">
      <div className="meter">
        <div className="meter-label">CONFIDENCE LEVEL</div>
        <div className="meter-bar">
          <div className="meter-fill confidence" style={{ width: `${confidence}%` }} />
        </div>
        <div className="meter-value">{confidence.toFixed(1)}%</div>
      </div>
      <div className="meter">
        <div className="meter-label">ACTUAL COMPETENCE</div>
        <div className="meter-bar">
          <div className="meter-fill reality" style={{ width: `${reality}%` }} />
        </div>
        <div className="meter-value">{reality.toFixed(1)}%</div>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role, truth }: { quote: string; author: string; role: string; truth: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="testimonial"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="quote-mark">"</div>
      <p className={`testimonial-text ${hovered ? 'hidden' : ''}`}>{quote}</p>
      <p className={`testimonial-truth ${hovered ? 'visible' : ''}`}>{truth}</p>
      <div className="testimonial-author">
        <div className="author-avatar">{author[0]}</div>
        <div>
          <div className="author-name">{author}</div>
          <div className="author-role">{role}</div>
        </div>
      </div>
      {hovered && <div className="lie-detector">LIE DETECTED</div>}
    </div>
  );
}

function App() {
  const [headerText, setHeaderText] = useState(0);
  const [hackAttempts, setHackAttempts] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderText(prev => (prev + 1) % glitchTexts.length);
    }, 150);

    const hackInterval = setInterval(() => {
      setHackAttempts(prev => prev + Math.floor(Math.random() * 100));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(hackInterval);
    };
  }, []);

  return (
    <div className="app">
      {/* Floating security holes */}
      <SecurityHole delay={2000} />
      <SecurityHole delay={4000} />
      <SecurityHole delay={6000} />
      <SecurityHole delay={8000} />

      {/* Hack counter */}
      <div className="hack-counter">
        <span className="hack-label">HACK ATTEMPTS TODAY:</span>
        <span className="hack-value">{hackAttempts.toLocaleString()}</span>
        <span className="hack-status">[ IGNORING ]</span>
      </div>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          100% AI-GENERATED SLOP
        </div>

        <h1 className="hero-title">
          I BUILD{' '}
          <span className="glitch-wrapper">
            <span className="glitch-text">{glitchTexts[headerText]}</span>
          </span>
          <br />
          <span className="hero-subtitle">APPS WITH JUST PROMPTS</span>
        </h1>

        <p className="hero-description">
          Who needs <span className="strikethrough">security</span> <span className="strikethrough">testing</span> <span className="strikethrough">code review</span> when you have <GlitchText text="VIBES" className="highlight" />?
        </p>

        <div className="cta-group">
          <button className="cta-primary">
            <span>VIEW MY PORTFOLIO</span>
            <span className="cta-warning">(currently down)</span>
          </button>
          <button className="cta-secondary">
            <span>HIRE ME</span>
            <span className="cta-price">$500/hr</span>
          </button>
        </div>
      </header>

      {/* Confidence Section */}
      <section className="section confidence-section">
        <h2 className="section-title">DELUSIONAL CONFIDENCE METRICS</h2>
        <ConfidenceMeter />
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <h2 className="section-title">
          MY TOTALLY REAL EARNINGS
          <span className="section-subtitle">(hover for truth)</span>
        </h2>

        <div className="stats-grid">
          <FakeCounter label="Monthly Revenue" fakeValue="$847,000" realValue="$0" />
          <FakeCounter label="Successful Exits" fakeValue="3" realValue="0" />
          <FakeCounter label="Happy Clients" fakeValue="10,000+" realValue="Mom" />
          <FakeCounter label="GitHub Stars" fakeValue="50K" realValue="2 (both me)" />
        </div>
      </section>

      {/* Security Section */}
      <section className="section security-section">
        <h2 className="section-title">SECURITY? THAT'S A FEATURE!</h2>

        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon">
              <span className="icon-broken">🔓</span>
            </div>
            <h3>SQL Injection Ready</h3>
            <p>Why sanitize inputs when users can explore your database for free?</p>
            <div className="security-badge bad">VULNERABLE</div>
          </div>

          <div className="security-card">
            <div className="security-icon">
              <span className="icon-broken">🔑</span>
            </div>
            <h3>Hardcoded API Keys</h3>
            <p>Environment variables are overrated. Commit those keys!</p>
            <div className="security-badge bad">EXPOSED</div>
          </div>

          <div className="security-card">
            <div className="security-icon">
              <span className="icon-broken">🚪</span>
            </div>
            <h3>Auth: Optional</h3>
            <p>Password is "admin". Or just skip the login entirely.</p>
            <div className="security-badge bad">BYPASSED</div>
          </div>
        </div>
      </section>

      {/* Living Situation */}
      <section className="section living-section">
        <div className="living-card">
          <h2 className="living-title">
            <span className="definitely">DEFINITELY</span> NOT LIVING WITH MY PARENTS
          </h2>

          <div className="living-content">
            <div className="living-claim">
              <h3>What I Tell LinkedIn:</h3>
              <ul>
                <li>CEO of 5 startups</li>
                <li>Penthouse in Miami</li>
                <li>Tesla Cybertruck owner</li>
                <li>Digital nomad lifestyle</li>
              </ul>
            </div>

            <div className="living-divider">
              <span>VS</span>
            </div>

            <div className="living-reality">
              <h3>Reality:</h3>
              <ul>
                <li>My mom still does my laundry</li>
                <li>Childhood bedroom with anime posters</li>
                <li>1998 Honda Civic (mom's)</li>
                <li>WiFi password: MomAndDad2024</li>
              </ul>
            </div>
          </div>

          <div className="rent-counter">
            <span>RENT PAID TO PARENTS:</span>
            <span className="rent-value">$0</span>
            <span className="rent-months">(47 consecutive months)</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <h2 className="section-title">
          TESTIMONIALS
          <span className="section-subtitle">(100% fabricated)</span>
        </h2>

        <div className="testimonials-grid">
          <Testimonial
            quote="This developer shipped our MVP in 2 hours. Revolutionary!"
            author="ElonUsk"
            role="Totally Real CEO"
            truth="This is my alt account. I wrote this myself."
          />
          <Testimonial
            quote="Made us $10M in the first week. Best investment ever!"
            author="Mark Zuckerbook"
            role="Investor"
            truth="The app crashed and they sued me."
          />
          <Testimonial
            quote="Finally, a developer who understands vibe-driven development!"
            author="Sam Bankman"
            role="Finance Expert"
            truth="My mom left this review on Google."
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section tech-section">
        <h2 className="section-title">MY ELITE TECH STACK</h2>

        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-name">ChatGPT</span>
            <span className="tech-role">Senior Developer</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Copy/Paste</span>
            <span className="tech-role">Core Framework</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Stack Overflow</span>
            <span className="tech-role">Documentation</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Wishful Thinking</span>
            <span className="tech-role">Error Handling</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">console.log</span>
            <span className="tech-role">Debugging Suite</span>
          </div>
          <div className="tech-item">
            <span className="tech-name">Hope</span>
            <span className="tech-role">Deployment Strategy</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta">
        <h2 className="final-title">READY TO SHIP SOME SLOP?</h2>
        <p className="final-subtitle">Join thousands* of satisfied** customers***</p>
        <p className="final-disclaimer">*zero **imaginary ***my mom</p>

        <button className="cta-final">
          <span className="cta-text">DEPLOY TO PRODUCTION</span>
          <span className="cta-subtext">(skip all testing)</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Requested by @web-user · Built by @clonkbot</p>
      </footer>
    </div>
  );
}

export default App;
