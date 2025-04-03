import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Adjust path
import { ref, onValue, off } from "firebase/database";
import Container from "../components/Container/Container"; // Adjust path
import SectionHeader from "../components/SectionHeader/SectionHeader"; // Adjust path

const EventsNotices = () => {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventsRef = ref(db, "events");
    const noticesRef = ref(db, "notices");

    const eventUnsubscribe = onValue(
      eventsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setEvents(
            Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          );
        } else {
          setEvents([]);
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to load events.");
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    );

    const noticeUnsubscribe = onValue(
      noticesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setNotices(
            Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          );
        } else {
          setNotices([]);
        }
        setLoading(false);
      },
      (error) => {
        setError("Failed to load notices.");
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    );

    return () => {
      off(eventsRef, "value", eventUnsubscribe);
      off(noticesRef, "value", noticeUnsubscribe);
    };
  }, []);

  const handleDownload = (pdfUrl, title) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isRecent = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date();
    const itemDate = new Date(timestamp);
    const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // Items within 7 days are "new"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F6F5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#39A935] border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F6F5]">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F5]">
      <Container>
        <div className="text-center mb-12">
          <SectionHeader
            heading={<span style={{ color: "#E87722" }}>Events & Notices</span>}
          />
          <p className="text-gray-600 text-lg mt-2 font-light">
            Stay updated with our latest events and important announcements
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Notices Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#39A935] mb-8 border-b-2 border-[#E87722] pb-3 tracking-tight">
              Latest Notices
            </h2>
            {notices.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-600 italic text-lg">
                No notices available at the moment.
              </div>
            ) : (
              <div className="space-y-6">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-[#39A935] cursor-pointer relative overflow-hidden"
                    onClick={() => handleDownload(notice.pdfUrl, notice.title)}
                  >
                    {isRecent(notice.timestamp) && (
                      <span className="absolute top-2 right-2 bg-[#E87722] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="bg-[#39A935] p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#39A935] mb-1 tracking-tight">
                          {notice.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {notice.timestamp
                            ? new Date(notice.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Date N/A"}
                        </p>
                      </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#E87722] to-[#F5A623] text-white font-medium rounded-lg hover:from-[#39A935] hover:to-[#4CAF50] transition-all duration-300">
                      Download Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Events Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#39A935] mb-8 border-b-2 border-[#E87722] pb-3 tracking-tight">
              Upcoming Events
            </h2>
            {events.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-600 italic text-lg">
                No events available at the moment.
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-[#39A935] cursor-pointer relative overflow-hidden"
                    onClick={() => handleDownload(event.pdfUrl, event.title)}
                  >
                    {isRecent(event.timestamp) && (
                      <span className="absolute top-2 right-2 bg-[#E87722] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="bg-[#39A935] p-3 rounded-full">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#39A935] mb-1 tracking-tight">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {event.timestamp
                            ? new Date(event.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Date N/A"}
                        </p>
                      </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#E87722] to-[#F5A623] text-white font-medium rounded-lg hover:from-[#39A935] hover:to-[#4CAF50] transition-all duration-300">
                      Download Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventsNotices;
