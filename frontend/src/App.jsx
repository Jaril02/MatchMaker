import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import Search from './pages/Search.jsx'

function RequireAuth() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-200">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-violet-500/30">
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[100px] animate-blob transition-all duration-700" />
        <div className="absolute top-1/2 left-1/4 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[120px] animate-blob transition-all duration-700" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-72 right-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-[100px] animate-blob transition-all duration-700" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-zinc-950/60 to-zinc-950" />
      </div>

      <Navbar />
      <main className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<div className="py-20 text-center text-slate-200">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}