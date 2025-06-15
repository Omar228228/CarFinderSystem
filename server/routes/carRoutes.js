const express = require('express');
const router = express.Router();
const { getCars, createCar } = require('../controllers/carController');

router.get('/', getCars);
router.post('/', createCar);

module.exports = router;
