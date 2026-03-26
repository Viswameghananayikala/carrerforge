import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { counselorsData } from '../App'

const specializations = ['All', 'Technology', 'Engineering', 'Business', 'Healthcare', 'Creative Arts']

export default function Counselors({ auth }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = counselorsData.filter(c => filter === 'All' || c.specialization === filter)

  const handleBook = (c) => {
    if (!auth?.role) {
      navigate('/login')
    } else {
      navigate('/schedule', { state: { counselorId: c.id } })
    }
  }

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="orb orb-1" />
      <div style={{ background: 'rgba(9,24,40,0.5)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <p style={styles.eyebrow}>OUR EXPERTS</p>
          <h1 className="section-title">Meet Your Career Counselors</h1>
          <p className="section-subtitle">All sessions are free. View counselor profiles, ratings, and education before booking.</p>
          <div style={styles.tabRow}>
            {specializations.map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{ ...styles.tab, ...(filter === s ? styles.tabActive : {}) }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div className="grid-3">
          {filtered.map(c => (
            <div key={c.id} className="card" style={{ textAlign: 'left' }}>
              <div style={styles.cardTop}>
                <div style={styles.avatar}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.name}>{c.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{c.title}</p>
                  <span className={`badge ${c.badge}`} style={{ marginTop: '6px' }}>{c.specialization}</span>
                </div>
              </div>
              <p style={styles.bio}>{c.bio}</p>
              <div style={styles.metaRow}>
                <div style={styles.metaItem}><span style={styles.metaLabel}>Experience</span><span style={styles.metaValue}>{c.exp}</span></div>
                <div style={styles.metaItem}><span style={styles.metaLabel}>Sessions</span><span style={styles.metaValue}>{c.sessions}+</span></div>
                <div style={styles.metaItem}><span style={styles.metaLabel}>Rating</span><span style={{ ...styles.metaValue, color: 'var(--gold)' }}>⭐ {c.rating}</span></div>
              </div>
              <div style={styles.slotPreview}>
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'block', marginBottom: '8px' }}>Available Slots</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {c.slots.map(slot => <span key={slot} style={styles.slot}>{slot}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn-outline" style={{ flex: 1, padding: '10px' }} onClick={() => setSelected(c)}>View Profile</button>
                <button className="btn-primary" style={{ flex: 1, padding: '10px', fontSize: '0.9rem' }} onClick={() => handleBook(c)}>
                  {auth?.role ? 'Book Session' : '🔒 Login to Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            <div style={styles.modalHeader}>
              <div style={{ ...styles.avatar, width: '72px', height: '72px', fontSize: '1.4rem' }}>{selected.avatar}</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '4px' }}>{selected.name}</h2>
                <p style={{ color: 'var(--muted)' }}>{selected.title}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className={`badge ${selected.badge}`}>{selected.specialization}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: '700' }}>⭐ {selected.rating}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{selected.sessions}+ sessions</span>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginBottom: '16px' }}>{selected.bio}</p>

            {/* Education */}
            <div style={styles.infoBlock}>
              <span style={styles.infoLabel}>🎓 Education</span>
              <span style={styles.infoVal}>{selected.education}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.infoLabel}>🌐 Languages</span>
              <span style={styles.infoVal}>{selected.languages}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.infoLabel}>💼 Experience</span>
              <span style={styles.infoVal}>{selected.exp}</span>
            </div>

            {/* Resume link */}
            <div style={{ marginBottom: '20px' }}>
              <a href={selected.resume} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--teal-light)', border: '1px solid rgba(13,148,136,0.3)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: '600' }}>
                📄 View Resume / CV
              </a>
            </div>

            {/* Reviews */}
            <h4 style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Student Reviews</h4>
            <div style={{ marginBottom: '20px' }}>
              {selected.reviews.map((r, i) => (
                <div key={i} style={{ background: 'rgba(9,24,40,0.7)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{r.student}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '0.82rem' }}>{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{r.text}</p>
                </div>
              ))}
            </div>

            {/* Available slots */}
            <div style={{ background: 'rgba(9,24,40,0.6)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '0.88rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Available Slots</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selected.slots.map(slot => <div key={slot} style={{ ...styles.slot, padding: '7px 14px', fontSize: '0.88rem' }}>{slot}</div>)}
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '14px' }} onClick={() => { setSelected(null); handleBook(selected) }}>
              {auth?.role ? 'Book a Free Session →' : '🔒 Login to Book Session →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  eyebrow: { fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--teal-light)', textTransform: 'uppercase', marginBottom: '12px' },
  tabRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' },
  tab: { background: 'rgba(9,24,40,0.7)', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '6px', padding: '8px 20px', fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s' },
  tabActive: { background: 'rgba(13,148,136,0.12)', borderColor: 'var(--teal-light)', color: 'var(--teal-light)' },
  cardTop: { display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' },
  avatar: { width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d2a4a, var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '700', fontSize: '1rem', flexShrink: 0 },
  name: { fontSize: '1.05rem', fontWeight: '600', fontFamily: 'var(--font-body)', marginBottom: '2px' },
  bio: { color: 'var(--muted)', fontSize: '0.87rem', lineHeight: '1.65', marginBottom: '16px' },
  metaRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '14px' },
  metaItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
  metaLabel: { fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  metaValue: { fontSize: '0.92rem', fontWeight: '600' },
  slotPreview: { background: 'rgba(9,24,40,0.5)', borderRadius: '8px', padding: '12px' },
  slot: { background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.2)', color: 'var(--teal-light)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal: { background: '#091828', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '16px', padding: '36px', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
  closeBtn: { position: 'absolute', top: '16px', right: '16px', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--muted)', padding: '6px 10px', cursor: 'pointer' },
  modalHeader: { display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' },
  infoBlock: { display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' },
  infoLabel: { fontSize: '0.82rem', color: 'var(--teal-light)', fontWeight: '600', minWidth: '100px' },
  infoVal: { fontSize: '0.85rem', color: 'var(--muted)' },
}
