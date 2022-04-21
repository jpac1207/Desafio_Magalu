const { v4: uuidv4 } = require('uuid');
const communicationRequestDal = require('../repository/communicationRequestDal');
const communicationRequestDomain = require('../domain/communicationRequestDomain');

async function registerCommunicationSend(req, res) {
    let communicationRequest = req.body;
    if (validateCommunicationRequest(communicationRequest)) {
        const uniqueCode = uuidv4();
        communicationRequest.id = uniqueCode;
        communicationRequest.deliveryTime = new Date(communicationRequest.deliveryTime);
        let registerConfirmation = await communicationRequestDal.registerCommunicationRequest(communicationRequest,
            communicationRequestDomain.communicationStatus.waiting);
        if (registerConfirmation)
            res.status(200).json({ code: uniqueCode });
        else
            res.status(500).json({ error: 'Error saving communication request!' });
    }
    else {
        res.status(500).json({ error: 'The communication request object is not valid!' });
    }
}

function validateCommunicationRequest(communicationRequest) {
    if (!communicationRequest.deliveryTime || !validateDateAttribute(communicationRequest.deliveryTime)) return false;
    if (!communicationRequest.receiverEmail || !validateMailString(communicationRequest.receiverEmail)) return false;
    if (!communicationRequest.message || !validateMessageString(communicationRequest.message)) return false;
    if (!communicationRequest.deliveryType || !validateDeliveryType(communicationRequest.deliveryType)) return false;
    return true;
}

function validateDateAttribute(dateAttribute) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateAttribute)) return false;
    var d = new Date(dateAttribute);
    return d.toISOString() === dateAttribute;
}

function validateMailString(mailString) {
    let simpleRegex = /\S+@\S+\.\S+/;
    return simpleRegex.test(mailString);
}

function validateMessageString(messageString) {
    return messageString.length > communicationRequestDomain.minimumMessageSizeInCharacters;
}

function validateDeliveryType(deliveryType) {
    let validValues = Object.keys(communicationRequestDomain.communicationTypes).map(key => communicationRequestDomain.communicationTypes[key]);  
    return validValues.indexOf(deliveryType) != -1;
}

module.exports = { registerCommunicationSend };