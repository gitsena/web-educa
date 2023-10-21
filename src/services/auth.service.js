import axios from 'axios'

const API_URL = 'https://educaback.hopto.org/'

const signup = (data) => {
  return axios
    .post(API_URL + 'cadastro', data)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const login = async (data) => {
  const response = await axios.post(API_URL + 'auth', data)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser
}

export default authService
