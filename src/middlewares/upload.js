import multer from "multer";

const storage = multer.memoryStorage(); // store in memory

const upload = multer({
  storage,
  limits: { fileSize: 45 * 1024 * 1024 }, // 45 MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|mp4|mov|webm|mkv/;

    const extname = filetypes.test(
      file.originalname.toLowerCase().split(".").pop()
    );

    const mimetype =
      file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");

    if (extname && mimetype) {
      return cb(null, true);
    }

    cb(new Error("Only Image and Video files are allowed!"));
  },
});

export default upload;