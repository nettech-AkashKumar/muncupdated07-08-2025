import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../../pages/config/config';
import { toast } from 'react-toastify';
import { 
  FaBell, 
  FaCheck, 
  FaTrash, 
  FaCheckDouble,
  FaExclamationTriangle
} from 'react-icons/fa';
import { CiClock2 } from 'react-icons/ci';
import './activities.css'

const ViewAllNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || user?._id;

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch notifications for the current user
  const fetchNotifications = async (page = 1) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      
      const response = await axios.get(
        `${BASE_URL}/api/notifications/paginated/${userId}?page=${page}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setNotifications(response.data.notifications || []);
        console.log('Fetched notifications:', notifications);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
        console.log('Fetched notifications:', response.data.notifications?.length || 0);
      } else {
        setError('Failed to load notifications');
        toast.error('Failed to load notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load notifications');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    if (!userId) return;

    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL}/api/notifications/unread/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.count !== undefined) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = getToken();
      await axios.put(
        `${BASE_URL}/api/notifications/read/${notificationId}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );

      // Update unread count
      fetchUnreadCount();
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = getToken();
      await axios.put(
        `${BASE_URL}/api/notifications/read-all/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );

      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const token = getToken();
      await axios.delete(
        `${BASE_URL}/api/notifications/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { userId }
        }
      );

      // Remove from local state
      setNotifications(prev => 
        prev.filter(notification => notification._id !== notificationId)
      );

      setDeleteConfirm(null);
      toast.success('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
      setDeleteConfirm(null);
    }
  };

  // Delete all notifications
  const deleteAllNotifications = async () => {
    try {
      const token = getToken();
      await axios.delete(
        `${BASE_URL}/api/notifications/all/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Clear local state
      setNotifications([]);
      setUnreadCount(0);
      setDeleteConfirm(null);
      toast.success('All notifications deleted successfully');
    } catch (error) {
      console.error('Error deleting all notifications:', error);
      toast.error('Failed to delete all notifications');
      setDeleteConfirm(null);
    }
  };

  // Format timestamp
  // const formatTimestamp = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const now = new Date();
  //   const diffInHours = (now - date) / (1000 * 60 * 60);

  //   if (diffInHours < 1) {
  //     const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  //     return `${diffInMinutes} minutes ago`;
  //   } else if (diffInHours < 24) {
  //     const hours = Math.floor(diffInHours);
  //     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  //   } else {
  //     const days = Math.floor(diffInHours / 24);
  //     return `${days} day${days > 1 ? 's' : ''} ago`;
  //   }
  // };
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

  // Load notifications on component mount
  useEffect(() => {
    if (userId) {
      fetchNotifications();
      fetchUnreadCount();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div style={{padding:'0px 20px',height:'88vh'}}>
      {/* Add CSS for loading animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      {/* header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <div>
          <span style={{fontSize:'22px',fontWeight:'700'}}>All Notifications</span>
          <br/>
          {/* <span style={{fontSize:'19px',fontWeight:'400',color:'#86888bff'}}>
            {notifications.length > 0 ? `${notifications.length} notification${notifications.length > 1 ? 's' : ''}` : 'No notifications'}
          </span> */}
        </div>
        {notifications.length > 0 && (
          <div style={{display:'flex',gap:'10px'}}>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background:'white',
                  color:'#1368EC',
                  border:'none',
                  padding:'8px 16px',
                  borderRadius:'6px',
                  fontSize:'14px',
                  fontWeight:'500',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  gap:'8px'
                }}
              >
                <FaCheckDouble />
                Mark All as Read
              </button>
            )}
            <button
              onClick={() => setDeleteConfirm({ type: 'all' })}
              style={{
                background:'white',
                color:'#dc3545',
                border:'none',
                padding:'8px 16px',
                borderRadius:'6px',
                fontSize:'14px',
                fontWeight:'500',
                cursor:'pointer',
                display:'flex',
                alignItems:'center',
                gap:'8px'
              }}
            >
              <FaTrash />
              Delete All
            </button>
            
          </div>
        )}
      </div>

      {/* all messages */}
      <div style={{marginTop:'5px',overflowY:'auto',maxHeight:'calc(100vh - 160px)',borderRadius:'8px',backgroundColor:'white'}}>
        {!user ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',textAlign:'center',color:'#6c757d'}}>
            <FaBell style={{fontSize:'48px',color:'#dee2e6',marginBottom:'16px'}} />
            <h3 style={{margin:'0 0 8px 0',fontSize:'20px',fontWeight:'600',color:'#495057'}}>Please log in</h3>
            <p style={{margin:0,fontSize:'14px',color:'#6c757d'}}>Please log in to view notifications</p>
          </div>
        ) : loading ? (
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'40px'}}>
            <div style={{textAlign:'center'}}>
              <div style={{width:'40px',height:'40px',border:'4px solid #f3f3f3',borderTop:'4px solid #667eea',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}}></div>
              <p style={{color:'#6c757d'}}>Loading notifications...</p>
            </div>
          </div>
        ) : error ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',textAlign:'center',color:'#6c757d'}}>
            <FaBell style={{fontSize:'48px',color:'#dee2e6',marginBottom:'16px'}} />
            <h3 style={{margin:'0 0 8px 0',fontSize:'20px',fontWeight:'600',color:'#495057'}}>Error loading notifications</h3>
            <p style={{margin:0,fontSize:'14px',color:'#6c757d'}}>{error}</p>
            <button 
              onClick={() => fetchNotifications()} 
              style={{
                marginTop:'16px',
                background:'#667eea',
                color:'white',
                border:'none',
                padding:'8px 16px',
                borderRadius:'6px',
                fontSize:'14px',
                fontWeight:'500',
                cursor:'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',textAlign:'center',color:'#6c757d'}}>
            <FaBell style={{fontSize:'48px',color:'#dee2e6',marginBottom:'16px'}} />
            <h3 style={{margin:'0 0 8px 0',fontSize:'20px',fontWeight:'600',color:'#495057'}}>No notifications</h3>
            <p style={{margin:0,fontSize:'14px',color:'#6c757d'}}>You're all caught up! No new notifications.</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <div 
                key={notification._id} 
                style={{
                  // display:'flex',
                  // padding:'12px 20px',
                  // gap:'15px',
                  // border:'1px solid #e9ecef',
                  // borderRadius:'8px',
                  // backgroundColor: '#fff',
                  // marginBottom:'15px',
                  // position:'relative',
                  // borderLeft: notification.read ? '1px solid #e9ecef' : '4px solid #667eea',
                  // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  // transition: 'all 0.3s ease'
                }}
                // onMouseEnter={(e) => {
                //   e.currentTarget.style.transform = 'translateY(-2px)';
                //   e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                // }}
                // onMouseLeave={(e) => {
                //   e.currentTarget.style.transform = 'translateY(0)';
                //   e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                // }}
                className='notification-items notification-hover-group'
              >
                <div>
                  {notification.sender?.profileImage ? (
                    Array.isArray(notification.sender.profileImage) && notification.sender.profileImage.length > 0 ? (
                      <img 
                        src={notification.sender.profileImage[0].url} 
                        alt="Sender" 
                        style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : typeof notification.sender.profileImage === 'string' ? (
                      <img 
                        src={notification.sender.profileImage} 
                        alt="Sender" 
                        style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null
                  ) : null}
                  <div style={{
                    width:'50px',
                    height:'50px',
                    borderRadius:'50%',
                    backgroundColor:'#007AFF',
                    display: (notification.sender?.profileImage && 
                              ((Array.isArray(notification.sender.profileImage) && notification.sender.profileImage.length > 0) || 
                               typeof notification.sender.profileImage === 'string')) ? 'none' : 'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    color:'white',
                    fontSize:'16px',
                    fontWeight:'600'
                  }}>
                    {/* {notification.sender?.firstName && notification.sender?.lastName 
                      ? `${notification.sender.firstName.charAt(0)}${notification.sender.lastName.charAt(0)}`
                      : notification.sender?.firstName 
                        ? notification.sender.firstName.substring(0, 2).toUpperCase()
                        : 'NA'
                    } */}
                    {notification.sender?.firstName?.slice(0, 2).toUpperCase() || 'NA'}
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <span style={{fontWeight:'600',color:'black'}}>
                        {notification.sender?.firstName} {notification.sender?.lastName}
                      </span>
                      <br/>
                      <span style={{fontWeight:'400',color:'#6c757d'}}> 
                        {notification.message}
                      </span>
                    </div>
                  </div>
                  
                </div>
                
                {/* Action buttons */}
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
                <div style={{}} className='notification-default-info'>
                    {/* <CiClock2 style={{fontSize:'12px',color:'#6c757d'}} /> */}
                    <span style={{fontWeight:'400',color:'#6c757d'}}>
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    {!notification.read && (
                      <span style={{
                        // background:'#667eea',
                        color:'white',
                        fontSize:'10px',
                        marginTop: '8px',
                        // right: '10px',
                        width: '8px',
                        height: '8px',
                        marginLeft:'8px',
                        backgroundColor: '#FFD700',
                        borderRadius: '50%',
                        border: '1px solid white',
                        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}>
                        
                      </span>
                    )}
                  </div>

                <div style={{}} className='notification-hover-actions'>
                  {!notification.read && (
                    <button
                      style={{
                        width:'32px',
                        height:'32px',
                        border:'none',
                        borderRadius:'6px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        cursor:'pointer',
                        background:'#FBFBFB',
                        color:'#1368EC',
                        fontSize:'15px',
                        transition: 'all 0.3s ease'
                      }}
                      className='notification-action-btn mark-read'
                      onClick={() => markAsRead(notification._id)}
                      title="Mark as read"
                      // onMouseEnter={(e) => {
                      //   e.currentTarget.style.background = '#218838';
                      //   e.currentTarget.style.transform = 'scale(1.1)';
                      // }}
                      // onMouseLeave={(e) => {
                      //   e.currentTarget.style.background = '#28a745';
                      //   e.currentTarget.style.transform = 'scale(1)';
                      // }}
                    >
                      <FaCheck />
                      {/* Mark as read */}
                    </button>
                  )}
                  
                  <button
                    style={{
                      width:'32px',
                      height:'32px',
                      border:'none',
                      // borderRadius:'6px',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      cursor:'pointer',
                      background:'#FBFBFB',
                      color:'#dc3545',
                      fontSize:'15px',
                      transition: 'all 0.3s ease'
                    }}
                    className='notification-action-btn delete'
                    onClick={() => setDeleteConfirm({ notificationId: notification._id })}
                    title="Delete notification"
                    // onMouseEnter={(e) => {
                    //   e.currentTarget.style.background = '#c82333';
                    //   e.currentTarget.style.transform = 'scale(1.1)';
                    // }}
                    // onMouseLeave={(e) => {
                    //   e.currentTarget.style.background = '#dc3545';
                    //   e.currentTarget.style.transform = 'scale(1)';
                    // }}
                  >
                    <FaTrash />
                  </button>
                </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'16px',
                padding:'20px 0',
                borderTop:'1px solid #f1f3f4',
                marginTop:'20px'
              }}>
                <button
                  style={{
                    background: currentPage === 1 ? '#6c757d' : '#667eea',
                    color:'white',
                    border:'none',
                    padding:'8px 16px',
                    borderRadius:'6px',
                    fontSize:'14px',
                    fontWeight:'500',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.6 : 1
                  }}
                  disabled={currentPage === 1}
                  onClick={() => fetchNotifications(currentPage - 1)}
                >
                  Previous
                </button>
                
                <span style={{fontSize:'14px',color:'#6c757d',fontWeight:'500'}}>
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  style={{
                    background: currentPage === totalPages ? '#6c757d' : '#667eea',
                    color:'white',
                    border:'none',
                    padding:'8px 16px',
                    borderRadius:'6px',
                    fontSize:'14px',
                    fontWeight:'500',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.6 : 1
                  }}
                  disabled={currentPage === totalPages}
                  onClick={() => fetchNotifications(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Confirmation Dialog for Deletion */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <FaExclamationTriangle style={{ fontSize: '40px', color: '#dc3545', marginBottom: '10px' }} />
            <h3 style={{ marginBottom: '10px', color: '#343a40' }}>
              {deleteConfirm.type === 'all' ? 'Confirm Delete All' : 'Confirm Deletion'}
            </h3>
            <p style={{ marginBottom: '20px', color: '#6c757d' }}>
              {deleteConfirm.type === 'all' 
                ? 'Are you sure you want to delete all notifications? This action cannot be undone.'
                : 'Are you sure you want to delete this notification? This action cannot be undone.'
              }
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (deleteConfirm.type === 'all') {
                    deleteAllNotifications();
                  } else {
                    deleteNotification(deleteConfirm.notificationId);
                  }
                }}
              >
                {deleteConfirm.type === 'all' ? 'Delete All' : 'Delete'}
              </button>
              <button
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllNotifications;