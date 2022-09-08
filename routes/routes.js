var express = require("express")
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UsersController') 
var AdminAuth = require('../middleware/AdminAuth')


router.get('/', HomeController.index);

router.post('/user', UserController.create)

router.get('/users', AdminAuth, UserController.index)

router.get('/users/:id', UserController.findUser)

router.put('/user', UserController.edit)

router.delete('/user', UserController.delete)

router.post('/recoverpassword', UserController.recoverPassword)

router.post('/changepassword', UserController.changePassword)

router.post('/login', UserController.login)

module.exports = router;

//UUID - GUID

//passwordTokens
//token | id | used
//