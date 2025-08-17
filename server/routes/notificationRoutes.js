const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth/authMiddleware');

// Get notifications for a user
router.get('/:userId', auth.verifyToken, notificationController.getNotifications);

// Get unread count for a user
router.get('/unread/:userId', auth.verifyToken, notificationController.getUnreadCount);

// Mark a notification as read
router.put('/read/:notificationId', auth.verifyToken, notificationController.markAsRead);

// Mark all notifications as read for a user
router.put('/read-all/:userId', auth.verifyToken, notificationController.markAllAsRead);

// Delete selected notifications (must come before /:notificationId)
router.delete('/bulk-delete', auth.verifyToken, notificationController.deleteSelectedNotification);

// Delete all notifications for a user (must come before /:notificationId)
router.delete('/all/:userId', auth.verifyToken, notificationController.deleteAllNotifications);

// Delete a notification
router.delete('/:notificationId', auth.verifyToken, notificationController.deleteNotification);

// Get notifications with pagination
router.get('/paginated/:userId', auth.verifyToken, notificationController.getNotificationsWithPagination);

module.exports = router;
