const express = require('express');
const router = express.Router();
const { createOrder, paymentSuccess, paymentFail, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');


// public and ssl commerze routes
router.post('/', createOrder);
router.post('/payment/success/:tran_id', paymentSuccess);
router.post('/payment/fail/:tran_id', paymentFail);
router.post('/payment/cancel/:tran_id', paymentFail);

// admin routes
router.route('/')
  .get(protect, admin, getOrders);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

router.route('/:id')
  .delete(protect, admin, deleteOrder);

module.exports = router;