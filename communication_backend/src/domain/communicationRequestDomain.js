const CommunicationRequestDomain = function () { };

CommunicationRequestDomain.communicationTypes = { email: 1, sms: 2, push: 3, whatsapp: 4 };
CommunicationRequestDomain.communicationStatus = { waiting: 1, sent: 2, cancelled: 3 };

module.exports = CommunicationRequestDomain;