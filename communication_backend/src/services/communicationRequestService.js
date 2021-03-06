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
            res.status(200).json({ communicationRequestCode: uniqueCode });
        else
            res.status(500).json({ error: 'Error saving communication request!' });
    }
    else {
        res.status(500).json({ error: 'The communication request object is not valid!' });
    }
}

async function checkCommunicationSend(req, res) {
    let communicationCheck = req.body;
    if (validateCommunicationCheck(communicationCheck)) {
        try {
            let communicationRequestData = await communicationRequestDal.checkCommunicationRequestStatus(communicationCheck.communicationRequestToken);
            if (communicationRequestData.id)
                res.status(200).json({ communicationRequest: communicationRequestData });
            else
                res.status(500).json({ error: 'There is no communication request with the passed token!' });
        }
        catch (ex) {
            res.status(500).json({ error: 'Error checking communication request!' });
        }
    } else {
        res.status(500).json({ error: 'The communication check object is not valid!' });
    }
}

async function cancelCommunicationSend(req, res) {
    let communicationCheck = req.body;
    if (validateCommunicationCheck(communicationCheck)) {
        try {
            let communicationRequestData = await communicationRequestDal.updateCommunicationRequestStatus(communicationCheck.communicationRequestToken,
                communicationRequestDomain.communicationStatus.cancelled);
            if (communicationRequestData > 0)
                res.status(200).json({ msg: `Communication request: ${communicationCheck.communicationRequestToken} cancelled with success!` });
            else
                res.status(500).json({ error: 'There is no communication request with the passed token!' });
        }
        catch (ex) {
            res.status(500).json({ error: 'Error in cancelling communication request!' });
        }
    } else {
        res.status(500).json({ error: 'The communication cancellation object is not valid!' });
    }
}

function validateCommunicationCheck(communicationCheck) {
    return (communicationCheck.communicationRequestToken && validateCommunicationRequestToken(communicationCheck.communicationRequestToken));
}

function validateCommunicationRequestToken(communicationRequestToken) {
    return communicationRequestToken.length == communicationRequestDomain.communicationRequestTokenSize;
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
    let d = new Date(dateAttribute);
    if (!d instanceof Date || isNaN(d)) return false;
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

module.exports = { registerCommunicationSend, checkCommunicationSend, cancelCommunicationSend };