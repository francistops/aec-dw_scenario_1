const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');


router.get('/', statusController.statusPage);
router.get('/heartbeat', statusController.heartbeat)


module.exports = router;