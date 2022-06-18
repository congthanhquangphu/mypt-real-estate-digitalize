const config = require('config/config')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: config.constant.upload_path,
    filename: (req, file, cb) => {
        const fileName = Date.now() + ".pdf";
        req.body.fileName = fileName;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

module.exports = {
    upload
}