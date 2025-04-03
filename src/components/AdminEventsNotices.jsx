import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Adjust path
import { ref, onValue, off, push, update, remove } from "firebase/database";
import Container from "../components/Container/Container"; // Adjust path
import SectionHeader from "../components/SectionHeader/SectionHeader"; // Adjust path


import Cookies from "js-cookie";

const AdminEventsNotices = () => {
    useEffect(() => {
        // Check authentication cookie
        if (!Cookies.get("auth")) {
          window.location.href = "/adminlogin"; // Redirect if not authenticated
          return;
        }
      }, []);
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", pdfUrl: "" });
  const [newNotice, setNewNotice] = useState({ title: "", pdfUrl: "" });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [editEventForm, setEditEventForm] = useState({});
  const [editNoticeForm, setEditNoticeForm] = useState({});

  useEffect(() => {
    const eventsRef = ref(db, "events");
    const noticesRef = ref(db, "notices");

    const eventUnsubscribe = onValue(
      eventsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setEvents(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
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
          setNotices(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.pdfUrl) {
      setError("Please fill in all fields for the event.");
      return;
    }
    try {
      await push(ref(db, "events"), {
        title: newEvent.title,
        pdfUrl: newEvent.pdfUrl,
        timestamp: new Date().toISOString(),
      });
      setNewEvent({ title: "", pdfUrl: "" });
      setError(null);
    } catch (error) {
      setError("Failed to add event.");
      console.error("Error adding event:", error);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.pdfUrl) {
      setError("Please fill in all fields for the notice.");
      return;
    }
    try {
      await push(ref(db, "notices"), {
        title: newNotice.title,
        pdfUrl: newNotice.pdfUrl,
        timestamp: new Date().toISOString(),
      });
      setNewNotice({ title: "", pdfUrl: "" });
      setError(null);
    } catch (error) {
      setError("Failed to add notice.");
      console.error("Error adding notice:", error);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setEditEventForm({ title: event.title, pdfUrl: event.pdfUrl });
  };

  const handleEditNotice = (notice) => {
    setEditingNoticeId(notice.id);
    setEditNoticeForm({ title: notice.title, pdfUrl: notice.pdfUrl });
  };

  const handleUpdateEvent = async (id) => {
    if (!editEventForm.title || !editEventForm.pdfUrl) {
      setError("Please fill in all fields for the event.");
      return;
    }
    try {
      await update(ref(db, `events/${id}`), editEventForm);
      setEditingEventId(null);
      setError(null);
    } catch (error) {
      setError("Failed to update event.");
      console.error("Error updating event:", error);
    }
  };

  const handleUpdateNotice = async (id) => {
    if (!editNoticeForm.title || !editNoticeForm.pdfUrl) {
      setError("Please fill in all fields for the notice.");
      return;
    }
    try {
      await update(ref(db, `notices/${id}`), editNoticeForm);
      setEditingNoticeId(null);
      setError(null);
    } catch (error) {
      setError("Failed to update notice.");
      console.error("Error updating notice:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await remove(ref(db, `events/${id}`));
        setError(null);
      } catch (error) {
        setError("Failed to delete event.");
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await remove(ref(db, `notices/${id}`));
        setError(null);
      } catch (error) {
        setError("Failed to delete notice.");
        console.error("Error deleting notice:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F6F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#39A935]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F6F5]">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F5] min-h-screen py-12 md:py-20">
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Admin - Events & Notices</span>}
        />
        {error && (
          <p className="text-red-500 text-center mb-6 font-medium">{error}</p>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Events Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-[#39A935] mb-6 border-b-2 border-[#E87722] pb-2">
              Manage Events
            </h2>

            {/* Add Event Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-[#E87722] mb-4">Add New Event</h3>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                  required
                />
                <input
                  type="url"
                  placeholder="PDF URL"
                  value={newEvent.pdfUrl}
                  onChange={(e) => setNewEvent({ ...newEvent, pdfUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-[#E87722] text-white rounded-lg hover:bg-[#39A935] transition-colors duration-300"
                >
                  Add Event
                </button>
              </form>
            </div>

            {/* Events List */}
            {events.length === 0 ? (
              <p className="text-gray-600 text-lg text-center italic">
                No events available.
              </p>
            ) : (
              <div className="space-y-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#39A935]"
                  >
                    {editingEventId === event.id ? (
                      <div className="space-y-4">
                        <input
                          value={editEventForm.title}
                          onChange={(e) =>
                            setEditEventForm({ ...editEventForm, title: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                        />
                        <input
                          value={editEventForm.pdfUrl}
                          onChange={(e) =>
                            setEditEventForm({ ...editEventForm, pdfUrl: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdateEvent(event.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingEventId(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-[#39A935]">
                          {event.title || "N/A"}
                        </h3>
                        <p className="text-gray-600 text-sm truncate">
                          {event.pdfUrl || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {event.timestamp
                            ? new Date(event.timestamp).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Date N/A"}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notices Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-[#39A935] mb-6 border-b-2 border-[#E87722] pb-2">
              Manage Notices
            </h2>

            {/* Add Notice Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-[#E87722] mb-4">Add New Notice</h3>
              <form onSubmit={handleAddNotice} className="space-y-4">
                <input
                  type="text"
                  placeholder="Notice Title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                  required
                />
                <input
                  type="url"
                  placeholder="PDF URL"
                  value={newNotice.pdfUrl}
                  onChange={(e) => setNewNotice({ ...newNotice, pdfUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-[#E87722] text-white rounded-lg hover:bg-[#39A935] transition-colors duration-300"
                >
                  Add Notice
                </button>
              </form>
            </div>

            {/* Notices List */}
            {notices.length === 0 ? (
              <p className="text-gray-600 text-lg text-center italic">
                No notices available.
              </p>
            ) : (
              <div className="space-y-6">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#39A935]"
                  >
                    {editingNoticeId === notice.id ? (
                      <div className="space-y-4">
                        <input
                          value={editNoticeForm.title}
                          onChange={(e) =>
                            setEditNoticeForm({ ...editNoticeForm, title: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                        />
                        <input
                          value={editNoticeForm.pdfUrl}
                          onChange={(e) =>
                            setEditNoticeForm({ ...editNoticeForm, pdfUrl: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A935]"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdateNotice(notice.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNoticeId(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-[#39A935]">
                          {notice.title || "N/A"}
                        </h3>
                        <p className="text-gray-600 text-sm truncate">
                          {notice.pdfUrl || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {notice.timestamp
                            ? new Date(notice.timestamp).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Date N/A"}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => handleEditNotice(notice)}
                            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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

export default AdminEventsNotices;