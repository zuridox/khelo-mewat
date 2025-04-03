import React, { useEffect, useState } from "react";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import InstructorCard from "./InstructorCard";
import Container from "../../../components/Container/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { getInstructor } from "../../../api/users";
import AzazSirPhoto from "../../../assets/social/AzazSirPhoto.png";

const InstructorsList = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructors data
    getInstructor()
      .then((data) => {
        if (data && data.length) {
          setInstructors(data);
        } else {
          // Use mock data if no data is returned
          setInstructors([
            {
              id: 1,
              name: "Shakib Al Hasan",
              expertise: "Fitness & Health",
              image:
                "https://i.ibb.co/cbwGjGp/384767622-240582351946454-4032876511897592603-n.jpg",
            },
            {
              id: 2,
              name: "Shakib Al Hasan",
              expertise: "Tennis",
              image:AzazSirPhoto,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
        // Set mock data in case of error
        setInstructors([
          {
            id: 1,
            name: "Prof. (Dr.) Khwaja M. Rafi",
            expertise: "Director, MEC",
            image:
              "https://github.com/savez2223/Mewat-College/blob/main/public/Director-Sir.jpg?raw=true",
          },
          {
            id: 2,
            name: "MR. AZAZ KHAN",
            expertise: "Coach",
            image: AzazSirPhoto,
          },
        ]);
      });
  }, []);

  /* Show only 6 data first */
  const visibleInstructors = instructors.slice(0, 6);

  return (
    <div className="dark:bg-gray-800 pb-10 lg:pb-20" id="instructors">
      <Container>
        <SectionHeader heading={"Our Instructors"}></SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleInstructors.map((instructor, index) => (
            <FadeInAnimation key={instructor.id} custom={index}>
              <InstructorCard instructor={instructor}></InstructorCard>
            </FadeInAnimation>
          ))}
        </div>
        <FadeInAnimation custom={1}>
          <div className="text-center">
            <Link
              to="/"
              className="btn bg-amber-500 mt-8 text-white custom-btn"
            >
              See More
            </Link>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default InstructorsList;
