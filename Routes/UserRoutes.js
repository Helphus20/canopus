const express = require('express');
const { getAllUsers } = require('../Controllers/UserController');

const router = express.Router();

// Routes
router.get('/users', getAllUsers);

module.exports = router;