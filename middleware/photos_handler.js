import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
        cb(null, false);
    } else if (file.size > 5 * 1024 * 1024) {
        cb(null, false);
    } else {
        cb(null, true);
    }
};


export const upload = multer({
    storage,
    fileFilter,
    preservePath: true,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('photo');
