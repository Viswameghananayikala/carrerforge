import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { counselorsData } from '../App'

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dates = [28, 29, 30, 31, 1, 2]
const months = ['Mar', 'Mar', 'Mar', 'Mar', 'Apr', 'Apr']

const sessionTypes = [
  { id: 'discovery', label: '🗺️ Career Discovery', desc: 'Explore what careers match your interests and strengths' },
  { id: 'guidance', label: '🧭 Pathway Guidance', desc: 'Get a roadmap for your chosen career path' },
  { id: 'resume', label: '📄 Resume Review', desc: 'Get expert feedback on your resume and portfolio' },
  { id: 'mock', label: '🎯 Mock Interview', desc: 'Practice with real interview questions and get feedback' },
]

const indianStates = ['Andhra Pradesh','Telangana','Tamil Nadu','Karnataka','Kerala','Maharashtra','Delhi','Uttar Pradesh','Gujarat','Rajasthan','Madhya Pradesh','West Bengal','Punjab','Haryana','Bihar','Odisha','Assam','Jharkhand','Himachal Pradesh','Other State']
const countries = ['India','USA','UK','Canada','Australia','Germany','Singapore','UAE','Other']

export default function Schedule({ auth, appointments, addAppointment }) {
  const location = useLocation()
  const preselectedCounselor = location.state?.counselorId || null

  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState(preselectedCounselor)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [sessionType, setSessionType] = useState(null)

  // Pre-session details form - comprehensive
  const [details, setDetails] = useState({
    fullName: auth?.name || '',
    email: auth?.email || '',
    phone: '',
    fatherName: '',
    fatherPhone: '',
    intermediateGrade: '',
    interestedSkills: '',
    hobbies: '',
    interestedBranch: '',
    preferredCollege: '',
    studyPreference: 'same_state',
    preferredState: '',
    preferredCountry: '',
    goal: '',
    academicYear: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const canProceed = {
    1: selectedCounselor && sessionType,
    2: selectedDate !== null && selectedTime,
    3: details.fullName && details.phone && details.fatherName && details.interestedBranch && details.goal,
  }

  const handleSubmit = () => {
    if (!canProceed[3]) return
    const counselor = counselorsData.find(c => c.id === selectedCounselor)
    addAppointment({
      counselorId: selectedCounselor,
      counselorName: counselor?.name,
      counselorSpecialization: counselor?.specialization,
      date: `${days[selectedDate]}, ${dates[selectedDate]} ${months[selectedDate]}`,
      time: selectedTime,
      sessionType,
      details,
    })
    setSubmitted(true)
  }

  const reset = () => {
    setSubmitted(false); setStep(1); setSelectedCounselor(null); setSelectedDate(null)
    setSelectedTime(null); setSessionType(null)
    setDetails({ fullName: auth?.name || '', email: auth?.email || '', phone: '', fatherName: '', fatherPhone: '', intermediateGrade: '', interestedSkills: '', hobbies: '', interestedBranch: '', preferredCollege: '', studyPreference: 'same_state', preferredState: '', preferredCountry: '', goal: '', academicYear: '' })
  }

  const counselorForBooking = counselorsData.find(c => c.id === selectedCounselor)

  if (submitted) {
    return (
      <div style={{ paddingTop: '88px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="orb orb-1" />
        <div style={styles.successBox}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '12px' }}>Session Booked!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', lineHeight: '1.7', textAlign: 'center' }}>
            Your session with <strong style={{ color: 'var(--white)' }}>{counselorForBooking?.name}</strong> has been confirmed.<br />
            Confirmation sent to <strong style={{ color: 'var(--teal-light)' }}>{details.email || auth?.email}</strong>
          </p>
          <div style={styles.confirmCard}>
            {[
              ['Counselor', counselorForBooking?.name],
              ['Date & Time', `${days[selectedDate]}, ${dates[selectedDate]} ${months[selectedDate]} · ${selectedTime}`],
              ['Session Type', sessionTypes.find(s => s.id === sessionType)?.label],
              ['Fee', 'FREE'],
            ].map(([k, v]) => (
              <div key={k} style={styles.confirmRow}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ color: k === 'Fee' ? 'var(--teal-light)' : 'var(--white)' }}>{v}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{ width: '100%' }} onClick={reset}>Book Another Session</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="orb orb-1" />
      <div style={{ background: 'rgba(9,24,40,0.5)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <p style={styles.eyebrow}>BOOK A SESSION</p>
          <h1 className="section-title">Schedule Your Free Counseling</h1>
          <p className="section-subtitle">All sessions are completely free. Fill in your details so the counselor can guide you better.</p>
          <div style={styles.steps}>
            {['Choose Counselor', 'Pick Time', 'Your Details'].map((s, i) => (
              <div key={i} style={styles.stepItem}>
                <div style={{ ...styles.stepCircle, ...(step > i + 1 ? styles.stepDone : step === i + 1 ? styles.stepActive : {}) }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.85rem', color: step === i + 1 ? 'var(--white)' : 'var(--muted)' }}>{s}</span>
                {i < 2 && <div style={styles.stepLine} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px', maxWidth: '820px' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h3 style={styles.stepTitle}>Select a Counselor</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '14px', marginBottom: '32px' }}>
              {counselorsData.map(c => (
                <div key={c.id} className="card" style={{ ...styles.optionCard, ...(selectedCounselor === c.id ? styles.optionSelected : {}) }}
                  onClick={() => setSelectedCounselor(c.id)}>
                  <div style={styles.smallAvatar}>{c.avatar}</div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '2px' }}>{c.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4px' }}>{c.specialization}</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>⭐ {c.rating}</div>
                  {selectedCounselor === c.id && <div style={styles.checkmark}>✓</div>}
                </div>
              ))}
            </div>

            <h3 style={styles.stepTitle}>Select Session Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {sessionTypes.map(s => (
                <div key={s.id} className="card" style={{ ...styles.optionCard, ...(sessionType === s.id ? styles.optionSelected : {}) }}
                  onClick={() => setSessionType(s.id)}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{s.desc}</div>
                  {sessionType === s.id && <div style={styles.checkmark}>✓</div>}
                </div>
              ))}
            </div>

            <button className="btn-primary" disabled={!canProceed[1]} onClick={() => setStep(2)} style={{ opacity: canProceed[1] ? 1 : 0.4 }}>
              Continue to Time Selection →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h3 style={styles.stepTitle}>Choose Date</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {days.map((day, i) => (
                <button key={i} onClick={() => setSelectedDate(i)}
                  style={{ ...styles.dateBtn, ...(selectedDate === i ? styles.dateBtnActive : {}) }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{day}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{dates[i]}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{months[i]}</div>
                </button>
              ))}
            </div>
            <h3 style={styles.stepTitle}>Select Time</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {timeSlots.map(slot => (
                <button key={slot} onClick={() => setSelectedTime(slot)}
                  style={{ ...styles.timeBtn, ...(selectedTime === slot ? styles.timeBtnActive : {}) }}>
                  {slot}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" disabled={!canProceed[2]} onClick={() => setStep(3)} style={{ opacity: canProceed[2] ? 1 : 0.4 }}>
                Continue to Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 - Comprehensive student details */}
        {step === 3 && (
          <div>
            <h3 style={styles.stepTitle}>Your Information</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              This information helps the counselor prepare personalized guidance for you.
            </p>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
              <h4 style={styles.sectionHead}>👤 Personal Details</h4>
              <div style={styles.formGrid}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input value={details.fullName} onChange={e => setDetails({...details, fullName: e.target.value})} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Your Phone Number *</label>
                  <input value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label>Academic Year</label>
                  <select value={details.academicYear} onChange={e => setDetails({...details, academicYear: e.target.value})}>
                    <option value="">Select year</option>
                    <option>Intermediate (12th)</option>
                    <option>1st Year B.Tech</option>
                    <option>2nd Year B.Tech</option>
                    <option>3rd Year B.Tech</option>
                    <option>4th Year B.Tech</option>
                    <option>Recent Graduate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Intermediate / 12th Grade (%)</label>
                  <input value={details.intermediateGrade} onChange={e => setDetails({...details, intermediateGrade: e.target.value})} placeholder="e.g. 85% or 9.2 CGPA" />
                </div>
              </div>

              <h4 style={styles.sectionHead}>👨‍👩‍👦 Parent / Guardian Details</h4>
              <div style={styles.formGrid}>
                <div className="form-group">
                  <label>Father's / Guardian's Name *</label>
                  <input value={details.fatherName} onChange={e => setDetails({...details, fatherName: e.target.value})} placeholder="Father's full name" />
                </div>
                <div className="form-group">
                  <label>Father's / Guardian's Phone</label>
                  <input value={details.fatherPhone} onChange={e => setDetails({...details, fatherPhone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <h4 style={styles.sectionHead}>🎯 Interests & Goals</h4>
              <div className="form-group">
                <label>Interested Branch / Field *</label>
                <input value={details.interestedBranch} onChange={e => setDetails({...details, interestedBranch: e.target.value})} placeholder="e.g. CSE, ECE, B.Tech AI/ML, Medical, CA..." />
              </div>
              <div className="form-group">
                <label>Interested Skills</label>
                <input value={details.interestedSkills} onChange={e => setDetails({...details, interestedSkills: e.target.value})} placeholder="e.g. Coding, Design, Finance, Communication..." />
              </div>
              <div className="form-group">
                <label>Hobbies</label>
                <input value={details.hobbies} onChange={e => setDetails({...details, hobbies: e.target.value})} placeholder="e.g. Chess, Reading, Drawing, Sports..." />
              </div>

              <h4 style={styles.sectionHead}>🏫 College Preferences</h4>
              <div className="form-group">
                <label>Preferred College / Type</label>
                <input value={details.preferredCollege} onChange={e => setDetails({...details, preferredCollege: e.target.value})} placeholder="e.g. JNTUH, Osmania, NIT, IIT, Private college..." />
              </div>
              <div className="form-group">
                <label>Study Preference</label>
                <select value={details.studyPreference} onChange={e => setDetails({...details, studyPreference: e.target.value})}>
                  <option value="same_state">Same State</option>
                  <option value="other_state">Other State in India</option>
                  <option value="abroad">Abroad</option>
                  <option value="flexible">Flexible / No Preference</option>
                </select>
              </div>
              {details.studyPreference === 'other_state' && (
                <div className="form-group">
                  <label>Preferred State</label>
                  <select value={details.preferredState} onChange={e => setDetails({...details, preferredState: e.target.value})}>
                    <option value="">Select state</option>
                    {indianStates.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              )}
              {details.studyPreference === 'abroad' && (
                <div className="form-group">
                  <label>Preferred Country</label>
                  <select value={details.preferredCountry} onChange={e => setDetails({...details, preferredCountry: e.target.value})}>
                    <option value="">Select country</option>
                    {countries.filter(c => c !== 'India').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Your Main Goal / Question for the Counselor *</label>
                <textarea value={details.goal} onChange={e => setDetails({...details, goal: e.target.value})} placeholder="What would you like guidance on? What are your main concerns?" rows="4" style={{ resize: 'vertical' }} />
              </div>
            </div>

            {/* Booking summary */}
            <div style={styles.summary}>
              <h4 style={{ marginBottom: '14px', fontSize: '0.88rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Session Summary</h4>
              {[
                ['Counselor', counselorsData.find(c => c.id === selectedCounselor)?.name],
                ['Session Type', sessionTypes.find(s => s.id === sessionType)?.label],
                ['Date & Time', selectedDate !== null ? `${days[selectedDate]}, ${dates[selectedDate]} ${months[selectedDate]} · ${selectedTime}` : ''],
                ['Fee', 'FREE'],
              ].map(([k, v]) => (
                <div key={k} style={styles.summaryRow}>
                  <span>{k}</span>
                  <strong style={{ color: k === 'Fee' ? 'var(--teal-light)' : 'var(--white)' }}>{v}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" disabled={!canProceed[3]} onClick={handleSubmit} style={{ flex: 1, opacity: canProceed[3] ? 1 : 0.4 }}>
                Confirm Booking →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  eyebrow: { fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--teal-light)', textTransform: 'uppercase', marginBottom: '12px' },
  steps: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '28px', flexWrap: 'wrap' },
  stepItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  stepCircle: { width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', flexShrink: 0 },
  stepActive: { background: 'var(--teal)', border: '2px solid var(--teal)', color: '#fff' },
  stepDone: { background: 'rgba(13,148,136,0.15)', border: '2px solid var(--teal-light)', color: 'var(--teal-light)' },
  stepLine: { width: '32px', height: '2px', background: 'var(--border)' },
  stepTitle: { fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', fontFamily: 'var(--font-body)' },
  sectionHead: { fontSize: '0.9rem', fontWeight: '700', color: 'var(--teal-light)', marginBottom: '14px', marginTop: '16px', paddingBottom: '6px', borderBottom: '1px solid var(--border)' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' },
  optionCard: { cursor: 'pointer', position: 'relative', transition: 'all 0.2s', textAlign: 'center', padding: '20px 16px' },
  optionSelected: { borderColor: 'var(--teal-light)', background: 'rgba(13,148,136,0.06)' },
  checkmark: { position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700' },
  smallAvatar: { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #0d2a4a, var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: '700', margin: '0 auto 10px' },
  dateBtn: { background: 'rgba(9,24,40,0.8)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px 18px', color: 'var(--white)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center', minWidth: '70px' },
  dateBtnActive: { background: 'rgba(13,148,136,0.12)', borderColor: 'var(--teal-light)', color: 'var(--teal-light)' },
  timeBtn: { background: 'rgba(9,24,40,0.8)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 18px', color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem' },
  timeBtnActive: { background: 'rgba(13,148,136,0.12)', borderColor: 'var(--teal-light)', color: 'var(--teal-light)' },
  summary: { background: 'rgba(9,24,40,0.7)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--muted)' },
  successBox: { background: 'var(--card-bg)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: '20px', padding: '48px', maxWidth: '480px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 },
  confirmCard: { background: 'rgba(9,24,40,0.7)', borderRadius: '10px', padding: '16px', marginBottom: '28px', textAlign: 'left' },
  confirmRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem', borderBottom: '1px solid var(--border)', color: 'var(--muted)' },
}
