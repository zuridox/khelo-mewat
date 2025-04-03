import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const TypingEffect = () => {
  const [texts] = useTypewriter({
    words: [
      "Cricket",
      "Volleyball",
      "Tug of War",
      "Wrestling",
      "Athletics (Race)",
    ],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 1500,
  });

  return (
    <div className="text-white text-center">
      <h2 className="md:text-6xl text-4xl font-bold tracking-tight">
        Khelo Mewat
      </h2>
      <h4
        className="md:text-3xl text-2xl font-semibold bg-[#E87722] md:w-4/6 w-11/12 rounded-lg mx-auto py-3 px-4 mt-6 mb-8"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      >
        District Programme for Development of Sports
      </h4>
      <div className="md:text-3xl text-2xl font-semibold text-[#E87722]">
        <span>{texts}</span>
        <Cursor cursorStyle="|" cursorColor="#E87722" />
      </div>
      <p className="mt-6 mb-8 md:text-lg text-base leading-relaxed max-w-2xl mx-auto">
        The District Administration have been working to promote sports in Nuh,
        by organizing “Khelo Mewat” sports tournaments. “Khelo Mewat” is a
        transformative sports initiative aimed at empowering and developing
        local youth, particularly in rural areas, across the Nuh district of
        Haryana.
      </p>
      <Link to="/games">
        <a className="bg-[#E87722] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-[#39A935] transition duration-300">
          Participate Now
        </a>
      </Link>
    </div>
  );
};

export default TypingEffect;
