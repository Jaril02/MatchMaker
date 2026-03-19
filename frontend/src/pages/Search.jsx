import { useEffect, useMemo, useState } from 'react'

import { searchProfiles } from '../services/api.js'
import ProfileCard from '../components/ProfileCard.jsx'

export default function Search() {
  const [gender, setGender] = useState('Female')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState([])

  const genderOptions = useMemo(() => ['Any', 'Female', 'Male'], [])

  const fallback = useMemo(
    () => [
      { name: 'Ava', age: 24, gender: 'Female', interests: ['Music', 'Travel', 'Food'] },
      { name: 'Noah', age: 27, gender: 'Male', interests: ['Fitness', 'Gaming', 'Art'] },
      { name: 'Sophia', age: 22, gender: 'Female', interests: ['Movies', 'Books', 'Art'] },
    ],
    [],
  )

  const handleSearch = async () => {
    setError('')
    setLoading(true)

    try {
      const genderQuery = gender === 'Any' ? '' : gender
      const res = await searchProfiles(genderQuery)
      console.log("Api data:",res)
      const list = res?.result || res?.profiles || res || []
      setResult(Array.isArray(list) ? list : fallback)
    } catch (e) {
      setError(e?.message || 'Search failed')
      setResult(fallback)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial load keeps the page useful even if the backend is down.
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Search profiles</h1>
          <p className="mt-2 text-sm text-slate-300">Filter by gender and browse possible matches.</p>
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            {genderOptions.map((g) => {
              const active = gender === g
              return (
                <button
                  key={g}
                  onClick={() => setGender(g)}
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

          <button
            onClick={handleSearch}
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 px-4 py-2 text-sm font-semibold text-white shadow-glow-primary transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 disabled:opacity-60 disabled:active:scale-100 sm:w-auto"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-red-200">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft-glow">
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-white/10" />
              <div className="mt-5 h-6 w-full animate-pulse rounded bg-white/10" />
            </div>
          ))
        ) : result && result.length > 0 ? (
          result.slice(0, 12).map((p, idx) => <ProfileCard key={p?.id || p?.email || idx} profile={p} />)
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300 sm:col-span-2 lg:col-span-3">
            No results yet. Try another gender filter or refresh.
          </div>
        )}
      </div>
    </div>
  )
}

