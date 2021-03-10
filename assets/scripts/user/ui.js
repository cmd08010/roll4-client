const store = require('../store')
const api = require('./api')
const campaignEvents = require('./../campaign/events')

const signInSuccess = (response) => {
  store.user = response.user
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#no-user-nav-bar').hide()
  $('.no-user').hide()
  $('.user-signed-in').show()
  $('#user-signed-in-nav').show()
  $('#about-us').prependTo($('#user-signed-in-nav')).removeClass('btn-info').addClass('btn-outline-primary')
  campaignEvents.onShowLatestCampaign()
  if (store.campaign) {
    $('#welcome').text(`Welcome ${store.user.userName.toUpperCase()}! Check out your latest campaign!`)
  } else {
    $('#welcome').text(`Welcome ${store.user.userName.toUpperCase()}! Create a campaign to get started!`)
  }
}

const signInFailure = (response) => {
  $('#message').text('Unable to sign in. Please sign up or try again').addClass("failure")
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
}

const signUpSuccess = (response) => {
  store.user = response.user
  $('#message').text(`Success! ${response.user.userName} is signed up and signed in'`)
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#no-user-nav-bar').hide()
  $('.no-user').hide()
  $('.user-signed-in').show()
  $('#user-signed-in-nav').show()
  campaignEvents.onShowLatestCampaign()
  if (store.campaign) {
    $('#welcome').text(`Welcome ${store.user.userName.toUpperCase()}! Check out your latest campaign!`)
  } else {
    $('#welcome').text(`Welcome ${store.user.userName.toUpperCase()}! Create a campaign to get started!`)
  }
}
const showHome = () => {
  $('#no-user-nav-bar').hide()
  $('.no-user').hide()
  $('#message').html('')
  $('#user-signed-in-nav').show()
  if (store.campaign) {
    $('#all-campaigns').hide()
    campaignEvents.onShowLatestCampaign()
  } else {
    $('#create-campaign').show()
  }
}

const signUpFailure = (response) => {
  $('#message').text('Sorry, please select a new username or email address.').addClass("failure")
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
  $('#message').html('Success, youre password has been changed')
  $('#change-password').trigger('reset')
}

const changePasswordFailure = (response) => {
  $('#message').html('Your password has NOT been changed, Please try again.').addClass("failure")
}

module.exports = {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  showHome,
  changePasswordSuccess,
  changePasswordFailure
}
