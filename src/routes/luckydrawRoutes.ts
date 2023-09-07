// import { Router } from 'express';
// import { draw, redeem } from '../controllers/luckydrawController';
const express = require('express');
const router = express.Router();
const luckydrawController = require('../controllers/luckydrawController');

router.post('./draw', luckydrawController.draw);
router.post('./redeem', luckydrawController.redeem);

module.exports = router;