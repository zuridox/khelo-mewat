import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase/firebaseConfig"; // Adjust path as needed
import Container from "../components/Container/Container"; // Adjust path
import SectionHeader from "../components/SectionHeader/SectionHeader"; // Adjust path
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Check authentication cookie
    if (!Cookies.get("auth")) {
      window.location.href = "/adminlogin"; // Redirect if not authenticated
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
          }));
          setMessages(messagesArray);
          filterByDate(messagesArray, startDate, endDate);
        } else {
          setMessages([]);
          setFilteredMessages([]);
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to load messages. Please try again later.");
        console.error("Error fetching contact messages:", error);
        setLoading(false);
      }
    );

    return () => {
      off(contactRef, "value", unsubscribe);
    };
  }, [startDate, endDate]);

  const filterByDate = (data, start, end) => {
    if (!start && !end) {
      setFilteredMessages(data);
      return;
    }
    const filtered = data.filter((msg) => {
      const msgDate = new Date(msg.timestamp);
      const startFilter = start ? new Date(start) : null;
      const endFilter = end ? new Date(end) : null;
      return (
        (!startFilter || msgDate >= startFilter) &&
        (!endFilter || msgDate <= endFilter)
      );
    });
    setFilteredMessages(filtered);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Contact Messages Report", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Name", "Email", "Message", "Timestamp"]],
      body: filteredMessages.map((msg) => [
        msg.name || "N/A",
        msg.email || "N/A",
        msg.message || "N/A",
        msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "N/A",
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [57, 169, 53] },
    });
    doc.save("contact_messages_report.pdf");
  };

  return (
    <div className="bg-[#F5F6F5] py-10 md:py-20">
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Contact Messages</span>}
        />
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-[#E87722] text-white rounded-lg hover:bg-[#39A935] self-end"
          >
            Download PDF
          </button>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          {loading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-[#39A935] text-white">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Message</th>
                    <th className="py-2 px-4 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((msg) => (
                    <tr key={msg.id} className="border-t hover:bg-gray-100">
                      <td className="py-2 px-4">{msg.name || "N/A"}</td>
                      <td className="py-2 px-4">{msg.email || "N/A"}</td>
                      <td className="py-2 px-4">{msg.message || "N/A"}</td>
                      <td className="py-2 px-4">
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AdminContact;
