import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import VinCleanLogo from "../../assets/all-images/logo.png";
import { RiUserLine, RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { TbBrandBooking } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { BsFillInfoCircleFill } from "react-icons/bs";

const navLinks = [
  {
    path: "/home",
    display: (
      <>
        <AiOutlineHome /> Trang chủ
      </>
    )
  },
  {
    path: "/about",
    display: (
      <>
        <BsFillInfoCircleFill /> Giới thiệu
      </>
    )
  },
  {
    path: "/services",
    display: (
      <>
        <TbBrandBooking /> Đặt dịch vụ
      </>
    )
  },
  {
    path: "/blogs",
    display: (
      <>
        <FaBlog /> Blog
      </>
    )
  },
  {
    path: "/activity",
    display: (
      <>
        <RxActivityLog /> Hoạt động
      </>
    )
  }
];

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');

  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const handleLogout = () => {
    // Xóa thông tin đăng nhập từ localStorage
    localStorage.clear();
    setLoggedIn(false);
    window.location.href = '/home';
  };

  useEffect(() => {
    // Kiểm tra xem đã có thông tin đăng nhập trong localStorage hay chưa
    const isLoggedIn = localStorage.getItem('loggedIn');
    const storedName = localStorage.getItem('name');
    

    if (isLoggedIn && storedName) {
      setLoggedIn(true);
      setName(storedName);
    }
  }, []);

  return (
    <header className="header">
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img src={VinCleanLogo} alt="" style={{ width: "200px", height: "auto" }} />
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Việt Nam</h4>
                  <h6>Tp.Hồ Chí Minh</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Làm hằng ngày</h4>
                  <h6>7am - 8pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className="d-flex align-items-center justify-content-end "
            >
              {loggedIn ? (
                <div>
                  <button className="header__btn btn" style={{ marginBottom: "8px" }}>
                    <Link to="/profile">
                      {name}
                    </Link>
                  </button>
                  <Button className="header__btn btn" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <button className="header__btn btn ">
                  <Link to="/login">
                    Login
                  </Link>
                </button>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
{/* 
            <Col lg="2" md="3" sm="0" className="d-flex align-items-center justify-content-end">
              {loggedIn && (
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle className="header__btn btn " caret>
                    <img className="avatar-icon" src={img} alt="Avatar" />
                  </DropdownToggle>
                </Dropdown>
              )}
            </Col> */}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
