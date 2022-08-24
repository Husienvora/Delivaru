const multer = require("multer");
const imageModel = require("../models/Image-model");
var fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("testImage");

const uploadImage = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const saveImage = imageModel({
        name: req.body.name,
        id: req.body.id,
        img: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        },
      });
      saveImage
        .save()
        .then((res) => {
          console.log("image is saved");
        })
        .catch((err) => {
          console.log(err, "error has occur");
        });
      res.send("image is saved");
    }
  });
};

module.exports = {
  uploadImage,
};
