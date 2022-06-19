const estate = require('controller/estate')
const file_uploader = require('utils/file_uploader')

const assignRoutes = (app) => {
    app.post('/estate/registry', estate.registry);
    app.post('/estate/getCount', estate.getCount);
    app.post('/estate/uploadCertificate', file_uploader.upload.single('certificate'), estate.uploadCertificate);
    app.post('/estate/uploadIPFS', estate.uploadIPFS);
    app.post('/estate/acceptRegistry', estate.acceptRegistry);
    app.post('/estate/getList', estate.getList);
    app.post('/estate/getInformation', estate.getInformation);
}

module.exports = {
    assignRoutes
}