const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users');
const protect = require('../middlewares/protect');
const admin = require('../middlewares/admin');

router.post('/create-user', protect, admin, createUser);

module.exports = router;
