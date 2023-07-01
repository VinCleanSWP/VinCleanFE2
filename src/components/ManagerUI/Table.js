import React, { } from 'react';

function Table() {
    return (
        <div>
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* HEADER DESKTOP*/}
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
                                    <div className="noti-wrap">
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-comment-more" />
                                            <span className="quantity">1</span>
                                            <div className="mess-dropdown js-dropdown">
                                                <div className="mess__title">
                                                    <p>You have 2 news message</p>
                                                </div>
                                                <div className="mess__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-06.jpg" alt="Michelle Moreno" />
                                                    </div>
                                                    <div className="content">
                                                        <h6>Michelle Moreno</h6>
                                                        <p>Have sent a photo</p>
                                                        <span className="time">3 min ago</span>
                                                    </div>
                                                </div>
                                                <div className="mess__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-04.jpg" alt="Diane Myers" />
                                                    </div>
                                                    <div className="content">
                                                        <h6>Diane Myers</h6>
                                                        <p>You are now connected on message</p>
                                                        <span className="time">Yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="mess__footer">
                                                    <a href="#">View all messages</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-email" />
                                            <span className="quantity">1</span>
                                            <div className="email-dropdown js-dropdown">
                                                <div className="email__title">
                                                    <p>You have 3 New Emails</p>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-06.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, 3 min ago</span>
                                                    </div>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-05.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, Yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-04.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, April 12,,2018</span>
                                                    </div>
                                                </div>
                                                <div className="email__footer">
                                                    <a href="#">See all emails</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-notifications" />
                                            <span className="quantity">3</span>
                                            <div className="notifi-dropdown js-dropdown">
                                                <div className="notifi__title">
                                                    <p>You have 3 Notifications</p>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c1 img-cir img-40">
                                                        <i className="zmdi zmdi-email-open" />
                                                    </div>
                                                    <div className="content">
                                                        <p>You got a email notification</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c2 img-cir img-40">
                                                        <i className="zmdi zmdi-account-box" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Your account has been blocked</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c3 img-cir img-40">
                                                        <i className="zmdi zmdi-file-text" />
                                                    </div>
                                                    <div className="content">
                                                        <p>You got a new file</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__footer">
                                                    <a href="#">All notifications</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-wrap">
                                        <div className="account-item clearfix js-item-menu">
                                            <div className="image">
                                                <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                            </div>
                                            <div className="content">
                                                <a className="js-acc-btn" href="#">john doe</a>
                                            </div>
                                            <div className="account-dropdown js-dropdown">
                                                <div className="info clearfix">
                                                    <div className="image">
                                                        <a href="#">
                                                            <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <h5 className="name">
                                                            <a href="#">john doe</a>
                                                        </h5>
                                                        <span className="email">johndoe@example.com</span>
                                                    </div>
                                                </div>
                                                <div className="account-dropdown__body">
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-account" />Account</a>
                                                    </div>
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-settings" />Setting</a>
                                                    </div>
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-money-box" />Billing</a>
                                                    </div>
                                                </div>
                                                <div className="account-dropdown__footer">
                                                    <a href="#">
                                                        <i className="zmdi zmdi-power" />Logout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* END HEADER DESKTOP*/}
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="table-responsive table--no-card m-b-30">
                                        <table className="table table-borderless table-striped table-earning">
                                            <thead>
                                                <tr>
                                                    <th>date</th>
                                                    <th>order ID</th>
                                                    <th>name</th>
                                                    <th className="text-right">price</th>
                                                    <th className="text-right">quantity</th>
                                                    <th className="text-right">total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2018-09-29 05:57</td>
                                                    <td>100398</td>
                                                    <td>iPhone X 64Gb Grey</td>
                                                    <td className="text-right">$999.00</td>
                                                    <td className="text-right">1</td>
                                                    <td className="text-right">$999.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-28 01:22</td>
                                                    <td>100397</td>
                                                    <td>Samsung S8 Black</td>
                                                    <td className="text-right">$756.00</td>
                                                    <td className="text-right">1</td>
                                                    <td className="text-right">$756.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-27 02:12</td>
                                                    <td>100396</td>
                                                    <td>Game Console Controller</td>
                                                    <td className="text-right">$22.00</td>
                                                    <td className="text-right">2</td>
                                                    <td className="text-right">$44.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-26 23:06</td>
                                                    <td>100395</td>
                                                    <td>iPhone X 256Gb Black</td>
                                                    <td className="text-right">$1199.00</td>
                                                    <td className="text-right">1</td>
                                                    <td className="text-right">$1199.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-25 19:03</td>
                                                    <td>100393</td>
                                                    <td>USB 3.0 Cable</td>
                                                    <td className="text-right">$10.00</td>
                                                    <td className="text-right">3</td>
                                                    <td className="text-right">$30.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-29 05:57</td>
                                                    <td>100392</td>
                                                    <td>Smartwatch 4.0 LTE Wifi</td>
                                                    <td className="text-right">$199.00</td>
                                                    <td className="text-right">6</td>
                                                    <td className="text-right">$1494.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-24 19:10</td>
                                                    <td>100391</td>
                                                    <td>Camera C430W 4k</td>
                                                    <td className="text-right">$699.00</td>
                                                    <td className="text-right">1</td>
                                                    <td className="text-right">$699.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-22 00:43</td>
                                                    <td>100393</td>
                                                    <td>USB 3.0 Cable</td>
                                                    <td className="text-right">$10.00</td>
                                                    <td className="text-right">3</td>
                                                    <td className="text-right">$30.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="au-card au-card--bg-blue au-card-top-countries m-b-30">
                                        <div className="au-card-inner">
                                            <div className="table-responsive">
                                                <table className="table table-top-countries">
                                                    <tbody>
                                                        <tr>
                                                            <td>United States</td>
                                                            <td className="text-right">$119,366.96</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Australia</td>
                                                            <td className="text-right">$70,261.65</td>
                                                        </tr>
                                                        <tr>
                                                            <td>United Kingdom</td>
                                                            <td className="text-right">$46,399.22</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Turkey</td>
                                                            <td className="text-right">$35,364.90</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Germany</td>
                                                            <td className="text-right">$20,366.96</td>
                                                        </tr>
                                                        <tr>
                                                            <td>France</td>
                                                            <td className="text-right">$10,366.96</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Australia</td>
                                                            <td className="text-right">$5,366.96</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Italy</td>
                                                            <td className="text-right">$1639.32</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    {/* USER DATA*/}
                                    <div className="user-data m-b-30">
                                        <h3 className="title-3 m-b-30">
                                            <i className="zmdi zmdi-account-calendar" />user data</h3>
                                        <div className="filters m-b-45">
                                            <div className="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                                                <select className="js-select2" name="property">
                                                    <option selected="selected">All Properties</option>
                                                    <option value>Products</option>
                                                    <option value>Services</option>
                                                </select>
                                                <div className="dropDownSelect2" />
                                            </div>
                                            <div className="rs-select2--dark rs-select2--sm rs-select2--border">
                                                <select className="js-select2 au-select-dark" name="time">
                                                    <option selected="selected">All Time</option>
                                                    <option value>By Month</option>
                                                    <option value>By Day</option>
                                                </select>
                                                <div className="dropDownSelect2" />
                                            </div>
                                        </div>
                                        <div className="table-responsive table-data">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            <label className="au-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td>name</td>
                                                        <td>role</td>
                                                        <td>type</td>
                                                        <td />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label className="au-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <div className="table-data__info">
                                                                <h6>lori lynch</h6>
                                                                <span>
                                                                    <a href="#">johndoe@gmail.com</a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="role admin">admin</span>
                                                        </td>
                                                        <td>
                                                            <div className="rs-select2--trans rs-select2--sm">
                                                                <select className="js-select2" name="property">
                                                                    <option selected="selected">Full Control</option>
                                                                    <option value>Post</option>
                                                                    <option value>Watch</option>
                                                                </select>
                                                                <div className="dropDownSelect2" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="more">
                                                                <i className="zmdi zmdi-more" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label className="au-checkbox">
                                                                <input type="checkbox" defaultChecked="checked" />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <div className="table-data__info">
                                                                <h6>lori lynch</h6>
                                                                <span>
                                                                    <a href="#">johndoe@gmail.com</a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="role user">user</span>
                                                        </td>
                                                        <td>
                                                            <div className="rs-select2--trans rs-select2--sm">
                                                                <select className="js-select2" name="property">
                                                                    <option value>Full Control</option>
                                                                    <option value selected="selected">Post</option>
                                                                    <option value>Watch</option>
                                                                </select>
                                                                <div className="dropDownSelect2" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="more">
                                                                <i className="zmdi zmdi-more" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label className="au-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <div className="table-data__info">
                                                                <h6>lori lynch</h6>
                                                                <span>
                                                                    <a href="#">johndoe@gmail.com</a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="role user">user</span>
                                                        </td>
                                                        <td>
                                                            <div className="rs-select2--trans rs-select2--sm">
                                                                <select className="js-select2" name="property">
                                                                    <option value>Full Control</option>
                                                                    <option value selected="selected">Post</option>
                                                                    <option value>Watch</option>
                                                                </select>
                                                                <div className="dropDownSelect2" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="more">
                                                                <i className="zmdi zmdi-more" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label className="au-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <div className="table-data__info">
                                                                <h6>lori lynch</h6>
                                                                <span>
                                                                    <a href="#">johndoe@gmail.com</a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="role member">member</span>
                                                        </td>
                                                        <td>
                                                            <div className="rs-select2--trans rs-select2--sm">
                                                                <select className="js-select2" name="property">
                                                                    <option selected="selected">Full Control</option>
                                                                    <option value>Post</option>
                                                                    <option value>Watch</option>
                                                                </select>
                                                                <div className="dropDownSelect2" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="more">
                                                                <i className="zmdi zmdi-more" />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="user-data__footer">
                                            <button className="au-btn au-btn-load">load more</button>
                                        </div>
                                    </div>
                                    {/* END USER DATA*/}
                                </div>
                                <div className="col-lg-6">
                                    {/* TOP CAMPAIGN*/}
                                    <div className="top-campaign">
                                        <h3 className="title-3 m-b-30">top campaigns</h3>
                                        <div className="table-responsive">
                                            <table className="table table-top-campaign">
                                                <tbody>
                                                    <tr>
                                                        <td>1. Australia</td>
                                                        <td>$70,261.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2. United Kingdom</td>
                                                        <td>$46,399.22</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3. Turkey</td>
                                                        <td>$35,364.90</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Germany</td>
                                                        <td>$20,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5. France</td>
                                                        <td>$10,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3. Turkey</td>
                                                        <td>$35,364.90</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Germany</td>
                                                        <td>$20,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5. France</td>
                                                        <td>$10,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3. Turkey</td>
                                                        <td>$35,364.90</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Germany</td>
                                                        <td>$20,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5. France</td>
                                                        <td>$10,366.96</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4. Germany</td>
                                                        <td>$20,366.96</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/*  END TOP CAMPAIGN*/}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {/* DATA TABLE */}
                                    <h3 className="title-5 m-b-35">data table</h3>
                                    <div className="table-data__tool">
                                        <div className="table-data__tool-left">
                                            <div className="rs-select2--light rs-select2--md">
                                                <select className="js-select2" name="property">
                                                    <option selected="selected">All Properties</option>
                                                    <option value>Option 1</option>
                                                    <option value>Option 2</option>
                                                </select>
                                                <div className="dropDownSelect2" />
                                            </div>
                                            <div className="rs-select2--light rs-select2--sm">
                                                <select className="js-select2" name="time">
                                                    <option selected="selected">Today</option>
                                                    <option value>3 Days</option>
                                                    <option value>1 Week</option>
                                                </select>
                                                <div className="dropDownSelect2" />
                                            </div>
                                            <button className="au-btn-filter">
                                                <i className="zmdi zmdi-filter-list" />filters</button>
                                        </div>
                                        <div className="table-data__tool-right">
                                            <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                <i className="zmdi zmdi-plus" />add item</button>
                                            <div className="rs-select2--dark rs-select2--sm rs-select2--dark2">
                                                <select className="js-select2" name="type">
                                                    <option selected="selected">Export</option>
                                                    <option value>Option 1</option>
                                                    <option value>Option 2</option>
                                                </select>
                                                <div className="dropDownSelect2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive table-responsive-data2">
                                        <table className="table table-data2">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </th>
                                                    <th>name</th>
                                                    <th>email</th>
                                                    <th>description</th>
                                                    <th>date</th>
                                                    <th>status</th>
                                                    <th>price</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="tr-shadow">
                                                    <td>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </td>
                                                    <td>Lori Lynch</td>
                                                    <td>
                                                        <span className="block-email">lori@example.com</span>
                                                    </td>
                                                    <td className="desc">Samsung S8 Black</td>
                                                    <td>2018-09-27 02:12</td>
                                                    <td>
                                                        <span className="status--process">Processed</span>
                                                    </td>
                                                    <td>$679.00</td>
                                                    <td>
                                                        <div className="table-data-feature">
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Send">
                                                                <i className="zmdi zmdi-mail-send" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                <i className="zmdi zmdi-edit" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                                                <i className="zmdi zmdi-delete" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="More">
                                                                <i className="zmdi zmdi-more" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="spacer" />
                                                <tr className="tr-shadow">
                                                    <td>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </td>
                                                    <td>Lori Lynch</td>
                                                    <td>
                                                        <span className="block-email">john@example.com</span>
                                                    </td>
                                                    <td className="desc">iPhone X 64Gb Grey</td>
                                                    <td>2018-09-29 05:57</td>
                                                    <td>
                                                        <span className="status--process">Processed</span>
                                                    </td>
                                                    <td>$999.00</td>
                                                    <td>
                                                        <div className="table-data-feature">
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Send">
                                                                <i className="zmdi zmdi-mail-send" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                <i className="zmdi zmdi-edit" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                                                <i className="zmdi zmdi-delete" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="More">
                                                                <i className="zmdi zmdi-more" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="spacer" />
                                                <tr className="tr-shadow">
                                                    <td>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </td>
                                                    <td>Lori Lynch</td>
                                                    <td>
                                                        <span className="block-email">lyn@example.com</span>
                                                    </td>
                                                    <td className="desc">iPhone X 256Gb Black</td>
                                                    <td>2018-09-25 19:03</td>
                                                    <td>
                                                        <span className="status--denied">Denied</span>
                                                    </td>
                                                    <td>$1199.00</td>
                                                    <td>
                                                        <div className="table-data-feature">
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Send">
                                                                <i className="zmdi zmdi-mail-send" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                <i className="zmdi zmdi-edit" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                                                <i className="zmdi zmdi-delete" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="More">
                                                                <i className="zmdi zmdi-more" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="spacer" />
                                                <tr className="tr-shadow">
                                                    <td>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </td>
                                                    <td>Lori Lynch</td>
                                                    <td>
                                                        <span className="block-email">doe@example.com</span>
                                                    </td>
                                                    <td className="desc">Camera C430W 4k</td>
                                                    <td>2018-09-24 19:10</td>
                                                    <td>
                                                        <span className="status--process">Processed</span>
                                                    </td>
                                                    <td>$699.00</td>
                                                    <td>
                                                        <div className="table-data-feature">
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Send">
                                                                <i className="zmdi zmdi-mail-send" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                <i className="zmdi zmdi-edit" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                                                <i className="zmdi zmdi-delete" />
                                                            </button>
                                                            <button className="item" data-toggle="tooltip" data-placement="top" title="More">
                                                                <i className="zmdi zmdi-more" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* END DATA TABLE */}
                                </div>
                            </div>
                            <div className="row m-t-30">
                                <div className="col-md-12">
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive m-b-40">
                                        <table className="table table-borderless table-data3">
                                            <thead>
                                                <tr>
                                                    <th>date</th>
                                                    <th>type</th>
                                                    <th>description</th>
                                                    <th>status</th>
                                                    <th>price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2018-09-29 05:57</td>
                                                    <td>Mobile</td>
                                                    <td>iPhone X 64Gb Grey</td>
                                                    <td className="process">Processed</td>
                                                    <td>$999.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-28 01:22</td>
                                                    <td>Mobile</td>
                                                    <td>Samsung S8 Black</td>
                                                    <td className="process">Processed</td>
                                                    <td>$756.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-27 02:12</td>
                                                    <td>Game</td>
                                                    <td>Game Console Controller</td>
                                                    <td className="denied">Denied</td>
                                                    <td>$22.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-26 23:06</td>
                                                    <td>Mobile</td>
                                                    <td>iPhone X 256Gb Black</td>
                                                    <td className="denied">Denied</td>
                                                    <td>$1199.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-25 19:03</td>
                                                    <td>Accessories</td>
                                                    <td>USB 3.0 Cable</td>
                                                    <td className="process">Processed</td>
                                                    <td>$10.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-29 05:57</td>
                                                    <td>Accesories</td>
                                                    <td>Smartwatch 4.0 LTE Wifi</td>
                                                    <td className="denied">Denied</td>
                                                    <td>$199.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-24 19:10</td>
                                                    <td>Camera</td>
                                                    <td>Camera C430W 4k</td>
                                                    <td className="process">Processed</td>
                                                    <td>$699.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2018-09-22 00:43</td>
                                                    <td>Computer</td>
                                                    <td>Macbook Pro Retina 2017</td>
                                                    <td className="process">Processed</td>
                                                    <td>$10.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* END DATA TABLE*/}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="copyright">
                                        <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Table;
