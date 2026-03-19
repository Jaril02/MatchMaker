import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { searchProfiles } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import MatchCard from '../components/MatchCard.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [preferredGender, setPreferredGender] = useState('Female')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [matches, setMatches] = useState([])

  const genderOptions = useMemo(() => ['Any', 'Female', 'Male'], [])

  const fallbackMatches = useMemo(
    () => [
      { id: '1', name: 'Mia', age: 23, gender: 'Female', interests: ['Hiking', 'Coffee', 'Photography'] },
      { id: '2', name: 'Ethan', age: 26, gender: 'Male', interests: ['Design', 'Fitness', 'Music'] },
      { id: '3', name: 'Zoe', age: 25, gender: 'Female', interests: ['Dancing', 'Travel', 'Movies'] },
      { id: '4', name: 'Liam', age: 28, gender: 'Male', interests: ['Tech', 'Gaming', 'Cooking'] },
    ],
    [],
  )

  const loadMatches = async (genderValue = preferredGender) => {
    const genderQuery = genderValue === 'Any' ? '' : genderValue
    setError('')
    setLoading(true)

    try {
      const res = await searchProfiles(genderQuery)
      console.log("API data:",res)
      const list = res?.result || res?.profiles || res || []
      setMatches(Array.isArray(list) ? list : fallbackMatches)
    } catch (e) {
      setError(e?.message || 'Could not load matches')
      setMatches(fallbackMatches)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    loadMatches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-glow-primary backdrop-blur-xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/30 blur-2xl" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-fuchsia-600/30 blur-2xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Find your next match</h1>
            <p className="mt-2 text-sm text-slate-300">
              Adjust your preferences and explore profiles with a modern, fast UI.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/search')}
                className="rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 px-4 py-2 text-sm font-semibold text-white shadow-glow-primary transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95"
              >
                Open Search
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-white/10 active:scale-95"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-sm">
            <label className="block text-sm text-slate-300">Looking for</label>

            <div className="mt-2 flex flex-wrap gap-2">
              {genderOptions.map((g) => {
                const active = preferredGender === g
                return (
                  <button
                    key={g}
                    onClick={() => setPreferredGender(g)}
                    className={[
                      'rounded-full border px-3 py-1.5 text-sm font-semibold transition',
                      active
                        ? 'border-white/20 bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 text-white shadow-glow-secondary'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10',
                    ].join(' ')}
                  >
                    {g}
                  </button>
                )
              })}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                disabled={loading}
                onClick={() => loadMatches(preferredGender)}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 px-4 py-2 text-sm font-semibold text-white shadow-glow-primary transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 disabled:opacity-60 disabled:active:scale-100"
              >
                {loading ? 'Updating...' : 'Find matches'}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">Tip: start with “Female”, then try “Male”.</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-red-200">{error}</div>}

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard profile={user || { name: 'Your Profile', age: '', gender: '', interests: [] }} />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-wide text-slate-400">Suggested Matches</div>
              <div className="mt-1 text-lg font-semibold text-slate-50">
                {loading ? 'Loading...' : `For ${preferredGender === 'Any' ? 'Everyone' : preferredGender}`}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft-glow"
                >
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                  <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="mt-5 h-7 w-full animate-pulse rounded bg-white/10" />
                </div>
              ))
            ) : matches && matches.length > 0 ? (
              matches.slice(0, 8).map((m, idx) => <MatchCard key={m?.id || m?.email || idx} match={m} />)
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300 sm:col-span-2">
                No matches yet. Update your preference and try again.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

