const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadimages = multer();

//middleware
const passportJWT = require("../../middleware/passport-jwt");
//route
const upload = require("../../controllers/uploadimage");

router.post(
  "/uploadimage",
  passportJWT.isLogin,
  uploadimages.array("file",2),
  upload.UploadsImageMany
);

module.exports = router;
