import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import VinCleanLogo from "../../assets/all-images/logo.png";
import { RiUserLine, RiLogoutBoxLine } from "react-icons/ri";

const navLinks = [
  {
    path: "/home",
    display: "Trang chủ",
  },
  {
    path: "/about",
    display: "Giới thiệu",
  },
  {
    path: "/cars",
    display: "Đặt dịch vụ",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Hoạt động",
  },
];

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  
  const handleLogout = () => {
    // Xóa thông tin đăng nhập từ localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setLoggedIn(false);
    setEmail('');
    window.location.href = '/home';
  };

  useEffect(() => {
    // Kiểm tra xem đã có thông tin đăng nhập trong localStorage hay chưa
    const isLoggedIn = localStorage.getItem('loggedIn');
    const storedEmail = localStorage.getItem('email');
    const storedName = localStorage.getItem('name');

    if (isLoggedIn && storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
      setName(storedName)
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
              className="d-flex align-items-center justify-content-end"
            >
              {loggedIn ? (
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle className="header__btn btn" caret>
                  {name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                        <RiUserLine style={{ marginRight: "12px",  }} />Thông tin cá nhân
                        </Link>                  
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={handleLogout} style={{ textDecoration: "none", color: "black" }}>
                      <RiLogoutBoxLine style={{ marginRight: "12px" }} />Đăng xuất
                      </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <button className="header__btn btn">
                  <Link to="/login">Đăng nhập</Link>
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
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;