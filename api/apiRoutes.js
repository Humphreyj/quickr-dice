const express = require('express');

const router = express.Router();
const usersRoute = require('../user/userRoute');
const authRoute = require('../auth/authRoute')

router.use('/users', usersRoute);
router.use('/auth', authRoute);

module.exports = router;