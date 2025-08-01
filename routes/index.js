const express = require('express');
const audioRoutes = require('./audio');
const chatRoutes = require('./chat');

const router = express.Router();

// Mount route modules
router.use('/audio', audioRoutes);
router.use('/chat', chatRoutes);

module.exports = router; 