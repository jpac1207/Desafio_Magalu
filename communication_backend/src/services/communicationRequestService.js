const { v4: uuidv4 } = require('uuid');
const communicationRequestDal = require('../repository/communicationRequestDal');
const communicationDomain = require('../domain/communicationRequestDomain');

async function registerCommunicationSend(req, res) {
    let communicationRegister = req.body;
    if (validateBody(communicationRegister)) {
        const uniqueCode = uuidv4();
        communicationRegister.id = uniqueCode;
        let registerConfirmation = await communicationRequestDal.registerCommunicationRequest(communicationRegister,
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
    if (!communicationRequest.receiverEmail)
        return false;
    if (!communicationRequest.message)
        return false;
    if (!communicationRequest.deliveryType)
        return false;
    return true;
}

module.exports = { registerCommunicationSend };