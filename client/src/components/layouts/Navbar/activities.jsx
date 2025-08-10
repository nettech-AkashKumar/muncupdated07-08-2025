import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TbBell, TbCirclePlus, TbCommand, TbDeviceLaptop, TbDotsVertical, TbFileText, TbLanguage, TbLogout, TbMail, TbMaximize, TbSearch, TbSettings, TbUserCircle } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import { io } from 'socket.io-client';

const Activities = ({ onNotificationsRead }) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const backendurl = import.meta.env.BACKEND_URL || 'http://localhost:5000';
  const socket = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id || user?._id;
      
      if (!userId) return;
      
      const response = await fetch(`${backendurl}/api/notifications/${userId}?limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id || user?._id;
      
      if (!userId) return;
      
      const response = await fetch(`${backendurl}/api/notifications/unread/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id || user?._id;
      
      if (!userId) return;
      
      await fetch(`${backendurl}/api/notifications/read/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
      
      // Update unread count
      const newUnreadCount = unreadCount - 1;
      setUnreadCount(Math.max(0, newUnreadCount));
      
      // Call the callback to update navbar badge
      if (onNotificationsRead && newUnreadCount === 0) {
        onNotificationsRead();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id || user?._id;
      
      if (!userId) return;
      
      await fetch(`${backendurl}/api/notifications/read-all/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update local state
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      setUnreadCount(0);
      
      // Call the callback to update navbar badge
      if (onNotificationsRead) {
        onNotificationsRead();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id || user?._id;
      
      if (!userId) return;
      
      const response = await fetch(`${backendurl}/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      
      if (response.ok) {
        // Check if the notification was unread before deleting
        const notificationToDelete = notifications.find(n => n._id === notificationId);
        const wasUnread = notificationToDelete && !notificationToDelete.read;
        
        // Remove from local state
        setNotifications(prev => 
          prev.filter(notification => notification._id !== notificationId)
        );
        
        // Update unread count if the deleted notification was unread
        if (wasUnread) {
          const newUnreadCount = Math.max(0, unreadCount - 1);
          setUnreadCount(newUnreadCount);
          
          // Call the callback if no more unread notifications
          if (onNotificationsRead && newUnreadCount === 0) {
            onNotificationsRead();
          }
        }
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchUnreadCount();
      
      // Don't create a new socket connection here, use the one from Navbar
      // The socket connection should be managed at a higher level
      
      return () => {
        // Don't disconnect here, let the Navbar manage the socket
      };
    }
  }, [user]);


  return (
    <div>
        <div className="topnav-dropdown-header">
                    <h5 className="notification-title">{t("notifications")}</h5>
                    <a href="#" className="clear-noti" onClick={(e) => {
                      e.preventDefault();
                      markAllAsRead();
                    }}>{t("markAllAsRead")}</a>
                  </div>
                  <div className="noti-content">
                    <ul className="notification-list">
                      {loading ? (
                        <li className="notification-message">
                          <div className="media d-flex">
                            <div className="flex-grow-1">
                              <p className="noti-details">Loading notifications...</p>
                            </div>
                          </div>
                        </li>
                      ) : notifications.length === 0 ? (
                        <li className="notification-message">
                          <div className="media d-flex">
                            <div className="flex-grow-1">
                              <p className="noti-details" style={{ marginTop: '10px', paddingLeft: '10px' }}> No notifications</p>
                            </div>
                          </div>
                        </li>
                      ) : (
                        notifications.map((notification) => (
                          <li key={notification._id} className={`notification-message ${!notification.read ? 'unread' : ''}`} style={{ position: 'relative' }}>
                            <Link to="/chat" style={{ textDecoration: 'none' }} onClick={() => markAsRead(notification._id)}>
                              <div className="media d-flex">
                                <span className="avatar flex-shrink-0">
                                  {notification.sender?.profileImage ? (
                                    Array.isArray(notification.sender.profileImage) && notification.sender.profileImage.length > 0 ? (
                                      <img alt="Profile" src={notification.sender.profileImage[0].url} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    ) : (
                                      <img alt="Profile" src={notification.sender.profileImage} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    )
                                  ) : (
                                    <div style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      backgroundColor: '#007AFF',
                                      color: 'white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '14px',
                                      fontWeight: 'bold'
                                    }}>
                                      {notification.sender?.firstName?.slice(0, 2).toUpperCase() || 'U'}
                                    </div>
                                  )}
                                </span>
                                <div className="flex-grow-1">
                                  <p className="noti-details" style={{ textDecoration: 'none' }}>
                                    <span className="noti-title" style={{textDecoration: 'none', fontWeight: 'bold'}}>
                                      {notification.sender?.firstName} {notification.sender?.lastName}: 
                                    </span> {notification.message}
                                  </p>
                                  <p className="noti-time" style={{ textDecoration: 'none' }}>{formatTimeAgo(notification.timestamp)}</p>
                                </div>
                              </div>
                            </Link>
                            
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                deleteNotification(notification._id);
                              }}
                              style={{
                                position: 'absolute',
                                top: '20px',
                                right: '10px',
                                width: '20px',
                                height: '20px',
                                border: 'none',
                                borderRadius: '50%',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '25px',
                                zIndex: 10
                              }}
                              title="Delete notification"
                            >
                              <FaTrash style={{fontSize: '25px'}} />
                            </button>
                            
                            {!notification.read && (
                              <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '35px',
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#FFD700',
                                borderRadius: '50%',
                                border: '1px solid white',
                                boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                              }}></div>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="topnav-dropdown-footer d-flex align-items-center gap-3">
                    <button className="btn btn-secondary btn-md w-100" type="button">{t("cancel")}</button>
                    <Link to="/ViewAllNotifications" className="btn btn-primary btn-md w-100">{t("viewAll")}</Link>
                  </div>
    </div>
  )
}

export default Activities