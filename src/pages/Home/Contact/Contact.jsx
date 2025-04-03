import React, { useState } from "react";
import Container from "../../../components/Container/Container";
import { ref, push } from "firebase/database"; 
import { db } from "../../../firebase/firebaseConfig"; 
import { FaPhoneAlt, FaClock } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Function to send data to Firebase Realtime Database
  const sendToFirebase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    const { name, email, message } = formData;

    try {
      const contactRef = ref(db, "contacts"); // Reference to "contacts" in the database
      await push(contactRef, {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Firebase Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F6F5] pb-16 lg:pb-8 pt-0" id="contact">
      <SectionHeader
        heading={<span style={{ color: "#39A935" }}>Contact Us</span>}
      />
      <Container>
        <FadeInAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10 shadow-lg bg-white rounded-xl border border-gray-200">
            {/* Contact Info Section */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-[#39A935] shadow-md bg-gray-50">
                <FaPhoneAlt className="text-3xl text-[#39A935]" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">Contact</p>
                  <p className="text-gray-600">Phone: +91 9992445551</p>
                  <p className="text-gray-600">Email: dsomwt@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-[#E87722] shadow-md bg-gray-50">
                <IoMdPin className="text-3xl text-[#E87722]" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">
                    District sports office Near Radio Mewat Nuh
                  </p>
                  <p className="text-gray-600">Mewat, Haryana 122107</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-[#39A935] shadow-md bg-gray-50">
                <FaClock className="text-3xl text-[#39A935]" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Working Hours
                  </p>
                  <p className="text-gray-600">
                    Sat - Thu: 09:00 AM - 10:00 PM
                  </p>
                  <p className="text-gray-600">Friday: 10:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <form
              onSubmit={sendToFirebase}
              className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div>
                <label
                  className="block text-gray-800 font-semibold mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A935] focus:outline-none bg-white text-gray-700 placeholder-gray-400"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-800 font-semibold mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none bg-white text-gray-700 placeholder-gray-400"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-800 font-semibold mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A935] focus:outline-none bg-white text-gray-700 placeholder-gray-400"
                  rows="4"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>

              {submitted && (
                <p className="text-[#39A935] text-center">
                  Message sent successfully!
                </p>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#39A935] hover:bg-[#2d8a2d]"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default Contact;
