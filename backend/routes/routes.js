const accountRoutes = require('./account')

const assignRoutes = (app) =>{
    accountRoutes.assignRoutes(app)
}

module.exports = {
    assignRoutes
}