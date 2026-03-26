import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.top}>
          <div style={styles.brand}>
            <div style={styles.logoRow}>
              <div style={styles.logoMark}>⬡</div>
              <h3 style={styles.logo}>Career<span style={{ color: 'var(--purple-light)' }}>Forge</span></h3>
            </div>
            <p style={styles.tagline}>
              Forging the careers of tomorrow's leaders through expert mentorship, 
              data-driven insights, and personalized guidance.
            </p>
            <div style={styles.socialRow}>
              {['𝕏', 'in', 'yt', 'ig'].map((s, i) => (
                <div key={i} style={styles.socialBtn}>{s}</div>
              ))}
            </div>
          </div>
          <div style={styles.links}>
            <div>
              <h4 style={styles.colTitle}>Platform</h4>
              <Link to="/careers" style={styles.link}>Career Paths</Link>
              <Link to="/counselors" style={styles.link}>Find Mentors</Link>
              <Link to="/schedule" style={styles.link}>Book Session</Link>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            </div>
            <div>
              <h4 style={styles.colTitle}>Company</h4>
              <span style={styles.link}>About Us</span>
              <span style={styles.link}>Blog</span>
              <span style={styles.link}>Careers</span>
              <span style={styles.link}>Contact</span>
            </div>
            <div>
              <h4 style={styles.colTitle}>Legal</h4>
              <span style={styles.link}>Privacy Policy</span>
              <span style={styles.link}>Terms of Service</span>
              <span style={styles.link}>Cookie Policy</span>
            </div>
          </div>
        </div>
        <div style={styles.bottom}>
          <p style={styles.copy}>© 2025 CareerForge. All rights reserved.</p>
          <p style={styles.copy}>Crafted with 🔥 for ambitious students worldwide.</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'rgba(8,8,18,0.97)',
    borderTop: '1px solid rgba(124,58,237,0.15)',
    padding: '72px 0 36px', marginTop: '80px', position: 'relative', zIndex: 1,
  },
  top: { display: 'flex', gap: '64px', flexWrap: 'wrap', marginBottom: '56px' },
  brand: { flex: 1, minWidth: '220px', maxWidth: '280px' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' },
  logoMark: {
    width: '32px', height: '32px', borderRadius: '9px',
    background: 'linear-gradient(135deg, #7c3aed, #9f67ff)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: '0.9rem',
  },
  logo: { fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', color: '#f8f9ff', fontWeight: '800' },
  tagline: { color: 'var(--muted)', fontSize: '0.87rem', lineHeight: '1.75', marginBottom: '20px' },
  socialRow: { display: 'flex', gap: '8px' },
  socialBtn: {
    width: '34px', height: '34px', borderRadius: '8px',
    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--purple-light)', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer',
  },
  links: { display: 'flex', gap: '52px', flexWrap: 'wrap' },
  colTitle: { fontFamily: 'Syne, sans-serif', color: 'var(--white)', fontSize: '0.9rem', marginBottom: '18px', fontWeight: '700' },
  link: { display: 'block', color: 'var(--muted)', fontSize: '0.87rem', marginBottom: '12px', cursor: 'pointer', transition: 'color 0.2s' },
  bottom: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
    borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px',
  },
  copy: { color: 'rgba(139,141,170,0.7)', fontSize: '0.82rem' },
}
