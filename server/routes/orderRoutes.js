const express = require('express');
const router = express.Router();
const { createOrder, paymentSuccess, paymentFail } = require('../controllers/orderController');


router.post('/', createOrder);

router.post('/payment/success/:tran_id', paymentSuccess);
router.post('/payment/fail/:tran_id', paymentFail);
router.post('/payment/cancel/:tran_id', paymentFail);

module.exports = router;