

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

import React, { useEffect, useState } from 'react';

import axios from 'axios';

const ServiceTypeDetail = () => {
  const typeId = useParams();
  const [service, setService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const id = parseInt(typeId.id);
  console.log(id);
  useEffect(() => {
    axios.get(`https://localhost:7013/api/Service/Type/${id}`)
      .then(response => {
        const data = response.data.data;
        setService(data);
      })
      .catch(error => {
        console.error('Error fetching service type detail:', error);
      });
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }
  return (
    <Helmet title="">
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={service.img} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title"></h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">

                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    {/* ({singleCarItem.rating} ratings) */}
                  </span>
                </div>

                <p className="section__description">
                  {/* {singleCarItem.description} */}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {singleCarItem.model} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {singleCarItem.automatic} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {singleCarItem.speed} */}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {/* {singleCarItem.gps} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {singleCarItem.seatType} */}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {/* {singleCarItem.brand} */}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm serviceId={selectedServiceId} />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Service</h5>

                <ul className="service-list">
                  {/* {service.map(service => (
                    <li className={`btn service-item ${service.selected ? 'selected' : ''}`} key={service.serviceId}>{service.name}</li>
                  ))} */}
                  {service.map(service => (
                    <li
                      className={`btn service-item ${service.serviceId === selectedServiceId ? 'selected' : ''}`}
                      key={service.serviceId}
                      onClick={() => setSelectedServiceId(service.serviceId)}
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ServiceTypeDetail;
