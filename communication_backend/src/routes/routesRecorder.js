const communicationRequestService = require('../services/communicationRequestService');

module.exports = async function (app) {
    app.route('/communicationrequest/register').post(communicationRequestService.registerCommunicationSend);
    app.route('/communicationrequest/check').post(communicationRequestService.checkCommunicationSend);
    app.route('/communicationrequest/cancel').post(communicationRequestService.cancelCommunicationSend);
}