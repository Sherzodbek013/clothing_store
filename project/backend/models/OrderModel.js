const db = require('../db');

const OrderModel = {
    getAllOrders: (callback) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    updateOrderStatus: (orderId, status, callback) => {
        const query = 'UPDATE orders SET status = ? WHERE id = ?';
        db.query(query, [status, orderId], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
};

module.exports = OrderModel;



