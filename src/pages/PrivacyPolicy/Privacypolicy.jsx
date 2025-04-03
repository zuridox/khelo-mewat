import React from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div
      className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-12 mt-10"
      id="privacy-policy"
    >
      <Helmet>
        <title>Privacy Policy - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Privacy Policy</span>}
        />

        <FadeInAnimation>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="font-bold text-xl text-[#E87722]">
              Last Updated: February 2025
            </p>
            <p>
              Welcome to Khelo Mewat ("we," "our," or "us"). Your privacy is
              important to us, and this Privacy Policy explains how we collect,
              use, disclose, and protect your information when you visit our
              website <strong>(www.khelomewat.com)</strong>.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              1. Information We Collect
            </h2>
            <p>
              <strong>1.1 Personal Information:</strong>
            </p>
            <ul className="list-disc ps-6 space-y-3">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Location (if provided voluntarily)</li>
              <li>
                Any other information provided during registration or contact
              </li>
            </ul>

            <p className="mt-4">
              <strong>1.2 Non-Personal Information:</strong>
            </p>
            <ul className="list-disc ps-6 space-y-3">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on the website</li>
              <li>Cookies and usage data</li>
            </ul>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ps-6 space-y-3">
              <li>To facilitate tournament registration and participation</li>
              <li>To respond to inquiries and provide support</li>
              <li>To improve our website and user experience</li>
              <li>To send updates, notifications, and promotional materials</li>
              <li>To comply with legal requirements</li>
            </ul>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell, trade, or rent personal information. However, we
              may share information:
            </p>
            <ul className="list-disc ps-6 space-y-3">
              <li>With event organizers for tournament management</li>
              <li>With service providers assisting in website operations</li>
              <li>If required by law or to protect our legal rights</li>
            </ul>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies to enhance user experience and analyze website
              traffic. You can control cookie settings in your browser.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              5. Data Security
            </h2>
            <p>
              We implement security measures to protect personal information.
              However, no online platform is 100% secure.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              6. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              7. Your Rights and Choices
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc ps-6 space-y-3">
              <li>Access, correct, or delete your personal data</li>
              <li>Opt-out of promotional communications</li>
              <li>Disable cookies through browser settings</li>
            </ul>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              8. Children's Privacy
            </h2>
            <p>
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from minors.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with an updated revision date.
            </p>

            <h2 className="font-bold text-xl text-[#E87722] mt-6">
              10. Contact Us
            </h2>
            <p>If you have any questions, contact us at:</p>
            <p>
              <strong>Khelo Mewat</strong>
              <br />
              District sports office Near Radio Mewat Nuh Mewat, Haryana 122107
              <br />
              Email:{" "}
              <a href="mailto:dsomwt@gmail.com" className="text-[#E87722]">
                dsomwt@gmail.com
              </a>
              <br />
              Phone: +91 9992445551
            </p>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
