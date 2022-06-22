import estate from '#src/controller/estate'
import fileUploader from '#src/utils/file_uploader'

export default {
    assignRoutes(app) {
        app.post('/estate/registry', estate.registry);
        app.post('/estate/getCount', estate.getCount);
        app.post('/estate/uploadCertificate', fileUploader.single('certificate'), estate.uploadCertificate);
        app.post('/estate/uploadIPFS', estate.uploadIPFS);
        app.post('/estate/acceptRegistry', estate.acceptRegistry);
        app.post('/estate/getList', estate.getList);
        app.post('/estate/getInformation', estate.getInformation);
    }
}
