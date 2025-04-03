import React from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import extraImage1 from "../../assets/aboutus1.jpg";
import extraImage2 from "../../assets/aboutus2.jpg";
import aboutmain from "../../assets/aboutmain.jpg";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-12 mt-10" id="about-us">
      <Helmet>
        <title>About Us - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>About Khelo Mewat</span>}
        />

        {/* Logo Section */}
        <FadeInAnimation>
          <div className="flex justify-center items-center md:mb-10 mb-5">
            <Link to={"/"}>
              <img
                className="w-40 md:w-48"
                src={logo}
                alt="Khelo Mewat Logo"
                loading="lazy"
              />
            </Link>
          </div>
        </FadeInAnimation>

        {/* Text and Image Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <FadeInAnimation>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                The District Administration has been actively promoting sports
                in Nuh by organizing the
                <span className="font-semibold text-[#39A935]">
                  {" "}
                  "Khelo Mewat"
                </span>
                sports tournaments. This initiative empowers and develops local
                youth, particularly in rural areas, by providing structured
                opportunities for competition.
              </p>
            </div>
          </FadeInAnimation>
          <FadeInAnimation>
            <img
              className="w-3/4 md:w-2/3 rounded-lg"
              src={extraImage1}
              alt="Khelo Mewat Event 1"
              loading="lazy"
            />
          </FadeInAnimation>
        </div>

        {/* Objectives */}
        <div className="mt-10">
          <FadeInAnimation>
            <p className="font-bold text-xl text-[#E87722]">Objectives:</p>
            <ul className="list-disc ps-6 space-y-3 text-gray-700 text-lg">
              <li>
                <strong>Promoting Sports and Physical Activity:</strong>{" "}
                Encouraging youth to participate in sports.
              </li>
              <li>
                <strong>Talent Identification and Development:</strong>{" "}
                Providing a platform for young athletes.
              </li>
              <li>
                <strong>Community Engagement:</strong> Bringing people together
                through sports.
              </li>
              <li>
                <strong>Encouraging Education and Discipline:</strong>{" "}
                Instilling values of teamwork and perseverance.
              </li>
              <li>
                <strong>Reducing Social Issues:</strong> Engaging youth in
                positive activities.
              </li>
            </ul>
          </FadeInAnimation>
        </div>

        {/* Sports Categories & Image */}
        <div className="grid md:grid-cols-2 gap-8 items-center mt-10">
          <FadeInAnimation>
            <img
              className="w-3/4 md:w-2/3 rounded-lg"
              src={extraImage2}
              alt="Khelo Mewat Event 2"
              loading="lazy"
            />
          </FadeInAnimation>
          <FadeInAnimation>
            <div>
              <p className="font-bold text-xl text-[#E87722]">
                Sports Categories:
              </p>
              <p className="text-gray-700 text-lg">
                The Khelo Mewat sports tournament includes:
              </p>
              <ul className="list-disc ps-6 space-y-3 text-gray-700 text-lg">
                <li>Cricket</li>
                <li>Volleyball</li>
                <li>Tug of War</li>
                <li>Wrestling</li>
                <li>Athletics (Race)</li>
              </ul>
            </div>
          </FadeInAnimation>
        </div>

        {/* Additional Information */}
        <div className="mt-10 text-gray-700 text-lg leading-relaxed">
          <FadeInAnimation>
            <p className="font-bold text-xl text-[#E87722]">
              Team Participation:
            </p>
            <p>
              Each Gram Panchayat and MC Ward can send one team per sport, with
              a total of 325 Panchayat teams and 59 Ward teams expected to
              participate.
            </p>
            <br />
            <p className="font-bold text-xl text-[#E87722]">
              Infrastructure and Facilities:
            </p>
            <p>
              The District Administration provides well-maintained sports
              grounds, referees, and medical assistance.
            </p>
            <br />
            <p className="font-bold text-xl text-[#E87722]">
              Training and Coaching Programs:
            </p>
            <p>
              Khelo Mewat offers specialized training camps led by experienced
              coaches.
            </p>
            <br />
            <p className="font-bold text-xl text-[#E87722]">
              Community Impact:
            </p>
            <p>
              This initiative fosters teamwork, discipline, and perseverance
              among the youth.
            </p>
            <br />
            <p className="font-bold text-xl text-[#E87722]">Join Us!</p>
            <p>
              Khelo Mewat is a stepping stone for young talent. Whether you are
              an aspiring athlete or a supporter, be part of this transformative
              journey.
            </p>
            <p>
              Together, let's build a stronger, healthier, and more united Mewat
              through sports!
            </p>
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
