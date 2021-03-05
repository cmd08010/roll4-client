'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const campaignEvents = require('./campaign/events')
const store = require('./store')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here

  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('.user-signed-in').hide()
  $('#sign-out').on('click', userEvents.onSignOut)

  // campaign event listeners
  $('.campaigns').hide()
  $('#create-campaign').on('submit', campaignEvents.onCreateCampaign)
  $('#show-campaigns').on('click', campaignEvents.onShowAllCampaigns)

  // delete once complete
  $('#store').on('click', () => {
    console.log(store)
  })
})
