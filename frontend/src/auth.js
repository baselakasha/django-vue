import axios from './axios'

import { setAuthTokens, clearAuthTokens, getAccessToken } from 'axios-jwt'

async function login(user) {
  const response = await axios.post('/token/', user)
  // save tokens to storage
  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh
  })
  return response
}

function register(user) {
  return axios.post('/register/', user)
}

function logout() {
  clearAuthTokens()
}

function getUser() {
  return axios.get('/user/')
}

export { login, register, logout, getUser }
