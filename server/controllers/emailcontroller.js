const EmailModal = require("../models/emailmodels.js");
const User = require("../models/usersModels.js");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (req, res) => {
  try {
    const { to, cc, bcc, from, subject, body, date, name, starred, bin, type } =
      req.body;

    const attachments = (req.files.attachments || []).map((file) => file.path);
    const images = (req.files.images || []).map((file) => file.path);

    // Ensure cc and bcc are always arrays
    const validCC = Array.isArray(cc) ? cc : cc ? [cc] : [];
    const validBCC = Array.isArray(bcc) ? bcc : bcc ? [bcc] : [];

    // Log for debugging
    console.log("Sending to:", to);
    console.log("CC:", validCC);
    console.log("BCC:", validBCC);
    console.log("CC is valid array:", Array.isArray(validCC));
    console.log("CC joined:", validCC && validCC.join(","));

    // Check for recipient existence
    // const allRecipients = [...to, ...validCC, ...validBCC];
    // const existingRecipients = await EmailModal.findOne({
    //   type: "sent",   // Only consider recipient from sent emails
    //   $or: [
    //     { to: { $in: to } },
    //     { cc: { $in: to } },
    //     { bcc: { $in: to } }
    //   ]
    // });

    // const mailType = existingRecipients ? "sent" : "inbox";

    // get logged in user Id and email
    let senderId = req.user?._id;
if (!senderId) {
  // fallback to a default system user ID
  const systemUser = await User.findOne({ email: process.env.EMAIL_USER }).select("_id");
  senderId = systemUser?._id;
}
    const email = new EmailModal({
      to,
      cc: validCC,
      bcc: validBCC,
      from: senderId,
      subject,
      body,
      attachments,
      date,
      image: images,
      name,
      starred,
      bin,
      type,
    });

    const savedEmail = await email.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: senderId,
      to: Array.isArray(to) ? to.join(",") : to,
      cc: validCC.length > 0 ? validCC.join(",") : undefined,
      bcc: validBCC.length > 0 ? validBCC.join(",") : undefined,
      subject,
      html: `<div style="white-space: pre-wrap;">${body}</div>`,
      attachments: [
        ...attachments.map((file) => ({ path: file })),
        ...images.map((img) => ({ path: img })),
      ],
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ success: true, message: "Email sent", data: savedEmail });
    // console.log("FILES RECEIVED:", req.files);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
    console.log("ERROR", error);
  }
};

const receiveEmail = async (req, res) => {
  try {
    const emails = await EmailModal.find({ deleted: false })
      .populate({
        path: "from",
        select: "firstName lastName email profileImage",
      })
      .sort({
        createdAt: -1,
      });
    // console.log("RAW EMAILS FROM DB:", JSON.stringify(emails, null, 2));
    const formattedEmails = emails.map((email) => {
        if (!email.from) {
    return {
      ...email.toObject(),
      from: { email: "unknown@example.com", firstName: "Unknown", lastName: "" }
    };
  }
      // console.log("EMAIL FROM FIELD TYPE:", typeof email.from, email.from);
      if (typeof email.from === "string") {
        return {
          ...email.toObject(),
          from: { email: email.from },
        };
      }
      return email;
    });

    // console.log(
    //   "FORMATTED EMAILS SENT TO FRONTEND:",
    //   JSON.stringify(formattedEmails, null, 2)
    // );
    res.status(200).json({ success: true, data: formattedEmails });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch emails",
      error: error.message,
    });
  }
};

const starredEmail = async (req, res) => {
  try {
    const email = await EmailModal.findByIdAndUpdate(
      req.params.id,
      { starred: req.body.starred },
      { new: true }
    );
    res.status(200).json({ success: true, data: email });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated starred",
      error: error.message,
    });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided" });
    }
    const result = await EmailModal.updateMany(
      { _id: { $in: ids } },
      { $set: { deleted: true } }
    );

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No emails found" });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} email(s) deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete emails",
      error: error.message,
    });
  }
};

const getDeletedEmails = async (req, res) => {
  try {
    const deletedEmails = await EmailModal.find({ deleted: true });
    res.status(200).json({ success: true, data: deletedEmails });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch deleted emails" });
  }
};

const permanentDeleteEmails = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided" });
    }
    const result = await EmailModal.deleteMany({
      _id: { $in: ids },
      deleted: true,
    });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} email(s) permanently deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to permanently delete",
      error: error.message,
    });
  }
};

module.exports = {
  sendEmail,
  receiveEmail,
  starredEmail,
  deleteEmail,
  getDeletedEmails,
  permanentDeleteEmails,
};
