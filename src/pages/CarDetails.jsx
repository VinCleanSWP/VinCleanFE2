import carData from "../assets/data/carData";
import { Container, Row, Col, Modal } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import '../styles/rating-list.css';
import moment from "moment";
import _ from 'lodash';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

const ServiceTypeDetail = () => {
  const typeId = useParams();
  const [service, setService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState();
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCost, setSelectedServiceCost] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const id = parseInt(typeId.id);
  console.log(id);


  useEffect(() => {
    axios.get(`https://localhost:7013/api/Service/Type/${id}`)
      .then(response => {
        const data = response.data.data;
        setService(data);
        setSelectedType(typeId.type1);
      })
      .catch(error => {
        console.error('Error fetching service type detail:', error);
      });




    axios.get(`https://localhost:7013/api/Rating/Service/${id}`)
      .then(response => {
        const data = response.data.data;
        setRating(data);
      })
      .catch(error => {
        console.error('Error fetching rating list:', error);
      });
  }, [id]);



  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      background: '#fff',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      maxWidth: '600px',
      width: '100%',
    },
    title: {
      marginTop: 0,
    },
    closeButton: {
      marginLeft: 'auto',
      display: 'block',
      padding: '8px 12px',
      background: '#ccc',
      color: '#fff',
      borderRadius: '4px',
    },
  };



  const averageRate = _.meanBy(rating, 'rate');
  const averageRateInt = Math.round(averageRate);

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

              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <img src={service.img} alt="" className="w-100" />
            </Col>

            {/* <Col lg="6">
              <div className="car__info">
                <h2 className="section__title"></h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">

                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    {/* <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
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

                <p className="section__description">
                  {singleCarItem.description}
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
                    {singleCarItem.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.automatic}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.speed}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.seatType}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.brand}
                  </span>
                </div>
              </div>
            </Col> */}

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Thông tin đặt</h5>
                <BookingForm serviceId={selectedServiceId} selectedServiceName={selectedServiceName}
                  selectedServiceType={selectedType} selectedServiceCost={selectedCost} />
              </div>
            </Col>

            <Col lg="4" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Chọn dịch vụ</h5>

                <ul className="service-list">
                  {/* {service.map(service => (
                    <li className={`btn service-item ${service.selected ? 'selected' : ''}`} key={service.serviceId}>{service.name}</li>
                  ))} */}
                  {/* {service.map(service => (
                    <li
                      className={`btn service-item ${service.serviceId === selectedServiceId ? 'selected' : ''}`}
                      key={service.serviceId}
                      onClick={() => setSelectedServiceId(service.serviceId)}
                    >
                      {service.name}/
                      {service.costPerSlot}vnd
                    </li>
                  ))} */}

                  {service.map(service => (
                    <li
                      className={`btn service-item ${service.serviceId === selectedServiceId ? 'selected' : ''}`}
                      key={service.serviceId}
                      onClick={() => {
                        setSelectedServiceId(service.serviceId);
                        setSelectedServiceName(service.name);
                        setSelectedServiceCost(service.cost)

                      }}
                    >
                      {service.name} / {service.cost} VND
                    </li>
                  ))}

                </ul>


              </div>
            </Col>
          </Row>

          <div className="rating">
            <h4>ĐÁNH GIÁ DỊCH VỤ</h4>
            <div className="average-rating">
              <h3>Điểm đánh giá: {averageRate.toFixed(1)}/5</h3>
              <h3>
                <div className="rating-stars">
                  {[...Array(averageRateInt)].map((_, index) => (
                    <i key={index} class="ri-star-s-fill"></i>
                  ))}
                </div>
              </h3>
            </div>

            <div className="rating-list">
              {rating.map(rating => (
                <li key={rating.id} className="rating-item">
                  <div>{rating.customerAccount.account.img}</div>
                  <Row>

                    <Col lg="1">
                      <img class="avatar__img" src="https://i.kym-cdn.com/photos/images/original/002/601/167/c81" alt="Avatar" />
                    </Col>


                    <Col lg="10">
                      <div className="rating-right-container">
                        <h6>{rating.customer.lastName} {rating.customer.firstName}</h6>

                        <div className="rating-stars">

                          {[...Array(rating.rate)].map((_, index) => (
                            <i key={index} class="ri-star-s-fill"></i>
                          ))}</div>

                        <div className="date">{moment(rating.createdDate).format('hh:mm - DD/MM/YYYY')} | Dịch vụ: {rating.service.name}</div>

                        <div>{rating.comment}</div>
                      </div>
                    </Col>
                  </Row>
                </li>
              ))}
            </div>
          </div>

        </Container>
      </section>
    </Helmet>
  );
};

export default ServiceTypeDetail;
