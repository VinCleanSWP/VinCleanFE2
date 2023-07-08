import React, { useRef, useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ADHeader() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');


    const fetchAccountData = async () => {
        try {
            if(localStorage.getItem('id')){
                const response = await axios.get(`https://localhost:7013/api/Account/${localStorage.getItem('id')}`); // Thay đổi đường dẫn API tương ứng
                // Xử lý dữ liệu tài khoản đã nhận được từ response.data
                console.log(response.data); // Hoặc cập nhật các state khác trong component của bạn
            }
          
        } catch (error) {
          console.error(error);
        }
      };

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
        const storedId = localStorage.getItem('id');
        console.log(storedId)

        if (isLoggedIn && storedEmail) {
            setLoggedIn(true);
            setEmail(storedEmail);
            setName(storedName);
            setId(storedId);
            fetchAccountData();
        }
    }, []);
    return (
        <div >
            {/* HEADER MOBILE*/}
            <header className="header-mobile d-block d-lg-none">
                <div className="header-mobile__bar">
                    <div className="container-fluid">
                        <div className="header-mobile-inner">
                            <a className="logo" href="index.html">
                                <img src="images/icon/logo.png" alt="CoolAdmin" />
                            </a>
                            <button className="hamburger hamburger--slider" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="navbar-mobile">
                    <div className="container-fluid">
                        <ul className="navbar-mobile__list list-unstyled">
                            <li className="has-sub">
                                <a className="js-arrow" href="#">
                                    <i className="fas fa-tachometer-alt" />Dashboard</a>
                                <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                    <li>
                                        <a href="index.html">Dashboard 1</a>
                                    </li>
                                    <li>
                                        <a href="index2.html">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="index3.html">Dashboard 3</a>
                                    </li>
                                    <li>
                                        <a href="index4.html">Dashboard 4</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="chart.html">
                                    <i className="fas fa-chart-bar" />Charts</a>
                            </li>
                            <li>
                                <a href="table.html">
                                    <i className="fas fa-table" />Tables</a>
                            </li>
                            <li>
                                <a href="form.html">
                                    <i className="far fa-check-square" />Forms</a>
                            </li>
                            <li>
                                <a href="calendar.html">
                                    <i className="fas fa-calendar-alt" />Calendar</a>
                            </li>
                            <li>
                                <a href="map.html">
                                    <i className="fas fa-map-marker-alt" />Maps</a>
                            </li>
                            <li className="has-sub">
                                <a className="js-arrow" href="#">
                                    <i className="fas fa-copy" />Pages</a>
                                <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                    <li>
                                        <a href="login.html">Login</a>
                                    </li>
                                    <li>
                                        <a href="register.html">Register</a>
                                    </li>
                                    <li>
                                        <a href="forget-pass.html">Forget Password</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="has-sub">
                                <a className="js-arrow" href="#">
                                    <i className="fas fa-desktop" />UI Elements</a>
                                <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                    <li>
                                        <a href="button.html">Button</a>
                                    </li>
                                    <li>
                                        <a href="badge.html">Badges</a>
                                    </li>
                                    <li>
                                        <a href="tab.html">Tabs</a>
                                    </li>
                                    <li>
                                        <a href="card.html">Cards</a>
                                    </li>
                                    <li>
                                        <a href="alert.html">Alerts</a>
                                    </li>
                                    <li>
                                        <a href="progress-bar.html">Progress Bars</a>
                                    </li>
                                    <li>
                                        <a href="modal.html">Modals</a>
                                    </li>
                                    <li>
                                        <a href="switch.html">Switchs</a>
                                    </li>
                                    <li>
                                        <a href="grid.html">Grids</a>
                                    </li>
                                    <li>
                                        <a href="fontawesome.html">Fontawesome Icon</a>
                                    </li>
                                    <li>
                                        <a href="typo.html">Typography</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {/* END HEADER MOBILE*/}
            <header className="header-desktop">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="header-wrap">
                            <form className="form-header" action method="POST">
                                <input className="au-input au-input--xl" type="text" name="search" placeholder="Search for datas & reports..." />
                                <button className="au-btn--submit" type="submit">
                                    <i className="zmdi zmdi-search" />
                                </button>
                            </form>
                            <div className="header-button">
                                <div className="account-wrap">
                                    <div className="account-item  ">
                                        <div className="content">
                                            <a className="js-acc-btn" >Welcome, {name}</a>
                                        </div>
                                        <div className="image">
                                            <Link to="/profile">
                                                <img src="images/icon/avatar-01.jpg" alt={name} />
                                            </Link>
                                        </div>
                                        <div className="logout">
                                            <MdOutlineLogout onClick={handleLogout}/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default ADHeader;
