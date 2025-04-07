import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ref, onValue, off, update } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import Container from "../components/Container/Container";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notification, setNotification] = useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });

  useEffect(() => {
    if (!Cookies.get("auth")) {
      window.location.href = "/adminlogin";
      return;
    }

    const contactRef = ref(db, "contacts");
    const unsubscribe = onValue(
      contactRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const messagesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            status: data[key].status || "pending",
            lastReplyAttempt: data[key].lastReplyAttempt || null
          }));
          setMessages(messagesArray);
          filterByDate(messagesArray, startDate, endDate);
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to load messages.");
        console.error(error);
        setLoading(false);
      }
    );

    return () => off(contactRef, "value", unsubscribe);
  }, [startDate, endDate]);

  const filterByDate = (data, start, end) => {
    const filtered = data.filter((msg) => {
      const msgDate = new Date(msg.timestamp);
      const startFilter = start ? new Date(start) : null;
      const endFilter = end ? new Date(end + "T23:59:59") : null;
      return (
        (!startFilter || msgDate >= startFilter) &&
        (!endFilter || msgDate <= endFilter)
      );
    });
    setFilteredMessages(filtered);
  };

  const handleReply = async (message) => {
    try {
      const subject = `Re: ${message.subject || "Your Inquiry"}`;
      const body = `Dear ${message.name},\n\n` +
                   `Thank you for contacting us regarding:\n"${message.message}"\n\n` +
                   `We appreciate your feedback.\n\n` +
                   `Best regards,\nSupport Team`;

      // Update status in Firebase
      await update(ref(db, `contacts/${message.id}`), {
        status: "replied",
        lastReplyAttempt: new Date().toISOString()
      });

      // Open default email client
      const mailtoLink = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to initiate reply",
        severity: "error"
      });
    }
  };

  const handleMarkAsDone = async (messageId) => {
    try {
      await update(ref(db, `contacts/${messageId}`), { 
        status: "done",
        resolvedAt: new Date().toISOString()
      });
      setNotification({ 
        open: true, 
        message: "Marked as resolved", 
        severity: "success" 
      });
    } catch (error) {
      setNotification({ 
        open: true, 
        message: "Update failed", 
        severity: "error" 
      });
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Contact Messages Report", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Name", "Email", "Message", "Status", "Received At"]],
      body: filteredMessages.map((msg) => [
        msg.name,
        msg.email,
        msg.message,
        msg.status,
        new Date(msg.timestamp).toLocaleString()
      ]),
      headStyles: { fillColor: [57, 169, 53] },
      styles: { fontSize: 9 }
    });
    doc.save("contact_messages_report.pdf");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-orange-100 text-orange-800", text: "Pending" },
      replied: { color: "bg-blue-100 text-blue-800", text: "Replied" },
      done: { color: "bg-green-100 text-green-800", text: "Resolved" }
    };
    
    const { color, text } = statusConfig[status] || statusConfig.pending;
    return <span className={`px-2 py-1 rounded-full text-sm ${color}`}>{text}</span>;
  };

  return (
    <div className="bg-[#F5F6F5] py-10 md:py-20">
      <Container>
        <SectionHeader heading={<span className="text-[#E87722]">Contact Messages</span>} />
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full md:w-48"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full md:w-48"
              />
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-[#E87722] text-white rounded-lg hover:bg-[#39A935] flex items-center gap-2"
          >
            <EmailIcon fontSize="small" /> Export PDF
          </button>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg">
          {loading ? (
            <div className="flex justify-center py-8">
              <CircularProgress color="success" />
            </div>
          ) : error ? (
            <Alert severity="error" className="mb-4">{error}</Alert>
          ) : filteredMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No messages found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#39A935] text-white">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Received</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((msg) => (
                    <tr key={msg.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{msg.name}</td>
                      <td className="py-3 px-4">{msg.email}</td>
                      <td className="py-3 px-4 max-w-[300px]">{msg.message}</td>
                      <td className="py-3 px-4">{getStatusBadge(msg.status)}</td>
                      <td className="py-3 px-4">
                        {new Date(msg.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 flex gap-2 justify-center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleReply(msg)}
                          disabled={msg.status === 'done'}
                          startIcon={<EmailIcon />}
                        >
                          {msg.status === 'replied' ? 'Follow Up' : 'Reply'}
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() => handleMarkAsDone(msg.id)}
                          disabled={msg.status === 'done'}
                          startIcon={<CheckCircleIcon />}
                        >
                          Mark Resolved
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({...notification, open: false})}
        >
          <Alert severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default AdminContact;