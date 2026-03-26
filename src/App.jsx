import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CareerPaths from './pages/CareerPaths'
import Counselors from './pages/Counselors'
import Schedule from './pages/Schedule'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLogin from './pages/AdminLogin'

export const counselorsData = [
  { id: 1, name: 'Dr. Kavitha Rao', title: 'Senior Career Counselor', specialization: 'Technology', exp: '12 years', rating: 4.9, sessions: 340, avatar: 'KR', bio: 'Former Google recruiter turned career coach. Specializes in tech industry placement, coding interview prep, and helping CS/B.Tech students land their dream roles.', slots: ['Mon 10AM', 'Wed 2PM', 'Fri 11AM'], price: 'Free', badge: 'badge-teal', education: 'M.Tech – IIT Delhi | B.Tech – NIT Trichy', languages: 'English, Telugu, Hindi', reviews: [{ student: 'Arjun S.', rating: 5, text: 'Amazing guidance for placement prep!' }, { student: 'Priya N.', rating: 5, text: 'Helped me get into my dream company.' }] },
  { id: 2, name: 'Prof. Rajesh Kumar', title: 'MBA & Business Coach', specialization: 'Business', exp: '18 years', rating: 4.8, sessions: 520, avatar: 'RK', bio: 'IIM alumnus and visiting faculty. Expert in MBA admissions, entrepreneurship, finance careers, and business strategy.', slots: ['Tue 3PM', 'Thu 10AM', 'Sat 9AM'], price: 'Free', badge: 'badge-gold', education: 'MBA – IIM Ahmedabad | B.Com – Delhi University', languages: 'English, Hindi', reviews: [{ student: 'Karan M.', rating: 5, text: 'Best MBA counselor on the platform!' }] },
  { id: 3, name: 'Ms. Ananya Pillai', title: 'Creative Careers Mentor', specialization: 'Creative Arts', exp: '9 years', rating: 4.7, sessions: 190, avatar: 'AP', bio: 'Award-winning designer with experience at Ogilvy and Publicis. Guides students into design, advertising, media, and creative industries.', slots: ['Mon 2PM', 'Wed 11AM', 'Fri 3PM'], price: 'Free', badge: 'badge-teal', education: 'BFA – NID Ahmedabad', languages: 'English, Malayalam', reviews: [{ student: 'Rohan P.', rating: 5, text: 'Really understood my creative aspirations.' }] },
  { id: 4, name: 'Dr. Sanjay Mehta', title: 'Healthcare Careers Expert', specialization: 'Healthcare', exp: '15 years', rating: 4.9, sessions: 280, avatar: 'SM', bio: 'AIIMS physician turned academic counselor. Helps students navigate NEET, medical specializations, and allied healthcare career paths.', slots: ['Tue 11AM', 'Thu 4PM', 'Sun 10AM'], price: 'Free', badge: 'badge-purple', education: 'MD – AIIMS Delhi | MBBS – JIPMER', languages: 'English, Hindi', reviews: [{ student: 'Meera K.', rating: 5, text: 'Cleared all my NEET doubts.' }] },
  { id: 5, name: 'Ms. Deepa Nair', title: 'STEM & Research Coach', specialization: 'Technology', exp: '11 years', rating: 4.8, sessions: 225, avatar: 'DN', bio: 'PhD holder from IIT Madras. Specializes in research careers, data science, and AI/ML opportunities for B.Tech/engineering students.', slots: ['Mon 4PM', 'Wed 9AM', 'Fri 2PM'], price: 'Free', badge: 'badge-teal', education: 'PhD CS – IIT Madras | B.Tech – NITK', languages: 'English, Tamil, Malayalam', reviews: [{ student: 'Vikram S.', rating: 5, text: 'Best guidance on AI/ML career paths!' }] },
  { id: 6, name: 'Mr. Vikram Singh', title: 'Finance & CA Mentor', specialization: 'Business', exp: '14 years', rating: 4.6, sessions: 310, avatar: 'VS', bio: 'Chartered Accountant and ex-Deloitte consultant. Guidance on CA, CFA, investment banking, and financial planning careers.', slots: ['Tue 9AM', 'Thu 2PM', 'Sat 11AM'], price: 'Free', badge: 'badge-gold', education: 'CA – ICAI | B.Com – Bombay University', languages: 'English, Hindi, Punjabi', reviews: [{ student: 'Aditi P.', rating: 5, text: 'Really helpful for CA exam strategy!' }] },
  { id: 7, name: 'Mr. Arun Teja', title: 'B.Tech & Engineering Mentor', specialization: 'Engineering', exp: '10 years', rating: 4.8, sessions: 180, avatar: 'AT', bio: 'Senior engineer at TCS with B.Tech from JNTUH. Guides B.Tech students through placements, core engineering roles, and higher studies (GATE/GRE). Expert in all B.Tech specializations.', slots: ['Mon 6PM', 'Wed 5PM', 'Sat 10AM'], price: 'Free', badge: 'badge-teal', education: 'B.Tech – JNTUH | M.Tech – Osmania University', languages: 'English, Telugu, Hindi', reviews: [{ student: 'Ravi K.', rating: 5, text: 'Best mentor for B.Tech placements!' }, { student: 'Sai L.', rating: 5, text: 'Guided me perfectly for GATE.' }] },
]

export default function App() {
  const [auth, setAuth] = useState({ role: null, email: null, name: null })
  const [users, setUsers] = useState([])
  const [appointments, setAppointments] = useState([])

  const handleLogin = (role, email, name) => setAuth({ role, email, name })
  const handleLogout = () => setAuth({ role: null, email: null, name: null })
  const handleSignup = (name, email, password) => setUsers(prev => [...prev, { name, email, password }])
  const addAppointment = (appt) => setAppointments(prev => [...prev, { ...appt, id: Date.now(), userId: auth.email, userName: auth.name, status: 'pending' }])
  const addFeedback = (apptId, rating, comment) => setAppointments(prev => prev.map(a => a.id === apptId ? { ...a, feedback: { rating, comment } } : a))

  return (
    <BrowserRouter>
      <Navbar auth={auth} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<CareerPaths auth={auth} />} />
          <Route path="/counselors" element={<Counselors auth={auth} />} />
          <Route path="/schedule" element={auth.role === 'user' ? <Schedule auth={auth} appointments={appointments} addAppointment={addAppointment} /> : <Navigate to="/login" />} />
          <Route path="/login" element={auth.role ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} users={users} />} />
          <Route path="/signup" element={auth.role ? <Navigate to="/dashboard" /> : <Signup onSignup={handleSignup} onLogin={handleLogin} users={users} />} />
          <Route path="/admin-login" element={auth.role === 'admin' ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleLogin} />} />
          <Route path="/dashboard" element={auth.role === 'user' ? <UserDashboard auth={auth} appointments={appointments} addFeedback={addFeedback} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={auth.role === 'admin' ? <AdminDashboard appointments={appointments} users={users} /> : <Navigate to="/admin-login" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
