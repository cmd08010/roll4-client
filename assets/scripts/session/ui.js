const store = require('../store')

const createSessionSuccess = (response) => {
  store.session = response.session
  $('#message').text(`${response.session.title} session was created`)
  $('#create-session').trigger('reset')
}

const createSessionFailure = () => {}

const showAllSessionsSuccess = (response) => {
  $('#all-sessions').show()
  $('#clicked-session').html('')
  $('#all-sessions').html(`${store.user.userName} has ${response.sessions.length} sessions for ${store.campaign.title} campaign!`)
  response.sessions.map(session => {
    $('#all-sessions').append(`<h2><button class="session btn" data-session-id=${session._id}>${session.title}</button>: ${session.text}</h2>
    <p>Started on: ${session.createdAt}</p>
    `)
  })
}

const showSessionPage = (response) => {
  store.session = response.session
  $('#message').text('')
  $('#all-sessions').hide()
  $('#all-campaigns').hide()
  $('#clicked-campaign').hide()
  $('#clicked-session').html(`
    <h1><b>${store.campaign.title}</b> Campaign</h1>
    <h1>${response.session.title}</h1>
    <h2>${response.session.text}</h2>
      <button type="button" class="btn btn-primary" data-session-id=${response.session._id} id="edit-clicked-session-button">Edit</button>
      <button id="delete-modal-clicked-session"  data-toggle="modal" data-target="#deleteSessionModal"> Delete </button>
      <div class="modal fade" id="deleteSessionModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h2>Are you sure you want to delete <b>${response.session.title}</b> Session?</h2>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No! Don't Delete</button>
              <button type="button" class="btn btn-primary" id="delete-clicked-session">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <hr>
    `)

    // list of what to show and hide on each page
  $('.sessions').show()
  $('.campaigns').hide()
  $('#create-campaign').hide()
  $('#create-session').hide()
}

const deleteSessionSuccess = () => {
  $('#clicked-session').html('Session Deleted!')
  $('.modal-backdrop').remove()
}

const showApiFailureMessaging = () => {
  $('#message').text('API call failed!')
  console.log(response, "the api call failed - here is my UI")
}

const showEditSessionPage = () => {
  $('#message').html('')
  $('#clicked-session').html(`
  <form id="edit-clicked-session">
    <h2>${store.session.title}</h2>
    <input type='text' name='title' value="${store.session.title}" required>
    <br>
    <input type='text' name='text' value="${store.session.text}" required>
    <br>
    <button class="btn btn-info">Submit Changes</button>
  </form>
  `)
}

const editSessionSuccess = (response) => {
console.log(response, "My response", response.campaign.sessions[response.campaign.sessions.length - 1])
store.session = response.campaign.sessions[response.campaign.sessions.length - 1]
const session = response.campaign.sessions[response.campaign.sessions.length - 1]
$('#message').html('').removeClass()
  $('#clicked-session').html(`
    <h1>${session.title}</h1>
    <h2>${session.text}</h2>
    <button type="button" class="btn btn-primary" data-session-id=${session._id} id="edit-clicked-session-button">Edit</button>
      <button id="delete-modal-clicked-session"  data-toggle="modal" data-target="#deleteModal"> Delete </button>
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h2>Are you sure you want to delete <b>${session.title}</b> campaign?</h2>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No! Don't Delete</button>
              <button type="button" class="btn btn-primary" id="delete-clicked-session">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <hr>`)
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
