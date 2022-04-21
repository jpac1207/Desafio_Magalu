const { v4: uuidv4 } = require('uuid');
const communicationRequestDal = require('../repository/communicationRequestDal');
const communicationDomain = require('../domain/communicationRequestDomain');

async function registerCommunicationSend(req, res) {
    let communicationRequest = req.body;
    if (validateBody(communicationRequest)) {
        const uniqueCode = uuidv4();
        communicationRequest.id = uniqueCode;
        communicationRequest.deliveryTime = new Date(communicationRequest.deliveryTime);
        let registerConfirmation = await communicationRequestDal.registerCommunicationRequest(communicationRequest,
            communicationDomain.communicationStatus.waiting);
        if (registerConfirmation)
            res.status(200).json({ code: uniqueCode });
        else
            res.status(500).json({ error: 'Error saving communication request!' });
    }
    else {
        res.status(500).json({ error: 'The communication request object is not valid!' });
    }
}

function validateBody(communicationRequest) {
    if (!communicationRequest.deliveryTime)
        return false;
    else {
        if (!validateDateAttribute(communicationRequest.deliveryTime))
            return false;
    }
    if (!communicationRequest.receiverEmail)
        return false;
    if (!communicationRequest.message)
        return false;
    if (!communicationRequest.deliveryType)
        return false;
    return true;
}

function validateDateAttribute(dateAttribute) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateAttribute)) return false;
    var d = new Date(dateAttribute); 
    return d.toISOString()===dateAttribute;
}

module.exports = { registerCommunicationSend };