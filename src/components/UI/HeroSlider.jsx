import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Một trong dịch vụ vệ sinh tốt nhất từ trước đến nay!</h4>
            <h1 className="text-light mb-4">CHÚNG TÔI CÓ THỂ LÀM CHO BẠN</h1>
            <h1 className="text-light mb-4">THÀNH NƠI TUYỆT VỜI HƠN</h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Bấm vào đây để đặt ➔</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Một trong dịch vụ vệ sinh tốt nhất từ trước đến nay!</h4>
            <h1 className="text-light mb-4">VỆ SINH LÀM TỐT</h1>
            <h1 className="text-light mb-4">MÔI TRƯỜNG CỦA BẠN</h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Bấm vào đây để đặt ➔</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Một trong dịch vụ vệ sinh tốt nhất từ trước đến nay!</h4>
            <h1 className="text-light mb-4">CHÚNG TÔI DỌN DẸP</h1>
            <h1 className="text-light mb-4">BẠN CỨ THOẢI MÁI</h1>
            <button className="btn reserve__btn mt-4">
              <Link to="/cars">Bấm vào đây để đặt ➔</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
