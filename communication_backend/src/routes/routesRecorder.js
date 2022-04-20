module.exports = async function (app) {
    app.route('/communicationrequest/register').post(function (req, res) {       
        const uniqueCode = 'MOCK_VALID_CODE';
        res.status(200).json({ code: uniqueCode });
    })
}