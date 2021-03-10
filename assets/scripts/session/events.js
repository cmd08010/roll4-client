const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')


const onCreateSession = (event) => {
  event.preventDefault()
  const form = event.target
  const data = { session: getFormFields(form) }
  console.log(data, 'this is my data it need to looks like campaign then my data')
  api.createSession(store.campaign._id, data)
    .then(ui.createSessionSuccess)
    .catch(ui.createSessionFailure)
}

const onShowAllSessions = (event) => {
  console.log(event.target)
  api.getAllSessions(store.campaign._id)
    .then(ui.showAllSessionsSuccess)
    .catch(ui.showApiFailureMessaging)
}

const onDeleteSession = (event) => {
  console.log(event.target)
  api.deleteSession(store.campaign._id, store.session._id)
    .then(ui.deleteSessionSuccess)
    .catch(ui.showApiFailureMessaging)
}

const onShowSessionPage = (event) => {
  const sessionId = $(event.target).data('session-id')
  console.log(sessionId)
  api.getOneSession(store.campaign._id, sessionId)
    .then(ui.showSessionPage)
    .catch(ui.showApiFailureMessaging)
}

const onEditSession = (event) => {
  event.preventDefault()
  const form = event.target
  const data = { session: getFormFields(form) }
  api.updateSession(store.campaign._id, store.session._id, data)
  .then(ui.editSessionSuccess)
  .catch(ui.showApiFailureMessaging)
}

module.exports = {
  onCreateSession,
  onShowAllSessions,
  onDeleteSession,
  onShowSessionPage,
  onEditSession
}
