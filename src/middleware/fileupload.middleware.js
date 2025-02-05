//import multer
import multer from 'multer';
//Configure storage with filename and location.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/');
    },
    filename: function (req, file, cb) {
      const name = new Date().toISOString().replace(/:/g, '_') + '-' + file.originalname;
      cb(null,name);
    }
  })
  
  export const upload = multer({ storage: storage })