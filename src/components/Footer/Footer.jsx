import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import WhiteVinCleanLogo from"../../assets/all-images/whitelogo.png";

import { AiOutlineHome } from "react-icons/ai";

import { MdOutlineCleaningServices } from "react-icons/md";

import { RiFileList3Line } from "react-icons/ri";

import { RxActivityLog } from "react-icons/rx";

import { BsInfoCircle } from "react-icons/bs";

const quickLinks = [
  {
    path: "/home",
    display:
      <>
        <AiOutlineHome/> Trang chủ
      </>
  },
  {
    path: "/about",
    display:
      <>
        <BsInfoCircle/> Giới thiệu
      </>
  },
  {
    path: "/services",
    display:
      <>
        <MdOutlineCleaningServices/> Đặt dịch vụ
      </>
  },
  {
    path: "/blogs",
    display:
      <>
        <RiFileList3Line/> Blog
      </>
  },
  {
    path: "/activity",
    display:
      <>
        <RxActivityLog/> Hoạt động
      </>
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                <img src={WhiteVinCleanLogo} alt=""style={{ width: "200px", height: "auto" }} />
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            Vin Clean đã nhanh chóng tạo dựng được uy tín là một trong những nhà cung cấp giải pháp vệ sinh khu dân cư và thương mại hàng đầu.  
            </p>
            <p className="footer__logo-content">
            Trọng tâm của chúng tôi là lắng nghe khách hàng, hiểu nhu cầu của họ và cung cấp dịch vụ vệ sinh ở mức độ vượt trội.
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Vinhome Grand Park</p>
              <p className="office__info">Số điện thoại: +0995345875365</p>

              <p className="office__info">Email: vinhomegrandpark@gmail.com</p>

              <p className="office__info">Giờ làm: 7am - 8pm</p>
            </div>
          </Col>

          {/* <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col> */}

          {/* <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year}, Developed by
                Muhibur Rahman. All rights reserved.
              </p>
            </div>
          </Col> */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
