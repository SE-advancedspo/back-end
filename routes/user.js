const express = require('express'); //import express
const router = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../controllers/user');
const friendController = require('../controllers/friend');
const spotController = require('../controllers/spot');
const auth = require('../controllers/auth');

router.post('/user/auth', upload.none(), auth.auth);

//router.use(tokenChecker);
router.get('/user', userController.getAllUsers);
router.post('/user', upload.none(), userController.newUser);

//router.use(upload.none(), auth.tokenChecker)

router.get('/user/search', userController.getOneUser);

router.get('/user/:username', userController.getUser);
router.delete('/user/:username', userController.logoutUser);
//router.delete('/user/:username', userController.deleteOneUser);

router.post('/friend/:username', upload.none(), friendController.addFriend);
router.delete('/friend/:username', upload.none(), friendController.removeFriend);
router.get('/friend/:username', friendController.getFriends)

router.post('/spot', upload.none(), spotController.newSpot);
router.get('/spot', spotController.getAllSpots)
router.get('/spot/id', upload.none(), spotController.getOneSpot)

router.get('/evento/id', )
router.post('/evento/id', )
router.get('/evento', )

module.exports = router; // export to use in server.js
