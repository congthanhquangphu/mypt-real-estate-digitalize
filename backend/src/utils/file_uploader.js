import config from '#src/config/config'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: config.UPLOAD_PATH,
    filename: (req, file, cb) => {
        const fileName = Date.now() + ".pdf";
        req.body.fileName = fileName;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

export default upload;