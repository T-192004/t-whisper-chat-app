const express = require('express');
const router = express.Router();
const { registerUser, authUser, allUsers } = require('../controller/userControllers');
const {protect} = require('../middleware/authMiddleware');
// ✅ This is correct
router.post('/register', registerUser);

router.post('/login', authUser );

router.get('/allUsers', protect, allUsers);

module.exports = router;
