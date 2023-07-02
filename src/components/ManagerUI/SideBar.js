import React,{} from 'react';
import { Link } from 'react-router-dom';
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
      <nav className="navbar-sidebar">
        <ul className="list-unstyled navbar__list">
          <li className="active has-sub">
            <a className="js-arrow" href=" ">
              <i className="fas fa-tachometer-alt" />Dashboard</a>
            <ul className="list-unstyled navbar__sub-list js-sub-list">
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
            <Link to="/profile">
              <i className="fas fa-chart-bar" />Profile</Link>
          </li>
          <li>
            <Link to="/table">
              <i className="fas fa-table" />Tables</Link>
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
            <a href="map.html">
              <i className="fas fa-map-marker-alt" />Maps</a>
          </li>
          <li className="has-sub">
            <a className="js-arrow" href=" ">
              <i className="fas fa-copy" />Pages</a>
            <ul className="list-unstyled navbar__sub-list js-sub-list">
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
            <a className="js-arrow" href=" ">
              <i className="fas fa-desktop" />UI Elements</a>
            <ul className="list-unstyled navbar__sub-list js-sub-list">
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
      </nav>
    </div>
  </aside>
  {/* END MENU SIDEBAR*/}
</div>

  );
}

export default SideBar;
