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
  $('#message').text('')
  console.log(response, "my show campaign page suceess response")
  // response format: {
  // createdAt: "2021-03-04T20:41:54.492Z"
  // owner: user id
  // sessions: (2) [{…}, {…}]
  // text: "lets add an entry"
  // title: "New campaign"
  // updatedAt:
  // }

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

const editCampaignSuccess = () => {}

module.exports = {
  createCampaignSuccess,
  createCampaignFailure,
  showAllCampaignsSuccess,
  showCampaignPage,
  deleteCampaignSuccess,
  showApiFailureMessaging,
  editCampaignSuccess
}
