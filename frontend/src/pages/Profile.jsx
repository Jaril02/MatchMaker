import { useMemo, useState } from 'react'

import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user } = useAuth()

  const [form, setForm] = useState(() => ({
    name: user?.name || user?.username || '',
    age: user?.age ?? '',
    gender: user?.gender || '',
    interests: Array.isArray(user?.interests)
      ? user.interests.join(', ')
      : typeof user?.interests === 'string'
        ? user.interests
        : '',
  }))

  const [saved, setSaved] = useState(false)

  const interestsList = useMemo(() => {
    const raw = typeof form.interests === 'string' ? form.interests : ''
    return raw
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 10)
  }, [form.interests])

  const metaLine = useMemo(() => {
    const name = form.name || 'Your Name'
    const age = form.age !== '' && form.age !== null ? `${form.age} yrs` : 'Age hidden'
    const gender = form.gender ? `• ${form.gender}` : ''
    return `${name} • ${age} ${gender}`
  }, [form])

  const onChange = (e) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSave = (e) => {
    e.preventDefault()
    // No backend profile update endpoint is assumed yet.
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Your profile</h1>
        <p className="mt-2 text-sm text-slate-300">Update your preferences to improve match quality.</p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-glow-primary backdrop-blur-xl">
        <div className="mb-5 rounded-2xl border border-white/5 bg-white/5 p-4 shadow-soft-glow backdrop-blur-md">
          <div className="text-sm font-medium uppercase tracking-wide text-slate-400">Summary</div>
          <div className="mt-2 text-slate-50">{metaLine}</div>

          <div className="mt-3">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Interests</div>
            {interestsList.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {interestsList.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-sm text-slate-400">No interests set yet.</div>
            )}
          </div>

          {saved ? (
            <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              Saved locally. Hook up backend update when ready.
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-400">Edits are currently UI-only.</div>
          )}
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSave}>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-300">Age</span>
            <input
              name="age"
              value={form.age}
              onChange={onChange}
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="e.g. 24"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-slate-300">Gender</span>
            <input
              name="gender"
              value={form.gender}
              onChange={onChange}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="e.g. Female"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-slate-300">Interests</span>
            <input
              name="interests"
              value={form.interests}
              onChange={onChange}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition-all focus:border-violet-500/60 focus:bg-black/40 focus:ring-4 focus:ring-violet-500/20 backdrop-blur-sm"
              placeholder="comma,separated,values"
            />
          </label>

          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 px-4 py-2.5 text-sm font-semibold text-white shadow-glow-primary transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95"
            >
              Save
            </button>
            <div className="text-xs text-slate-400">Next: connect an API like `PUT /profile`.</div>
          </div>
        </form>
      </section>
    </div>
  )
}

