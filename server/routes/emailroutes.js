const express = require ('express');
const {sendEmail, receiveEmail, deleteEmail, starredEmail, getDeletedEmails, permanentDeleteEmails} = require ("../controllers/emailcontroller.js");
const emailrouter = express.Router();
const upload = require("../config/upload.js")

emailrouter.post("/send", upload.fields([{name:"attachments"}, {name:"images"}]), sendEmail);
emailrouter.get("/receive", receiveEmail);
emailrouter.put("/star/:id", starredEmail);
emailrouter.post("/delete",deleteEmail);
// get soft deleted mail 
emailrouter.get("/deleted", getDeletedEmails);
//delete permanently
emailrouter.post("/permanent-delete", permanentDeleteEmails)

module.exports = emailrouter;

