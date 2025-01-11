import { defineStore } from 'pinia'

export const useLoginState = defineStore('login', {
  state: () => ({
    loggedIn: false,
    user: {}
  }),
  setters: {
    setLoggedIn(loggedIn) {
      this.loggedIn = loggedIn
    },
    setUser(user) {
      this.user = user
    }
  },
  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getUser: (state) => state.user
  }
})
