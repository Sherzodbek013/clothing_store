const express = require('express');
const router = express.Router();
const OrderModel = require('../models/OrderModel');

router.get('/', (req, res) => {
    OrderModel.getAllOrders((err, orders) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving orders from database' });
        } else {
            res.json(orders);
        }
    });
});

router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const status = req.body.status;
    OrderModel.updateOrderStatus(orderId, status, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error updating order status' });
        } else {
            res.json({ message: 'Order status updated successfully' });
        }
    });
});

module.exports = router;





