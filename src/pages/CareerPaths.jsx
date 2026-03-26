import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const allCareers = [
  // TECHNOLOGY
  { id: 1, title: 'Software Engineer', domain: 'Technology', icon: '💻', salary: '₹8L – ₹40L', growth: 'Very High', skills: ['Programming', 'Problem Solving', 'DSA', 'System Design'], desc: 'Build software applications, systems, and services that power the digital world.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Clean Code – Robert Martin', 'The Pragmatic Programmer – Hunt & Thomas'],
    pdfs: ['DSA Cheat Sheet', 'System Design Interview Guide', 'Top 100 Coding Questions'],
    assessment: { questions: ['What is time complexity of binary search?', 'Explain SOLID principles', 'Difference between SQL and NoSQL'], passMark: 2 }
  },
  { id: 2, title: 'Data Scientist', domain: 'Technology', icon: '📊', salary: '₹10L – ₹45L', growth: 'Very High', skills: ['Python', 'ML', 'Statistics', 'SQL'], desc: 'Extract insights from large datasets to drive business decisions using AI/ML.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Hands-On ML – Aurélien Géron', 'Python for Data Analysis – Wes McKinney'],
    pdfs: ['Python Basics PDF', 'ML Algorithms Guide', 'Statistics for Data Science'],
    assessment: { questions: ['What is overfitting?', 'Explain gradient descent', 'Difference between supervised and unsupervised learning?'], passMark: 2 }
  },
  { id: 3, title: 'UX/UI Designer', domain: 'Technology', icon: '🎨', salary: '₹5L – ₹25L', growth: 'High', skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'], desc: 'Design intuitive and beautiful digital products that users love to interact with.', duration: '3 years', badge: 'badge-teal', popular: false,
    books: ['Don\'t Make Me Think – Steve Krug', 'The Design of Everyday Things – Don Norman'],
    pdfs: ['Figma Beginner Guide', 'UX Research Methods PDF', 'UI Design Principles'],
    assessment: { questions: ['What is user-centered design?', 'Explain the difference between UX and UI', 'What is a wireframe?'], passMark: 2 }
  },
  { id: 10, title: 'Cybersecurity Analyst', domain: 'Technology', icon: '🛡️', salary: '₹8L – ₹40L', growth: 'Very High', skills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Threat Analysis'], desc: 'Protect organizations from cyber threats and security breaches.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['The Web Application Hacker\'s Handbook', 'CompTIA Security+ Study Guide'],
    pdfs: ['Networking Basics PDF', 'Ethical Hacking Roadmap', 'OWASP Top 10 Guide'],
    assessment: { questions: ['What is a firewall?', 'Explain SQL injection', 'What is penetration testing?'], passMark: 2 }
  },
  // B.TECH PATHS
  { id: 13, title: 'B.Tech – Computer Science (CSE)', domain: 'B.Tech', icon: '🖥️', salary: '₹6L – ₹40L', growth: 'Very High', skills: ['C/C++', 'Java', 'DSA', 'Operating Systems', 'DBMS'], desc: 'Core CS engineering covering programming, algorithms, networks, and software development.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Introduction to Algorithms – CLRS', 'Operating System Concepts – Silberschatz'],
    pdfs: ['JNTUH CSE Syllabus PDF', 'Placement Preparation Guide', 'DSA Practice Sheet'],
    assessment: { questions: ['What is polymorphism?', 'Explain process vs thread', 'What is normalization in DBMS?'], passMark: 2 }
  },
  { id: 14, title: 'B.Tech – Electronics & Communication (ECE)', domain: 'B.Tech', icon: '📡', salary: '₹5L – ₹28L', growth: 'High', skills: ['Circuit Design', 'VLSI', 'Signal Processing', 'Embedded Systems', 'MATLAB'], desc: 'Study electronics, communication systems, signal processing and embedded technology.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Electronic Devices – Floyd', 'Signals & Systems – Oppenheim'],
    pdfs: ['ECE Core Subject Notes PDF', 'GATE ECE Preparation Plan', 'Embedded C Programming PDF'],
    assessment: { questions: ['What is a transistor?', 'Explain AM vs FM modulation', 'What is VLSI?'], passMark: 2 }
  },
  { id: 15, title: 'B.Tech – Electrical Engineering (EEE)', domain: 'B.Tech', icon: '⚡', salary: '₹5L – ₹25L', growth: 'Steady', skills: ['Power Systems', 'Control Systems', 'Electrical Machines', 'Circuit Analysis'], desc: 'Study electrical systems, power generation, distribution, and control systems.', duration: '4 years', badge: 'badge-teal', popular: false,
    books: ['Electrical Machines – Chapman', 'Power System Analysis – Stevenson'],
    pdfs: ['EEE Subject-wise Notes PDF', 'GATE EE Syllabus PDF', 'Power Electronics Guide'],
    assessment: { questions: ['What is Ohm\'s Law?', 'Explain AC vs DC', 'What is power factor?'], passMark: 2 }
  },
  { id: 16, title: 'B.Tech – Mechanical Engineering (ME)', domain: 'B.Tech', icon: '⚙️', salary: '₹4L – ₹22L', growth: 'Steady', skills: ['AutoCAD', 'Thermodynamics', 'Manufacturing', 'Fluid Mechanics', 'CAD/CAM'], desc: 'Design and manufacture machines, engines, and mechanical systems for industry.', duration: '4 years', badge: 'badge-teal', popular: false,
    books: ['Engineering Mechanics – Meriam', 'Thermodynamics – Cengel'],
    pdfs: ['ME Core Subjects PDF', 'AutoCAD Tutorial PDF', 'GATE ME Preparation Guide'],
    assessment: { questions: ['What is thermodynamics?', 'Explain stress and strain', 'What is a heat exchanger?'], passMark: 2 }
  },
  { id: 17, title: 'B.Tech – Civil Engineering', domain: 'B.Tech', icon: '🏗️', salary: '₹4L – ₹22L', growth: 'Steady', skills: ['AutoCAD', 'Structural Design', 'Surveying', 'Concrete Technology', 'STAAD Pro'], desc: 'Design and build infrastructure – buildings, bridges, roads, and water systems.', duration: '4 years', badge: 'badge-teal', popular: false,
    books: ['Structural Analysis – Bhavikatti', 'Soil Mechanics – Das'],
    pdfs: ['Civil Engineering Notes PDF', 'GATE CE Syllabus PDF', 'AutoCAD for Civil Engineers'],
    assessment: { questions: ['What is shear force?', 'Explain types of foundations', 'What is grade of concrete?'], passMark: 2 }
  },
  { id: 18, title: 'B.Tech – IT (Information Technology)', domain: 'B.Tech', icon: '🌐', salary: '₹5L – ₹35L', growth: 'Very High', skills: ['Web Development', 'Networking', 'Cloud Computing', 'Python', 'Cybersecurity'], desc: 'Focus on IT systems, networking, web technologies, and software for business.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Computer Networking – Tanenbaum', 'Cloud Computing – Buyya'],
    pdfs: ['IT Roadmap PDF', 'Full Stack Development Guide', 'AWS Cloud Basics PDF'],
    assessment: { questions: ['What is cloud computing?', 'Explain HTTP vs HTTPS', 'What is a VPN?'], passMark: 2 }
  },
  { id: 19, title: 'B.Tech – AI & Machine Learning (AIML)', domain: 'B.Tech', icon: '🤖', salary: '₹8L – ₹50L', growth: 'Very High', skills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow'], desc: 'Cutting-edge B.Tech specialization in AI, deep learning, NLP, and intelligent systems.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Deep Learning – Goodfellow et al.', 'Artificial Intelligence – Russell & Norvig'],
    pdfs: ['AIML Study Plan PDF', 'Python ML Cheatsheet', 'Neural Networks Beginner Guide'],
    assessment: { questions: ['What is a neural network?', 'Explain supervised learning', 'What is NLP?'], passMark: 2 }
  },
  { id: 20, title: 'B.Tech – Data Science', domain: 'B.Tech', icon: '📈', salary: '₹7L – ₹45L', growth: 'Very High', skills: ['Statistics', 'Python', 'ML', 'SQL', 'Data Visualization'], desc: 'Specialized B.Tech in data analysis, machine learning, and business intelligence.', duration: '4 years', badge: 'badge-teal', popular: true,
    books: ['Statistics – Freedman & Pisani', 'Data Science from Scratch – Joel Grus'],
    pdfs: ['Data Science Roadmap PDF', 'SQL Practice Sheet', 'Visualization with Python Guide'],
    assessment: { questions: ['What is hypothesis testing?', 'Explain correlation vs causation', 'What is feature engineering?'], passMark: 2 }
  },
  // BUSINESS
  { id: 4, title: 'Product Manager', domain: 'Business', icon: '🚀', salary: '₹12L – ₹50L', growth: 'Very High', skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'], desc: 'Lead the vision, strategy and execution of products from concept to launch.', duration: '3 years', badge: 'badge-gold', popular: true,
    books: ['Inspired – Marty Cagan', 'The Lean Startup – Eric Ries'],
    pdfs: ['Product Manager Interview Guide', 'PRD Templates PDF', 'Product Metrics Cheatsheet'],
    assessment: { questions: ['What is product-market fit?', 'How do you prioritize features?', 'What is an MVP?'], passMark: 2 }
  },
  { id: 5, title: 'Marketing Manager', domain: 'Business', icon: '📢', salary: '₹6L – ₹28L', growth: 'Moderate', skills: ['Digital Marketing', 'Analytics', 'SEO', 'Content'], desc: 'Develop and execute strategies to promote brands, products and services.', duration: '3 years', badge: 'badge-gold', popular: false,
    books: ['Marketing Management – Kotler', 'Contagious – Jonah Berger'],
    pdfs: ['Digital Marketing PDF', 'SEO Beginner Guide', 'Content Marketing Playbook'],
    assessment: { questions: ['What is SEO?', 'Explain the marketing funnel', 'What is CTR?'], passMark: 2 }
  },
  { id: 6, title: 'Chartered Accountant', domain: 'Business', icon: '📋', salary: '₹8L – ₹40L', growth: 'High', skills: ['Accounting', 'Taxation', 'Auditing', 'Finance'], desc: 'Provide financial advice, audit accounts, and ensure legal compliance for businesses.', duration: '5 years', badge: 'badge-gold', popular: true,
    books: ['Indian CA Foundation Study Material – ICAI', 'Income Tax – Vinod Singhania'],
    pdfs: ['CA Foundation Syllabus PDF', 'ICAI Study Plan', 'Accounting Standards Summary'],
    assessment: { questions: ['What is double-entry bookkeeping?', 'Explain GST', 'What is a balance sheet?'], passMark: 2 }
  },
  // HEALTHCARE
  { id: 7, title: 'Doctor (MBBS)', domain: 'Healthcare', icon: '🩺', salary: '₹8L – ₹60L', growth: 'Steady', skills: ['Medicine', 'Diagnosis', 'Patient Care', 'Research'], desc: 'Diagnose and treat illnesses to improve patients\' health and quality of life.', duration: '5.5 years', badge: 'badge-purple', popular: true,
    books: ['Gray\'s Anatomy', 'Harrison\'s Principles of Internal Medicine'],
    pdfs: ['NEET Preparation Guide', 'MBBS First Year Syllabus', 'Medical Terminology PDF'],
    assessment: { questions: ['What is homeostasis?', 'Explain the human immune system', 'What is a viral vs bacterial infection?'], passMark: 2 }
  },
  { id: 8, title: 'Clinical Psychologist', domain: 'Healthcare', icon: '🧠', salary: '₹5L – ₹25L', growth: 'High', skills: ['Counseling', 'CBT', 'Assessment', 'Empathy'], desc: 'Help individuals overcome mental health challenges through therapy and support.', duration: '6 years', badge: 'badge-purple', popular: false,
    books: ['Abnormal Psychology – Butcher', 'The CBT Handbook – Pamela Myles'],
    pdfs: ['Psychology Career Guide PDF', 'Counseling Techniques PDF', 'RCI Exam Preparation'],
    assessment: { questions: ['What is CBT?', 'Explain anxiety disorder', 'What is the DSM-5?'], passMark: 2 }
  },
  // CREATIVE ARTS
  { id: 9, title: 'Graphic Designer', domain: 'Creative Arts', icon: '🖌️', salary: '₹4L – ₹20L', growth: 'Moderate', skills: ['Photoshop', 'Illustrator', 'Typography', 'Branding'], desc: 'Create visual content to communicate messages and build brand identities.', duration: '3 years', badge: 'badge-coral', popular: false,
    books: ['Logo Design Love – David Airey', 'Thinking with Type – Ellen Lupton'],
    pdfs: ['Adobe Photoshop Beginner PDF', 'Typography Basics Guide', 'Portfolio Building Tips'],
    assessment: { questions: ['What is typography?', 'Explain RGB vs CMYK', 'What is a vector graphic?'], passMark: 2 }
  },
  // ENGINEERING
  { id: 11, title: 'Civil Engineer', domain: 'Engineering', icon: '🏛️', salary: '₹5L – ₹25L', growth: 'Steady', skills: ['AutoCAD', 'Structural Design', 'Project Management', 'Surveying'], desc: 'Design and supervise construction of infrastructure like bridges and buildings.', duration: '4 years', badge: 'badge-gold', popular: false,
    books: ['Structural Analysis – Bhavikatti', 'Soil Mechanics – Das'],
    pdfs: ['Civil Engineering Handbook PDF', 'AutoCAD Basics PDF', 'GATE Civil Guide'],
    assessment: { questions: ['What is shear force?', 'Explain types of load', 'What is foundation?'], passMark: 2 }
  },
]

const domains = ['All', 'Technology', 'B.Tech', 'Business', 'Healthcare', 'Creative Arts', 'Engineering']
const growthLevels = ['All Growth', 'Very High', 'High', 'Moderate', 'Steady']

export default function CareerPaths({ auth }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('All')
  const [growth, setGrowth] = useState('All Growth')
  const [selected, setSelected] = useState(null)
  const [assessmentMode, setAssessmentMode] = useState(false)
  const [answers, setAnswers] = useState({})
  const [grade, setGrade] = useState(null)

  const filtered = allCareers.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchDomain = domain === 'All' || c.domain === domain
    const matchGrowth = growth === 'All Growth' || c.growth === growth
    return matchSearch && matchDomain && matchGrowth
  })

  const growthColor = { 'Very High': 'var(--teal-light)', 'High': '#81c784', 'Moderate': 'var(--coral)', 'Steady': 'var(--muted)' }

  const handleBookSession = () => {
    setSelected(null)
    if (!auth?.role) navigate('/login')
    else navigate('/schedule')
  }

  const handleAssessmentSubmit = () => {
    const q = selected.assessment.questions
    const correct = Object.values(answers).filter(a => a.trim().length > 5).length
    const pct = Math.round((correct / q.length) * 100)
    let g = 'F'
    if (pct >= 90) g = 'A+'
    else if (pct >= 75) g = 'A'
    else if (pct >= 60) g = 'B'
    else if (pct >= 45) g = 'C'
    else if (pct >= 33) g = 'D'
    setGrade({ pct, g, correct, total: q.length })
  }

  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="orb orb-1" />
      <div style={{ background: 'rgba(9,24,40,0.5)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <p style={styles.eyebrow}>EXPLORE CAREERS</p>
          <h1 className="section-title">Find Your Career Path</h1>
          <p className="section-subtitle">Discover {allCareers.length}+ career paths with detailed info, study resources, and self-assessment.</p>
          <div style={styles.filterRow}>
            <input type="text" placeholder="🔍 Search by title or skill..." value={search} onChange={e => setSearch(e.target.value)} style={styles.search} />
            <select value={domain} onChange={e => setDomain(e.target.value)} style={styles.select}>
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={growth} onChange={e => setGrowth(e.target.value)} style={styles.select}>
              {growthLevels.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <p style={{ color: 'var(--muted)', marginBottom: '28px', fontSize: '0.9rem' }}>
          Showing <strong style={{ color: 'var(--white)' }}>{filtered.length}</strong> career paths
        </p>
        <div className="grid-3">
          {filtered.map(career => (
            <div key={career.id} className="card" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => { setSelected(career); setAssessmentMode(false); setAnswers({}); setGrade(null) }}>
              {career.popular && <div style={styles.popularBadge}>⭐ Popular</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '2rem' }}>{career.icon}</span>
                <div>
                  <h3 style={styles.cardTitle}>{career.title}</h3>
                  <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{career.domain}</span>
                </div>
              </div>
              <p style={styles.cardDesc}>{career.desc}</p>
              <div style={styles.cardMeta}>
                <div><span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Salary</span><br /><strong style={{ color: 'var(--coral)' }}>{career.salary}</strong></div>
                <div><span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Growth</span><br /><strong style={{ color: growthColor[career.growth] }}>{career.growth}</strong></div>
                <div><span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Prep Time</span><br /><strong>{career.duration}</strong></div>
              </div>
              <div style={styles.skillsRow}>
                {career.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                {career.skills.length > 3 && <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>+{career.skills.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔎</div>
            <p>No careers match your search. Try different filters.</p>
          </div>
        )}
      </div>

      {/* Career Detail Modal */}
      {selected && (
        <div style={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>

            {!assessmentMode ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '3rem' }}>{selected.icon}</span>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>{selected.title}</h2>
                    <span className={`badge ${selected.badge}`}>{selected.domain}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.7' }}>{selected.desc}</p>

                {/* Stats */}
                <div style={styles.modalGrid}>
                  <div style={styles.modalStat}><div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4px' }}>SALARY RANGE</div><div style={{ color: 'var(--coral)', fontWeight: '700', fontSize: '1.2rem' }}>{selected.salary}</div></div>
                  <div style={styles.modalStat}><div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4px' }}>GROWTH</div><div style={{ color: growthColor[selected.growth], fontWeight: '700', fontSize: '1.2rem' }}>{selected.growth}</div></div>
                  <div style={styles.modalStat}><div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4px' }}>PREPARATION</div><div style={{ fontWeight: '700', fontSize: '1.2rem' }}>{selected.duration}</div></div>
                </div>

                {/* Skills */}
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {selected.skills.map(s => <span key={s} className="tag" style={{ padding: '6px 14px' }}>{s}</span>)}
                </div>

                {/* Books */}
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📚 Recommended Books</h4>
                <div style={{ marginBottom: '20px' }}>
                  {selected.books.map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '6px', border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '1rem' }}>📘</span>
                      <span style={{ fontSize: '0.88rem', color: 'var(--white)' }}>{b}</span>
                    </div>
                  ))}
                </div>

                {/* PDFs */}
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📄 Study Resources (PDFs)</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {selected.pdfs.map((p, i) => (
                    <span key={i} style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', color: 'var(--teal-light)', borderRadius: '6px', padding: '5px 12px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      📥 {p}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => setAssessmentMode(true)}>📝 Take Assessment</button>
                  <button className="btn-outline" onClick={handleBookSession}>{auth?.role ? '📅 Book Counselor' : '🔒 Login to Book'}</button>
                </div>
              </>
            ) : (
              /* ASSESSMENT MODE */
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{selected.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)' }}>{selected.title} – Assessment</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Answer the questions below to get your grade</p>
                  </div>
                </div>

                {!grade ? (
                  <>
                    {selected.assessment.questions.map((q, i) => (
                      <div key={i} style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>Q{i + 1}. {q}</label>
                        <textarea
                          value={answers[i] || ''}
                          onChange={e => setAnswers({ ...answers, [i]: e.target.value })}
                          placeholder="Write your answer here..."
                          rows="3"
                          style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                        />
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-primary" onClick={handleAssessmentSubmit}>Submit & Get Grade</button>
                      <button className="btn-outline" onClick={() => setAssessmentMode(false)}>← Back</button>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '5rem', fontWeight: '900', color: grade.g === 'A+' || grade.g === 'A' ? 'var(--teal-light)' : grade.g === 'B' ? 'var(--gold)' : 'var(--coral)', fontFamily: 'var(--font-display)' }}>{grade.g}</div>
                    <p style={{ color: 'var(--muted)', margin: '10px 0 20px' }}>Score: {grade.correct}/{grade.total} ({grade.pct}%)</p>
                    <div style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
                      <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
                        {grade.pct >= 75 ? '🎉 Excellent! You have a strong foundation in this field.' : grade.pct >= 45 ? '📚 Good effort! Keep studying to improve your understanding.' : '💡 Keep learning! Speak to a counselor for a study plan.'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button className="btn-outline" onClick={() => { setGrade(null); setAnswers({}) }}>Retake</button>
                      <button className="btn-primary" onClick={handleBookSession}>{auth?.role ? 'Book a Counselor' : 'Login to Book Counselor'}</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  eyebrow: { fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--teal-light)', textTransform: 'uppercase', marginBottom: '12px' },
  filterRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' },
  search: { flex: '1', minWidth: '220px', background: 'rgba(9,24,40,0.8)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none' },
  select: { background: 'rgba(9,24,40,0.9)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer' },
  cardTitle: { fontSize: '1.05rem', fontWeight: '600', color: 'var(--white)', fontFamily: 'var(--font-body)', marginBottom: '2px' },
  cardDesc: { color: 'var(--muted)', fontSize: '0.87rem', lineHeight: '1.6', marginBottom: '16px' },
  cardMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' },
  skillsRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' },
  popularBadge: { position: 'absolute', top: '12px', right: '12px', fontSize: '0.72rem', color: 'var(--gold)', background: 'rgba(245,158,11,0.12)', padding: '3px 10px', borderRadius: '10px', fontWeight: '600' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modal: { background: '#091828', border: '1px solid rgba(13,148,136,0.25)', borderRadius: '16px', padding: '40px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--muted)', padding: '6px 10px', cursor: 'pointer' },
  modalGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', background: 'rgba(9,24,40,0.6)', borderRadius: '10px', padding: '20px', marginBottom: '24px' },
  modalStat: { textAlign: 'center' },
}
