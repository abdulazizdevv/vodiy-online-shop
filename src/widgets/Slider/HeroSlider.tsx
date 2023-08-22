import React from "react";
import Slider from "react-slick";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import Image from "next/image";
import HeroPhone from "../../../public/images/heroPhone.png";

const HeroCarousel: React.FC<any> = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <MdKeyboardArrowLeft color={"black"} size={45} />,
    nextArrow: <MdOutlineKeyboardArrowRight color={"black"} size={45} />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div>
        <Image
          src={HeroPhone}
          style={{ width: "100%", height: "100%" }}
          alt="hero"
        />
      </div>
      <div>
        <Image
          src={HeroPhone}
          style={{ width: "100%", height: "100%" }}
          alt="hero"
        />
      </div>
      <div>
        <Image
          src={HeroPhone}
          style={{ width: "100%", height: "100%" }}
          alt="hero"
        />
      </div>
      <div>
        <Image
          src={HeroPhone}
          style={{ width: "100%", height: "100%" }}
          alt="hero"
        />
      </div>
    </Slider>
  );
};

export default HeroCarousel;
