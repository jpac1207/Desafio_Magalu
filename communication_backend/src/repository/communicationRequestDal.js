const db = require('./db');

const CommunicationRequestDal = function () { };

CommunicationRequestDal.registerCommunicationRequest = async function (communicationRequest, status) {
    let connection = null;
    try {
        connection = await db.getSession();
        let sql = 'INSERT INTO communication_request (id, delivery_time, receiver_email, message, delivery_type, status) ' +
            'VALUES (?,?,?,?,?,?)';
        let query = connection.sql(sql).bind([communicationRequest.id, communicationRequest.deliveryTime,
        communicationRequest.receiverEmail, communicationRequest.message, communicationRequest.deliveryType, status]);
        await query.execute();
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
    finally {
        if (connection) connection.close();
    }
    return true;
}

module.exports = CommunicationRequestDal;