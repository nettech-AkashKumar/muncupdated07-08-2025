import "./Sidebar.css";
import Img from "../../../../assets/img/dp.jpg";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineInbox } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { RiDeleteBinLine, RiSpam2Line } from "react-icons/ri";
import { ImCompass } from "react-icons/im";
import { PiUploadLight } from "react-icons/pi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaSquarePlus } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { useEffect, useState } from "react";

import EmailModal from "../EmailModal/EmailModal";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [emailshow, setEmailShow] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const [showMores, setshowMores] = useState(false);
  const [showMoref, setshowMoref] = useState(false);
  const [emails, setEmails] = useState([]);

  const [customLabels, setCustomLabels] = useState(() => {
    const stored = localStorage.getItem("customLabels");
    return stored ? JSON.parse(stored) : [];
  });
  const [newLabelName, setNewLabelName] = useState("");
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  const drafts = JSON.parse(localStorage.getItem("emailDrafts")) || [];


  const fetchEmails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/email/receive");
      setEmails(res.data.data);
    } catch (error) {
      console.error("Failed to fetch emails", error);
    }
  };
  // for deleted
  const fetchDeletedCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/email/deleted");
      setDeletedCount(res.data.data.length);
    } catch (error) {
      console.error("Failed to fetch deleted emails", error);
    }
  };
  useEffect(() => {
    fetchEmails();
    fetchDeletedCount();

    const interval = setInterval(() => {
      fetchEmails();
      fetchDeletedCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="sidebarm">
        <div className="user-box">
          <img className="dp" src={Img} alt="profile" />
          <div>
            <div className="name">James Hong</div>
            <div className="emailhong">Jnh343@example.com</div>
          </div>
        </div>

        <div className="compose" onClick={() => setEmailShow(true)}>
          <FaRegEdit />
          Compose
        </div>
        <EmailModal show={emailshow} onClose={() => setEmailShow(false)} onSent={fetchEmails} />

        <div className="section border-bootom">
          <div className="section-title">Emails</div>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/inbox"
          >
            <span>
              <HiOutlineInbox />
              Inbox
            </span>{" "}
            <span className="count">
              {
                emails.filter(
                  (email) => email.type === "inbox" && !email.deleted
                ).length
              }
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/starred"
          >
            <span>
              <FaRegStar />
              Starred
            </span>{" "}
            <span>
              {emails.filter((email) => email.starred && !email.deleted).length}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/sent"
          >
            <span>
              <IoRocketOutline />
              Sent
            </span>{" "}
            <span>
              {
                emails.filter(
                  (email) => email.type === "sent" && !email.deleted
                ).length
              }
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/drafts"
          >
            <span>
              <FaRegFilePdf />
              Drafts
            </span>{" "}
            <span>
              <span>{drafts.length}</span>
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/deleted"
          >
            <span>
              <RiDeleteBinLine />
              Deleted{" "}
            </span>
            <span>{deletedCount}</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "item active" : "item")}
            style={{ textDecoration: "none" }}
            to="/mail/spam"
          >
            <span>
              <RiSpam2Line />
              Spam{" "}
            </span>
            <span>
              {emails.filter((email) => email.spam && !email.deleted).length}
            </span>
          </NavLink>
          {showMore && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "item active" : "item"
                }
                style={{ textDecoration: "none" }}
                to="/mail/important"
              >
                <span>
                  <ImCompass />
                  Important{" "}
                </span>
                <span>
                  {
                    emails.filter((email) => email.important && !email.deleted)
                      .length
                  }
                </span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "item active" : "item"
                }
                style={{ textDecoration: "none" }}
                to="/mail/allemails"
              >
                <span>
                  <PiUploadLight />
                  All Emails{" "}
                </span>
                <span>{emails.length}</span>
              </NavLink>
            </>
          )}

          <div className="item" onClick={() => setshowMore((prev) => !prev)}>
            {showMore ? "Show Less" : "Show More"}{" "}
            {!showMore && <FaAngleDown />} {showMore && <FaAngleUp />}{" "}
          </div>
        </div>
        {showLabelModal && (
          <div className="modal-overlay2">
            <div className="modal-content1">
              <h3>Add New Label</h3>
              <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="Enter label name"
              />
              <div className="modal-buttons">
                <button
                  onClick={() => {
                    if (newLabelName.trim()) {
                      setCustomLabels([...customLabels, newLabelName.trim()]);
                      setNewLabelName("");
                      setShowLabelModal(false);
                    }
                  }}
                >
                  Add
                </button>
                <button onClick={() => setShowLabelModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="section border-bootom">
          <div className="section-title">
            Labels{" "}
            <div className="plus" onClick={() => setShowLabelModal(true)}>
              <FaSquarePlus />
            </div>
          </div>
          {(showAllLabels ? customLabels : customLabels.slice(0, 5)).map(
            (label, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  isActive ? "item active" : "item"
                }
                style={{ textDecoration: "none", color: "black" }}
                to={`/${label.toLowerCase()}`}
              >
                <div className="label">
                  {" "}
                  <input type="checkbox" className="dot" /> {label}
                </div>
              </NavLink>
            )
          )}
          {/* <NavLink
          className={({ isActive }) => (isActive ? "item active" : "item")}
          style={{ textDecoration: "none", color: "black" }}
          to="/teamevents"
        >
          <div className="label">
            {" "}
            <input type="checkbox" className="dot team" /> Team Events
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "item active" : "item")}
          style={{ textDecoration: "none", color: "black" }}
          to="/work"
        >
          <div className="label">
            {" "}
            <input type="checkbox" className="dot work" /> Work
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "item active" : "item")}
          style={{ textDecoration: "none", color: "black" }}
          to="/external"
        >
          <div className="label">
            {" "}
            <input type="checkbox" className="dot external" /> External
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "item active" : "item")}
          style={{ textDecoration: "none", color: "black" }}
          to="/projects"
        >
          <div className="label">
            {" "}
            <input type="checkbox" className="dot projects" /> Projects
          </div>
        </NavLink> */}

          {customLabels.length > 5 && (
            <div
              className="item"
              onClick={() => setShowAllLabels((prev) => !prev)}
            >
              {showAllLabels ? "Show Less" : "Show More"}{" "}
              {!showAllLabels ? <FaAngleDown /> : <FaAngleUp />}
            </div>
          )}
        </div>

        {/* <div className='section border-bootom'>
        <div className='section-title'>Folders <div className='plus'><FaSquarePlus /></div></div>
        <NavLink className={({ isActive }) => isActive ? 'item active' : 'item'} style={{ textDecoration: 'none', color: 'black' }} to='/design'><div className='label'><FaFolder className='projects' /> Projects</div></NavLink>
        <NavLink className={({ isActive }) => isActive ? 'item active' : 'item'} style={{ textDecoration: 'none', color: 'black' }} to='/design'><div className='label'><FaFolder className='personal' /> Personal</div></NavLink>
        <NavLink className={({ isActive }) => isActive ? 'item active' : 'item'} style={{ textDecoration: 'none', color: 'black' }} to='/design'><div className='label'><FaFolder className='finance' /> Finance </div></NavLink>
        {showMoref && (<>
          <NavLink className={({ isActive }) => isActive ? 'item active' : 'item'} style={{ textDecoration: 'none', color: 'black' }} to='/design'><div className='label'><FaFolder className='projectk' />Projects </div></NavLink>
        </>)}
        <div className='item' onClick={() => setshowMoref(prev => !prev)}>{showMoref ? "Show Less" : "Show More"} {!showMoref && <FaAngleDown />} </div>


      </div> */}
      </div>
    </>
  );
};

export default Sidebar;
