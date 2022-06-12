const estate = require('../controller/estate')

const assignRoutes = (app) => {
    app.post('/estate/getCount', estate.getCount);
    app.post('/estate/getList', estate.getList);
    app.post('/estate/getInformation', estate.getInformation);
}

module.exports = {
    assignRoutes
}