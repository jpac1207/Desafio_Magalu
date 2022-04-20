const communicationRequestService = require('../services/communicationRequestService');

module.exports = async function (app) {
    app.route('/communicationrequest/register').post(communicationRequestService.registerCommunicationSend);
}