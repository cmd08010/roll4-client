
const config = require('../config')
const store = require('../store')

const createSession = (id, data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/campaigns/${id}/sessions`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

const getAllSessions = (id) => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/campaigns/${id}/sessions`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const getOneSession = (id, sessionId) => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/campaigns/${id}/sessions/${sessionId}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const deleteSession = (id, sessionId) => {
  return $.ajax({
    method: 'DELETE',
    url: `${config.apiUrl}/campaigns/${id}/sessions/${sessionId}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const updateSession = (id, sessionId, data) => {
  return $.ajax({
    method: 'PATCH',
    url: `${config.apiUrl}/campaigns/${id}/sessions/${sessionId}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

module.exports = {
  createSession,
  getAllSessions,
  getOneSession,
  deleteSession,
  updateSession
}
