import axios from "axios";
import React, { useEffect, useState } from "react";
import EmailMessages from "../EmailMessages/EmailMessages";
import BASE_URL from "../../../../pages/config/config";

const Deleted = () => {
   const [deletedEmails, setDeletedEmails] = useState([]);

   useEffect(() => {
    const fetchDeletedEmails = async () => {
      try {
       const res = await axios.get(`${BASE_URL}/api/email/mail/deleted`)
       console.log('res status from delete', res)
       const formatted = res.data.data.map((email) => {
        const name = email.name;
          const initials = name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
          return {
            ...email,
            sender: { name, initials, backgroundColor: "#5e35b1" },
            subject: email.subject,
            messagePreview: (email.body || "").slice(0, 50) + "...",
            time: email.createdAt && !isNaN(new Date(email.createdAt))
              ? new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit', hour12: true
                }).format(new Date(email.createdAt))
              : 'Invalid Date',
            status: { dotColor: "red" },
            folders: { galleryCount: email.attachments?.length || 0 },
            tags: {
              starred: email.starred,
              extraLabelCount: 0
            }
          };
       })
        const deletedOnly = formatted.filter((email) => email.deleted);
        setDeletedEmails(deletedOnly);
      }catch(error) {
         console.error("Failed to fetch deleted emails", error);

      }
    }
    fetchDeletedEmails();
     const interval = setInterval(() => {
      fetchDeletedEmails();
    }, 1000);
    return () => clearInterval(interval)
   },[])

  return (
    
     <EmailMessages filteredEmails={deletedEmails} isDeletedPage={true}/>
    
  )
}

export default Deleted;
