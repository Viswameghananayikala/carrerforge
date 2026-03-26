import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ onLogin, users }) {
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
      const user = users.find(u => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password)
      if (user) { onLogin('user', user.email, user.name); navigate('/dashboard') }
      else if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) setError('Incorrect password. Please try again.')
      else setError('No account found. Please sign up first.')
    }, 700)
  }

  return (
    <div style={s.page}>
      <div className="orb orb-1" /><div className="orb orb-2" />
      <div style={s.card}>
        <Link to="/" style={s.logo}>
          <div style={s.logoMark}>⬡</div>
          <span>Career<span style={{ color: 'var(--purple-light)' }}>Forge</span></span>
        </Link>
        <h1 style={s.title}>Welcome Back</h1>
        <p style={s.subtitle}>Sign in to continue your journey</p>

        {users.length === 0 && (
          <div style={s.hintBox}>
            <span style={{ color: 'var(--coral)', fontWeight: 700, fontSize: '0.82rem' }}>👋 New here? </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
              <Link to="/signup" style={{ color: 'var(--purple-light)', fontWeight: 600 }}>Create an account</Link> first.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={s.form}>
          {[
            { label: 'Email Address', name: 'email', type: 'text', ph: 'you@example.com' },
          ].map(f => (
            <div key={f.name} style={s.field}>
              <label style={s.label}>{f.label}</label>
              <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.ph} style={s.input} />
            </div>
          ))}
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Your password" style={{ ...s.input, paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>

          {error && <div style={s.error}>⚠️ {error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
            <a href="#" style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: '12px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={s.divider}><span style={{ background: 'var(--bg)', padding: '0 14px', color: 'var(--muted)', fontSize: '0.82rem' }}>or</span></div>

        <Link to="/signup" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '12px', fontSize: '0.92rem' }}>
          Create New Account →
        </Link>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Admin? </span>
          <Link to="/admin-login" style={{ color: 'var(--purple-light)', fontSize: '0.85rem', fontWeight: 700 }}>Admin Login →</Link>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '88px', paddingBottom: '60px', position: 'relative' },
  card: {
    background: 'rgba(19,19,42,0.9)', border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '24px', padding: '48px 44px', width: '100%', maxWidth: '440px',
    position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.1)',
  },
  logo: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800',
    color: 'var(--white)', marginBottom: '32px', textDecoration: 'none',
  },
  logoMark: {
    width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #9f67ff)',
    borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
  },
  title: { fontSize: '1.9rem', fontWeight: '800', color: 'var(--white)', textAlign: 'center', marginBottom: '8px', fontFamily: 'Syne, sans-serif' },
  subtitle: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.92rem' },
  hintBox: { background: 'rgba(255,107,107,0.07)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { color: 'rgba(248,249,255,0.7)', fontSize: '0.84rem', fontWeight: '600', letterSpacing: '0.03em' },
  input: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '13px 16px', color: 'var(--white)',
    fontSize: '0.95rem', outline: 'none', width: '100%',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  eyeBtn: { position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  error: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: '10px', padding: '10px 14px', color: '#ff8080', fontSize: '0.87rem' },
  divider: { textAlign: 'center', position: 'relative', margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)' },
}
