import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import "./Testimonials.css";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import Container from "../../../components/Container/Container";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("testimonials.json");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-[#F5F6F5] py-0" style={{ backgroundColor: "#F5F6F5" }}>
      <SectionHeader
        heading={
          <span style={{ color: "#39A935" }}>What Our Community Says</span>
        }
      />
      <Container>
        <Swiper
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={800}
          grabCursor={true}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            // Use renderBullet for custom styling instead of invalid class names
            renderBullet: (index, className) => {
              return `<span class="${className}" style="background-color: #E87722;"></span>`;
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {loading ? (
            <div className="text-center text-gray-600 text-lg py-10">
              Loading testimonials...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg py-10">
              Error: {error}
            </div>
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial.id} // Unique key from testimonial data
                className="flex justify-center items-center py-0"
              >
                <FadeInAnimation>
                  <TestimonialCard testimonial={testimonial} />
                </FadeInAnimation>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg py-10">
              No testimonials available at the moment.
            </div>
          )}
        </Swiper>
      </Container>
    </div>
  );
};

export default Testimonials;
