const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('./../store')

const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onShowHome = () => {
  ui.showHome()
}

const onSignUp = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signUp(data)
    .then(response => {
      return api.signIn(data)
    })
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignOut = (event) => {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onShowChangePasswordForm = (event) => {
  $('#change-password').toggle()
  $('#all-sessions').toggle()
  $('#all-campaigns').toggle()
}

const onChangePassword = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onShowAboutUs = () => {
  $('#message').toggle()
  $('#message').html(`<h1>Welcome!</h1>
    <br>This is the Roll4Iinitiative application.
    <br> Get started by creating an account by selecting the sign up button.
  You can create an account and add new campaigns and entries for your campaigns to track their progress.
  <br>
  Stay tuned for more updates!
  <br>
  Check out our API!
  <br>
  <a href="https://github.com/cmd08010/roll4-api">Roll4-API</a>
  `).addClass('about-us')
  if (store.user) {
    $(".user-signed-in").toggle()
  } else {
    $('.no-user').toggle()
  }
}

module.exports = {
  onSignIn,
  onSignUp,
  onSignOut,
  onChangePassword,
  onShowHome,
  onShowChangePasswordForm,
  onShowAboutUs
}
