const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
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
  $('#change-password').show()
}

const onChangePassword = (event) => {
  console.log("my event listeners working")
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

module.exports = {
  onSignIn,
  onSignUp,
  onSignOut,
  onChangePassword,
  onShowChangePasswordForm
}
