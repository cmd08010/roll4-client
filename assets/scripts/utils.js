
const getFormFields = require('../../lib/get-form-fields')


const clearForms = () => {
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#create-session').trigger('reset')
  $('#create-campaign').trigger('reset')
  $('#change-password').trigger('reset')
}

const resetMessaging = () => {
  $('#message').html('')
}

const hideSiblings = (selection) => {
  console.log(selection)
  $(selection).siblings().toggle()
}

const formSubmission = (event) => {
  event.preventDefault()
  const form = event.target
  return getFormFields(form)
}

const showUserView = () => {
  $('#about-us-message').hide()
  $('#change-password').hide()
  $('#create-campaign').hide()
  $('#create-session').hide()
  // hide non user
  $('#no-user-nav-bar').hide()
  $('.no-user').hide()

  // show user logged in items
  $('.user-signed-in').show()
  $('#user-signed-in-nav').show()
}

const showNonUserView = () => {
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#about-us-message').hide()
  // show non user
  $('#no-user-nav-bar').show()
  $('.no-user').show()

  // hide user logged in items
  $('.user-signed-in').hide()
  $('#user-signed-in-nav').hide()
}

module.exports = {
  clearForms,
  resetMessaging,
  formSubmission,
  showUserView,
  showNonUserView,
  hideSiblings
}
