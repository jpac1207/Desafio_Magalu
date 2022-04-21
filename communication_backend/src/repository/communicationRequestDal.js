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

CommunicationRequestDal.checkCommunicationRequestStatus = async function (communicationRequestToken) {
    let connection = null;
    let response = null;
    let data = null;
    try {
        connection = await db.getConnection();
        let sql = 'SELECT * FROM communication_request WHERE id = ?';
        response = await connection.query(sql, [communicationRequestToken]);     
        data = response.length > 0 ? response[0] : {};
    }
    catch (ex) {
        console.log(ex);
        throw ex;
    } finally {
        if (connection) connection.end();
    }
    return data;
}

CommunicationRequestDal.updateCommunicationRequestStatus = async function(communicationRequestToken, status){
    let connection = null;
    let affectedRows = 0;
    try {
        connection = await db.getConnection();
        let sql = 'UPDATE communication_request SET status = ? WHERE id = ?';
        let response  = await connection.query(sql, [status, communicationRequestToken]);
        affectedRows = response.affectedRows;
    }
    catch (ex) {
        console.log(ex);
        throw ex;
    }
    finally {
        if (connection) connection.end();
    }
    return affectedRows;
}

module.exports = CommunicationRequestDal;