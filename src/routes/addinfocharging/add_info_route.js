const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload= multer()


//middleware
const passportJWT = require("../../middleware/passport-jwt");

const insetinfocharging = require("../../..//src/controllers/addinfocharging_controllers");

router.post(
  "/insertinfocharg",
  [passportJWT.isLogin],upload.fields([{name:"imagecpn", maxCount:1},{name:"pictureplace", maxCount:1}]),
  insetinfocharging.insertInfoCharging
);
router.get(
  "/getinfochargall",
  [passportJWT.isLogin],
  insetinfocharging.getInfochargAll
);
router.delete(
  "/deleteinfochargall/:id",
  [passportJWT.isLogin],
  insetinfocharging.deletebyid
);

router.put('/updateinfocharg/:id', insetinfocharging.updateInfochargbyid)

module.exports = router;