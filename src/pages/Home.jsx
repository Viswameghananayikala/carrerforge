import { Link } from 'react-router-dom'

const features = [
  { icon: '🚀', title: 'Career Path Explorer', desc: 'Discover 50+ curated career paths with real salary data, required skills, and growth projections.' },
  { icon: '🧑‍🏫', title: 'Expert Mentors', desc: 'Connect 1-on-1 with industry veterans who have walked the path you want to take.' },
  { icon: '📆', title: 'Smart Scheduling', desc: 'Book sessions instantly with flexible slots. Get reminders and never miss a session.' },
  { icon: '🎯', title: 'Skills Assessment', desc: 'Our AI-powered assessment maps your strengths to careers you\'ll actually love.' },
  { icon: '📖', title: 'Resource Hub', desc: 'Curated guides, resume templates, and interview prep from top industry experts.' },
  { icon: '📈', title: 'Progress Tracker', desc: 'Visualize your journey, hit milestones, and get AI-driven next-step recommendations.' },
]

const careers = [
  { title: 'Technology', roles: ['Software Engineer', 'Data Scientist', 'UX Designer', 'Cybersecurity'], color: '#9f67ff', icon: '💻' },
  { title: 'Business', roles: ['Product Manager', 'Financial Analyst', 'Entrepreneur', 'Strategy Consultant'], color: '#ff6b6b', icon: '📊' },
  { title: 'Healthcare', roles: ['Doctor', 'Biotech Researcher', 'Health Informatics', 'Therapist'], color: '#00d4ff', icon: '🧬' },
  { title: 'Creative Arts', roles: ['UX/UI Designer', 'Film Director', 'Content Strategist', 'Architect'], color: '#f9a825', icon: '🎨' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer @ Google', text: 'CareerForge connected me with a Google engineer mentor. Her interview prep was priceless — I landed my dream job in 3 months.', avatar: 'PS', color: '#9f67ff' },
  { name: 'Arjun Mehta', role: 'MBA @ IIM Bangalore', text: 'I was stuck between two careers. The skills assessment was eye-opening and my mentor helped me chart a crystal-clear path.', avatar: 'AM', color: '#ff6b6b' },
  { name: 'Sneha Reddy', role: 'Senior UX Designer @ Swiggy', text: 'My mentor had 12 years of design experience. Three sessions with her completely changed how I approach my work and interviews.', avatar: 'SR', color: '#00d4ff' },
]

const steps = [
  { num: '01', title: 'Build your profile', desc: 'Tell us your interests, goals, and academic background in minutes.' },
  { num: '02', title: 'Take the assessment', desc: 'Our smart quiz maps your personality and skills to career matches.' },
  { num: '03', title: 'Meet your mentor', desc: 'Browse matched mentors and book your first free consultation.' },
  { num: '04', title: 'Launch your journey', desc: 'Get a personalized roadmap with milestones and accountability.' },
]

export default function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fade-up">
            <span className="badge badge-purple">🔥 #1 Career Mentorship Platform</span>
          </div>

          <h1 className="fade-up-delay-1" style={s.heroTitle}>
            Forge Your<br />
            <span style={s.heroGradient}>Dream Career.</span>
          </h1>

          <p className="fade-up-delay-2" style={s.heroDesc}>
            CareerForge connects ambitious students with world-class mentors, provides 
            data-driven career insights, and builds the roadmap to your professional future.
          </p>

          <div className="fade-up-delay-3" style={s.heroBtns}>
            <Link to="/careers" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 36px' }}>
              Explore Careers →
            </Link>
            <Link to="/counselors" className="btn-outline" style={{ fontSize: '1rem', padding: '15px 36px' }}>
              Meet Mentors
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-up-delay-3" style={s.statsGrid}>
            {[
              { num: '2,400+', label: 'Students Guided' },
              { num: '85+', label: 'Expert Mentors' },
              { num: '50+', label: 'Career Paths' },
              { num: '96%', label: 'Satisfaction Rate' },
            ].map((st, i) => (
              <div key={i} style={s.statItem}>
                <div className="stat-number">{st.num}</div>
                <div className="stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* floating glow card */}
        <div style={s.floatingCard}>
          <div style={s.fcDot} />
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>New match found!</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--white)', marginTop: '4px' }}>Senior Engineer @ Meta</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--purple-light)', marginTop: '2px' }}>Available today</div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={s.section}>
        <div className="container">
          <p style={s.eyebrow}>HOW IT WORKS</p>
          <h2 className="section-title">Your Journey in 4 Steps</h2>
          <div style={s.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepNum}>{step.num}</div>
                <div style={s.stepLine} />
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ ...s.section, background: 'rgba(19,19,42,0.4)' }}>
        <div className="container">
          <p style={s.eyebrow}>PLATFORM FEATURES</p>
          <h2 className="section-title">Everything You Need to <span style={s.heroGradient}>Succeed</span></h2>
          <p className="section-subtitle">From self-discovery to career launch — every tool you need, in one place.</p>
          <div className="grid-3">
            {features.map((f, i) => (
              <div key={i} className="card" style={{ cursor: 'default' }}>
                <div style={s.featureIcon}>{f.icon}</div>
                <h3 style={s.featureTitle}>{f.title}</h3>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER DOMAINS ── */}
      <section style={s.section}>
        <div className="container">
          <p style={s.eyebrow}>EXPLORE DOMAINS</p>
          <h2 className="section-title">Popular Career Domains</h2>
          <p className="section-subtitle">Browse hundreds of roles across every major industry.</p>
          <div className="grid-2">
            {careers.map((cat, i) => (
              <Link to="/careers" key={i} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ borderTop: `3px solid ${cat.color}`, cursor: 'pointer', paddingTop: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                    <div style={{ ...s.domainIcon, background: `${cat.color}18` }}>
                      <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                    </div>
                    <h3 style={{ ...s.featureTitle, color: cat.color, margin: 0, fontSize: '1.15rem' }}>{cat.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.roles.map((r, j) => <span key={j} className="tag" style={{ background: `${cat.color}10`, color: cat.color, borderColor: `${cat.color}30` }}>{r}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/careers" className="btn-outline">View All 50+ Careers →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ ...s.section, background: 'rgba(19,19,42,0.4)' }}>
        <div className="container">
          <p style={s.eyebrow}>SUCCESS STORIES</p>
          <h2 className="section-title">Students Who Forged Their Path</h2>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ position: 'relative' }}>
                <div style={{ ...s.quoteIcon, color: `${t.color}15` }}>"</div>
                <p style={s.testimonialText}>{t.text}</p>
                <div style={s.testimonialAuthor}>
                  <div style={{ ...s.avatar, background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--white)' }}>{t.name}</div>
                    <div style={{ color: t.color, fontSize: '0.78rem', marginTop: '2px' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.section}>
        <div className="container">
          <div style={s.ctaBox}>
            <div style={s.ctaGlow} />
            <p style={s.eyebrow}>START TODAY — IT'S FREE</p>
            <h2 style={s.ctaTitle}>
              Ready to <span style={s.heroGradient}>Forge Your Future?</span>
            </h2>
            <p style={s.ctaDesc}>
              Join 2,400+ students who've unlocked clarity and confidence in their career journey.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/signup" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1rem' }}>Create Free Account →</Link>
              <Link to="/counselors" className="btn-outline" style={{ padding: '15px 40px', fontSize: '1rem' }}>Talk to a Mentor</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  hero: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    paddingTop: '110px', paddingBottom: '80px', position: 'relative',
  },
  heroTitle: {
    fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', fontWeight: '800',
    lineHeight: '1.05', margin: '20px 0 24px', maxWidth: '680px',
    fontFamily: 'Syne, sans-serif',
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #9f67ff, #00d4ff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: { color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '540px', marginBottom: '40px', lineHeight: '1.8' },
  heroBtns: { display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '64px' },
  statsGrid: {
    display: 'flex', gap: '0', flexWrap: 'wrap',
    background: 'rgba(19,19,42,0.8)', border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '20px', padding: '28px 40px', display: 'inline-flex',
    backdropFilter: 'blur(12px)', gap: '40px',
  },
  statItem: { textAlign: 'center' },
  floatingCard: {
    position: 'absolute', right: '8%', top: '38%',
    background: 'rgba(19,19,42,0.9)', border: '1px solid rgba(124,58,237,0.3)',
    borderRadius: '16px', padding: '18px 22px', backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.1)',
    display: 'none', // hidden on mobile — shows only large screen via CSS ideally
  },
  fcDot: {
    width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e',
    marginBottom: '8px', boxShadow: '0 0 8px #22c55e',
  },
  section: { padding: '88px 0', position: 'relative', zIndex: 1 },
  eyebrow: {
    fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.18em',
    color: 'var(--purple-light)', textTransform: 'uppercase', marginBottom: '14px',
    display: 'flex', alignItems: 'center', gap: '8px',
  },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: '20px', marginTop: '8px' },
  stepCard: {
    background: 'var(--card-bg)', border: '1px solid var(--border-light)',
    borderRadius: '20px', padding: '32px 28px', position: 'relative',
    overflow: 'hidden',
  },
  stepNum: {
    fontSize: '3.5rem', fontFamily: 'Syne, sans-serif', fontWeight: '800',
    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(0,212,255,0.1))',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', lineHeight: '1', marginBottom: '8px',
  },
  stepLine: { width: '32px', height: '3px', background: 'linear-gradient(90deg, #7c3aed, #00d4ff)', borderRadius: '2px', marginBottom: '16px' },
  stepTitle: { fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px', color: 'var(--white)', fontFamily: 'var(--font-body)' },
  stepDesc: { color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.65' },
  featureIcon: {
    width: '52px', height: '52px', borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,212,255,0.08))',
    border: '1px solid rgba(124,58,237,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.6rem', marginBottom: '20px',
  },
  featureTitle: { fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px', color: 'var(--white)', fontFamily: 'var(--font-body)' },
  featureDesc: { color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.7' },
  domainIcon: { width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  testimonialText: { color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '24px', position: 'relative', zIndex: 1 },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: {
    width: '46px', height: '46px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '800', fontSize: '0.82rem', flexShrink: 0,
  },
  quoteIcon: {
    position: 'absolute', top: '12px', right: '20px',
    fontSize: '5rem', fontFamily: 'Georgia, serif', lineHeight: '1', pointerEvents: 'none',
  },
  ctaBox: {
    background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,212,255,0.05))',
    border: '1px solid rgba(124,58,237,0.25)',
    borderRadius: '28px', padding: '72px 48px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    position: 'relative', overflow: 'hidden', textAlign: 'center',
  },
  ctaGlow: {
    position: 'absolute', width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
    top: '-100px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
  },
  ctaTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800',
    fontFamily: 'Syne, sans-serif', marginBottom: '16px', color: 'var(--white)',
  },
  ctaDesc: { color: 'var(--muted)', maxWidth: '480px', marginBottom: '40px', lineHeight: '1.7', fontSize: '1rem' },
}
