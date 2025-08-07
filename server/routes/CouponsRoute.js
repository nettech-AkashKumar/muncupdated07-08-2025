// routes/couponRoutes.js
const express = require("express");
const router = express.Router();

const { 
  createCoupon, 
  getCoupons, 
  updateCoupon, 
  deleteCoupon 
} = require('../controllers/CouponsController');

router.post('/', createCoupon);
router.get('/', getCoupons);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;
