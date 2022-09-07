var express = require("express")
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UsersController') 


router.get('/', HomeController.index);

router.post('/user', UserController.create)

router.get('/users', UserController.index)

router.get('/users/:id', UserController.findUser)

router.put('/user', UserController.edit)

module.exports = router;