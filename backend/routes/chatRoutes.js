const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controller/chatControllers');


router.route('/').post(protect, accessChat).get(protect, fetchChats);

router.route('/group').post(protect, createGroupChat);

router.route('/rename').put(protect, renameGroup);

router.route('/groupadd').put(protect, addToGroup);

router.route('/groupremove').put(protect, removeFromGroup);



module.exports = router;