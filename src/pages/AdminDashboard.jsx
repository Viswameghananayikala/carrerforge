import { useState } from 'react'
import { counselorsData } from '../App'

export default function AdminDashboard({ appointments = [], users = [] }) {
  const [tab, setTab] = useState('overview')

  const totalSessions = appointments.length
  const totalStudents = users.length
  // Most booked counselor
  const counselorCounts = {}
  appointments.forEach(a => { counselorCounts[a.counselorName] = (counselorCounts[a.counselorName] || 0) + 1 })
  const topCounselor = Object.entries(counselorCounts).sort((a,b) => b[1]-a[1])[0]?.[0] || 'N/A'
  // Most searched career by branch
  const branchCounts = {}
  appointments.forEach(a => { const b = a.details?.interestedBranch; if(b) branchCounts[b] = (branchCounts[b]||0)+1 })
  const topCareer = Object.entries(branchCounts).sort((a,b) => b[1]-a[1])[0]?.[0] || 'N/A'

  // Feedback summary
  const allFeedback = appointments.filter(a => a.feedback)
  const avgRating = allFeedback.length > 0 ? (allFeedback.reduce((s, a) => s + a.feedback.rating, 0) / allFeedback.length).toFixed(1) : 'N/A'

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="orb orb-1" />

      <div style={{ background: 'rgba(9,24,40,0.6)', borderBottom: '1px solid var(--border)', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Panel</p>
              <span style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--gold)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '700' }}>ADMIN</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>CareerForge Administration</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Live Data</div>
            <div style={{ color: 'var(--teal-light)', fontSize: '0.85rem', marginTop: '2px' }}>● All systems operational</div>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', background: 'rgba(9,24,40,0.5)' }}>
        <div className="container" style={{ display: 'flex' }}>
          {['overview', 'students', 'sessions', 'counselors', 'feedback'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>

        {/* OVERVIEW / ANALYTICS */}
        {tab === 'overview' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Analytics Dashboard</h3>
            <div style={styles.statsGrid}>
              {[
                { label: 'Total Students', value: totalStudents || 0, icon: '👩‍🎓', color: 'var(--teal-light)', note: 'Registered' },
                { label: 'Total Sessions', value: totalSessions || 0, icon: '📅', color: 'var(--coral)', note: 'All time' },
                { label: 'Active Counselors', value: counselorsData.length, icon: '👨‍💼', color: '#b39ddb', note: 'Available' },
                { label: 'Avg Session Rating', value: avgRating, icon: '⭐', color: 'var(--gold)', note: 'From feedback' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ borderLeft: `3px solid ${s.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '10px' }}>{s.note}</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: s.color }}>{s.value}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '28px' }}>
              <div className="card">
                <h3 style={styles.cardH}>Most Searched Careers / Branches</h3>
                {Object.keys(branchCounts).length === 0 ? (
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', padding: '16px 0' }}>No data yet. Sessions will populate this.</p>
                ) : Object.entries(branchCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([name, count], i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{name}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--teal-light)' }}>{count} searches</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--teal)', borderRadius: '3px', width: `${(count / Math.max(...Object.values(branchCounts))) * 100}%`, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 style={styles.cardH}>Recent Sessions</h3>
                {appointments.length === 0 ? (
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', padding: '16px 0' }}>No sessions booked yet.</p>
                ) : appointments.slice(-4).reverse().map((s, i) => (
                  <div key={i} style={styles.listRow}>
                    <div style={styles.miniAvatar}>{s.userName?.charAt(0) || 'S'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{s.userName || s.userId}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{s.counselorName} · {s.date}</div>
                    </div>
                    <span style={{ ...styles.pill, background: 'rgba(13,148,136,0.1)', color: 'var(--teal-light)' }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {tab === 'students' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Registered Students ({users.length})</h3>
            </div>
            {users.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                <p style={{ color: 'var(--muted)' }}>No students registered yet.</p>
              </div>
            ) : (
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(9,24,40,0.5)' }}>
                      {['Name', 'Email', 'Sessions Booked', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      const userSessions = appointments.filter(a => a.userId === u.email).length
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={styles.td}><strong>{u.name}</strong></td>
                          <td style={{ ...styles.td, color: 'var(--muted)' }}>{u.email}</td>
                          <td style={{ ...styles.td, color: 'var(--teal-light)', fontWeight: '700' }}>{userSessions}</td>
                          <td style={styles.td}><span style={{ ...styles.pill, background: 'rgba(13,148,136,0.1)', color: 'var(--teal-light)' }}>active</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SESSIONS */}
        {tab === 'sessions' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>All Sessions ({appointments.length})</h3>
            {appointments.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                <p style={{ color: 'var(--muted)' }}>No sessions booked yet.</p>
              </div>
            ) : appointments.map((s, i) => (
              <div key={i} className="card" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{s.userName || s.userId} → {s.counselorName}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{s.sessionType} · {s.date} at {s.time}</div>
                    <div style={{ marginTop: '8px', fontSize: '0.82rem', color: 'var(--muted)' }}>
                      Branch: <span style={{ color: 'var(--teal-light)' }}>{s.details?.interestedBranch || 'N/A'}</span>
                      &nbsp;| Phone: <span style={{ color: 'var(--white)' }}>{s.details?.phone || 'N/A'}</span>
                      &nbsp;| Father: <span style={{ color: 'var(--white)' }}>{s.details?.fatherName || 'N/A'}</span>
                    </div>
                    {s.details?.goal && (
                      <div style={{ marginTop: '6px', fontSize: '0.82rem', color: 'var(--muted)' }}>
                        Goal: <span style={{ color: 'var(--white)' }}>{s.details.goal}</span>
                      </div>
                    )}
                  </div>
                  <span style={{ ...styles.pill, background: 'rgba(13,148,136,0.1)', color: 'var(--teal-light)' }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COUNSELORS */}
        {tab === 'counselors' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Counselor Management</h3>
              <button className="btn-primary">+ Add Counselor</button>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(9,24,40,0.5)' }}>
                    {['Name', 'Specialization', 'Experience', 'Sessions', 'Rating', 'Status', 'Actions'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {counselorsData.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={styles.td}><strong>{c.name}</strong></td>
                      <td style={{ ...styles.td, color: 'var(--teal-light)' }}>{c.specialization}</td>
                      <td style={{ ...styles.td, color: 'var(--muted)' }}>{c.exp}</td>
                      <td style={{ ...styles.td, fontWeight: '700' }}>{c.sessions}</td>
                      <td style={{ ...styles.td, color: 'var(--gold)', fontWeight: '700' }}>⭐ {c.rating}</td>
                      <td style={styles.td}><span style={{ ...styles.pill, background: 'rgba(13,148,136,0.1)', color: 'var(--teal-light)' }}>active</span></td>
                      <td style={styles.td}><span style={{ color: 'var(--teal-light)', cursor: 'pointer', fontSize: '0.85rem' }}>Edit · </span><span style={{ color: '#f06292', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {tab === 'feedback' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Feedback & Ratings</h3>
            {allFeedback.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⭐</div>
                <p style={{ color: 'var(--muted)' }}>No feedback submitted yet.</p>
              </div>
            ) : (
              <>
                <div style={styles.statsGrid}>
                  {[
                    { label: 'Total Reviews', value: allFeedback.length, color: 'var(--teal-light)' },
                    { label: 'Average Rating', value: avgRating + ' ⭐', color: 'var(--gold)' },
                    { label: '5-Star Reviews', value: allFeedback.filter(a => a.feedback.rating === 5).length, color: '#b39ddb' },
                  ].map((s, i) => (
                    <div key={i} className="card" style={{ textAlign: 'center', borderLeft: `3px solid ${s.color}` }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: '700', color: s.color, marginBottom: '6px' }}>{s.value}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px' }}>
                  {allFeedback.map((a, i) => (
                    <div key={i} className="card" style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontWeight: '600' }}>{a.userName || a.userId}</span>
                          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}> → {a.counselorName}</span>
                        </div>
                        <span style={{ color: 'var(--gold)' }}>{'⭐'.repeat(a.feedback.rating)}</span>
                      </div>
                      {a.feedback.comment && <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{a.feedback.comment}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  tab: { padding: '14px 20px', background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.88rem', cursor: 'pointer', borderBottom: '2px solid transparent', transition: 'all 0.2s' },
  tabActive: { color: 'var(--gold)', borderBottomColor: 'var(--gold)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },
  cardH: { fontFamily: 'var(--font-body)', fontWeight: '700', marginBottom: '16px', fontSize: '1rem' },
  listRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' },
  miniAvatar: { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d2a4a, var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '700', fontSize: '0.68rem', flexShrink: 0 },
  pill: { padding: '3px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' },
  td: { padding: '14px 16px', fontSize: '0.9rem', color: 'var(--white)' },
}
