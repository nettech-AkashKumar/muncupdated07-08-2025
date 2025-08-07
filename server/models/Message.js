const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }],
  messages: [{
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    fileUrl: { type: String },
    fileType: { type: String },
    fileName: { type: String },
    replyTo: {
      message: { type: String },
      timestamp: { type: Date },
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String }
    }
  }],
  lastMessage: {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }
}, { timestamps: true });

// Create a compound index to ensure only one document per user pair
// MessageSchema.index({ participants: 1 }, { unique: true });

module.exports = mongoose.model('Message', MessageSchema); 