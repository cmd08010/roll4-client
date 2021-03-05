const config = require('../config')
const store = require('../store')


const createCampaignSuccess = (response) => {
console.log(response, "my creation was a success")
store.campaign = response.campaign
  $('#new-campaign').text(`${response.campaign.title} campaign was created`)
  $('#create-campaign').trigger('reset')
}

const createCampaignFailure = (response) => {
  console.log(response)
    $('#create-campaign').trigger('reset')
}

const showAllCampaignsSuccess = (response) => {
  console.log(response)
  $('#all-campaigns').html(`${store.user.userName} has ${response.campaigns.length} campaigns going`)
  response.campaigns.map(campaign => {
    $('#all-campaigns').append(`<h2>${campaign.title}: ${campaign.description}</h2>
    <p>Started on: ${campaign.createdAt}</p>`)
  })
  $('#create-campaign').trigger('reset')
}

const showAllCampaignsFailure = () => {}



module.exports = {
  createCampaignSuccess,
  createCampaignFailure,
  showAllCampaignsSuccess,
  showAllCampaignsFailure
}
