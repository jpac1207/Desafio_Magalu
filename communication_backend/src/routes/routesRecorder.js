module.exports = async function (app) {
    app.route('/communicationrequest/register').post(function (req, res) {
        console.log(req);
    })
}