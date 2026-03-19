const API_url = import.meta.env.VITE_API_URL || 'http://localhost:8888'

async function readJsonSafe(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { message: text || res.statusText }
  }
}


async function request(path, { method = 'GET', token, body } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_url}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await readJsonSafe(res)
  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`
    throw new Error(msg)
  }

  return data
}

export const registerUser = async (data) => {
  return request('/register', { method: 'POST', body: data })
}

export const loginUser = async (data) => {
  return request('/login', { method: 'POST', body: data })
}

// Backend contract (current version): GET /search?gender=<gender>
export const searchProfiles = async (gender = '') => {
  const params = new URLSearchParams()
  if (gender) params.set('gender', gender)
  const qs = params.toString()
  return request(`/search${qs ? `?${qs}` : ''}`)
}