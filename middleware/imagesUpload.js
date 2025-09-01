const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/items-images");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    file.savedPath = `items-images/${fileName}`;
    cb(null, fileName);

  },
});

const upload = multer({ storage: storage });

module.exports = upload;