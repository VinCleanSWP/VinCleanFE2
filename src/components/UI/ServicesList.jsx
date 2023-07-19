import React from "react";
import { Col } from "reactstrap";
import "../../styles/services-list.css";
import chuyen from "../../assets/all-images/chuyen_nghiep_tan_tam_173933_f01408b505.png"
import u from "../../assets/all-images/ung_dung_jupviec_tien_loi_174235_713988bbdd.png"
import i from "../../assets/all-images/nguoi_giup_viec_tieu_chuan_175308_b0428a643c.png"
import a from "../../assets/all-images/icon_clock_bc8897dc21.png"
import b from "../../assets/all-images/sec6_5_f55aa61f33.png"
import c from "../../assets/all-images/sec6_6_264b80ff94.png"
import { TiTickOutline } from "react-icons/ti";

const ServicesList = () => {
  return (
    <>
     <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {chuyen}/>
      </span>

      <h6>Chất lượng dịch vụ</h6>
      <p className="section__description">Đội ngũ nhân viên chuyên nghiệp, kinh nghiệm và sử dụng sản phẩm hiện đại để đảm bảo không gian sống luôn sạch sẽ và hấp dẫn.</p>
    </div>
  </Col>

  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {c}/>
      </span>

      <h6>Đa dạng dịch vụ</h6>
      <p className="section__description">Cung cấp nhiều dịch vụ vệ sinh nội khu để đáp ứng các nhu cầu khác nhau của khách hàng.</p>
    </div>
  </Col>
  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {i}/>
      </span>

      <h6>Sản phẩm và thiết bị chất lượng</h6>
      <p className="section__description">Sử dụng các sản phẩm vệ sinh chất lượng cao và thiết bị hiện đại để đảm bảo hiệu quả</p>
    </div>
  </Col>
  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {a}/>
      </span>

      <h6>Tiết kiệm thời gian và công sức</h6>
      <p className="section__description">Giúp bạn tiết kiệm thời gian và năng lượng cho các hoạt động quan trọng khác trong cuộc sống.</p>
    </div>
  </Col>
  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {b}/>
      </span>

      <h6>Đáng tin cậy và an toàn</h6>
      <p className="section__description">Tuân thủ quy định về an toàn lao động và sử dụng các sản phẩm không gây hại cho sức khỏe và môi trường.</p>
    </div>
  </Col>
  <Col lg="4" md="4" sm="6" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <img src= {u}/>
      </span>

      <h6>"Dịch vụ tùy chỉnh</h6>
      <p className="section__description">Đáp ứng yêu cầu riêng của từng khách hàng để đảm bảo hài lòng và mong đợi của họ được đáp ứng</p>
    </div>
  </Col>
  
    </>
  );
};

// const ServiceItem = ({ item }) => (
//   <Col lg="4" md="4" sm="6" className="mb-3">
//     <div className="service__item">
//       <span className="mb-3 d-inline-block">
//         <img src= {item.icon}/>
//       </span>

//       <h6>{item.title}</h6>
//       <p className="section__description">{item.desc}</p>
//     </div>
//   </Col>
// );

export default ServicesList;
