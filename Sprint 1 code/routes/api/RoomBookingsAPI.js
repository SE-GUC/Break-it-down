
const express = require('express');
const router = express.Router();

const RoomBookingsAPI = require('../../models/RoomBookings');

router.get('/', (req, res) => res.json({ data: RoomBookings }));

module.exports = router;

