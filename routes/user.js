const express = require('express'); //import express
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../controllers/user');
const friendController = require('../controllers/friend');
const auth = require('../controllers/auth');

router.post('/user/auth', upload.none(), auth.auth);

//router.use(tokenChecker);
router.get('/user', userController.getAllUsers);
router.post('/user', upload.none(), userController.newUser);
router.delete('/user', userController.deleteAllUsers);

router.get('/user/:name', userController.getOneUser);
router.post('/user/:name', userController.newComment);
router.delete('/user/:name', userController.deleteOneUser);

//router.use(upload.none(), auth.tokenChecker)

router.post('/friend', upload.none(), friendController.addFriend);
router.delete('/friend', upload.none(), friendController.removeFriend);

router.get('/friend/:username', friendController.getFriends)

module.exports = router; // export to use in server.js
