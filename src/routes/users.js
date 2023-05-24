const express = require('express');
const router = express.Router();

const registercontroller = require('../controllers/users_controllers')



/* GET users listing. */
router.post('/register', registercontroller.register);
router.post('/login', registercontroller.login)
router.get('/:id',registercontroller.getUsers)
router.get('/', registercontroller.getUsersAll)
router.put('/forgotpassword',registercontroller.updateUsers)

module.exports = router;
