import React from "react";
import logo from "../../../assets/logo/logom.png";
import facebook from "../../../assets/social/facebook.png";
import instagram from "../../../assets/social/instagram.png";
import whatsapp from "../../../assets/social/whatsapp.png";
import linkedin from "../../../assets/social/linkedin.png";
import youtube from "../../../assets/social/youtube.png";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="footer py-14 px-10 bg-[#39A935] text-base-content">
        <FadeInAnimation custom={1}>
          <aside className="flex flex-col items-center">
            <div className="relative">
              <div className="bg-white rounded-full p-3">
                <img
                  loading="lazy"
                  className="w-20 md:w-32"
                  src={logo}
                  alt="Logo"
                />
              </div>
            </div>
            <br />
            <p className="-mt-3 text-base font-semibold text-white">
              Let's Conquer Together
            </p>
            <div className="flex justify-center space-x-4 mt-5 py-4">
              <Link to="#">
                <img className="w-8" src={facebook} alt="Facebook" />
              </Link>
              <Link to="#">
                <img className="w-8" src={instagram} alt="Instagram" />
              </Link>
              <Link to="#">
                <img className="w-8" src={whatsapp} alt="WhatsApp" />
              </Link>
              <Link to="#">
                <img className="w-8" src={linkedin} alt="LinkedIn" />
              </Link>
              <Link to="#">
                <img className="w-8" src={youtube} alt="YouTube" />
              </Link>
            </div>
          </aside>
        </FadeInAnimation>
        <FadeInAnimation custom={2}>
          <nav>
            <header className="font-bold text-xl mb-3 text-white">
              Contact Us
            </header>
            <div className="flex flex-col space-y-3 text-base text-white">
              <p className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-[#E87722]" />
                District sports office Near Radio Mewat Nuh Mewat, Haryana
                122107
              </p>
              <p className="flex items-center gap-1">
                <FaPhoneAlt className="text-[#E87722]" />
                +91 9992445551
              </p>
              {/* <p className="flex items-center gap-1">
                <FaHeadset className="text-[#E87722]" />
                +91 7050068050
              </p> */}
              <p className="flex items-center gap-1">
                <FaEnvelope className="text-[#E87722]" />
                dsomwt@gmail.com
              </p>
            </div>
          </nav>
        </FadeInAnimation>
        <FadeInAnimation custom={3}>
          <nav>
            <header className="font-bold text-xl mb-3 text-white">
              Quick Links
            </header>
            <div className="flex flex-col space-y-3 text-base text-white">
              <Link to="/" className="link link-hover hover:text-[#E87722]">
                Home
              </Link>
              <Link
                to="/games"
                className="link link-hover hover:text-[#E87722]"
              >
                Games
              </Link>
              <Link
                to="/aboutus"
                className="link link-hover hover:text-[#E87722]"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="link link-hover hover:text-[#E87722]"
              >
                Contact Us
              </Link>
              <Link
                to="/privacypolicy"
                className="link link-hover hover:text-[#E87722]"
              >
                Privacy Policy
              </Link>
            </div>
          </nav>
        </FadeInAnimation>
        <FadeInAnimation custom={4}>
          <form>
            <header className="font-bold text-xl mb-3 text-white">
              Newsletter
            </header>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="text-base text-white">
                  Enter your email address
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full bg-white text-gray-700 border-[#E87722] focus:ring-2 focus:ring-[#E87722]"
                />
                <button className="btn bg-[#E87722] hover:bg-[#d66b1c] text-white absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </FadeInAnimation>
      </footer>
      <div className="footer-center p-6 bg-[#39A935] border-t border-[#E87722] text-white">
        <p>
          Copyright © {year} - All rights reserved. Developed by{" "}
          <a
            href="https://zuridox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e78f4c] hover:underline"
          >
            <b>Zuridox</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
