import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './chat.css';
import { CiSearch } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCamera } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import { MdOutlineAudiotrack } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { RiUserFollowLine } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { CiFolderOn } from "react-icons/ci";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { TbClearAll } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { LuRefreshCcw, LuChevronUp, LuMic, LuSend } from "react-icons/lu";

const SOCKET_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000'; // Use your backend port
// const socket = io("http://localhost:5000"); // same as backend port
const Chat = () => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState({}); // Store messages per user
  const [message, setMessage] = useState('');
  const [readStatus, setReadStatus] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({}); // Track unread counts per user
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering friends
  const socket = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  
  const backendurl = import.meta.env.BACKEND_URL || 'http://localhost:5000';

  const [clickDropdown, setClickDropdown] = useState();
  const [clickDropdowntwo, setClickDropdownTwo] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [contextMenu, setContextMenu] = useState(null); // { idx, x, y }
  const [replyTo, setReplyTo] = useState(null); // message object
  const [popup, setPopup] = useState({ show: false, message: '' });
  console.log("amar kumar raaaa",users);
  console.log("Amar kumar ",onlineUsers);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    setClickDropdownTwo(false); // Close file options when opening emoji picker
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    // Check file size and type for each file
    const maxSize = 1 * 1024 * 1024; // 1MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'application/pdf'];
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setPopup({ show: true, message: `${file.name}: File size must be less than 1MB` });
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setPopup({ show: true, message: `${file.name}: Invalid file type.` });
        return false;
      }
      return true;
    });
    setSelectedFiles(validFiles);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles.length || !selectedUser) return;
    setIsUploading(true);
    setUploadProgress(0);
    for (const file of selectedFiles) {
      try {
        // Try signed Cloudinary upload
        const token = localStorage.getItem('token');
        const sigRes = await fetch(`${backendurl}/api/cloudinary-signature`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('folder', folder);
        for (let pair of formData.entries()) {
          console.log('Cloudinary upload param:', pair[0], '=', pair[1]);
        }
        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          { method: 'POST', body: formData }
        );
        const data = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(data.error?.message || 'Failed to upload file');
        // Success: use Cloudinary URL
        const fileMessage = {
          from: user.id,
          to: selectedUser._id,
          message: `📎 ${file.name}`,
          fileUrl: data.secure_url,
          fileType: file.type,
          fileName: file.name,
          timestamp: new Date(),
          read: false,
          replyTo: null
        };
        // Save file message to backend for persistence
        await fetch(`${backendurl}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fileMessage),
        });
        setMessages(prev => {
          const newMessages = {
            ...prev,
            [selectedUser._id]: [...(prev[selectedUser._id] || []), fileMessage]
          };
          return newMessages;
        });
        socket.current.emit('send-msg', {
          from: user.id,
          to: selectedUser._id,
          message: fileMessage.message,
          fileUrl: fileMessage.fileUrl,
          fileType: fileMessage.fileType,
          fileName: fileMessage.fileName,
          replyTo: fileMessage.replyTo
        });
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (error) {
        // Fallback: upload to backend for local storage
        try {
          const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('file', file);
          formData.append('from', user.id);
          formData.append('to', selectedUser._id);
          const uploadUrl = `${backendurl}/api/upload-file`;
          const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to upload file');
          // Success: use local file URL
          const fileMessage = {
            from: user.id,
            message: `📎 ${file.name}`,
            fileUrl: data.fileUrl,
            fileType: file.type,
            fileName: file.name,
            timestamp: new Date(),
            read: false,
            replyTo: null
          };
          setMessages(prev => {
            const newMessages = {
              ...prev,
              [selectedUser._id]: [...(prev[selectedUser._id] || []), fileMessage]
            };
            return newMessages;
          });
          socket.current.emit('send-msg', {
            from: user.id,
            to: selectedUser._id,
            message: fileMessage.message,
            fileUrl: fileMessage.fileUrl,
            fileType: fileMessage.fileType,
            fileName: fileMessage.fileName,
            replyTo: fileMessage.replyTo
          });
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (fallbackError) {
          setPopup({ show: true, message: 'Failed to upload file to both Cloudinary and local storage.' });
        }
      }
    }
    setSelectedFiles([]);
    setIsUploading(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const calculateUnreadCount = (userId) => {
    const userMessages = messages[userId] || [];
    return userMessages.filter(msg => msg.from === userId && !msg.read).length;
  };

  const scrollToFirstUnreadMessage = () => {
    if (!messageContainerRef.current || !selectedUser) return;
    
    const userMessages = messages[selectedUser._id] || [];
    const firstUnreadIndex = userMessages.findIndex(msg => msg.from === selectedUser._id && !msg.read);
    
    if (firstUnreadIndex !== -1) {
      const messageElements = messageContainerRef.current.children;
      if (messageElements[firstUnreadIndex]) {
        messageElements[firstUnreadIndex].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    } else {
      // If no unread messages, scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const getLastMessage = (userId) => {
    const safeMessages = messages || {};
    const userMessages = safeMessages[userId] || [];
    if (userMessages.length === 0) return 'No conversation';
    
    const lastMessage = userMessages[userMessages.length - 1];
    const isFromCurrentUser = lastMessage.from === user.id;
    const prefix = isFromCurrentUser ? 'You: ' : '';
    const messageText = lastMessage.message && lastMessage.message.length > 20 
      ? lastMessage.message.substring(0, 20) + '...' 
      : lastMessage.message || '';
    
    return prefix + messageText;
  };

  const getLastMessageTime = (userId) => {
    const safeMessages = messages || {};
    const userMessages = safeMessages[userId] || [];
    if (userMessages.length === 0) return '';
    
    const lastMessage = userMessages[userMessages.length - 1];
    return lastMessage && lastMessage.timestamp ? formatTime(lastMessage.timestamp) : '';
  };

  const getLastMessageTimestamp = (userId) => {
    const safeMessages = messages || {};
    const userMessages = safeMessages[userId] || [];
    if (userMessages.length === 0) return new Date(0); // Very old date for sorting
    
    const lastMessage = userMessages[userMessages.length - 1];
    return lastMessage && lastMessage.timestamp ? new Date(lastMessage.timestamp) : new Date(0);
  };

  const getLastMessageStatus = (userId) => {
    const safeMessages = messages || {};
    const userMessages = safeMessages[userId] || [];
    if (userMessages.length === 0) return null;
    
    const lastMessage = userMessages[userMessages.length - 1];
    // Only show status for messages sent by current user
    if (lastMessage && lastMessage.from === user.id) {
      return lastMessage.read ? '✓✓' : '✓';
    }
    return null;
  };

  const getFilteredUsers = () => {
    const safeUsers = users || [];
    if (!searchQuery.trim()) return safeUsers;
    
    return safeUsers.filter(userItem => 
      userItem.firstname && userItem.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  // Close emoji picker and dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && !event.target.closest('.emoji-picker-container')) {
        setShowEmojiPicker(false);
      }
      if (clickDropdowntwo && !event.target.closest('.file-dropdown-container')) {
        setClickDropdownTwo(false);
      }
      if (clickDropdown && !event.target.closest('.settings-dropdown-container')) {
        setClickDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker, clickDropdowntwo, clickDropdown]);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      // ✅ FIXED URL
      const res = await fetch(`${backendurl}/api/user/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data); // ✅ now this will be an array of users

      // ✅ Get conversations for the logged-in user
      
      const conversationsRes = await fetch(`${backendurl}/api/conversations/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const conversationsData = await conversationsRes.json();

      if (conversationsRes.ok) {
        const allMessages = {};
        conversationsData.forEach(conversation => {
          const otherParticipant = conversation.participants.find(p => p._id !== user.id);
          if (otherParticipant) {
            allMessages[otherParticipant._id] = conversation.messages.map((msg) => ({
              from: msg.from,
              message: msg.message,
              read: msg.read,
              timestamp: msg.timestamp,
              fileUrl: msg.fileUrl,
              fileType: msg.fileType,
              fileName: msg.fileName,
              replyTo: msg.replyTo
            }));
          }
        });
        setMessages(allMessages);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (user?.id) fetchUsers();
}, [user?.id]);


  useEffect(() => {
    socket.current = io(backendurl);
    socket.current.emit('add-user', users.id);
    socket.current.on('online-users', (online) => {
      setOnlineUsers(online);
    });
    socket.current.on('msg-receive', (data) => {
      setMessages((prev) => {
        const userId = data.from === users.id ? data.to : data.from;
        const userMessages = prev[userId] || [];
        return {
          ...prev,
          [userId]: [...userMessages, {
            from: data.from,
            message: data.message,
            fileUrl: data.fileUrl,
            fileType: data.fileType,
            fileName: data.fileName,
            read: false,
            timestamp: new Date(),
            replyTo: data.replyTo
          }]
        };
      });
      
      // Increment unread count for received messages
      if (data.from !== users.id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [data.from]: (prev[data.from] || 0) + 1
        }));
      }
    });
    socket.current.on('msg-read', (data) => {
      setReadStatus((prev) => ({ ...prev, [data.from]: true }));

      // Update message read status for messages sent by this user to the user who just read them
      setMessages((prev) => {
        const updatedMessages = { ...prev };
        if (updatedMessages[data.from]) {
          updatedMessages[data.from] = updatedMessages[data.from].map(msg =>
            msg.from === users.id ? { ...msg, read: true } : msg
          );
        }
        return updatedMessages;
      });
    });
    // Listen for real-time message deletion
    socket.current.on('delete-msg', (data) => {
      setMessages(prev => {
        const userMessages = prev[data.from] || [];
        return {
          ...prev,
          [data.from]: userMessages.filter(msg => String(msg.timestamp) !== String(data.messageTimestamp))
        };
      });
    });
    // Listen for real-time chat clear
    socket.current.on('clear-chat', (data) => {
      setMessages(prev => ({
        ...prev,
        [data.from]: []
      }));
    });
    return () => {
      socket.current.disconnect();
    };
  }, [users.id]);

  // Fetch chat history when a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${backendurl}/api/messages?from=${user.id}&to=${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch messages');
        
        console.log('Fetched messages for selected user:', data);
        console.log('Message count:', data.length);
        console.log('User messages:', data.filter(msg => msg.from === user.id).length);
        console.log('Sample message structure:', data[0]);
        
        setMessages((prev) => ({
          ...prev,
          [selectedUser._id]: data.map((msg) => ({ 
            from: msg.from, 
            message: msg.message, 
            read: msg.read,
            timestamp: msg.timestamp,
            fileUrl: msg.fileUrl,
            fileType: msg.fileType,
            fileName: msg.fileName,
            replyTo: msg.replyTo
          }))
        }));
        // Mark messages as read
        await fetch(`${backendurl}/api/messages/read`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ from: selectedUser._id, to: user.id }),
        });
        socket.current.emit('message-read', { from: selectedUser._id, to: user.id });
        setReadStatus((prev) => ({ ...prev, [selectedUser._id]: true }));
        
        // Update messages to mark them as read
        setMessages((prev) => ({
          ...prev,
          [selectedUser._id]: (prev[selectedUser._id] || []).map(msg => ({
            ...msg,
            read: msg.from === selectedUser._id ? true : msg.read
          }))
        }));
        
        // Update unread counts after marking messages as read
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedUser._id]: 0
        }));
        
        // Force recalculation of unread counts after a delay
        setTimeout(() => {
          const newUnreadCounts = {};
          Object.keys(messages).forEach(userId => {
            const count = calculateUnreadCount(userId);
            newUnreadCounts[userId] = count;
            console.log(`User ${userId}: ${count} unread messages`);
          });
          setUnreadCounts(newUnreadCounts);
        }, 200);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMessages();
  }, [selectedUser, users.id]);

  // Calculate unread counts whenever messages change
  useEffect(() => {
    const newUnreadCounts = {};
    Object.keys(messages).forEach(userId => {
      newUnreadCounts[userId] = calculateUnreadCount(userId);
    });
    setUnreadCounts(newUnreadCounts);
  }, [messages, selectedUser]);

  // Scroll to first unread message when messages are loaded
  useEffect(() => {
    if (selectedUser && messages[selectedUser._id]) {
      setTimeout(() => {
        scrollToFirstUnreadMessage();
      }, 100); // Small delay to ensure DOM is updated
    }
  }, [messages, selectedUser]);

  const handleMessageSelection = (messageIndex) => {
    if (!isSelectionMode) return;
    
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageIndex)) {
        newSet.delete(messageIndex);
      } else {
        newSet.add(messageIndex);
      }
      return newSet;
    });
  };

  const handleDeleteSelectedMessages = async () => {
    if (selectedMessages.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.size} selected message(s)?`)) {
      try {
        const token = localStorage.getItem('token');
        const userMessages = messages[selectedUser._id] || [];
        const selectedMessageData = Array.from(selectedMessages)
          .map(index => userMessages[index])
          .filter(msg => msg.from === user.id) // Only allow deletion of user's own messages
          .map(msg => ({
            timestamp: msg.timestamp,
            message: msg.message,
            from: msg.from
          }));
        
        console.log('Selected messages to delete:', selectedMessageData);
        
        const requestBody = { 
          messages: selectedMessageData,
          from: user.id, 
          to: selectedUser._id 
        };
        console.log('Request body:', requestBody);
        
        const response = await fetch(`${backendurl}/api/messages/delete-selected`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
        
        const responseData = await response.json();
        console.log('Backend response:', responseData);
        
        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to delete messages');
        }
        
                // Refresh messages from server to ensure consistency
        const refreshRes = await fetch(
          `${backendurl}/api/messages?from=${user.id}&to=${selectedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const refreshData = await refreshRes.json();
        console.log('Refreshed messages from server:', refreshData);
        console.log('Refreshed message count:', refreshData.length);
        
        if (refreshRes.ok) {
          setMessages(prev => ({
            ...prev,
            [selectedUser._id]: refreshData.map((msg) => ({ 
              from: msg.from, 
              message: msg.message, 
              read: msg.read,
              timestamp: msg.timestamp,
              fileUrl: msg.fileUrl,
              fileType: msg.fileType,
              fileName: msg.fileName,
              replyTo: msg.replyTo
            }))
          }));
        } else {
          // Fallback: manually remove selected messages from local state
          console.log('Server refresh failed, using local state fallback');
          setMessages(prev => ({
            ...prev,
            [selectedUser._id]: (prev[selectedUser._id] || []).filter((msg, index) => 
              !selectedMessages.has(index)
            )
          }));
        }
        
        // Exit selection mode
        setIsSelectionMode(false);
        setSelectedMessages(new Set());
      } catch (error) {
        console.error('Error deleting selected messages:', error);
        alert('Failed to delete messages. Please try again.');
      }
    }
  };

  const handleMessageClick = (msg, idx, event) => {
    if (msg.from === user.id) {
      event.preventDefault();
      setContextMenu({ idx, x: event.clientX, y: event.clientY });
    }
  };

  const handleDeleteSingleMessage = async (idx) => {
    if (!selectedUser) return;
    const userMessages = messages[selectedUser._id] || [];
    const msg = userMessages[idx];
    if (!msg || msg.from !== user.id) return;
    if (!window.confirm('Delete this message?')) return;
    try {
      const token = localStorage.getItem('token');
      const requestBody = {
        messages: [{ timestamp: msg.timestamp, message: msg.message, from: msg.from }],
        from: user.id,
        to: selectedUser._id
      };
      const response = await fetch(`${backendurl}/api/messages/delete-selected`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to delete message');
      }
      // Remove from local state
      setMessages(prev => ({
        ...prev,
        [selectedUser._id]: (prev[selectedUser._id] || []).filter((_, i) => i !== idx)
      }));
      // Emit socket event for real-time deletion
      socket.current.emit('delete-msg', {
        from: user.id,
        to: selectedUser._id,
        messageTimestamp: msg.timestamp
      });
    } catch (error) {
      alert('Failed to delete message.');
    } finally {
      setContextMenu(null);
    }
  };

  const handleReplyToMessage = (msg) => {
    setReplyTo(msg);
    setContextMenu(null);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;
    // Prepare replyTo object if replying
    const replyToObj = replyTo ? {
      message: replyTo.message,
      timestamp: replyTo.timestamp,
      from: replyTo.from,
      username: replyTo.username || (selectedUser && selectedUser.username)
    } : undefined;
    // Send to backend for persistence
    try {
      const token = localStorage.getItem('token');
      await fetch(`${backendurl}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: user.id,
          to: selectedUser._id,
          message,
          replyTo: replyToObj
        }),
      });
    } catch {
      setError('Failed to send message');
    }
    // Send via socket for real-time
    setMessages((prev) => {
      const userMessages = prev[selectedUser._id] || [];
      return {
        ...prev,
        [selectedUser._id]: [...userMessages, {
          from: user.id,
          message,
          read: false,
          timestamp: new Date(),
          replyTo: replyToObj
        }]
      };
    });
    setReadStatus((prev) => ({ ...prev, [selectedUser._id]: false }));
    socket.current.emit('send-msg', {
      to: selectedUser._id,
      from: user.id,
      message,
      replyTo: replyToObj
    });
    setMessage('');
    setReplyTo(null);
  };

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '94vh', backgroundColor:'rgb(231, 230, 230)', padding:'15px' }}>

      {/* header */}
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>

      <div>
      <span style={{fontWeight:'bold', fontSize:'25px'}}>Chat</span>
      <br/>
      <span style={{color:'rgb(73, 73, 73)'}}>Manage your chats</span>
      </div>

      <div style={{display:'flex', gap:'10px', height:'35px'}}>
        <button style={{backgroundColor:'white', color:'gray', padding:'5px 10px', display:'flex', alignItems:'center', border:'none', cursor:'pointer'}} onClick={() => location.reload()}><LuRefreshCcw /></button>
        <button style={{backgroundColor:'white', color:'gray', padding:'5px 10px', display:'flex', alignItems:'center', border:'none'}}><LuChevronUp /></button>
      </div>

      </div>
      
      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, height:'70vh', gap:'15px'  }}>
      
        {/* Left panel: User list */}
        <div style={{ width: '25%', 
          borderRight: '1px solid #ccc', 
          padding: '15px',
          height: 'calc(100vh - 150px)',
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor:'white', 
          borderRadius:'10px' }}>

          <div style={{ flexShrink: 0 }}>

            <span style={{fontWeight:'bold', fontSize:'20px'}}>Chats</span>
            
            {/* Search Box */}
            <div style={{ marginBottom: '15px', padding:'0px 10px'}} className="chat-list-search-box" >
              <input
                type="text"
                placeholder="Search For Contacts or Messages"
                className="chat-list-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                }}
              />
              <CiSearch />
            </div>
            
            {error && <div style={{ color: 'red' }}>{error}</div>}

          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', flex: 1, marginTop:'1px' }} className="chat-list-usersection">
          {getFilteredUsers()
            .sort((a, b) => {
              const aTimestamp = getLastMessageTimestamp(a._id);
              const bTimestamp = getLastMessageTimestamp(b._id);
              return bTimestamp - aTimestamp; // Sort by most recent first
            })
            .map((userItem) => (
            <li
              key={userItem._id}
              className="chat-list-user"
              style={{
                padding: '12px 15px',
                cursor: 'pointer',
                background: selectedUser && selectedUser._id === userItem._id ? '#eee' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin:'12px',
                borderRadius: '5px'
              }}
              onClick={() => {
                setSelectedUser(userItem);
                // Immediately clear unread count for this user
                setUnreadCounts((prev) => ({
                  ...prev,
                  [userItem._id]: 0
                }));
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {userItem.profilePicture ? (
                  <>
                  <div>
                  <div style={{ 
                    borderRadius: '50%', 
                    color: 'white',
                    justifyContent: 'center',
                  }}>
                  <img 
                    src={userItem.profileImage} 
                    alt={userItem.firstName}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid #ddd'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  </div>

                  {onlineUsers.includes(userItem._id) ? (
                    <div style={{ marginTop: '-20px', marginLeft: '30px' }}>
                      <span style={{ color: 'rgb(43, 216, 66)', fontSize: 21, }}>●</span>
                    </div>
                    ) : (
                    <div style={{ marginTop: '-20px', marginLeft: '30px' }}>
                      <span style={{ color: 'gray', fontSize: 1 }}>●</span>
                    </div>
                    )}

                  </div>
                  </>
                ) : (
                  <>
                  <div>
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#007AFF',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: '2px solid #ddd',
                    display: userItem.profileImage ? 'none' : 'flex'
                  }}
                >
                  {userItem.firstName.slice(0, 2).toUpperCase()}

                </div>

                  {onlineUsers.includes(userItem._id) ? (
                    <div style={{ marginTop: '-20px', marginLeft: '30px' }}>
                      <span style={{ color: 'rgb(43, 216, 66)', fontSize: 21, }}>●</span>
                    </div>
                  ) : (
                    <div style={{ marginTop: '-20px', marginLeft: '30px' }}>
                      <span style={{ color: 'gray', fontSize: 1 }}>●</span>
                    </div>
                  )}

                </div>
                  </>
                )}

                

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>
                    {userItem.firstName}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '150px'
                  }}>
                    {getLastMessage(userItem._id)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ 
                  fontSize: '10px', 
                  color: '#999',
                  whiteSpace: 'nowrap'
                }}>
                  {getLastMessageTime(userItem._id)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {getLastMessageStatus(userItem._id) && (
                    <span style={{ 
                      fontSize: '10px', 
                      color: getLastMessageStatus(userItem._id) === '✓✓' ? 'rgb(43, 216, 66)' : '#999'
                    }}>
                      {getLastMessageStatus(userItem._id)}
                    </span>
                  )}
                  {unreadCounts[userItem._id] > 0 && (
                    <span style={{
                      backgroundColor: 'orange',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      minWidth: '20px'
                    }}>
                      {unreadCounts[userItem._id]}
              </span>
              )}
                </div>
              </div>

            </li>
          ))}
        </ul>
        </div>

        {/* Right panel: Chat area */}
        <div style={{ 
          width: '75%',
          display: 'flex', 
          flexDirection: 'column', 
          height: 'calc(100vh - 120px)',
          overflow: 'hidden',
          backgroundColor:'white',
          borderRadius:'10px',
        }}>

        {selectedUser ? (
          <>
            {/* friend header */}
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid rgb(231, 230, 230)', padding: '10px 15px'}}> 

              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>

              {selectedUser.profilePicture ? (
              <>
                <div style={{ 
                    borderRadius: '50%', 
                    color: 'white',
                  }}>
                  <img 
                    src={selectedUser.profileImage} 
                    alt={selectedUser.firstName}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid #ddd'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                </div>
                </>
              ) : (
                <>
                
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#007AFF',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: '2px solid #ddd',
                    display: selectedUser.profileImage ? 'none' : 'flex'
                  }}
                >
                  
                  {selectedUser.firstName.slice(0, 2).toUpperCase()}

                </div>

                </>
              )}

                    {onlineUsers.includes(selectedUser._id) && (
                    <span style={{ color: 'rgb(43, 216, 66)', marginLeft: 30, marginTop:'25px', fontSize: 20, position:'absolute' }}>●</span>
                    )}

              <div>
                <span><b>{selectedUser.firstName}</b></span>
                <br/>
                <span style={{color:'rgb(182, 180, 180)'}}>{onlineUsers.includes(selectedUser._id) ? 'online' : 'offline'}</span>
              </div>
            </div>

              {isSelectionMode ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {selectedMessages.size} selected
                  </span>
                  <button
                    onClick={handleDeleteSelectedMessages}
                    disabled={selectedMessages.size === 0}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: selectedMessages.size === 0 ? '#ccc' : '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: selectedMessages.size === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete ({selectedMessages.size})
                  </button>
                  <button
                    onClick={() => {
                      setIsSelectionMode(false);
                      setSelectedMessages(new Set());
                    }}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                <div style={{ color: "grey", position: "relative", marginTop:'15px', marginRight:'10px' }}>
                <div style={{display:'flex', gap:'20px', fontSize:'20px'}}>
                  <CiSearch />
                  <span onClick={() => setClickDropdown(!clickDropdown)}>
                    <HiOutlineDotsVertical className="threedot-setting" />
                  </span>
                </div>
                </div>
                </>
              )}

              {clickDropdown && (
               <div
                 className="settings-dropdown-container"
                 style={{
                   position: "absolute",
                   top: "140px",
                   right: "50px",
                   zIndex: "100",
                 }}
               >
                <div>
                <div
                  className="setting-notification-container"
                  style={{
                  backgroundColor: "white",
                  width: "200px",
                  height: "165px",
                  border: "1px solid #dfd8d8",
                  padding:"10px 15px",
                  display:"flex",
                  flexDirection:"column",
                  borderRadius:'10px'
                  }}
                >
                <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                  <IoVolumeMuteOutline  style={{color:"#4a4848"}}/>
                  <span style={{color:"#4a4848"}}>Mute Notification</span>
                </div>
                <br/>
                <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                  <GoClock style={{color:"#4a4848"}}/>
                  <span style={{color:"#4a4848"}}>Disappearing</span>
                </div>
                <br/>
                <div 
                   style={{display:"flex", gap:"10px", alignItems:"center", cursor:"pointer"}}
                   onClick={async () => {
                     if (window.confirm('Are you sure you want to clear all messages in this conversation?')) {
                       try {
                         const token = localStorage.getItem('token');
                         await fetch(`${backendurl}/api/messages/clear`, {
                           method: 'DELETE',
                           headers: {
                             'Content-Type': 'application/json',
                             Authorization: `Bearer ${token}`,
                           },
                           body: JSON.stringify({ 
                             from: user.id, 
                             to: selectedUser._id 
                           }),
                         });
                         
                         // Clear messages from local state
                         setMessages(prev => ({
                           ...prev,
                           [selectedUser._id]: []
                         }));
                         
                         // Emit socket event for real-time chat clear
                         socket.current.emit('clear-chat', {
                           from: user.id,
                           to: selectedUser._id
                         });
                         
                         // Close the dropdown
                         setClickDropdown(false);
                       } catch (error) {
                         console.error('Error clearing messages:', error);
                         alert('Failed to clear messages. Please try again.');
                       }
                     }
                   }}
                 >
                   <TbClearAll  style={{color:"#4a4848"}}/>
                   <span style={{color:"#4a4848"}}>Clear Message</span>
                 </div>
                 <br/>
                  <div 
                   style={{display:"flex", gap:"10px", alignItems:"center", cursor:"pointer"}}
                   onClick={() => {
                     setIsSelectionMode(true);
                     setSelectedMessages(new Set());
                     setClickDropdown(false);
                   }}
                 >
                   <RiDeleteBinLine  style={{color:"#4a4848"}}/>
                   <span style={{color:"#4a4848"}}>Delete Chat</span>
                 </div>
                 <br/>
                <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                  <MdBlockFlipped  style={{color:"#4a4848"}}/>
                  <span style={{color:"#4a4848"}}>Block</span>
                </div>
                </div>
                </div>
              </div>
              )}
            </div>

            {/* message box */}
            <div 
              ref={messageContainerRef}
              style={{ 
                height: 'calc(100vh - 200px)',
                marginTop: 12,
                marginBottom: 12,
                padding: '32px',
                minHeight: '300px',
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
              }}
              onClick={() => setContextMenu(null)}
            >
              {(messages[selectedUser._id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.from === user.id ? 'flex-end' : 'flex-start',
                    position: 'relative',
                    width: '100%'
                  }}
                  onClick={() => handleMessageSelection(idx)}
                >
                  {/* Checkbox for selection mode */}
                  {isSelectionMode && msg.from === user.id && (
                    <input
                      type="checkbox"
                      checked={selectedMessages.has(idx)}
                      onChange={() => handleMessageSelection(idx)}
                      style={{ position: 'absolute', top: 0, right: -30, zIndex: 2 }}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                  {/* Reply preview above message row */}
                  {msg.replyTo && (
                    <div style={{
                      background: '#f1f1f1',
                      borderLeft: '3px solid #007AFF',
                      padding: '6px 10px',
                      marginBottom: 4,
                      borderRadius: 6,
                      maxWidth: 260,
                      fontSize: 12,
                      color: '#555',
                      textAlign: 'left',
                      alignSelf: msg.from === user.id ? 'flex-end' : 'flex-start',
                      marginRight: msg.from === user.id ? 0 : undefined,
                      marginLeft: msg.from !== user.id ? 0 : undefined
                    }}>
                      <span style={{ fontWeight: 500, color: '#007AFF' }}>
                        {msg.replyTo.username ? msg.replyTo.username : (msg.replyTo.from === user.id ? 'You' : 'Friend')}
                      </span>
                      <br/>
                      <span style={{ color: '#333' }}>{msg.replyTo.message}</span>
                    </div>
                  )}
                  {/* Message row: avatar + message bubble + menu */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: msg.from === user.id ? 'row-reverse' : 'row',
                      alignItems: 'flex-end',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                    {/* Profile Picture */}
                    <div style={{ flexShrink: 0 }}>
                      {msg.from === user.id ? (
                        // Current user's profile picture
                        user?.profileImage ? (
                          <img 
                            src={user.profileImage} 
                            alt={user?.firstName}
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              objectFit: 'cover',
                              border: '2px solid #ddd'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              // e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              backgroundColor: '#007bff',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              border: '2px solid #ddd'
                            }}
                          >
                            {user?.firstName?.slice(0, 2).toUpperCase() || 'U'}
                          </div>
                        )
                      ) : (
                        // Other user's profile picture
                        selectedUser?.profileImage ? (
                          <img 
                            src={selectedUser.profileImage} 
                            alt={selectedUser?.firstName}
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              objectFit: 'cover',
                              border: '2px solid #ddd'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              // e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              backgroundColor: '#007AFF',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              border: '2px solid #ddd'
                            }}
                          >
                            {selectedUser?.firstName?.slice(0, 2).toUpperCase()}
                          </div>
                        )
                      )}
                    </div>
                    {/* Message Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === user.id ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          background: msg.from === user.id ? 'rgb(225, 223, 223)' : 'rgb(225, 223, 223)',
                          padding: '6px 12px',
                          borderRadius: 12,
                          margin: '2px 0',
                          wordWrap: 'break-word',
                          cursor: msg.fileUrl ? 'pointer' : 'default'
                        }}
                        onClick={msg.fileUrl ? () => window.open(msg.fileUrl, '_blank') : undefined}
                      >
                        {msg.message}
                        {msg.fileUrl && (
                          <div style={{ marginTop: '8px' }}>
                            {msg.fileType?.startsWith('image/') && (
                              <img 
                                src={msg.fileUrl} 
                                alt={msg.fileName || 'Image'} 
                                style={{ 
                                  maxWidth: '200px', 
                                  maxHeight: '200px', 
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              />
                            )}
                            {msg.fileType?.startsWith('video/') && (
                              <video 
                                src={msg.fileUrl} 
                                controls 
                                style={{ 
                                  maxWidth: '200px', 
                                  maxHeight: '200px', 
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              />
                            )}
                            {msg.fileType === 'application/pdf' && (
                              <div 
                                style={{ 
                                  padding: '8px', 
                                  backgroundColor: '#f0f0f0', 
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(msg.fileUrl, '_blank');
                                }}
                              >
                                <span role="img" aria-label="PDF">📄</span> {msg.fileName || 'PDF File'}
                              </div>
                            )}
                            {/* For other file types, show a generic link */}
                            {!msg.fileType?.startsWith('image/') && !msg.fileType?.startsWith('video/') && msg.fileType !== 'application/pdf' && (
                              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007AFF', textDecoration: 'underline' }}>
                                {msg.fileName || 'Download file'}
                              </a>
                            )}
                          </div>
                        )}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <span style={{ fontSize: '10px', color: '#666' }}>
                          {msg.timestamp ? formatTime(msg.timestamp) : ''}
                        </span>
                        {msg.from === user.id && (
                          <span style={{ fontSize: 10, color:msg.read ? 'rgb(43, 216, 66)' : '#999' }}>
                            {msg.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Show three-dots icon for all messages (not in selection mode) */}
                    {!isSelectionMode && (
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'absolute',
                          top: 0,
                          right: msg.from === user.id ? '-30px' : 'auto',
                          left: msg.from !== user.id ? '-30px' : 'auto',
                          zIndex: 10,
                          padding: 2
                        }}
                        onClick={e => {
                          e.stopPropagation();
                          // Menu size (should match the rendered menu)
                          const menuWidth = 70;
                          const menuHeight = 40;
                          let x = e.clientX;
                          let y = e.clientY;
                          // For your own messages, if menu would overflow right, show to the left
                          if (msg.from === user.id) {
                            // Find the chat area right edge
                            const chatArea = e.target.closest('[style*="background-color:white"][style*="border-radius:10px"]');
                            const chatAreaRect = chatArea ? chatArea.getBoundingClientRect() : null;
                            const chatAreaRight = chatAreaRect ? chatAreaRect.right : window.innerWidth;
                            if (x + menuWidth > chatAreaRight) {
                              x = x - menuWidth;
                            }
                          } else {
                            if (x + menuWidth > window.innerWidth) {
                              x = window.innerWidth - menuWidth - 8;
                            }
                          }
                          if (y + menuHeight > window.innerHeight) {
                            y = window.innerHeight - menuHeight - 8;
                          }
                          setContextMenu({ idx, x, y });
                        }}
                        title="Message options"
                      >
                        <HiOutlineDotsVertical style={{ fontSize: 18, color: '#888' }} />
                      </button>
                    )}
                    {/* Context menu for message */}
                    {contextMenu && contextMenu.idx === idx && (
                      <div
                        style={{
                          position: 'fixed',
                          top: contextMenu.y,
                          left: contextMenu.x,
                          background: 'white',
                          border: '1px solid #ccc',
                          borderRadius: 6,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 2000,
                          minWidth: 70,
                          minHeight: 40,
                          width: 70
                        }}
                      >
                        {msg.from === user.id ? (
                          <div
                            style={{ padding: '8px', cursor: 'pointer', textAlign:'left' }}
                            onClick={() => handleDeleteSingleMessage(idx)}
                          >
                            Delete
                          </div>
                        ) : (
                          <div
                            style={{ padding: '8px', cursor: 'pointer', textAlign:'left' }}
                            onClick={() => handleReplyToMessage({
                              ...msg,
                              username: selectedUser && selectedUser._id === msg.from ? selectedUser.firstName: undefined
                            })}
                          >
                            Reply
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* text message box */}
            <div style={{padding:'8px 16px', borderTop:'1px solid rgb(231, 230, 230)', backgroundColor:'white'}}>

              {/* Reply preview */}
              {replyTo && (
                <div style={{
                  background: '#f1f1f1',
                  borderLeft: '4px solid #007AFF',
                  padding: '8px 12px',
                  marginBottom: 6,
                  borderRadius: 6,
                  maxWidth: 400
                }}>
                  <span style={{ fontWeight: 'bold', color: '#007AFF' }}>Replying to:</span>
                  <br/>
                  <span style={{ color: '#333' }}>{replyTo.message}</span>
                  <button
                    style={{ marginLeft: 10, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                    onClick={() => setReplyTo(null)}
                  >✕</button>
                </div>
              )}
              <form onSubmit={handleSend} style={{ 
                display: 'flex', 
                marginTop: 'auto',
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'rgb(238, 237, 237)',
                padding: '5px 15px',
                alignItems:'center',
                border:'1px solid rgb(212, 212, 212)',
                borderRadius:'10px',
                gap:'10px'
              }}>

                <LuMic />
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={{ flex: 1, padding: 8, border:'none', outline:'none', backgroundColor:'rgb(238, 237, 237)' }}
                />
                
                <GrEmoji 
                  style={{ fontSize: "20px", cursor: "pointer", color:'gray' }} 
                  onClick={toggleEmojiPicker}
                />
                {showEmojiPicker && (
                  <div 
                    className="emoji-picker-container"
                    style={{
                      position: "absolute",
                      bottom: "60px",
                      left: "10px",
                      zIndex: "1000"
                    }}
                  >
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                
                {/* send files */}
                <label 
                  htmlFor="file-upload1" 
                  className="custom-file-upload1"
                  style={{ cursor: "pointer" }}
                >
                  <CiFolderOn style={{ fontSize: "20px", color:'gray' }} />
                </label>
                <input 
                  id="file-upload1" 
                  type="file" 
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.avi,.mov,.wmv,.pdf"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                
                {/* File preview and upload button */}
                {selectedFiles.length > 0 && (
                  <div style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "10px",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: "1000",
                    minWidth: "250px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>📎 {selectedFiles.length} files selected</span>
                      <button 
                        onClick={() => setSelectedFiles([])}
                        style={{ 
                          background: "none", 
                          border: "none", 
                          cursor: "pointer",
                          fontSize: "16px",
                          color: "#666"
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                      Total Size: {selectedFiles.reduce((sum, file) => sum + file.size, 0)}
                    </div>
                    {selectedFiles.map((file, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>{file.name}</span>
                        <button 
                          onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                          style={{ 
                            background: "none", 
                            border: "none", 
                            cursor: "pointer",
                            fontSize: "16px",
                            color: "#666"
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={handleFileUpload}
                      disabled={isUploading}
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: isUploading ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isUploading ? "not-allowed" : "pointer"
                      }}
                    >
                      {isUploading ? "Uploading..." : "Send Files"}
                    </button>
                  </div>
                )}

                <span
                    onClick={() => setClickDropdownTwo(!clickDropdowntwo)}
                    style={{ color: "grey", position: "relative" }}
                  >
                    <HiOutlineDotsVertical style={{ fontSize: "20px", color:'gray' }} />
                </span>
                  {clickDropdowntwo && (
                    <div
                      className="file-dropdown-container"
                      style={{
                        position: "absolute",
                        top: "-183px",
                        right: "55px",
                        zIndex: "100",
                      }}
                    >

                    {/* files options */}
                    <div>
                      <div
                        className="send-file-container"
                        style={{
                        backgroundColor: "white",
                        width: "150px",
                        height: "165px",
                        border: "1px solid #dfd8d8",
                        padding:"10px 15px",
                        display:"flex",
                        flexDirection:"column",
                        borderRadius:'10px'
                        }}
                      >
                      <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <label htmlFor="file-upload2" className="custom-file-upload2" style={{color:"gray"}}>
                          <CiCamera /> 
                          <span>Camera</span>
                        </label>
                        <input 
                          id="file-upload2" 
                          type="file" 
                          accept="image/*" 
                          capture="environment"
                          style={{color:"#4a4848"}} 
                          onChange={handleFileSelect}
                        />
                      </div>
                      <br/>
                      <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <label for="file-upload3" className="custom-file-upload3" style={{color:"gray"}}><GrGallery /> Gallery</label>
                        <input id="file-upload3" type="file" accept=".jpg,.jpeg,.pdf" style={{color:"#4a4848"}} 
                          onChange={handleFileSelect} />
                      </div>
                      <br/>
                      <div style={{display:"flex", gap:"10px", alignItems:"center", color:"gray"}}>
                        <MdOutlineAudiotrack />
                        <span>Audio</span>
                      </div>
                      <br/>
                      <div style={{display:"flex", gap:"10px", alignItems:"center", color:'gray'}}>
                        <VscLocation />
                        <span>Location</span>
                      </div>
                      <br/>
                      <div style={{display:"flex", gap:"10px", alignItems:"center", color:'gray'}}>
                        <RiUserFollowLine/>
                        <span>Contact</span>
                      </div>

                      </div>
                    </div>
                  </div>
                  )}

                <button type="submit" style={{ border:'none', backgroundColor:'#007AFF', color:'white', display:'flex', justifyContent:'center', borderRadius:'8px', padding:'8px 10px' }}>
                  <LuSend />
                </button>
              </form>
            </div>

          </>
        ) : (
          <div style={{padding:60, textAlign:'center'}}>

             <h2 style={{ margin: 0, color: '#495057' }}>Welcome, {users?.username || 'User'} !</h2>
             
             Select a user to start chatting
            
            <br/><br/>

            <button 
            onClick={handleLogout}
            style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Logout
            </button>

          </div>
        )}

        </div>

      </div>

    </div>

  {popup.show && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, background: 'rgba(0,0,0,0.2)'
  }}>
    <div style={{
      background: 'white',
      padding: '32px 40px',
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      fontSize: 18,
      color: '#333',
      textAlign: 'center',
      minWidth: 300
    }}>
      {popup.message}
      <br/>
      <button style={{ marginTop: 20, padding: '8px 24px', borderRadius: 6, background: '#007AFF', color: 'white', border: 'none', fontSize: 16, cursor: 'pointer' }} onClick={() => setPopup({ show: false, message: '' })}>OK</button>
    </div>
  </div>
  )}
  
  </>
  );
};

export default Chat;