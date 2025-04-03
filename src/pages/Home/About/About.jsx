import React from "react";
import Reavel from "../../../components/Reavel/Reavel";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Container from "../../../components/Container/Container";
import logo from "../../../assets/logo/logom.png";
import aboutus1 from "../../../assets/aboutus1.jpg";
import aboutus2 from "../../../assets/aboutus2.jpg";

const About = () => {
  return (
    <div
      className="bg-white pb-10 lg:pb-20"
      id="about"
      style={{ backgroundColor: "#F5F6F5" }}
    >
      <SectionHeader
        heading={<span style={{ color: "#E87722" }}>About Us</span>}
      />
      <Container>
        <div className="grid grid-cols-1 gap-12">
          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md min-w-sm rounded-xl shadow-lg"
                  loading="lazy"
                  object-fit="contain"
                  src={aboutus1}
                  alt="Khelo Mewat Facility"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="flex justify-center items-start mb-4">
                  <img
                    className="w-48"
                    src={logo}
                    alt="Khelo Mewat Logo"
                    loading="lazy"
                  />
                </div>
                <Reavel>
                  <p className="text-gray-700 text-lg">
                    The District Administration has been actively promoting
                    sports in Nuh by organizing the
                    <span className="font-semibold text-[#39A935]">
                      {" "}
                      “Khelo Mewat”{" "}
                    </span>
                    sports tournaments. This transformative initiative aims to
                    empower and develop local youth, particularly in rural areas
                    across the Nuh district of Haryana.
                  </p>
                </Reavel>
                <Reavel>
                  <p className="text-gray-700 mt-4">
                    Through a series of regional tournaments held in Gram
                    Panchayats and MCs, this program provides young athletes
                    with structured opportunities to showcase their talent and
                    engage in healthy competition.
                  </p>
                </Reavel>
                <Reavel>
                  <p className="text-gray-700 mt-4">
                    The key objectives of “Khelo Mewat” include promoting sports
                    and physical activity, identifying and developing talent,
                    fostering community engagement, encouraging education and
                    discipline, and reducing social issues by engaging youth in
                    positive activities.
                  </p>
                </Reavel>
              </div>
            </div>
          </FadeInAnimation>

          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md min-w-sm rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  src={aboutus2}
                  alt="Training Session"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="text-gray-700">
                  <Reavel>
                    <p
                      className="font-bold text-xl mb-4"
                      style={{ color: "#E87722" }}
                    >
                      Sports Categories:
                    </p>
                  </Reavel>
                  <ul className="list-disc ps-6 space-y-3">
                    <Reavel>
                      <li>Cricket</li>
                    </Reavel>
                    <Reavel>
                      <li>Volleyball</li>
                    </Reavel>
                    <Reavel>
                      <li>Tug of War</li>
                    </Reavel>
                    <Reavel>
                      <li>Wrestling</li>
                    </Reavel>
                    <Reavel>
                      <li>Athletics (Race)</li>
                    </Reavel>
                  </ul>
                </div>
                <div className="text-gray-700 mt-4">
                  <Reavel>
                    <p
                      className="font-bold text-xl mb-4"
                      style={{ color: "#E87722" }}
                    >
                      Team Participation:
                    </p>
                  </Reavel>
                  <p>
                    Each Gram Panchayat and MC Ward will be invited to field
                    teams in Cricket, Volleyball, Tug of War, Wrestling, and
                    Athletics. Each Panchayat and MC Ward can send one team per
                    sport. A total of 325 Panchayat teams and 59 Ward teams are
                    expected to participate in each sport.
                  </p>
                </div>
              </div>
            </div>
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default About;
