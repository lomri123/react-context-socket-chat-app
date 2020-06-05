const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.includes("jpeg") &&
      !file.mimetype.includes("jpg") &&
      !file.mimetype.includes("png") &&
      !file.mimetype.includes("gif")
    ) {
      return cb(null, false, new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
