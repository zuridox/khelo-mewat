import React from "react";
import Banner from "../Banner/Banner/Banner";
import Facilities from "../Facilities/Facilities";
import Testimonials from "../Testimonials/Testimonials";
import Contact from "../Contact/Contact";
import ScrollUp from "../../../components/ScrollUp/ScrollUp";
import Partners from "../Partners/Partners";
import InstructorsList from "../Instructor/InstructorsList";
import ScrollPageTop from "../../../components/ScrollPageTop/ScrollPageTop";
import Courses from "../Courses/Courses";
import About from "../About/About";
import { Helmet } from "react-helmet-async";
import EventsNotices from "../../../components/EventsNotices";
import DownloadForms from "../../../components/DownloadForm";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ScrollPageTop />
      <Banner />
      <EventsNotices />
      <DownloadForms />
      <Courses />

      <About />
      <Testimonials />
      <Contact />

      <ScrollUp />
    </div>
  );
};

export default Home;
