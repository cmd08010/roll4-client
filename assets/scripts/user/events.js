const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const utils = require('../utils')

const onSignIn = (event) => {
  const data = utils.formSubmission(event)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.errorMessaging)
}


const onSignUp = (event) => {
  const data = utils.formSubmission(event)
  api.signUp(data)
    .then(response => {
      return api.signIn(data)
    })
    .then(ui.signInSuccess)
    .catch(ui.errorMessaging)
}

const onSignOut = (event) => {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.errorMessaging)
}

const onShowChangePasswordForm = (event) => {
  ui.showChangePasswordForm()
}

const onChangePassword = (event) => {
const data = utils.formSubmission(event)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.errorMessaging)
}

const onShowHome = () => {
  ui.showHome()
}

const onShowAboutUs = () => {
  ui.showAboutUs()
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
