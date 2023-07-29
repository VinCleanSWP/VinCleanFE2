import carData from "../assets/data/carData";
import { Container, Row, Col, Modal } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import '../styles/rating-list.css';
import aboutImg from "../assets/all-images/maygait2.png";
import jpImg from "../assets/all-images/slider_f09a6abdbf.png";
import moment from "moment";
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bottom } from "@popperjs/core";

const ServiceTypeDetail = () => {
  const typeId = useParams();
  const [service, setService] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState();
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCost, setSelectedServiceCost] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [type, setType] = useState("");
  const id = parseInt(typeId.id);
  console.log(id);


  useEffect(() => {
    axios.get(`https://vinclean.azurewebsites.net/api/Service/Type/${id}`)
      .then(response => {
        const data = response.data.data;
        setService(data);
        setSelectedType(typeId.type1);
      })
      .catch(error => {
        console.error('Error fetching service type detail:', error);
      });

    axios.get(`https://vinclean.azurewebsites.net/api/Type/${id}`)
      .then(response => {
        const data = response.data.data;
        setType(data)
      })
      .catch(error => {
        console.error('Error fetching service type detail:', error);
      });


    axios.get(`https://vinclean.azurewebsites.net/api/Rating/Service/${id}`)
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
  // if (selectedServiceId == null) {
  //   setValidService("Vui lòng chọn dịch vụ")
  //   return false;
  // }

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
                <img src={type.img} alt="" className="w-100" />
                <img style={{ width: "500px", height: "350px" }} src={aboutImg}></img>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="about__section-content">
                <h4 className="section__subtitle">Bạn đã chọn dịch vụ</h4>
                <h2 className="section__title">{type.type1}</h2>
                <p className="section__description">
                  Nhịp sống đô thị đang dần trở nên bận rộn hơn với công việc và xã hội. Đặc biệt thời gian của người phụ nữ
                  dành cho gia đình và chăm sóc nhà cửa cũng càng trở nên eo hẹp hơn. Vậy làm sao để cân bằng được giữa công việc
                  và gia đình luôn là vấn đề khúc mắc của nhiều gia đình Việt. Đã có nhiều gia đình bỏ ra một khoản tiền lớn hằng
                  tháng chỉ để thuê giúp việc cố định nhưng đôi lúc việc này trở nên không thực sự cần thiết vì không phải lúc nào cũng có
                  việc để người giúp việc làm liên tục. Lúc này giúp việc nhà theo giờ sẽ là giải pháp hợp lý cho mọi gia đình!
                </p>

                <img style={{ width: "500px", height: "350px" }} src={jpImg}></img>


              </div>
            </Col>
          </Row>
          <div style={{ width: '80%' }}>    <Row style={{ border: '2px solid gray', borderRadius: '10px', marginLeft: 'auto', paddingBottom: '5%', paddingTop: '-5%' }}>
            <Col lg="6">
              <img src={service.img} alt="" className="w-100" />
            </Col>



            <Col lg="7" className="mt-5">

              <h5 className="mb-4 fw-bold ">Thông tin đặt</h5>
              <BookingForm serviceId={selectedServiceId} selectedServiceName={selectedServiceName}
                selectedServiceType={selectedType} selectedServiceCost={selectedCost} />

            </Col>

            <Col lg="4" className="mt-5">

              <h5 className="mb-4 fw-bold ">Chọn dịch vụ</h5>

              <ul className="service-list" style={{ border: '2px solid gray', borderRadius: '10px', margin: '0' }}>


                {service.map((service) => {
                  if (service.status === "Available") {
                    return (
                      <li
                        className={`btn service-item ${service.serviceId === selectedServiceId ? 'selected' : ''}`}
                        key={service.serviceId}
                        onClick={() => {
                          setSelectedServiceId(service.serviceId);
                          setSelectedServiceName(service.name);
                          setSelectedServiceCost(service.cost);
                        }}
                      >
                        {service.name} / {service.cost} VND
                      </li>
                    );
                  } else {
                    return null; // Nếu service.status không phải "Available", trả về null để không hiển thị gì cả
                  }
                })}

              </ul>



            </Col>
          </Row></div>

          {rating?.length > 0 ? (
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
                    <Row>

                      <Col lg="1">
                        <img class="avatar__img" src={rating.img} alt="Avatar" />
                      </Col>


                      <Col lg="10">
                        <div className="rating-right-container">
                          <h6>{rating.customerLastName} {rating.customerFirstName}</h6>

                          <div className="rating-stars">

                            {[...Array(rating.rate)].map((_, index) => (
                              <i key={index} class="ri-star-s-fill"></i>
                            ))}</div>

                          <div className="date">{moment(rating.createdDate).format('hh:mm - DD/MM/YYYY')} | Dịch vụ: {rating.serviceName}</div>

                          <div>{rating.comment}</div>
                        </div>
                      </Col>
                    </Row>
                  </li>
                ))}
              </div>
            </div>
          ) : (
            <div className="rating">
              <h2>Không có đánh giá ở dịch vụ hiện tại</h2>
            </div>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default ServiceTypeDetail;
