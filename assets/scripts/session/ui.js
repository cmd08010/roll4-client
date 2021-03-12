const store = require('../store')
const moment = require('moment')
const utils = require('../utils')

const createSessionSuccess = (response) => {
  store.session = response.session
  utils.clearForms()
  utils.showUserView()
  utils.resetMessaging()
  $('#all-campaigns').hide()
  $('#all-sessions').show()
  $('#all-sessions').html('<div class="each-session"></div>')
  const date = moment(response.session.createdAt).format("MM DD YYYY")
  $('.each-session').append(`<h1><button class="session btn btn-link" data-session-id=${response.session._id}>${response.session.title}</button></h1>
  <p>Latest Session was on: ${date} </p>
  <h2>Session Notes:</h2>
  <br><h4>${response.session.text}</h4>
  `)
}

const createSessionFailure = () => {
  $('#message').text('Create Session Failed. Try again!').addClass('failure')
  $('.user-signed-in').show()
  $('#all-campaigns').hide()
  $('#all-sessions').show()
}

const showAllSessionsSuccess = (response) => {
  $('.user-signed-in').show()
  $('#all-sessions').show()
  $('#all-campaigns').hide()
  $('#clicked-session').html('')
  $('#all-sessions').html(`<div id="all-sessions-title">${store.user.userName.toUpperCase()} has ${response.sessions.length} sessions for the ${store.campaign.title} campaign!</div>`)
  $('.each-session').html('')
  response.sessions.map(session => {
    const date = moment(session.createdAt).format("MM DD YYYY")
    $('#all-sessions').append(`<div class="each-session"><h1><button class="session btn btn-link" data-session-id=${session._id}>${session.title}</button></h1>
    <p>Latest Session was on: ${date} </p>
    <h2>Session Notes:</h2>
    <br><h4>${session.text}</h4>
    </div>
    `)
  })
}

const sessionPageHtml = (session) => {
  return `<h6><button class="campaign btn btn-link btn-sm" data-campaign-id=${store.campaign._id}>${store.campaign.title} Campaign</button></h6>
<div class="title">${session.title}
<button type="button" class="btn btn-link" data-session-id=${session._id} id="edit-clicked-session-button">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg>
</button>
  </button>
  <button id="delete-modal-clicked-session" class="btn btn-link"  data-toggle="modal" data-target="#deleteSessionModal">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
  </button>
  </div>
  <h5>${session.text}</h5>
  <div class="modal fade" id="deleteSessionModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <h2>Are you sure you want to delete <b>${session.title}</b> Session?</h2>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No! Don't Delete</button>
          <button type="button" class="btn btn-primary" id="delete-clicked-session">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <hr>`
}

const showSessionPage = (response) => {
  store.session = response.session
  $('#message').text('')
  $('#create-session').hide()
  $('#create-campaign').hide()
  $('#clicked-campaign').hide()
  $('.user-signed-in').show()
  $('#all-sessions').hide()
  $('#all-campaigns').hide()
  $('#clicked-session').html(sessionPageHtml(response.session))
}

const deleteSessionSuccess = () => {
  $('#clicked-session').html('Session Deleted!')
  $('.user-signed-in').show()
  $('#message').text('')
  $('#welcome').text('')
  $('#each-session').show()
  $('.modal-backdrop').remove()
}

const showApiFailureMessaging = () => {
  $('#message').text('Your request failed! Try again!').addClass("failure")
}

const showEditSessionPage = () => {
  $('#message').html('')
  $('#clicked-session').html(`
  <form id="edit-clicked-session">
    <h2>${store.session.title}</h2>
    <input type='text' name='title' value="${store.session.title}" required>
    <br>
    <textarea name='text' placeholder='Enter Session Here' id="session-text">${store.session.text}</textarea>
    <br>
    <button class="btn btn-info">Submit Changes</button>
  </form>
  `)
}

const editSessionSuccess = (response) => {
store.session = response.campaign.sessions[response.campaign.sessions.length - 1]
const session = response.campaign.sessions[response.campaign.sessions.length - 1]
$('#message').html('').removeClass()
  $('#clicked-session').html(sessionPageHtml(session))
}
module.exports = {
  createSessionSuccess,
  createSessionFailure,
  showAllSessionsSuccess,
  showSessionPage,
  deleteSessionSuccess,
  showApiFailureMessaging,
  showEditSessionPage,
  editSessionSuccess
}
