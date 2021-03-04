
const config = require('../config')
const store = require('../store')

const createCampaign = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/campaigns`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

const showAllCampaigns = () => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/campaigns`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

module.exports = {
  createCampaign,
  showAllCampaigns
}
