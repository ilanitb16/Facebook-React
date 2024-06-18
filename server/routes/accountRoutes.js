const express = require('express');
const router = express.Router();

const {getUserController} = require("../controllers/getUserController");
const {userImageController} = require("../controllers/userImageController");
const {signInController} = require("../controllers/signInController");
const {signUpController} = require("../controllers/signUpController");
const {updateUserController} = require("../controllers/updateUserController");
const {deleteUserController} = require("../controllers/deleteUserController");

router.get('/users/:id', getUserController);
router.get('/users/image/:username', userImageController);
router.post('/users', signUpController);
router.post('/tokens', signInController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

module.exports = router;