const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onCreateCampaign = (event) => {
  event.preventDefault()
  const form = event.target
  const data = { campaign: getFormFields(form) }
  api.createCampaign(data)
    .then(ui.createCampaignSuccess)
    .catch(ui.createCampaignFailure)
}

const onShowAllCampaigns = (event) => {
  api.getAllCampaigns()
    .then(ui.showAllCampaignsSuccess)
    .catch(ui.showApiFailureMessaging)
}

const onShowCampaignPage = (event) => {
  const campaignId = $(event.target).data('campaign-id')
  api.getOneCampaign(campaignId)
    .then(ui.showCampaignPage)
    .catch(ui.showApiFailureMessaging)
}

const onDeleteCampaign = (event) => {
  api.deleteCampaign(store.campaign._id)
    .then(ui.deleteCampaignSuccess)
    .catch(ui.showApiFailureMessaging)
}

const onShowLatestCampaign = (response) => {
  api.getLatestCampaign()
    .then(ui.showLatestCampaign)
    .catch(ui.showApiFailureMessaging)
}

const onEditCampaign = (event) => {
  event.preventDefault()
  const form = event.target
  const data = { campaign: getFormFields(form) }
  api.updateCampaign(store.campaign._id, data)
    .then(ui.editCampaignSuccess)
    .catch(ui.showApiFailureMessaging)
}

module.exports = {
  onCreateCampaign,
  onShowAllCampaigns,
  onDeleteCampaign,
  onShowCampaignPage,
  onShowLatestCampaign,
  onEditCampaign
}
