const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/', (req, res) => {
    UserModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving users from database' });
        } else {
            res.json(users);
        }
    });
});

module.exports = router;


