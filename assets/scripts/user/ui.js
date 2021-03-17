const store = require('../store')
const campaignEvents = require('./../campaign/events')
const utils = require('../utils')

const showAboutUs = () => {
  $('#message').html('')
  $('#about-us-message').toggle().addClass('about-us')
  if (store.user) {
    $('.user-signed-in').show()
  } else {
    $('#sign-in').hide()
    $('#sign-up').hide()
    $('#carouselExampleControls').toggle()
  }
}

const showHome = () => {
  if (store.user) {
    utils.showUserView()
    utils.resetMessaging()
    if (store.campaign) {
      campaignEvents.onShowLatestCampaign()
    } else {
      utils.resetMessaging()
      $('#create-campaign').show()
    }
  } else {
    utils.resetMessaging()
    utils.showNonUserView()
  }
}

const signInSuccess = (response) => {
  store.user = response.user
  utils.clearForms()
  utils.showUserView()
  utils.resetMessaging()
  $('#about-us').prependTo($('#user-signed-in-nav')).removeClass('btn-info').addClass('btn-outline-primary')
  campaignEvents.onShowLatestCampaign()
}

const signUpSuccess = (response) => {
  store.user = response.user
  utils.clearForms()
  utils.showUserView()
  utils.resetMessaging()
  $('#message').text(`Success! ${response.user.userName} is signed up and signed in'`).addClass('success')
}

const signOutSuccess = () => {
  delete store.user
  utils.showNonUserView()
  utils.resetMessaging()
  $('#about-us').prependTo($('#no-user-nav-bar')).addClass('btn-info').removeClass('btn-outline-primary')
}

const showChangePasswordForm = () => {
  utils.resetMessaging()
  $('.user-options').show()
  $('#change-password').toggle()
  if ($('#change-password').is(':hidden')) {
    $('#welcome').text(`${store.user.userName.toUpperCase()} is signed in`)
    $('.body-signed-in').show()
  } else {
    $('.body-signed-in').hide()
    $('#create-campaign').hide()
  }
}

const changePasswordSuccess = (response) => {
  utils.clearForms()
  utils.showUserView()
  $('#message').html('Success, you password has been changed').addClass('success')
}

const errorMessaging = (error) => {
  $('#message').show()
  $('#message').html(`${error.responseJSON.message}`).addClass('failure')
}


module.exports = {
  signInSuccess,
  signUpSuccess,
  signOutSuccess,
  showHome,
  showAboutUs,
  showChangePasswordForm,
  changePasswordSuccess,
  errorMessaging
}
