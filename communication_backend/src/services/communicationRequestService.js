const {v4: uuidv4} = require('uuid');
function registerCommunicationSend(req, res) {
    const uniqueCode = uuidv4();
    res.status(200).json({ code: uniqueCode });
}

module.exports = { registerCommunicationSend };