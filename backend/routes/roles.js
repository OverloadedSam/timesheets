const express = require('express');
const router = express.Router();
const { createRole } = require('../controllers/roles');
const protect = require('../middlewares/protect');
const admin = require('../middlewares/admin');

router.route('/role').post(protect, admin, createRole);

module.exports = router;
