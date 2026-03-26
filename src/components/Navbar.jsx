import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({ auth, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/careers', label: 'Career Paths' },
    { path: '/counselors', label: 'Mentors' },
    { path: '/schedule', label: 'Schedule' },
    ...(auth?.role === 'user' ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
    ...(auth?.role === 'admin' ? [{ path: '/admin', label: 'Admin Panel' }] : []),
  ]

  const handleLogout = () => { onLogout(); navigate('/'); setMenuOpen(false) }
  const displayName = auth?.name ? auth.name.split(' ')[0] : null

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoMark}>
            <span style={styles.logoSymbol}>⬡</span>
          </div>
          <span style={styles.logoText}>Career<span style={styles.logoAccent}>Forge</span></span>
        </Link>

        <div style={styles.links}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              ...styles.link,
              color: location.pathname === link.path ? 'var(--purple-light)' : 'var(--muted)',
              borderBottom: location.pathname === link.path ? '2px solid var(--purple-light)' : '2px solid transparent',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={styles.authArea}>
          {auth?.role ? (
            <div style={styles.roleChip}>
              <div style={styles.avatarCircle}>{(auth.name || 'U').charAt(0).toUpperCase()}</div>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--white)', fontWeight: 700 }}>
                  {auth.role === 'admin' ? '🛡️ Admin' : displayName}
                </div>
                {auth.role === 'user' && <div style={{ fontSize: '0.72rem', color: 'var(--purple-light)' }}>Student</div>}
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link to="/login" style={styles.signInLink}>Sign In</Link>
              <Link to="/signup" className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.88rem', textDecoration: 'none' }}>
                Get Started →
              </Link>
            </div>
          )}
        </div>

        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={styles.bar} /><span style={styles.bar} /><span style={styles.bar} />
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          {auth?.role ? (
            <button className="btn-outline" style={{ width: '100%', marginTop: '12px' }} onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: '12px', padding: '12px' }} onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '8px', padding: '12px' }} onClick={() => setMenuOpen(false)}>Get Started Free →</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(13,13,26,0.88)',
    backdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(124,58,237,0.15)',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 28px',
    height: '70px', display: 'flex', alignItems: 'center', gap: '36px',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 },
  logoMark: {
    width: '34px', height: '34px',
    background: 'linear-gradient(135deg, #7c3aed, #9f67ff)',
    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
  },
  logoSymbol: { color: '#fff', fontSize: '1rem', lineHeight: 1 },
  logoText: { fontFamily: 'Syne, sans-serif', fontSize: '1.35rem', fontWeight: '800', color: '#f8f9ff' },
  logoAccent: { color: '#9f67ff' },
  links: { display: 'flex', gap: '4px', flex: 1 },
  link: {
    fontSize: '0.88rem', fontWeight: '600', transition: 'color 0.2s',
    textDecoration: 'none', padding: '4px 12px', borderRadius: '8px',
    paddingBottom: '2px',
  },
  authArea: { display: 'flex', alignItems: 'center', marginLeft: 'auto' },
  signInLink: { color: 'var(--muted)', fontSize: '0.88rem', fontWeight: '600', padding: '9px 16px', textDecoration: 'none', transition: 'color 0.2s' },
  roleChip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
    borderRadius: '50px', padding: '5px 14px 5px 5px',
  },
  avatarCircle: {
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--purple), var(--coral))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '800', fontSize: '0.82rem', flexShrink: 0,
  },
  logoutBtn: { background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer', marginLeft: '4px', textDecoration: 'underline' },
  hamburger: { display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', padding: '4px', cursor: 'pointer' },
  bar: { display: 'block', width: '22px', height: '2px', background: 'var(--muted)', borderRadius: '2px' },
  mobileMenu: { padding: '16px 28px 28px', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-light)' },
  mobileLink: { display: 'block', padding: '12px 0', color: 'var(--muted)', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', textDecoration: 'none' },
}
