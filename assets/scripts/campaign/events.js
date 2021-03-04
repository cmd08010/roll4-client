const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

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
  api.showAllCampaigns()
    .then(ui.showAllCampaignsSuccess)
    .catch(ui.showAllCampaignsFailure)
}

module.exports = {
  onCreateCampaign,
  onShowAllCampaigns
}
