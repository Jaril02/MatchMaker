import { useMemo } from 'react'

export default function ProfileCard({ profile }) {
  const meta = useMemo(() => {
    if (!profile) return null
    const name = profile.name || profile.username || 'Unknown'
    const age = profile.age ?? profile.profileAge
    const gender = profile.gender || profile.profileGender
    const interests = profile.interests || profile.profileInterests

    return {
      name,
      age: age === 0 ? 0 : age,
      gender,
      interests: Array.isArray(interests)
        ? interests
        : typeof interests === 'string'
          ? interests.split(',')
          : [],
    }
  }, [profile])

  if (!meta) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-slate-200 shadow-soft-glow backdrop-blur-md">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="group rounded-2xl border border-white/5 bg-white/5 p-4 shadow-soft-glow transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-glow-secondary backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-50">{meta.name}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span>
              {meta.age !== undefined && meta.age !== null && meta.age !== '' ? `${meta.age} yrs` : 'Age hidden'}
            </span>
            {meta.gender ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-200">
                {meta.gender}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-sm font-semibold text-slate-100">
          {meta.name?.slice(0, 1)?.toUpperCase()}
        </div>
      </div>

      {meta.interests && meta.interests.length > 0 ? (
        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Interests</div>
          {(() => {
            const normalized = meta.interests
              .map((x) => (typeof x === 'string' ? x.trim() : ''))
              .filter(Boolean)
            const shown = normalized.slice(0, 4)
            const extra = normalized.length - shown.length

            return (
              <div className="mt-2 flex flex-wrap gap-2">
                {shown.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 transition group-hover:border-white/20"
                  >
                    {tag}
                  </span>
                ))}
                {extra > 0 ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    +{extra} more
                  </span>
                ) : null}
              </div>
            )
          })()}
        </div>
      ) : (
        <div className="mt-4 text-sm text-slate-400">No interests listed yet.</div>
      )}
    </div>
  )
}

