import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="Giới thiệu" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                Vin Clean: Cách mạng giải pháp làm sạch với dịch vụ vượt trội
                </h2>

                <p className="section__description">
                Với đội ngũ nhân viên chuyên nghiệp, chất lượng dịch vụ cao và sự cam kết đáp ứng nhu cầu của khách hàng,
                Vin Clean mang đến các giải pháp làm sạch tiên tiến và hiệu quả. Khách hàng có thể tin tưởng vào sự tận tâm
                 và chuyên nghiệp của Vin Clean để có một môi trường sống sạch sẽ và an lành.
                </p>

                <p className="section__description">
                Trọng tâm của chúng tôi là lắng nghe khách hàng, hiểu nhu cầu của họ và cung cấp dịch vụ vệ sinh ở mức độ vượt trội.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Cần hỗ trợ?</h6>
                    <h4>+00123456789</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <BecomeDriverSection /> */}

      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default About;
