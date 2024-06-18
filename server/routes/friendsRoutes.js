const express = require('express');
const router = express.Router();

const {getUserFriendsController} = require("../controllers/getUserFriendsController");
const {friendsRequestController} = require("../controllers/friendsRequestController");
const {deleteFriendsRequestController} = require("../controllers/deleteFriendsRequestController");
const {approveFriendsRequestController} = require("../controllers/approveFriendsRequestController");

router.get('/users/:id/friends', getUserFriendsController );
router.post('/users/:id/friends', friendsRequestController );
router.delete('/users/:id/friends/:fid', deleteFriendsRequestController);
router.patch('/users/:id/friends/:fid', approveFriendsRequestController )

module.exports = router;