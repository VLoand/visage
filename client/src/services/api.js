import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // all routes will be under /api later
  withCredentials: true, // enables cookies if we use them for auth
})

// inject auth token later when JWT is ready
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
