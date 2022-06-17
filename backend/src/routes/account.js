const account = require('./../controller/account')

const assignRoutes = (app) => {
    app.post('/account/login',account.login);
    app.post('/account/signup',account.signup);
    app.get('/account/getInformation',account.getInformation);
}

module.exports = {
    assignRoutes
}