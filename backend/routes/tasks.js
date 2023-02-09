const express = require('express');
const router = express.Router();
const { addTask } = require('../controllers/tasks');
const protect = require('../middlewares/protect');
const validateId = require('../middlewares/validateId');

router.route('/task').post(protect, addTask);

module.exports = router;
