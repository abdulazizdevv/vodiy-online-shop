import React, { useState } from "react";
import Slider from "react-slick";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
// import "./carousel.css";

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.83,
    slidesToScroll: 1,
    centerMode: true,
    prevArrow: <MdKeyboardArrowLeft color={"black"} size={45} />,
    nextArrow: <MdOutlineKeyboardArrowRight color={"black"} size={45} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          // centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => {
        return <div key={index}>{slide}</div>;
      })}
    </Slider>
  );
};

export default Carousel;
