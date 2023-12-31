import React, { useState } from "react";
import Slider from "react-slick";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
// import "./carousel.css";
// import styles from "../../styles/carousel.module.css";

interface CarouselProps {
  slides: React.ReactNode[];
}

const CategorySlider: React.FC<CarouselProps> = ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 2.83,
    slidesToScroll: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          //   centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="width-[300px]">
      <Slider {...settings}>
        {slides.map((slide, index) => {
          return (
            <div className="w-[50px]" key={index}>
              {slide}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CategorySlider;
