import React, { } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { MdSwitchAccount } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
function SideBar() {
  return (
    <div>
      {/* MENU SIDEBAR*/}
      <aside className="menu-sidebar d-none d-lg-block">
        <div className="logo">
          <a href=" ">
            <img src="images/icon/logo.png" alt="Cool Admin" />
          </a>
        </div>
        <div className="menu-sidebar__content js-scrollbar1">
          <nav className="navbar-sidebar" >
            <ul className="list-unstyled navbar__list" >
              <li class=" has-sub">
                <a class="js-arrow" href=" ">
                  <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                <ul class="list-unstyled navbar__sub-list js-sub-list">
                  <li>
                    <a href="index.html">Dashboard 1</a>
                  </li>
                </ul>
              </li>
              <li >
                <Link to="/profile">
                <i className="fas"><GrUserAdmin/> </i>Profile</Link>
              </li>
              <li>
                <Link to="/booking" >
                <i className="fas"><FaTasks/> </i>Task</Link>
              </li>
              <li>
                <Link to="/activity" >
                <i className="fas"><BiHistory/></i>Activities</Link>
              </li>
              <li>
                <Link to="/request" >
                <i className="fas"><BiTask/> </i>RequestTask</Link>
              </li>
  
              <li>
                <Link to="/customer">
                <i className="fas"><MdSwitchAccount/></i>Customer</Link>
              </li>
              <li>
                <Link to="/employee">
                <i className="fas"><FaUserNurse/></i>Employee</Link>
              </li>
              <li>
                <Link to="/service">
                  <i className="fas fa-table" />Service</Link>
              </li>
              <li>
                <Link to="/bloglist">
                <i className="fas"><FaBlog/></i>Blog</Link>
              </li>
              <li>
                <Link to="/email">
                <i className="fas"><MdOutlineEmail/></i>Mail</Link>
              </li>
              <li>
                <Link to="/form">
                  <i className="far fa-check-square" />Forms</Link>
              </li>
              <li>
                <Link to="/calendar">
                  <i className="fas fa-calendar-alt" />Calendar</Link>
              </li>
              <li>
              <Link to="/map">
                  <i className="fas fa-map-marker-alt" />Maps</Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* END MENU SIDEBAR*/}
    </div>

  );
}

export default SideBar;
