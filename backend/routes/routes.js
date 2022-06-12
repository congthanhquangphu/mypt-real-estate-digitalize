const accountRoutes = require('./account')
const estateRoutes = require('./estate')

const assignRoutes = (app) =>{
    accountRoutes.assignRoutes(app)
    estateRoutes.assignRoutes(app)
}

module.exports = {
    assignRoutes
}