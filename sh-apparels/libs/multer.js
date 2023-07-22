import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname)
        }
    }
)

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png')
        cb(null, true)
    else{
        cb(new Error('Only jpeg, jpg and png files are allowed'), false)
    }
}

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter })

export default upload;