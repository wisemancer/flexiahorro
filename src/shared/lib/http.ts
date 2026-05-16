import axios from 'axios'
import { logError } from './logger'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('auth_token')
  const tenantId = sessionStorage.getItem('tenant_id')

  if (token) config.headers['Authorization'] = `Bearer ${token}`
  if (tenantId) config.headers['X-Tenant-Id'] = tenantId

  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    logError('HTTP request failed', error)
    return Promise.reject(error)
  }
)
