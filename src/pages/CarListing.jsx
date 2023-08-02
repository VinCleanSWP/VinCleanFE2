import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { useEffect, useState } from 'react';
import axios from 'axios';

const CarListing = () => {
  const [servicetype, setType] = useState([]);

  useEffect(() => {
    axios.get(`https://vinclean.azurewebsites.net/api/Type`)
    // axios.get(`https://localhost:7013/api/Type`)
      .then(response => {
        const data = response.data.data;
        setType(data);
      })
      .catch(error => {
        console.error('Error fetching blog list:', error);
      });
  }, []);

  return (
    <Helmet title="Service">
      <CommonSection title="Các loại dịch vụ" />

      <section>
        <Container>
          <Row>
            {/* <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sắp xếp
                </span>

                <select>
                  <option>Mặc định</option>
                  <option value="low">Giá thấp đến cao</option>
                  <option value="high">Giá cao đến thấp</option>
                </select>
              </div>
            </Col> */}

            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Đặt dịch vụ vệ sinh của chúng tôi</h6>
              <h2 className="section__title">Tìm dịch vụ mà bạn muốn</h2>
            </Col>

            {servicetype.map((item) => {
              if (item.avaiable === true) {
                return <CarItem item={item} key={item.typeId} />;
              } else {
                return null; // Nếu item.status không phải "available", trả về null để không hiển thị gì cả
              }
            })}

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
