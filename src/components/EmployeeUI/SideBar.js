import React, { } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { MdSwitchAccount } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
function EPSideBar() {
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
                <Link to="/calendar">
                  <i className="fas fa-calendar-alt" />Calendar</Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </aside>
      {/* END MENU SIDEBAR*/}
    </div>

  );
}

export default EPSideBar;
