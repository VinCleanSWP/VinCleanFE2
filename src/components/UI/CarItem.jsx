import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
import "../../styles/service-booking.css"

const CarItem = (props) => {
  // const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const { typeId, type1, img } = props.item;


  // useEffect(() => {
  //   axios.get(`https://vinclean.azurewebsites.net/api/Type`)
  //     .then(response => {
  //       const data = response.data.data;
  //       setServices(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching blog list:', error);
  //     });
  // }, []);

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img} alt="" style={{ width: '374.34px', height: '280px'}}/>
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{type1}</h4>
          <h6 className="rent__price text-center mt-">
          </h6>

        {/* option nếu có thêm description cho dịch vụ */}
          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              
            </span>
            <span className=" d-flex align-items-center gap-1">

            </span>
            <span className=" d-flex align-items-center gap-1">

            </span>
          </div>

            {/* Nút đặt dịch vụ */}
          <button className=" w-100 car__item-btn car__btn-details">
            {/* lúc bấm vào sẽ hiện đường dẫn /servicetype/1  */}
            <Link to={`/servicetype/${typeId}`}>ĐẶT DỊCH VỤ ▶</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};
export default CarItem