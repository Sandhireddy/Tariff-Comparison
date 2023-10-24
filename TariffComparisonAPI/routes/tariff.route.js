var express = require('express');
var router = express.Router();

const { TariffCalculation } = require('./tariff.controller');

/* GET home page. */
router.post('/calculation',TariffCalculation);

module.exports = router;
