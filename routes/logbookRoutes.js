// routes/logbookRoutes.js
const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbookController');
const { authMiddleware } = require('../middlewares/authMiddleware');  // Pastikan middleware ini ada

router.get('/logbooks', authMiddleware, logbookController.getLogbooks);

router.post('/logbooks', authMiddleware, logbookController.addLogbook);

router.put('/logbooks/:id', authMiddleware, logbookController.updateLogbook);

router.delete('/logbooks/:id', authMiddleware, logbookController.deleteLogbook);

module.exports = router;
