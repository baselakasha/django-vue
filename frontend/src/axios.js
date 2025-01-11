import axios from 'axios'
import { applyAuthTokenInterceptor, applyStorage } from 'axios-jwt'
import { STORAGE_KEY } from 'axios-jwt/src/StorageKey'

const BASE_URL = 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestRefresh = (refresh) => {
  // Notice that this is the global axios instance, not the apiClient!  <-- important
  return axios
    .post(`${BASE_URL}/token/refresh/`, { refresh })
    .then((response) => response.data.access)
}

applyAuthTokenInterceptor(apiClient, {
  // Notice that this uses the apiClient instance.  <-- important
  requestRefresh,
  header: 'Authorization', // header name
  headerPrefix: 'Bearer '
})
// make new storage type

applyStorage({
  set: (key, value) => {
    window.localStorage.setItem(key, value)
    if (key === STORAGE_KEY) {
      window.dispatchEvent(new Event('storage-changed'))
    }
  },
  get: (key) => {
    return window.localStorage.getItem(key)
  },
  remove: (key) => {
    window.localStorage.removeItem(key)
    if (key === STORAGE_KEY) {
      window.dispatchEvent(new Event('storage-changed'))
    }
  }
})

export default apiClient
