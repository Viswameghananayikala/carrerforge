import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ADMIN CREDENTIALS - change these to your own
const ADMIN_EMAIL = 'admin@careerforge.com'
const ADMIN_PASSWORD = 'CareerForge@2025'

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
        onLogin('admin', form.email, 'Admin')
        navigate('/admin')
      } else {
        setError('Invalid admin credentials. Please check your email and password.')
      }
    }, 800)
  }

  return (
    <div style={styles.page}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div style={styles.card}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoMark}>⬡</div>
          <span>Career<span style={{ color: 'var(--teal-light)' }}>Forge</span></span>
        </Link>
        <div style={styles.adminBadge}>
          <span>🛡️</span>
          <span>Admin Portal</span>
        </div>
        <h1 style={styles.title}>Admin Sign In</h1>
        <p style={styles.subtitle}>Restricted access — authorized personnel only</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Admin Email</label>
            <input type="text" name="email" value={form.email} onChange={handleChange}
              placeholder="Enter admin email" style={styles.input} autoComplete="email" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Enter admin password"
                style={{ ...styles.input, paddingRight: '48px' }} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <div style={styles.error}>⚠️ {error}</div>}
          <button type="submit" style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Verifying...' : '🛡️ Sign in as Admin'}
          </button>
        </form>

        <p style={styles.backLink}>
          Not an admin?{' '}
          <Link to="/login" style={{ color: 'var(--teal-light)', fontWeight: 600 }}>Student Sign In →</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '88px', paddingBottom: '60px', position: 'relative' },
  card: { background: 'rgba(9,24,40,0.92)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)', boxShadow: '0 0 40px rgba(245,158,11,0.06)' },
  logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--white)', marginBottom: '20px', textDecoration: 'none' },
  logoMark: { width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--teal), var(--teal-light))', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem' },
  adminBadge: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '6px 18px', width: 'fit-content', margin: '0 auto 24px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--gold)' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)', textAlign: 'center', marginBottom: '8px', fontFamily: 'Syne, sans-serif' },
  subtitle: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.88rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: 'var(--white)', fontSize: '0.88rem', fontWeight: '600' },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 16px', color: 'var(--white)', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
  eyeBtn: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  error: { background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#ff6b6b', fontSize: '0.88rem' },
  submitBtn: { width: '100%', padding: '14px', fontSize: '1rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a1628', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s' },
  backLink: { textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem', marginTop: '24px' },
}
