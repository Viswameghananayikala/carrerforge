import { useState } from 'react'
import { Link } from 'react-router-dom'

const resources = [
  { title: 'How to Choose Your First Job', type: 'Article', time: '5 min', icon: '📝', category: 'Career Planning' },
  { title: 'Cracking FAANG Interviews in 2025', type: 'Guide', time: '15 min', icon: '🎯', category: 'Technology' },
  { title: 'Building a Standout Resume', type: 'Video', time: '12 min', icon: '▶️', category: 'Resume Tips' },
  { title: 'Top 10 High-Growth Careers Right Now', type: 'Article', time: '7 min', icon: '📈', category: 'Trends' },
  { title: 'GATE 2025 Preparation Plan', type: 'Guide', time: '10 min', icon: '📋', category: 'B.Tech' },
  { title: 'AP/TS B.Tech College Rankings', type: 'Article', time: '8 min', icon: '🏫', category: 'B.Tech' },
]

const careerMatches = [
  { title: 'Software Engineer', match: 92, icon: '💻' },
  { title: 'Data Scientist', match: 87, icon: '📊' },
  { title: 'Product Manager', match: 78, icon: '🚀' },
]

export default function UserDashboard({ auth, appointments, addFeedback }) {
  const userName = auth?.name || 'Student'
  const [activeTab, setActiveTab] = useState('overview')
  const [feedbackModal, setFeedbackModal] = useState(null)
  const [fbRating, setFbRating] = useState(5)
  const [fbComment, setFbComment] = useState('')

  // Filter appointments for this user
  const myAppts = appointments.filter(a => a.userId === auth?.email)
  const upcoming = myAppts.filter(a => a.status === 'pending' || a.status === 'confirmed')
  const past = myAppts.filter(a => a.status === 'completed')

  const submitFeedback = () => {
    if (feedbackModal) {
      addFeedback(feedbackModal.id, fbRating, fbComment)
      setFeedbackModal(null)
      setFbRating(5); setFbComment('')
    }
  }

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="orb orb-1" />

      <div style={{ background: 'rgba(9,24,40,0.5)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: 'var(--teal-light)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Welcome back</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{userName}</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{auth?.email || ''}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/schedule" className="btn-primary">+ Book Session</Link>
            <Link to="/careers" className="btn-outline">Explore Careers</Link>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', background: 'rgba(9,24,40,0.5)' }}>
        <div className="container" style={{ display: 'flex' }}>
          {['overview', 'sessions', 'resources', 'assessment'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>

        {activeTab === 'overview' && (
          <div>
            <div style={styles.statsGrid}>
              {[
                { label: 'Sessions Booked', value: myAppts.length || 0, color: 'var(--teal-light)' },
                { label: 'Upcoming Sessions', value: upcoming.length || 0, color: 'var(--coral)' },
                { label: 'Resources Read', value: 12, color: 'var(--accent-light)' },
                { label: 'Top Career Match', value: '92%', color: '#b39ddb' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ ...styles.statNum, color: s.color }}>{s.value}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '28px' }}>
              <div className="card">
                <h3 style={styles.cardHeading}>Upcoming Sessions</h3>
                {upcoming.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)' }}>
                    <p style={{ fontSize: '0.88rem' }}>No sessions booked yet.</p>
                    <Link to="/schedule" style={{ color: 'var(--teal-light)', fontSize: '0.85rem', marginTop: '8px', display: 'block' }}>+ Book a session →</Link>
                  </div>
                ) : upcoming.map((s, i) => (
                  <div key={i} style={styles.sessionItem}>
                    <div style={styles.smallAvatar}>{s.counselorName?.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{s.counselorName}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{s.date} · {s.time}</div>
                    </div>
                    <span style={{ ...styles.statusBadge, background: 'rgba(13,148,136,0.1)', color: 'var(--teal-light)' }}>{s.status}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <h3 style={styles.cardHeading}>Your Career Matches</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Based on your profile and assessment</p>
                {careerMatches.map((c, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{c.icon} {c.title}</span>
                      <span style={{ color: 'var(--coral)', fontWeight: '700', fontSize: '0.9rem' }}>{c.match}%</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${c.match}%`, background: i === 0 ? 'var(--teal-light)' : i === 1 ? 'var(--coral)' : '#b39ddb' }} />
                    </div>
                  </div>
                ))}
                <button className="btn-outline" style={{ width: '100%', marginTop: '8px', padding: '10px' }} onClick={() => setActiveTab('assessment')}>
                  Take Full Assessment →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>My Sessions</h3>
            {myAppts.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📅</div>
                <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>No sessions booked yet.</p>
                <Link to="/schedule" className="btn-primary">Book Your First Session</Link>
              </div>
            ) : myAppts.map((s, i) => (
              <div key={i} className="card" style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={styles.bigAvatar}>{s.counselorName?.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '4px' }}>{s.counselorName}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{s.sessionType}</p>
                    <p style={{ color: 'var(--teal-light)', fontSize: '0.85rem', marginTop: '4px' }}>📅 {s.date} at {s.time}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ ...styles.statusBadge, background: s.status === 'confirmed' ? 'rgba(13,148,136,0.1)' : 'rgba(245,158,11,0.1)', color: s.status === 'confirmed' ? 'var(--teal-light)' : 'var(--gold)' }}>
                      {s.status}
                    </span>
                    {s.status === 'completed' && !s.feedback && (
                      <button onClick={() => setFeedbackModal(s)} style={{ display: 'block', marginTop: '8px', color: 'var(--teal-light)', background: 'none', border: '1px solid rgba(13,148,136,0.3)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer' }}>
                        ⭐ Give Feedback
                      </button>
                    )}
                    {s.feedback && (
                      <div style={{ marginTop: '8px', color: 'var(--gold)', fontSize: '0.82rem' }}>{'⭐'.repeat(s.feedback.rating)}</div>
                    )}
                  </div>
                </div>
                {/* Show submitted details */}
                <div style={{ marginTop: '12px', background: 'rgba(9,24,40,0.5)', borderRadius: '8px', padding: '12px', fontSize: '0.83rem', color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--white)' }}>Your Details Submitted:</strong>
                  <span> {s.details?.interestedBranch && `Branch: ${s.details.interestedBranch}`} {s.details?.goal && `| Goal: ${s.details.goal.slice(0, 60)}...`}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Learning Resources</h3>
            <div className="grid-3">
              {[...resources, ...resources.slice(0, 3)].map((r, i) => (
                <div key={i} className="card" style={{ cursor: 'pointer' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{r.icon}</div>
                  <span className="badge badge-teal" style={{ marginBottom: '10px' }}>{r.category}</span>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', marginBottom: '8px', lineHeight: '1.4' }}>{r.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{r.type} · {r.time} read</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Career Interests Assessment</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '28px' }}>Answer these questions to get better career matches. Takes about 5 minutes.</p>
            {[
              { q: 'Which activities do you enjoy most?', options: ['Building/Coding things', 'Helping/Advising people', 'Analyzing data', 'Creating art/design'] },
              { q: 'What type of work environment do you prefer?', options: ['Startup/Fast-paced', 'Corporate/Structured', 'Research/Academic', 'Freelance/Independent'] },
              { q: 'What matters most to you in a career?', options: ['High salary', 'Social impact', 'Creative freedom', 'Work-life balance'] },
              { q: 'Which subjects did you enjoy most?', options: ['Math & Science', 'Commerce & Economics', 'Arts & Literature', 'Social Studies'] },
            ].map((item, i) => (
              <div key={i} className="card" style={{ marginBottom: '16px' }}>
                <p style={{ fontWeight: '600', marginBottom: '14px', fontSize: '0.95rem' }}>Q{i + 1}. {item.q}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {item.options.map((opt, j) => (
                    <button key={j} style={styles.quizOption}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>Get My Career Matches →</button>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {feedbackModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#091828', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Rate Your Session</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '20px' }}>with {feedbackModal.counselorName}</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setFbRating(n)} style={{ fontSize: '1.8rem', background: 'none', border: 'none', cursor: 'pointer', opacity: n <= fbRating ? 1 : 0.3, transition: 'opacity 0.2s' }}>⭐</button>
              ))}
            </div>
            <textarea value={fbComment} onChange={e => setFbComment(e.target.value)} placeholder="Share your experience (optional)..." rows="3"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', marginBottom: '16px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={submitFeedback}>Submit Feedback</button>
              <button className="btn-outline" onClick={() => setFeedbackModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  tab: { padding: '14px 20px', background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.9rem', cursor: 'pointer', borderBottom: '2px solid transparent', transition: 'all 0.2s' },
  tabActive: { color: 'var(--white)', borderBottomColor: 'var(--teal-light)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' },
  statNum: { fontSize: '2.4rem', fontWeight: '700', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '6px' },
  statLabel: { color: 'var(--muted)', fontSize: '0.85rem' },
  cardHeading: { fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--white)' },
  sessionItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border)' },
  smallAvatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d2a4a, var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '700', fontSize: '0.75rem', flexShrink: 0 },
  bigAvatar: { width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d2a4a, var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '700', fontSize: '1rem', flexShrink: 0 },
  statusBadge: { padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' },
  progressBar: { height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' },
  quizOption: { background: 'rgba(9,24,40,0.7)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s', textAlign: 'left' },
}
