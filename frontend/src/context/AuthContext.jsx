import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { loginUser, registerUser } from '../services/api.js'

const AuthContext = createContext(null)

const TOKEN_KEY = 'mm_token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {

    console.log("Token:",token)
    console.log("Authenticate",isAuthenticated)
    // Only clear user data when the user logs out (token is removed).
    // This avoids wiping `user` after a successful login that sets a token.
    if (!token) setUser(null)
  }, [token])

  const isAuthenticated = Boolean(token)

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken('')
    setUser(null)
  }, [])

  const register = useCallback(async (payload) => {
    setLoading(true)
    setError('')
    try {
      const res = await registerUser(payload)

      // Tolerate different backend response shapes.
      if (res?.token) {
        localStorage.setItem(TOKEN_KEY, res.token)
        setToken(res.token)
      }

      if (res?.user) setUser(res.user)

      return res
    } catch (e) {
      setError(e?.message || 'Registration failed')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    setError('')
    try {
      const res = await loginUser({ email, password })
      console.log("LOGIN RESPONSE:", res)

      const nextToken = res?.token || res?.access_token || res?.accessToken || ''
      if (nextToken) {
        localStorage.setItem(TOKEN_KEY, nextToken)
        setToken(nextToken)
      }

      if (res?.user) setUser(res.user)

      return res
    } catch (e) {
      setError(e?.message || 'Login failed')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      setUser,
    }),
    [token, user, loading, error, isAuthenticated, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

