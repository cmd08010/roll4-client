
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

const getAllCampaigns = () => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/campaigns`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const getOneCampaign = (id) => {
  return $.ajax({
    method: 'GET',
    url: `${config.apiUrl}/campaigns/${id}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const deleteCampaign = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `${config.apiUrl}/campaigns/${id}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const updateCampaign = (id, data) => {
  return $.ajax({
    method: 'PATCH',
    url: `${config.apiUrl}/campaigns/${id}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

module.exports = {
  createCampaign,
  getAllCampaigns,
  getOneCampaign,
  deleteCampaign,
  updateCampaign
}
