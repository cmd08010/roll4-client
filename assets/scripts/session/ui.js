const store = require('../store')

const createSessionSuccess = (response) => {
  console.log(response, "my session creation was a success")
  store.session = response.session
  $('#message').text(`${response.session.title} session was created`)
  $('#create-session').trigger('reset')
}

const createSessionFailure = () => {}

const showAllSessionsSuccess = (response) => {
  console.log(response)
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
  console.log(response, "my show session page suceess response")
  // response format: {
  // createdAt: "2021-03-04T20:41:54.492Z"
  // owner: user id
  // sessions: (2) [{…}, {…}]
  // text: "lets add an entry"
  // title: "New campaign"
  // updatedAt:
  // }

  $('#all-session').hide()
  $('#clicked-session').html(`
    <h1>${response.session.title}</h1>
    <h2>${response.session.text}</h2>
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


module.exports = {
  createSessionSuccess,
  createSessionFailure,
  showAllSessionsSuccess,
  showSessionPage,
  deleteSessionSuccess,
  showApiFailureMessaging
}
