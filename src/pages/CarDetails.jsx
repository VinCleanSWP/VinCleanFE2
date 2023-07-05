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
    <Helmet title="Booking">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="about__img">
                <img src='https://static.tintuc.com.vn/images/ver3/2020/01/26/quet-nha.jpg' alt="" className="w-100" />
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="about__section-content">
                <h4 className="section__subtitle">About Service</h4>
                <h2 className="section__title">Welcome to car rent service</h2>
                <p className="section__description">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatum blanditiis esse accusantium dignissimos labore
                  laborum. Veniam, corporis mollitia temporibus, in quaerat vero
                  deleniti amet dolorem repudiandae, pariatur nam dolore! Impedit
                  neque sit ad temporibus quam similique dolor ipsam praesentium
                  sunt.
                </p>

                <div className="about__section-item d-flex align-items-center">
                  <p className="section__description d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit
                    amet.
                  </p>

                  <p className="section__description d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit
                    amet.
                  </p>
                </div>

                <div className="about__section-item d-flex align-items-center">
                  <p className="section__description d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit
                    amet.
                  </p>

                  <p className="section__description d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i> Lorem ipsum dolor sit
                    amet.
                  </p>
                </div>

              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <img src={service.img} alt="" className="w-100" />
            </Col>

            <Col lg="8" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm serviceId={selectedServiceId} />
              </div>
            </Col>

            <Col lg="4" className="mt-5">
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
