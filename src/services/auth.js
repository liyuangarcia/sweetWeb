// src/services/auth.js
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'

const API_URL = 'http://localhost:8000/api/auth'

export default {
  async login(credentials) {
    try {
      const response = await api.post(`${API_URL}/login/`, credentials)

      if (response.data) {
        const { user, access, refresh } = response.data

        // Guardar tokens y user en localStorage
        LocalStorage.set('access_token', access)
        LocalStorage.set('refresh_token', refresh)
        LocalStorage.set('user', JSON.stringify(user))

        // Configurar header por defecto para axios
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`

        return user
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        'Error en el login'
      throw new Error(errorMessage)
    }
  },

  async register(userData) {
    try {
      const response = await api.post(`${API_URL}/register/`, userData)

      if (response.data) {
        const { user, access, refresh } = response.data

        LocalStorage.set('access_token', access)
        LocalStorage.set('refresh_token', refresh)
        LocalStorage.set('user', JSON.stringify(user))

        api.defaults.headers.common['Authorization'] = `Bearer ${access}`

        return user
      }
    } catch (error) {
      const errorData = error.response?.data
      let errorMessage = 'Error en el registro'

      if (errorData) {
        // Manejar errores de validación de Django
        const errors = Object.values(errorData).flat()
        errorMessage = errors.join(', ')
      }

      throw new Error(errorMessage)
    }
  },

  async logout() {
    try {
      await api.post(`${API_URL}/logout/`)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Limpiar localStorage
      LocalStorage.remove('access_token')
      LocalStorage.remove('refresh_token')
      LocalStorage.remove('user')
      delete api.defaults.headers.common['Authorization']
    }
  },

  async refreshToken() {
    try {
      const refresh = LocalStorage.getItem('refresh_token')
      if (!refresh) throw new Error('No refresh token')

      const response = await api.post(`${API_URL}/token/refresh/`, {
        refresh: refresh,
      })

      const newAccess = response.data.access
      LocalStorage.set('access_token', newAccess)
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

      return newAccess
    } catch (error) {
      this.logout()
      throw error
    }
  },

  isAuthenticated() {
    return !!LocalStorage.getItem('access_token')
  },

  getUser() {
    const userStr = LocalStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getToken() {
    return LocalStorage.getItem('access_token')
  },
}
