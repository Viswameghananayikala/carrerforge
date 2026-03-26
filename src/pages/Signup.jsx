import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function generateCaptcha() {
  const ops = ['+', '-', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a, b, answer
  if (op === '+') {
    a = Math.floor(Math.random() * 20) + 1
    b = Math.floor(Math.random() * 20) + 1
    answer = a + b
  } else if (op === '-') {
    a = Math.floor(Math.random() * 20) + 10
    b = Math.floor(Math.random() * 10) + 1
    answer = a - b
  } else {
    a = Math.floor(Math.random() * 9) + 2
    b = Math.floor(Math.random() * 5) + 2
    answer = a * b
  }
  return { question: `${a} ${op} ${b} = ?`, answer }
}

export default function Signup({ onSignup, onLogin, users }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', captcha: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [captcha, setCaptcha] = useState(generateCaptcha())
  const [captchaError, setCaptchaError] = useState(false)

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha())
    setForm(f => ({ ...f, captcha: '' }))
    setCaptchaError(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    if (e.target.name === 'captcha') setCaptchaError(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email || !form.password || !form.confirm || !form.captcha) {
      setError('Please fill in all fields.')
      return
    }
    if (form.name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    // Check email already registered
    if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) {
      setError('This email is already registered. Please sign in.')
      return
    }
    // CAPTCHA check
    if (parseInt(form.captcha) !== captcha.answer) {
      setCaptchaError(true)
      setError('Incorrect CAPTCHA answer. Please try again.')
      refreshCaptcha()
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSignup(form.name.trim(), form.email, form.password)
      onLogin('user', form.email, form.name.trim())
      navigate('/dashboard')
    }, 900)
  }

  const passStrength = () => {
    const p = form.password
    if (p.length === 0) return null
    if (p.length < 6) return { label: 'Too short', color: '#ff6b6b', width: '20%' }
    if (p.length < 8) return { label: 'Weak', color: '#ffa26b', width: '40%' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Strong', color: '#64ffda', width: '100%' }
    return { label: 'Medium', color: '#f4a825', width: '65%' }
  }
  const strength = passStrength()

  return (
    <div style={styles.page}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div style={styles.card}>
        <Link to="/" style={styles.logo}>
          <span style={{ color: 'var(--purple-light)' }}>⬡</span> CareerForge
        </Link>

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join 2,400+ students shaping their future</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Priya Sharma"
              style={styles.input}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={styles.input}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.passWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                style={{ ...styles.input, paddingRight: '48px' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {strength && (
              <div style={{ marginTop: '6px' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                  <div style={{ width: strength.width, height: '100%', background: strength.color, borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: strength.color, marginTop: '3px', display: 'block' }}>{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passWrap}>
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter your password"
                style={{ ...styles.input, paddingRight: '48px' }}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* CAPTCHA */}
          <div style={styles.field}>
            <label style={styles.label}>Security Check (CAPTCHA)</label>
            <div style={styles.captchaBox}>
              <div style={styles.captchaQuestion}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Solve to verify you're human:</span>
                <span style={styles.captchaMath}>{captcha.question}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  name="captcha"
                  value={form.captcha}
                  onChange={handleChange}
                  placeholder="Answer"
                  style={{
                    ...styles.input,
                    width: '100px',
                    flexShrink: 0,
                    borderColor: captchaError ? '#ff6b6b' : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  style={styles.refreshBtn}
                  title="New question"
                >
                  🔄
                </button>
              </div>
            </div>
          </div>

          {error && <div style={styles.error}>⚠️ {error}</div>}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', opacity: loading ? 0.7 : 1, marginTop: '4px' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--purple-light)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    paddingTop: '88px', paddingBottom: '60px', position: 'relative',
  },
  card: {
    background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px',
    padding: '48px 40px', width: '100%', maxWidth: '460px',
    position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)',
  },
  logo: {
    display: 'block', fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '700',
    color: 'var(--white)', textAlign: 'center', marginBottom: '28px', textDecoration: 'none',
  },
  title: {
    fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)',
    textAlign: 'center', marginBottom: '8px', fontFamily: 'Syne, sans-serif',
  },
  subtitle: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.92rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: 'var(--white)', fontSize: '0.88rem', fontWeight: '600' },
  input: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '12px 16px', color: 'var(--white)',
    fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box',
  },
  passWrap: { position: 'relative' },
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
  },
  captchaBox: {
    background: 'rgba(100,255,218,0.04)', border: '1px solid rgba(100,255,218,0.15)',
    borderRadius: '10px', padding: '14px 16px', display: 'flex',
    flexDirection: 'column', gap: '10px',
  },
  captchaQuestion: { display: 'flex', flexDirection: 'column' },
  captchaMath: {
    fontSize: '1.3rem', fontWeight: '800', color: 'var(--purple-light)',
    fontFamily: 'monospace', letterSpacing: '0.1em',
  },
  refreshBtn: {
    background: 'rgba(100,255,218,0.1)', border: '1px solid rgba(100,255,218,0.2)',
    borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '1rem',
    flexShrink: 0,
  },
  error: {
    background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)',
    borderRadius: '8px', padding: '10px 14px', color: '#ff6b6b', fontSize: '0.88rem',
  },
  loginLink: { textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem', marginTop: '20px' },
}
