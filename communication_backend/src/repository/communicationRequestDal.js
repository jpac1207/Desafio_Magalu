const db = require('./db');

const CommunicationRequestDal = function () { };

CommunicationRequestDal.registerCommunicationRequest = async function (communicationRequest, status) {
    let connection = null;
    try {
        connection = await db.getConnection();
        let sql = 'INSERT INTO communication_request (id, delivery_time, receiver_email, message, delivery_type, status) ' +
            'VALUES (?,?,?,?,?,?)';
        await connection.query(sql, [communicationRequest.id, communicationRequest.deliveryTime,
             communicationRequest.receiverEmail, communicationRequest.message, communicationRequest.deliveryType, status]);        
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
    finally {
        if (connection) connection.end();
    }
    return true;
}

module.exports = CommunicationRequestDal;