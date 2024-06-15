const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');

router.get('/', (req, res) => {
    ProductModel.getAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving products from database' });
        } else {
            res.json(products);
        }
    });
});

module.exports = router;








