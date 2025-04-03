import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";

import cricket from "../../assets/banner images/cricket1.jpg";
import volleyball from "../../assets/banner images/volleyball1.jpg";
import tugofwar from "../../assets/banner images/Tugofwars1.jpg";
import runner from "../../assets/banner images/runner1.jpg";
import wrestling from "../../assets/banner images/wrestling1.jpg";

const Courses = () => {
  const navigate = useNavigate();

  const tournaments = [
    { id: 1, name: "Cricket", image: cricket, path: "cricket" },
    {
      id: 2,
      name: "Volleyball",
      image: volleyball,
      path: "volleyball",
    },
    { id: 3, name: "Tug of War", image: tugofwar, path: "tugofwars" },
    { id: 4, name: "Wrestling", image: wrestling, path: "wrestling" },
    {
      id: 5,
      name: "Athletics",
      image: runner,
      path: "race",
    },
  ];

  return (
    <div className="bg-[#F5F6F5] pb-10 md:pb-20 mt-10" id="tournaments">
      <Container>
        <SectionHeader
          heading={
            <span style={{ color: "#E87722" }}>Upcoming Tournaments</span>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tournaments.map((tournament, index) => (
            <FadeInAnimation custom={index} key={tournament.id}>
              <TournamentCard tournament={tournament} navigate={navigate} />
            </FadeInAnimation>
          ))}
        </div>
      </Container>
    </div>
  );
};

const TournamentCard = ({ tournament, navigate }) => {
  return (
    <div className="relative max-w-96 h-96 bg-cover bg-center rounded-xl overflow-hidden shadow-md transition-all duration-300">
      <img
        src={tournament.image}
        alt={tournament.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-[#39A935]/80 to-transparent">
        <h2 className="text-white text-2xl font-bold text-center mt-20">
          {tournament.name}
        </h2>
        <button
          onClick={() => navigate(tournament.path)}
          className="w-full py-2 font-semibold rounded-lg bg-[#E87722] hover:bg-[#39A935] text-white"
        >
          Participate Now
        </button>
      </div>
    </div>
  );
};

export default Courses;
