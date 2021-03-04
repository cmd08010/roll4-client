const store = require('../store')

const signInSuccess = (response) => {
  console.log(response)
  store.user = response.user
  $('#message').text(`Success! ${response.user.userName} is signed in.`)
  $('#sign-in').trigger('reset')
  $('.no-user').hide()
  $('.user-signed-in').show()
  $('.campaigns').show()
}

const signInFailure = (response) => {
  console.log(response)
  $('#message').text('Failure')
  $('#sign-in').trigger('reset')
}

const signUpSuccess = (response) => {
  store.user = response.user
  console.log(response)
  $('#message').text(`Success! ${response.user.userName} is signed up and signed in'`)
  $('#sign-in').trigger('reset')
  $('.no-user').hide()
  $('.user-signed-in').show()
  $('.campaigns').show()
}

const signUpFailure = (response) => {
  console.log(response)
  $('#message').text('Failure')
  $('#sign-in').trigger('reset')
}


module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure
}
