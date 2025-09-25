import multer from "multer";

const storage = multer.memoryStorage(); // store in memory
const upload = multer({
  storage,
  limits: { fileSize: 45 * 1024 * 1024 }, // 45 MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("Only images are allowed!"));
  },
});

export default upload;