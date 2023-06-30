import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
const CarItem = (props) => {
  // const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const { typeId, type1, img } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center"></h4>
          <h6 className="rent__price text-center mt-">


          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <h1>   {type1}</h1>


            </span>
            <span className=" d-flex align-items-center gap-1">

            </span>
            <span className=" d-flex align-items-center gap-1">

            </span>
          </div>


          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/servicetype/${typeId}`}>Details</Link>


          </button>
        </div>
      </div>
    </Col>
  );
};
export default CarItem