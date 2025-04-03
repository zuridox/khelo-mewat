import React from "react";
import "./Testimonials.css";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const TestimonialCard = ({ testimonial }) => {
  const { name, image, designation, testimony } = testimonial;

  return (
    <FadeInAnimation>
      <div className="text-center w-9/12 mx-auto ">
        <div className="flex justify-center items-center">
          <img className="max-w-20 testimony rounded-full" src={image} alt="" />
        </div>
        <p className="text-amber-500 dark:text-white font-semibold -mb-1.5">
          {name}
        </p>
        <span className="text-sm ">{designation}</span>
        <div className="mt-4 review text-gray-700 dark:text-white">
          {testimony}
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default TestimonialCard;
