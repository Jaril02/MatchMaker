import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { register, loading, error: authError } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    interests: '',
  })

  const [localError, setLocalError] = useState('')

  const handleChange = (e) => {
    setLocalError('')
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    try {
      await register({
        ...form,
        age: form.age ? Number(form.age) : undefined,
      })
      navigate('/dashboard')
    } catch (e2) {
      setLocalError(e2?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Create account</h1>
        <p className="mt-2 text-sm text-slate-300">Get matched with people you will actually enjoy talking to.</p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 shadow-glow-primary backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <form className="relative z-10 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Age</span>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="number"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
                placeholder="e.g. 24"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Gender</span>
              <input
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
                placeholder="e.g. Female"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Interests</span>
              <input
                name="interests"
                value={form.interests}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
                placeholder="comma,separated,values"
              />
            </label>
          </div>

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
            {loading ? 'Creating...' : 'Register'}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-slate-200 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

