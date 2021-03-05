const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onCreateCampaign = (event) => {
  event.preventDefault()
  const form = event.target
  const data = { campaign: getFormFields(form) }
  console.log(data, 'this is my data it need to looks like campaign then my data')
  api.createCampaign(data)
    .then(ui.createCampaignSuccess)
    .catch(ui.createCampaignFailure)
}

const onShowAllCampaigns = (event) => {
  console.log(event.target)
  api.getAllCampaigns()
    .then(ui.showAllCampaignsSuccess)
    .catch(ui.showApiFailureMessaging)
}

const onShowCampaignPage = (event) => {
  const campaignId = $(event.target).data('campaign-id')
  console.log(campaignId)
  api.getOneCampaign(campaignId)
    .then(ui.showCampaignPage)
    .catch(ui.showApiFailureMessaging)
}

const onDeleteCampaign = (event) => {
  api.deleteCampaign(store.campaign._id)
    .then(ui.deleteCampaignSuccess)
    .catch(ui.showApiFailureMessaging)
}

module.exports = {
  onCreateCampaign,
  onShowAllCampaigns,
  onDeleteCampaign,
  onShowCampaignPage
}
