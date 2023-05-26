const express = require('express');
const router = express.Router();

const registercontroller = require('../controllers/users_controllers')

//middleware
const passportJWT = require('../middleware/passport-jwt')



/* GET users listing. */
router.post('/register', registercontroller.register);
router.post('/login', registercontroller.login)
router.get('/:id',registercontroller.getUsers)
router.get('/', registercontroller.getUsersAll)
router.put('/forgotpassword',registercontroller.updateUsers)
router.patch('/changepassword/:id',[passportJWT.isLogin], registercontroller.changepassword)
router.get('/profile',[passportJWT.isLogin], registercontroller.getProfile)

module.exports = router;
