const express = require('express');
const router = express.Router();
const {
  createTimesheet,
  rateTimesheet,
  getMyTimesheets,
  findMyTimesheets,
  getTimesheet,
  getEmployeesTimesheets,
} = require('../controllers/timesheets');
const protect = require('../middlewares/protect');
const admin = require('../middlewares/admin');
const manager = require('../middlewares/manager');
const validateId = require('../middlewares/validateId');

router.post('/timesheet', protect, admin, createTimesheet);
router.get('/employees-timesheets', protect, manager, getEmployeesTimesheets);
router.get('/timesheet/:id', validateId('id'), protect, getTimesheet);
router
  .route('/timesheets')
  .get(protect, getMyTimesheets)
  .post(protect, findMyTimesheets);
router.post(
  '/rate-timesheet/:id',
  validateId('id'),
  protect,
  manager,
  rateTimesheet
);

module.exports = router;
