'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const campaignEvents = require('./campaign/events')
const sessionEvents = require('./session/events')
const store = require('./store')
const campaignUi = require('./campaign/ui')
const sessionUi = require('./session/ui')
const utils = require('./utils')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $(document).on({
    ajaxStart: function () {
      $('body').addClass('loading')
    },
    ajaxStop: function () {
      $('body').removeClass('loading')
    }
  })

  // user events - signed in or out
  $('#about-us').on('click', userEvents.onShowAboutUs)

  // user events NOT signed in
  $('#user-signed-in-nav').hide()
  $('#no-user-nav-bar').show()
  $('.user-signed-in').hide()
  utils.showNonUserView()

  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#sign-up').on('submit', userEvents.onSignUp)

  $('#show-signin').on('click', () => {
    $('#sign-in').toggle()
    $('#sign-up').hide()
    $('#about-us-message').hide()
    $('#carouselExampleControls').show()
  })
  $('#show-signup').on('click', () => {
    $('#sign-up').toggle()
    $('#sign-in').hide()
    $('#about-us-message').hide()
    $('#carouselExampleControls').show()
  })

// user events signed in
  $('#sign-out').on('click', userEvents.onSignOut)
  $('#change-password-button').on('click', userEvents.onShowChangePasswordForm)
  $('.user-options').on('submit', '#change-password', userEvents.onChangePassword)

  $('#dice').on('click', userEvents.onShowHome)

  // campaign event listeners
  $('#create-campaign-button').on('click', () => {
    $('.user-options').show()
    $('#create-campaign').toggle()
})
  $('#create-campaign').hide()
  $('#create-session').hide()
  $('#create-campaign').on('submit', campaignEvents.onCreateCampaign)
  $('#show-campaigns').on('click', campaignEvents.onShowAllCampaigns)

  // delete campaign
  $('#clicked-campaign').on('click', '#delete-clicked-campaign', campaignEvents.onDeleteCampaign)
  $('#clicked-campaign').on('click', '#edit-clicked-campaign-button', () => {
    campaignUi.showEditCampaignPage()
  })
  $('#clicked-campaign').on('submit', '#edit-clicked-campaign', campaignEvents.onEditCampaign)

  // show a campaign's page
  $('#all-campaigns').on('click', '.campaign', campaignEvents.onShowCampaignPage)
  $('#clicked-session').on('click', '.campaign', campaignEvents.onShowCampaignPage)

  // sessions
  $('#clicked-campaign').on('click', '#create-session-btn', () => {
    $('#create-session').toggle()
    $('#all-sessions').toggle()
  })
  $('#create-session').on('submit', sessionEvents.onCreateSession)
  $('#all-sessions').on('click', '.session', sessionEvents.onShowSessionPage)
  $('#clicked-session').on('click', '#delete-clicked-session', sessionEvents.onDeleteSession)
  $('#clicked-session').on('click', '#edit-clicked-session-button', () => sessionUi.showEditSessionPage())
  $('#clicked-session').on('submit', '#edit-clicked-session', sessionEvents.onEditSession)
})
