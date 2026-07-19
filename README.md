# AI Resume Analyzer — Frontend

A modern, AI-powered resume analysis web application. This frontend allows users to upload their resume, parses it against a target job description, and returns a simulated ATS (Applicant Tracking System) score along with actionable insights on skills, education, and experience gaps.

## 🚀 Tech Stack

- **Framework**: React 18 (Functional components + hooks)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 (Custom design system with dark/light/system theme support)
- **API Client**: Axios (Centralized under `src/services/`)
- **State Management**: React Context API (`AuthContext`, `CreditContext`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📂 Folder Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable React components
│   ├── common/      # Generic UI (Button, Input, Modal, Loader, ThemeToggle)
│   ├── landing/     # Public landing page sections (Hero, FeatureCard)
│   ├── auth/        # Login/Signup forms and layouts
│   ├── dashboard/   # Authenticated layouts (Sidebar, CreditsWidget, History views)
│   └── atsTool/     # Core analysis tool (Uploader, ScoreGauge, Insight lists)
├── context/         # Global state providers
│   ├── AuthContext.jsx   # Manages JWT authentication and user session
│   ├── CreditContext.jsx # Manages available analysis credits
│   └── ThemeContext.jsx  # Manages light/dark/system theme toggling
├── hooks/           # Custom React hooks
│   ├── useAuth.js
│   ├── useCredits.js
│   └── useResumeAnalysis.js
├── pages/           # Route-level page components
├── routes/          # Application routing definitions
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/        # API interaction layer
│   ├── api.js            # Axios instance with auth interceptors
│   ├── authService.js
│   ├── resumeService.js
│   └── historyService.js
├── App.jsx          # Root component wiring providers and routes
└── main.jsx         # Application entry point
```

## 🔌 API Contract (Expected Backend Shape)

The frontend `services/` layer is currently running with mock data. It is built to interface with the following backend endpoints:

| Method | Endpoint | Payload | Returns | Description |
|---|---|---|---|---|
| POST | `/api/auth/signup` | `{ name, email, password }` | `{ user, token }` | Create a new user |
| POST | `/api/auth/login` | `{ email, password }` | `{ user, token }` | Authenticate and retrieve JWT |
| GET | `/api/user/credits` | *None* (Requires JWT) | `{ remaining, resetDate }` | Get current credit balance |
| POST | `/api/resume/analyze` | `multipart/form-data` (file) | `{ atsScore, skills: { gaps, strengths }, education: [], experience: [] }` | Run AI analysis (costs credits) |
| GET | `/api/history` | *None* (Requires JWT) | `[{ id, date, filename, atsScore, creditsUsed }]` | List past analyses |
| GET | `/api/history/:id`| *None* (Requires JWT) | Full analysis object (same as `/analyze`) | Get details of a past run |

*Note: The frontend expects the backend to manage credit deduction internally upon successful `/api/resume/analyze` calls.*

## 🎨 Theme System

The application uses a custom design system built on top of Tailwind CSS.
- Themes are controlled via the `ThemeContext.jsx` and toggleable via `ThemeToggle.jsx`.
- It supports **Light**, **Dark**, and **System** (reads `prefers-color-scheme`).
- The theme preference is persisted to `localStorage` under the `theme` key.
- Styling is implemented using standard Tailwind utility classes alongside semantic CSS variables defined in `index.css`.

## 🔐 Auth Flow

1. User submits login/signup form.
2. `AuthContext` calls the respective service (`authService.js`).
3. Service calls the API and returns a JWT `token` and `user` object.
4. `AuthContext` persists the token and user to `localStorage`.
5. The `api.js` Axios instance intercepts all subsequent requests and attaches the token via the `Authorization: Bearer <token>` header.
6. `ProtectedRoute` wrapper ensures authenticated access to `/dashboard/*` routes.

## 🛠️ Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root directory (or use the existing one):
   ```env
   VITE_API_URL=http://localhost:5000/api/
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

*Note: The current implementation includes mock data in the `services/` files to allow full UI development without a working backend. To wire up the real backend, remove `const MOCK_MODE = true` from the service files.*
