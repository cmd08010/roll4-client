const store = require('../store')

const signInSuccess = (response) => {
  console.log(response)
  store.user = response.user
  $('#message').text(`Success! ${response.user.userName} is signed in.`)
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#no-user-nav-bar').hide()
  $('#user-signed-in-nav').show()
  $('#about-us').prependTo($('#user-signed-in-nav')).removeClass('btn-info').addClass('btn-outline-primary')

  $('.campaigns').show()
}

const signInFailure = (response) => {
  console.log(response)
  $('#message').text('Failure')
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
}

const signUpSuccess = (response) => {
  store.user = response.user
  console.log(response)
  $('#message').text(`Success! ${response.user.userName} is signed up and signed in'`)
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('.no-user').hide()
  $('.user-signed-in').show()
  $('.campaigns').show()
}

const signUpFailure = (response) => {
  console.log(response)
  $('#message').text('Failure')
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
}

const signOutSuccess = () => {
  store.user = {}
  $('.no-user').show()
  $('.user-signed-in').hide()
  $('#message').html('')
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#no-user-nav-bar').show()
  $('#user-signed-in-nav').hide()
  $('#about-us').prependTo($('#no-user-nav-bar')).addClass('btn-info').removeClass('btn-outline-primary')
}

const signOutFailure = () => {}

const changePasswordSuccess = (response) => {
  $('#message').html('Success, youre password has been change')
  $('#change-password').trigger('reset')
}

const changePasswordFailure = (response) => {}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
