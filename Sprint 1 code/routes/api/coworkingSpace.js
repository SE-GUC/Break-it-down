const express = require('express');
const router = express.Router();

const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');

router.get('/', (req, res) => res.json({ data: PartnerCoworkingSpace }));

module.exports = router;

