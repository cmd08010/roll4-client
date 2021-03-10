const store = require('../store')
const moment = require('moment')
const sessionUi = require('../session/ui')

const createCampaignSuccess = (response) => {
  store.campaign = response.campaign
  $('#message').text(`${response.campaign.title} campaign was created`)
  $('#create-campaign').trigger('reset')
  showLatestCampaign(response)
}

const createCampaignFailure = (response) => {
  $('#create-campaign').trigger('reset')
}

const showAllCampaignsSuccess = (response) => {

  $('#all-campaigns').show()
  $('#clicked-campaign').html('')
  $('#clicked-session').html('')
  $('#all-sessions').hide()
  $('#all-campaigns').html(`<h2>${store.user.userName} has ${response.campaigns.length} campaigns going</h2>
    <hr>`)
  response.campaigns.map(campaign => {
    const date = moment(campaign.createdAt).format("MM DD YYYY")
    $('#all-campaigns').append(`<h4><button class="campaign btn btn-link" data-campaign-id=${campaign._id}>${campaign.title}</button></h4>
    <p>Started on: ${date}</p>
     <h2>${campaign.description}</h2>
    `)
    // move delete button to the campaign page
  })
  $('#create-campaign').trigger('reset')
}

const showCampaignPage = (response) => {
  store.campaign = response.campaign
  $('#create-campaign').hide('')
  $('#create-session').hide('')
  $('#message').html('')
  $('#clicked-campaign').show()
  $('#all-campaigns').hide()
  $('#clicked-campaign').html(`
    <div class="title">${response.campaign.title}
    <button type="button" class="btn btn-link" data-campaign-id=${response.campaign._id} id="edit-clicked-campaign-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </button>
    <button id="delete-modal-clicked-campaign"  class="btn btn-link" data-toggle="modal" data-target="#deleteModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
   </button>
   <button type="button" class="btn btn-link" id="create-session-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
      <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
    </svg>
  </button>
   </div>
    <h4>${response.campaign.description}</h4>
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h2>Are you sure you want to delete <b>${response.campaign.title}</b> campaign?</h2>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No! Don't Delete</button>
              <button type="button" class="btn btn-primary" id="delete-clicked-campaign">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `)
  if (response.sessions.length > 0) {
    sessionUi.showAllSessionsSuccess(response.campaign)
  } else {
    $('')
  }
}

const showLatestCampaign = (response) => {
  if (response) {
    store.campaign = response.campaign
    $('#message').html('').removeClass()
    $('#show-sessions').hide()
    showCampaignPage(response)
  } else {
    $('#message').text(`Welcome ${store.user.userName}! Create a campaign to get started!`)
    $('#create-campaign').show()
    $('#create-session').hide()
  }
}

const deleteCampaignSuccess = (response) => {
  $('#clicked-campaign').html('Campaign Deleted! Click show all campaigns to view your other campaigns')
  $('.modal-backdrop').remove()
  $('#all-sessions').html('')
}

const showEditCampaignPage = (response) => {
  $('#message').html('')
  $('#clicked-campaign').html(`
  <form id="edit-clicked-campaign">
    <h2>${store.campaign.title}</h2>
    <input type='text' name='title' value="${store.campaign.title}" required>
    <br>
    <input type='text' name='description' value="${store.campaign.description}" required>
    <br>
    <button class="btn btn-info">Submit Changes</button>
  </form>
  `)
}

const editCampaignSuccess = (response) => {
store.campaign = response.campaign
$('#message').html('').removeClass()
  showCampaignPage(response)
}


const showApiFailureMessaging = (response) => {
  $('#message').text('Your request failed! Try again!').addClass("failure")
}

module.exports = {
  createCampaignSuccess,
  createCampaignFailure,
  showAllCampaignsSuccess,
  showCampaignPage,
  deleteCampaignSuccess,
  showApiFailureMessaging,
  showLatestCampaign,
  editCampaignSuccess,
  showEditCampaignPage
}
