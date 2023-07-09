import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import './FireBaseConfig';
import { storage } from './FireBaseConfig';



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
    const [totalmoney, setTotalMoney] = useState('');
    const [totalpoint, setTotalPoint] = useState('');
    const [status, setStatus] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [accountId, setAccountId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [isDeleted, setIsDeleted] = useState('');


    const [customerId, setCustomerId] = useState('');







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
                setStatus(data.account.status);
                setAddress(data.address);
                setTotalMoney(data.totalMoney);
                setTotalPoint(data.totalPoint);
                setAccountId(data.account.accountId);
                setCreatedDate(data.createdDate);
                setIsDeleted(data.account.isDeleted);



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
                        overflow: 'auto'
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
                                            <label className="form-label" strong><strong>Account ID</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={accountId}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" strong><strong>Customer ID</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={customerId}
                                                readOnly
                                            />
                                        </div>
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
                                        <div className="form-group">
                                            <label className="form-label" ><strong>Created Date</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={createdDate}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" ><strong>Date of birth</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={dob}
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
                                        <div>
                                            <label className="form-group" ><strong>Status</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={status}
                                                readOnly
                                            />


                                        </div>
                                        <div>
                                            <label className="form-group" ><strong>Is deleted</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={isDeleted}
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
                                        <div><label className="form-group" ><strong>Address</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={address}
                                                readOnly
                                            /></div>


                                        <div className="form-group">
                                            <label className="form-label"><strong>E-mail</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={email}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label"><strong>Password</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={password}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label"><strong>Total Money</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={totalmoney}
                                                readOnly
                                            />

                                        </div>
                                        <div>
                                            <label className="form-label"><strong>Total Point</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={totalpoint}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    </div>

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