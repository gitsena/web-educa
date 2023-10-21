import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://educaback.hopto.org/'

const registerStudent = (data) => {
  return axios.post(API_URL + 'api/usuarios/estudantes/', data)
}

const registerTeacher = (data) => {
  return axios.post(API_URL + 'api/usuarios/professores/', data)
}

const getUser = () => {
  return axios.get(API_URL + 'auth/usuario-secao', {
    headers: authHeader()
  })
}

const getAllContent = () => {
  return axios.get(API_URL + 'api/conteudos', { headers: authHeader() })
}

const getUserContent = () => {
  return axios.get(API_URL + 'api/conteudos/usuario-secao', {
    headers: authHeader()
  })
}

const registerContent = (data) => {
  return axios.post(API_URL + 'api/conteudos', data, { headers: authHeader() })
}

const registerTopic = (data) => {
  return axios.post(API_URL + 'api/topicos', data, { headers: authHeader() })
}

const registerRating = (data) => {
  return axios.post(API_URL + 'api/conteudos/avaliacoes', data, { headers: authHeader() })
}

const getRatings = () => {
  return axios.get(API_URL + 'api/conteudos/avaliacoes/total-por-avaliacao/usuario-secao', { headers: authHeader() })
}

const getUserRatings = () => {
  return axios.get(API_URL + 'api/conteudos/avaliacoes/usuario-secao', {
    headers: authHeader()
  })
}

const updateContent = (id, data) => {
  return axios.put(API_URL + `api/conteudos/${id}`, data, {
    headers: authHeader()
  })
}

const updateTopic = (id, data) => {
  return axios.put(API_URL + `api/topicos/${id}`, data, {
    headers: authHeader()
  })
}

const deleteContent = (id) => {
  return axios.delete(API_URL + `api/conteudos/${id}`, {
    headers: authHeader()
  })
}

const getHability = () => {
  return axios.get(API_URL + 'api/habilidades', { headers: authHeader() })
}

const getTopic = () => {
  return axios.get(API_URL + 'api/topicos/usuario-secao', { headers: authHeader() })
}

const getAllTopics = () => {
  return axios.get(API_URL + 'api/topicos', { headers: authHeader() })
}

const deleteTopic = (id) => {
  return axios.delete(API_URL + `api/topicos/${id}`, {
    headers: authHeader()
  })
}

const deleteAnswer = (id) => {
  return axios.delete(API_URL + `api/topicos/respostas/${id}`, {
    headers: authHeader()
  })
}

const updateAnswer = (id, data) => {
  return axios.put(API_URL + `api/topicos/respostas/${id}`, data, {
    headers: authHeader()
  })
}

const registerAnswer = (data) => {
  return axios.post(API_URL + 'api/topicos/respostas', data, { headers: authHeader() })
}

const postService = {
  getUser,
  getAllContent,
  getUserContent,
  registerContent,
  updateContent,
  deleteContent,
  getHability,
  getTopic,
  registerTopic,
  updateTopic,
  deleteTopic,
  registerRating,
  getAllTopics,
  registerStudent,
  registerTeacher,
  registerAnswer,
  deleteAnswer,
  updateAnswer,
  getUserRatings,
  getRatings
}

export default postService
