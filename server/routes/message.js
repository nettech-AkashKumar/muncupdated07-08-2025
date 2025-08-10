const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth/authMiddleware');


router.post('/', auth.verifyToken, messageController.saveMessage);
router.get('/', auth.verifyToken, messageController.getMessages);
router.post('/read', auth.verifyToken, messageController.markAsRead);
router.delete('/clear', auth.verifyToken, messageController.clearMessages);
router.delete('/delete-user-messages', auth.verifyToken, messageController.deleteUserMessages);
router.delete('/delete-selected', auth.verifyToken, messageController.deleteSelectedMessages);
router.get('/:userId', auth.verifyToken, messageController.getConversations);

module.exports = router; 