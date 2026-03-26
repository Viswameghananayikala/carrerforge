# 🎓 PathWise — Career Guidance & Counseling Platform

**SAD-PS24 | Full Stack Application Development Project**

---

## 📁 Project Structure

```
career-platform/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         ← Navigation bar (fixed, all pages)
│   │   └── Footer.jsx         ← Footer with links
│   ├── pages/
│   │   ├── Home.jsx           ← Landing page with hero, features, testimonials
│   │   ├── CareerPaths.jsx    ← Browse 12+ careers with search/filter + detail modal
│   │   ├── Counselors.jsx     ← 6 counselors with profiles and booking
│   │   ├── Schedule.jsx       ← 3-step booking flow (counselor → time → details)
│   │   ├── UserDashboard.jsx  ← Student dashboard with sessions, resources, assessment
│   │   └── AdminDashboard.jsx ← Admin panel: manage users, sessions, resources, counselors
│   ├── App.jsx                ← React Router setup
│   ├── index.css              ← Global design system (Navy + Gold + Teal theme)
│   └── main.jsx               ← Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Setup & Run (Step-by-Step)

### Step 1: Install Node.js
- Download from: https://nodejs.org (choose LTS version)
- Install it, then verify: open terminal, type `node --version`

### Step 2: Set up the project
```bash
# 1. Create a new Vite React project
npm create vite@latest career-platform -- --template react
cd career-platform

# 2. Install dependencies
npm install
npm install react-router-dom
```

### Step 3: Replace files
- Delete everything inside `src/`
- Copy ALL files from this project into `src/`
- Replace `index.html` with the provided one
- Replace `vite.config.js` with the provided one

### Step 4: Run locally
```bash
npm run dev
```
Open http://localhost:5173 in your browser ✅

### Step 5: Build for deployment
```bash
npm run build
```
This creates a `dist/` folder ready for deployment.

---

## 🌐 Deployment on Vercel (FREE, Easiest)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PathWise career platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/career-platform.git
   git push -u origin main
   ```

2. Go to https://vercel.com → Sign up with GitHub

3. Click **"New Project"** → Import your GitHub repo

4. Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Click **Deploy** → You'll get a live URL like `https://career-platform.vercel.app`

---

## 📱 Pages Overview (For LinkedIn Article Screenshots)

| Page | URL | Description |
|------|-----|-------------|
| Home | / | Hero section, features, career domains, testimonials |
| Career Paths | /careers | Search/filter 12+ careers, click for detailed modal |
| Counselors | /counselors | Browse 6 expert counselors, view profiles |
| Schedule | /schedule | 3-step session booking flow |
| Student Dashboard | /dashboard | Overview, sessions, resources, assessment quiz |
| Admin Dashboard | /admin | Manage users, sessions, resources, counselors |

---

## 👥 Roles in the Project

### Admin Role:
- Manage career resources (add/edit/delete articles, guides, videos)
- Connect students with appropriate counselors
- Track user engagement and session statistics
- Approve/cancel counseling sessions
- Add/remove counselors from the platform

### User (Student) Role:
- Access career advice and resources
- Browse and filter 50+ career paths
- Schedule free counseling sessions (3-step booking)
- View upcoming and past sessions with notes
- Take career interests assessment
- Get personalized career matches

---

## 🎨 Design System

- **Primary Color**: Navy Blue (#0a1628) — professional, trustworthy
- **Accent 1**: Gold (#f4a825) — premium, achievement
- **Accent 2**: Teal (#64ffda) — tech, growth, action
- **Font Display**: Playfair Display (headings) — elegant, authoritative
- **Font Body**: DM Sans (body text) — clean, modern, readable

---

## 📝 LinkedIn Article Template

### Title:
**"PathWise: A Smart Career Guidance & Counseling Platform | SAD-PS24"**

### Structure:
1. Cover Image (screenshot of Home page)
2. Project Title: PathWise — Career Guidance & Counseling Platform
3. Team Members: [Names and IDs]
4. Section Faculty: [Faculty Name]
5. Project Description: PathWise is a full-stack web application that empowers students to make informed career decisions through expert counseling, career path exploration, and personalized resources.
6. Number of Roles: 2 (Admin, Student/User)
7. Role-wise Responsibilities: (see section above)
8. Prototype Link: [Your Figma/Canva link]
9. React Screenshots: (take 6 screenshots, one per page)
10. Deployment Link: [Your Vercel URL]

---

## 🎨 Prototype Design (Figma)

1. Go to https://www.figma.com (free account)
2. Create new design file: "PathWise Prototype"
3. Create frames for each page (use 1440×900 for desktop):
   - Frame 1: Home Page
   - Frame 2: Career Paths
   - Frame 3: Counselors
   - Frame 4: Schedule Session
   - Frame 5: Student Dashboard
   - Frame 6: Admin Dashboard
4. Screenshot each page from the live app and paste into Figma frames
5. Add arrows connecting pages (Prototype tab → drag connections)
6. Click Share → Change to "Anyone with link can view" → Copy link

---

## ✅ Review 1 Checklist

- [ ] React app running locally
- [ ] All 6 pages working with navigation
- [ ] Deployed on Vercel (get live URL)
- [ ] Figma prototype created with all 6 screens
- [ ] Figma prototype links between pages
- [ ] LinkedIn article published with all required sections
- [ ] All team members shared the LinkedIn article
- [ ] One GitHub repo link prepared
- [ ] One deployment link prepared

---

*Built with React + Vite | Deployed on Vercel*
