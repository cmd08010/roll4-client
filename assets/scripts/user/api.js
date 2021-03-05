const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/sign-up`,
    data: data
  })
}

const signIn = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/sign-in`,
    data: data
  })
}

const signOut = (data) => {
  return $.ajax({
    method: 'DELETE',
    url: `${config.apiUrl}/sign-out`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: `${config.apiUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
