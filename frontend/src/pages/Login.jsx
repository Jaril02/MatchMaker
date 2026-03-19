import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error: authError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    try {
      await login({ email, password })
      setTimeout(()=>{
           navigate('/dashboard')
      },100)
     
    } catch (e2) {
      setLocalError(e2?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-300">Sign in to continue building your connections.</p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 shadow-glow-primary backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <form className="relative z-10 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {(localError || authError) && (
            <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
              {localError || authError}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 px-4 py-3 text-sm font-semibold text-white shadow-glow-primary transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 disabled:opacity-60 disabled:active:scale-100"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-slate-400">
            New here?{' '}
            <Link to="/register" className="font-medium text-slate-200 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

