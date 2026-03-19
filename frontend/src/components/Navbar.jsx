import { NavLink, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { to: '/dashboard', label: 'Dashboard', auth: true },
      { to: '/search', label: 'Search', auth: true },
      { to: '/profile', label: 'Profile', auth: true },
    ],
    [],
  )

  const onLogout = () => {
    logout()
    setOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 font-semibold tracking-tight text-slate-50"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 shadow-soft-glow">
            💕
          </span>
          <span className="hidden sm:inline">MatchMaker</span>
        </NavLink>

        <button
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems
            .filter((x) => (x.auth ? isAuthenticated : true))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm transition-all duration-300 active:scale-95',
                    isActive
                      ? 'bg-white/10 text-white shadow-soft-glow'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-sm font-semibold text-slate-100 shadow-soft-glow">
                  {(user?.name || user?.username || 'U').slice(0, 1).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-medium text-slate-50">{user?.name || user?.username || 'Account'}</div>
                  <div className="text-xs text-slate-400">Signed in</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-slate-200 transition-all hover:bg-white/10 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm transition-all duration-300 active:scale-95',
                    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  [
                    'rounded-xl bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 px-3 py-2 text-sm text-white transition-all duration-300 active:scale-95',
                    isActive ? 'shadow-glow-primary border border-violet-500/30' : 'hover:from-violet-600/60 hover:to-fuchsia-600/60 border border-transparent hover:border-violet-500/20',
                  ].join(' ')
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {open ? (
        <div className="sm:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="flex flex-col gap-2">
              {navItems
                .filter((x) => (x.auth ? isAuthenticated : true))
                .map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition',
                        isActive ? 'bg-white/10 shadow-soft-glow' : 'hover:bg-white/10',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-slate-100 hover:bg-white/10"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 px-3 py-2 text-center text-sm text-slate-50 hover:from-indigo-500/40 hover:to-fuchsia-500/40"
                  >
                    Register
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm font-semibold text-slate-100 shadow-soft-glow">
                        {(user?.name || user?.username || 'U').slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-50">{user?.name || user?.username || 'Account'}</div>
                        <div className="text-xs text-slate-400">Signed in</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

