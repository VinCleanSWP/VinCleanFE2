import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/aboutImg.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "100px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">Về chúng tôi</h4>
              <h2 className="section__title">Chào mừng đến với dịch vụ Vin Clean</h2>
              <p className="section__description">
              Vin Clean cung cấp dịch vụ vệ sinh chất lượng cao cho cả khu vực chung và từng căn hộ trong Vinhomes.
              Đội ngũ nhân viên chuyên nghiệp và được đào tạo của họ đảm nhận các công việc vệ sinh hàng ngày, bao gồm lau sàn,
              vệ sinh phòng tắm, vệ sinh nhà bếp, và hút bụi, để duy trì một môi trường sống sạch sẽ và thoải mái.
              Họ cam kết cung cấp các dịch vụ chất lượng và đáng tin cậy để đáp ứng nhu cầu của cư dân.
              </p>
              {/* <p className="section__description">
              Vin Clean also provides interior repair services for Vinhomes apartments.
              Their skilled and experienced technicians can handle minor and major issues related to interior fixtures,
              such as electrical repairs, plumbing fixes, household appliance repairs, and interior upgrades.
              They are committed to delivering quality and reliable services to meet the needs of residents.
              </p> */}

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Dịch vụ chất lượng cao
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Đỡ tốn thời gian
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Đội ngũ chuyên nghiệp
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Thỏa mãn yêu cầu
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
