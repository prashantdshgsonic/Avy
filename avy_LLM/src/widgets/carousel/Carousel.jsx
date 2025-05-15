import React from "react";
import Slider from "react-slick";

export default function Carousel({ children }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: children.length < 2 ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    pauseOnHover: true,
    vertical: false,
    verticalSwiping: false
  };
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
