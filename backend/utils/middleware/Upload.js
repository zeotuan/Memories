import multer from 'multer';
import GridFsStorage from  'multer-gridfs-storage';
import config from '../config.js';
import util from 'util';

const storage = new GridFsStorage({
    url: config.MONGO_URI,
    options:{useNewUrlParser: true, useUnifiedTopology: true},
    file: (req,file) => {

        const match = ["image/png", "image/jpeg", "image/jpg"];
        if(match.indexOf(file.mimetype) !== -1){
            return {
                bucketName:"photos",
                filename:`${Date.now()}${file.originalname}`
            };
        }else{
            console.log("invalid file type: only png and jpg are supported");
        }
    },
});



const upload = multer({
    storage: storage,
});

const singleUpload = upload.single("file");
const uploadmiddleware = util.promisify(singleUpload);

export default uploadmiddleware;