import React, { useState, useRef, useEffect } from "react";
import "../EmailModal/EmailModal.css";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { RiAttachment2 } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { CiFaceSmile } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { GoScreenFull } from "react-icons/go";
import { toast } from "react-toastify";

const EmailModal = ({
  show,
  onClose,
  to: initialTo = "",
  subject: initialSubject = "",
  body: initialBody = "",
  onSent
}) => {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [images, setImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  // sync when props change for (reply and forward)
  useEffect(() => {
    setTo(initialTo);
    setSubject(initialSubject);
    setBody(initialBody);
  }, [initialTo, initialSubject, initialBody]);

  const fileInputRef = useRef();
  const imageInputRef = useRef();

  // for attachment
  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const nonImageFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );
    setAttachments((prev) => [...attachments, ...nonImageFiles]);
  };
  // for image
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imageFiles]);
  };

  // for emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (emojiData) => {
    setBody((prev) => prev + emojiData.emoji);
  };

  if (!show) return null;

  const handleSend = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("to", to);
      formData.append("from", ""); // use default or actual
      formData.append("subject", subject);
      formData.append("body", body);
      formData.append("cc", cc);
      formData.append("bcc", bcc);
      formData.append("name", "You");
      formData.append("starred", false);
      formData.append("bin", false);
      formData.append("type", "sent");

      //append files
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });
      images.forEach((img) => {
        formData.append("images", img);
      });

      await axios.post("http://localhost:5000/api/email/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Email sent successfully!", {
        position: 'top-center'
      });
      if (onSent) {
        onSent();
      }
      onClose();
    } catch (error) {
      console.error("Error sending email", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleDelete = () => {
    // Clear all input fields
    setTo("");
    setSubject("");
    setBody("");
    setCc("");
    setBcc("");
    setAttachments([]);
    setShowCc(false);
    setShowBcc(false);
    setShowEmojiPicker(false);
    setIsExpanded(false); // Optional: shrink modal back

    // Close the modal
    onClose();
  };

  const handleInsertLink = () => {
    if (!linkText || !linkUrl) {
      alert("Please enter both text and URL");
      return;
    }

    // Append formatted link to body
    const formattedLink = `${linkText} (${linkUrl})`;
    setBody((prev) => prev + formattedLink);

    // Reset
    setShowLinkInput(false);
    setLinkText("");
    setLinkUrl("");
  };

  // handledraftdelete
  const handleDraftDelete = () => {
    const isContentFilled =
      to || subject || body || attachments.length || images.length;

    if (isContentFilled) {
      const newDraft = {
        to,
        subject,
        body,
        cc,
        bcc,
        attachments: [], // Don't save File objects, just names or empty
        images: [],
        timestamp: new Date().toISOString(),
        type: "draft",
      };

      const existingDrafts =
        JSON.parse(localStorage.getItem("emailDrafts")) || [];
      existingDrafts.push(newDraft);
      localStorage.setItem("emailDrafts", JSON.stringify(existingDrafts));
    }

    // Reset all fields
    setTo("");
    setSubject("");
    setBody("");
    setCc("");
    setBcc("");
    setAttachments([]);
    setImages([]);
    setShowCc(false);
    setShowBcc(false);
    setShowEmojiPicker(false);
    setIsExpanded(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className={`email-modal ${isExpanded ? "expanded-modal" : ""}`}>
        <div className="modal-header1">
          <span>Compose New Email</span>
          <div className="header-actions">
            <button className="btns minus" onClick={onClose}>
              <FaMinus />
            </button>
            <button className="btns minus" onClick={toggleExpanded}>
              <GoScreenFull />
            </button>
            <button className="btns minus" onClick={handleDraftDelete}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body1">
          <div className="to-field">
            <label>To</label>
            <input
              type="email"
              defaultValue="Angela Thomas"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <span className="cc-bcc" onClick={() => setShowCc(!showCc)}>
              Cc
            </span>
            <span
              style={{ marginLeft: "10px" }}
              className="cc-bcc "
              onClick={() => setShowBcc(!showBcc)}
            >
              Bcc
            </span>
          </div>
          {/* for cc */}
          {showCc && (
            <div className="to-field">
              <label htmlFor="">Cc</label>
              <input
                type="email"
                placeholder="Add Cc"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
              />
            </div>
          )}
          {/* for Bcc */}
          {showBcc && (
            <div className="to-field">
              <label htmlFor="">Bcc</label>
              <input
                type="email"
                placeholder="Add Bcc"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="">Subject </label>
            <input
              type="text"
              className="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="email-body"
              placeholder="Compose Email"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {/* image preview */}
            {images.length > 0 && (
              <div className="image-preview">
                <h4>Images</h4>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    width="100"
                    style={{ marginRight: "10px", borderRadius: "5px" }}
                  />
                ))}
              </div>
            )}
            {/* Attachment preview */}
            {attachments.length > 0 && (
              <div className="attachment-preview">
                <h4>Attachments:</h4>
                {attachments.map((file, i) => (
                  <div key={i}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <div className="footer-icons">
            <button onClick={handleAttachmentClick}>
              <RiAttachment2 />
            </button>
            <button onClick={() => imageInputRef.current.click()}>
              <HiOutlinePhotograph />
            </button>
            <button onClick={() => setShowLinkInput((prev) => !prev)}>
              <AiOutlineLink />
            </button>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <CiFaceSmile />
            </button>

            {/* for handle input */}
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div>
            {/* <button
              className="btns"
              onClick={() => setShowCalendar((prev) => !prev)}
            >
              <MdOutlineEditCalendar />
            </button> */}
            <button onClick={handleDelete} className="btns">
              <RiDeleteBinLine />
            </button>
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "Sending" : "Send ➜"}
            </button>
          </div>
        </div>
        {showCalendar && (
          <div className="calendar-popup">
            <input type="date" />
          </div>
        )}

        {showLinkInput && (
          <div
            className="link-input-box"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Text to display"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <button onClick={handleInsertLink}>Insert</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailModal;
