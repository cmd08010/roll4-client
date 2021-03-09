'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const campaignEvents = require('./campaign/events')
const sessionEvents = require('./session/events')
const store = require('./store')
const campaignUi = require('./campaign/ui')
const sessionUi = require('./session/ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here

  // user events
  $('#sign-in').on('submit', userEvents.onSignIn)
    //$('#sign-in').on('submit', campaignEvents.onShowLatestCampaign)
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-out').on('click', userEvents.onSignOut)

  // show sign up and sign in forms
  $('#show-signin').on('click', () => $('#sign-in').toggle())
  $('#show-signup').on('click', () => $('#sign-up').toggle())

  // show change password form and then enable event listener
  $('#change-password-button').on('click', userEvents.onShowChangePasswordForm)
  $('.user-options').on('submit', '#change-password', userEvents.onChangePassword)

  // show and hide user forms
  $('#user-signed-in-nav').hide()
  $('#change-password').hide()
  $('#sign-up').hide() // this will be shown on the sign up form button
  $('#sign-in').hide() // this will be shown on the sign in form button

  $('#dice').on('click', userEvents.onShowHome)


  // campaign event listeners
  $('#create-campaign-button').on('click', () => $('create-campaign').toggle())
  $('#create-campaign').hide()
  $('#create-campaign').on('submit', campaignEvents.onCreateCampaign)
  $('#show-campaigns').on('click', campaignEvents.onShowAllCampaigns)

  // delete campaign
  $('#clicked-campaign').on('click', '#delete-clicked-campaign', campaignEvents.onDeleteCampaign)

  // // Edit campaign and session

  // to edit a campaign - we want to allow editing title and description.
  // first use the edit button to bring up the form.. I want to default the
  // previous campaign info from the stored campaign
  $('#clicked-campaign').on('click', '#edit-clicked-campaign-button', () => {
    campaignUi.showEditCampaignPage()
  })

  $('#clicked-campaign').on('submit', '#edit-clicked-campaign', campaignEvents.onEditCampaign)
  // $('#clicked-session').on('click', '#edit-clicked-campaign', sessionEvents.onEditSession)


  // show a campaign's page
  $('#all-campaigns').on('click', '.campaign', campaignEvents.onShowCampaignPage)

  // sessions
  $('.sessions').hide()
  $('#create-session').on('submit', sessionEvents.onCreateSession)
  $('#show-sessions').on('click', sessionEvents.onShowAllSessions)
  $('#all-sessions').on('click', '.session', sessionEvents.onShowSessionPage)
  $('#clicked-session').on('click', '#delete-clicked-session', sessionEvents.onDeleteSession)

  // delete once complete
  $('#store').on('click', () => {
    console.log(store)
  })
})
