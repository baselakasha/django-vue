import { defineStore } from 'pinia'
import axios from '../axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    theRefreshToken: localStorage.getItem('theRefreshToken') || '',
    user: JSON.parse(localStorage.getItem('user')) || ''
  }),
  actions: {
    async login(user) {
      const response = await axios.post('/token/', user)
      const { access, refresh } = response.data

      localStorage.setItem('theRefreshToken', refresh)
      localStorage.setItem('token', access)
      this.token = access
      this.theRefreshToken = refresh

      let user_data = await axios.get('/user/')
      user_data = user_data.data

      localStorage.setItem('user', JSON.stringify(user_data))
      this.user = user_data
    },
    async register(user) {
      await axios.post('/register/', user)
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('theRefreshToken')
      localStorage.removeItem('user')
      this.token = ''
      this.theRefreshToken = ''
      this.user = {}
    },
    async refreshToken() {
      try {
        const response = await axios.post('/token/refresh/', { refresh: this.theRefreshToken })
        const { access } = response.data
        localStorage.setItem('token', access)

        this.token = access
      } catch (error) {
        console.error('Failed to refresh token', error)
        this.logout()
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  }
})
