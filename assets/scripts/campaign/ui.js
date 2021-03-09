const store = require('../store')

const createCampaignSuccess = (response) => {
  console.log(response, "my creation was a success")
  store.campaign = response.campaign
  $('#message').text(`${response.campaign.title} campaign was created`)
  $('#create-campaign').trigger('reset')
}

const createCampaignFailure = (response) => {
  console.log(response, "my campaign create fail response")
  $('#create-campaign').trigger('reset')
}

const showAllCampaignsSuccess = (response) => {
  console.log(response)
  //$('#all-campaigns').show()
  $('#all-campaigns').show()
  $('#clicked-campaign').html('')
  $('#all-campaigns').html(`${store.user.userName} has ${response.campaigns.length} campaigns going`)
  response.campaigns.map(campaign => {
    $('#all-campaigns').append(`<h2><button class="campaign btn" data-campaign-id=${campaign._id}>${campaign.title}</button>: ${campaign.description}</h2>
    <p>Started on: ${campaign.createdAt}</p>
    `)
    // move delete button to the campaign page
  })
  $('#create-campaign').trigger('reset')
}

const showCampaignPage = (response) => {
  store.campaign = response.campaign
  $('#message').html('')
  console.log(response, "my show campaign page suceess response")

  $('#all-campaigns').hide()
  $('#clicked-campaign').html(`
    <h1>${response.campaign.title}</h1>
    <h2>${response.campaign.description}</h2>
    <button type="button" class="btn btn-primary" data-campaign-id=${response.campaign._id} id="edit-clicked-campaign-button">Edit</button>
      <button id="delete-modal-clicked-campaign"  data-toggle="modal" data-target="#deleteModal"> Delete </button>
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
      <hr>
      <hr>
    `)
  $('.sessions').show()
}

const deleteCampaignSuccess = (response) => {
  $('#clicked-campaign').html('Campaign Deleted!')
  $('.modal-backdrop').remove()
}

const showApiFailureMessaging = (response) => {
  $('#message').text('API call failed!')
  console.log(response, "the api call failed - here is my UI")
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

const showLatestCampaign = (response) => {
  console.log(response.sessions.length, "my response for the home page")
  store.campaign = response.campaign
  $('#message').html('').removeClass()
  $('#clicked-campaign').html(`

    <h1>Welcome Back ${store.user.userName}!</h1>
    <h2>${response.campaign.title}</h2>
    <h3>${response.campaign.description}</h3>
    <button class="create-session-btn btn" >Add a Session</button>
    <button type="button" class="btn btn-primary" data-campaign-id=${response.campaign._id} id="edit-clicked-campaign-button">Edit</button>
    <button id="delete-modal-clicked-campaign"  data-toggle="modal" data-target="#deleteModal"> Delete </button>
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
      <hr>
      <hr>`)
  if (response.sessions.length > 0) {
    $('#create-session').hide()
    console.log("should show my sessions here now")
    response.sessions.map(session => {
      $('#all-sessions').append(`<hr> <h2><button class="session btn" data-session-id=${session._id}>${session.title}</button>: ${session.text}</h2>
        <p>Started on: ${session.createdAt}</p>
        `)
    })
} else {
}
}



const editCampaignSuccess = (response) => {
store.campaign = response.campaign
$('#message').html('').removeClass()
  console.log(response, "my response from editing the campaign")
  $('#clicked-campaign').html(`
    <h1>${response.campaign.title}</h1>
    <h2>${response.campaign.description}</h2>
    <button type="button" class="btn btn-primary" data-campaign-id=${response.campaign._id} id="edit-clicked-campaign-button">Edit</button>
      <button id="delete-modal-clicked-campaign"  data-toggle="modal" data-target="#deleteModal"> Delete </button>
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
      <hr>
      <hr>`)
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
