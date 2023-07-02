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
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Vin Clean Service</h2>
              <p className="section__description">
              Vin Clean offers high-quality cleaning services for both the common areas and individual apartments within Vinhomes. 
              Their professional and trained staff takes care of daily cleaning tasks, including floor mopping, bathroom sanitation,
              kitchen cleaning, and dusting, to maintain a clean and comfortable living environment.                
              Additionally, Vin Clean also provides interior repair services for Vinhomes apartments.
              Their skilled and experienced technicians can handle minor and major issues related to interior fixtures,
              such as electrical repairs, plumbing fixes, household appliance repairs, and interior upgrades.
              They are committed to delivering quality and reliable services to meet the needs of residents.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> High-Quality Service
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Timeliness
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Professional Employee
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Customer Satisfaction 
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
