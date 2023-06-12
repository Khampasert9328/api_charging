const express = require('express');
const router = express.Router();

//middleware
const passportJWT = require('../../middleware/passport-jwt')

const insetinfocharging = require('../../..//src/controllers/addinfocharging_controllers');

router.post('/insertinfocharg',[passportJWT.isLogin],insetinfocharging.insertInfoCharging)
router.get('/getinfochargall',[passportJWT.isLogin],insetinfocharging.getInfochargAll)
router.delete('/deleteinfochargall/:id',[passportJWT.isLogin], insetinfocharging.deletebyid)


module.exports= router