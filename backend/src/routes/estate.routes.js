import estate from '#src/controller/estate.controller'
import fileUploader from '#src/utils/file_uploader'
import express from 'express'

const router = express.Router();

router.post('/registry', estate.registry);
router.post('/getCount', estate.getCount);
router.post('/uploadCertificate', fileUploader.single('certificate'), estate.uploadCertificate);
router.post('/uploadIPFS', estate.uploadIPFS);
router.post('/acceptRegistry', estate.acceptRegistry);
router.post('/getList', estate.getList);
router.post('/getInformation', estate.getInformation);

export default router