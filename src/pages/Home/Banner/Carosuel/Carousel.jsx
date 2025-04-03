import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "./Carousel.css";
import cricket from "../../../../assets/banner images/cricket1.jpg";
import vollyball from "../../../../assets/banner images/volleyball1.jpg";
import Tugofwars from "../../../../assets/banner images/Tugofwars1.jpg";
import runner from "../../../../assets/banner images/runner1.jpg";
import Wrestling from "../../../../assets/banner images/wrestling1.jpg";

const Carousel = () => {
  return (
    <>
      <div className="container">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2300,
            disableOnInteraction: false,
          }}
          speed={800}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[Autoplay, EffectCoverflow]}
        >
          <SwiperSlide>
            <img src={cricket} alt="Cricket" className="relative" />
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">
              Cricket
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={vollyball} alt="Volley Ball" className="relative" />
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">
              Volley Ball
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Tugofwars} alt="Tug of war" className="relative" />
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">
              Tug of war
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Wrestling} alt="Wrestling" className="relative" />
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">
              Wrestling{" "}
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={runner} alt="Athletics (Race)" className="relative" />
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">
              Athletics (Race)
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
