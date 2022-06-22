import account from '#src/controller/account'

export default {
    assignRoutes(app) {
        app.post('/account/login', account.login);
        app.post('/account/signup', account.signup);
        app.get('/account/getInformation', account.getInformation);
    }
}