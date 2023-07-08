import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase/index';



function Customer() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    const [customerData, setCustomerData] = useState(null);

    const [account, setAccount] = useState([]);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [img, setImage] = useState('');

    const [customerId, setCustomerId] = useState('');
    const accountId = localStorage.getItem('id');






    useEffect(() => {


        axios
            .get(`https://localhost:7013/api/Customer/${customerId}`)
            .then(response => {

                const { data } = response.data;


                setCustomerData(data);
                setUserName(data.account.name)
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setGender(data.account.gender);
                setPhone(data.phone);
                setEmail(data.account.email);
                setPassword(data.account.password);
                setImage(data.account.img);


            })
            .catch(error => {
                console.error('Error:', error);
            });







    }, [customerId]);





    useEffect(() => {
        axios.get('https://localhost:7013/api/Customer')
            .then(response => {
                setCustomerList(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://localhost:7013/api/Account')
            .then(response => {
                setAccount(response.data.data);


            })
            .catch(error => {
                console.error(error);
            });

    }, []);






    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{
                    overlay: {
                        zIndex: 9999,
                        display: 'flex',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tạo màu nền tối đen

                    },
                    content: {
                        width: '800px',
                        height: '800px',
                        margin: 'auto',
                        overflow: 'hidden'
                    },

                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <hr className="border-light m-0" />
                                    <div className="modal-header"> <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label" strong><strong>User name</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={userName}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">

                                            <label className="form-label" strong><strong>Image</strong></label>
                                            <br></br>
                                            <img src={img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '100px', height: '100px' }} />


                                        </div>
                                        <div className="form-group">
                                            <label className="form-label"><strong>First name</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={firstName}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" ><strong>Last name</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={lastName}
                                                readOnly
                                            />
                                        </div>

                                        <div><label className="form-group" ><strong>Gender</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={gender}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" ><strong>Phone</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={phone}
                                                readOnly
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={email}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={password}
                                                readOnly
                                            />
                                        </div>
                                    </div></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">

                    <button type="button" className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
            <div className='modal-dialog modal-lg modal-dialog-centered'>
                <div className="modal-content">
                    <div className="modal-header" >

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>

                </div>
            </div>

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
                                <div className="col-lg-6">
                                    {/* USER DATA*/}

                                    {/* END USER DATA*/}
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    {/* DATA TABLE */}
                                    <h3 className="title-5 m-b-35">Customer List</h3>
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

                                                    <th>Customer ID</th>
                                                    <th>Image</th>
                                                    <th>Last name</th>
                                                    <th>First Name</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customerList.map((customer, index) => (


                                                    <tr key={customer.customerId}>


                                                        <td>{customer.customerId}</td>
                                                        <div></div>
                                                        <img src={customer.account.img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                                                        <td>{customer.lastName}</td>
                                                        <td>{customer.firstName}</td>
                                                        <td>{customer.phone}</td>
                                                        <td>{customer.address}</td>
                                                        <td />
                                                        <td>
                                                            <div className="table-data-feature">


                                                                {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                <i className="zmdi zmdi-edit" />
                                            </button> */}
                                                                {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => setModalIsOpen(true)}>
                                            <i className="zmdi zmdi-edit" />

                                            </button> */}
                                                                <button
                                                                    className="item"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="View"
                                                                    onClick={() => {
                                                                        setModalIsOpen(true);
                                                                        setCustomerId(customer.customerId);
                                                                    }}
                                                                >
                                                                    <i class="zmdi zmdi-more" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>

                                        </table>
                                    </div>
                                    {/* END DATA TABLE */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Customer;