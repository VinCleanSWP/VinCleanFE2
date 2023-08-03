import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import './FireBaseConfig';
import { format } from 'date-fns';
import { storage } from './FireBaseConfig';
import Swal from 'sweetalert2';



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
    const [dob, setdob] = useState('');
    const [totalmoney, setTotalMoney] = useState('');
    const [totalpoint, setTotalPoint] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [accountId, setAccountId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [isDeleted, setIsDeleted] = useState('');
    const [search, setSearch] = useState('');


    const [customerId, setCustomerId] = useState('');

    const handleSave = (accountId) => {
        console.log(localStorage.getItem("role"));
        if (localStorage.getItem("role") === "3") {
            const status = document.getElementById('updateTypeStatus').value;
            const data = {
                accountId: accountId, // Use the appropriate accountID here
                status: status
            };
            console.log(data)
            axios.put(`https://localhost:7013/api/Account/Active`, data)
                .then(response => {
                    // Handle the response if needed
                    setModalIsOpen(false)
                    // Update the status in the state
                    Swal.fire(
                        'Success',
                        'Update Status Successfully',
                        'success'
                    )
                    fetchData();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }else{
        Swal.fire(
            'Not Excepted?',
            'You does not have permission?',
            'warning'
          )
          setModalIsOpen(false);
        }
    };





    useEffect(() => {


        axios
            .get(`https://vinclean.azurewebsites.net/api/Customer/${customerId}`)
            .then(response => {

                const { data } = response.data;
                setCustomerData(response.data.data);
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
                setdob(data.account.dob)
            })
            .catch(error => {
                console.error('Error:', error);
            });







    }, [customerId]);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://vinclean.azurewebsites.net/api/Customer')
            .then(response => {
                setCustomerList(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get('https://vinclean.azurewebsites.net/api/Account')
            .then(response => {
                setAccount(response.data.data);


            })
            .catch(error => {
                console.error(error);
            });

    }, []);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortAndFilterData = () => {
        const sortedData = [...customerList];

        const filteredData = sortedData.filter(m =>
            m.customerId.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.firstName.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.lastName.toLowerCase().includes(search.toLowerCase()) ||
            m.phone.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.address.toString().toLowerCase().includes(search.toLowerCase())

        );

        return filteredData;
    };






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
                        padding: '20px',

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

                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <hr className="border-light m-0" />
                                <div className="modal-header">
                                    <div className="card-body">
                                        <h3 style={{ textAlign: "center" }}><strong>Customer Detail</strong></h3>


                                        <div style={{ display: 'flex' }}>
                                            <div><img src={img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '50%' }} /></div>
                                            <div style={{ paddingTop: '15px', paddingLeft: '10px', width: 'auto', fontSize: '25px' }}><strong>{userName}</strong>
                                                <br></br>
                                                <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Account ID: </strong>{accountId}</div>
                                                <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Customer ID: </strong>{customerId}</div>
                                            </div>
                                            <div style={{ marginLeft: '220px', marginTop: '30px' }}><strong>Created Date</strong><br></br>2023-06-12{createdDate}</div>

                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>

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
                                                    <label className="form-label" ><strong>Email</strong></label>
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
                                                <div className="form-group">
                                                    <label className="form-label" ><strong>Is deleted</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={isDeleted}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Total Money</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={totalmoney}
                                                        readOnly
                                                    />

                                                </div>
                                            </div>
                                            <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                                <div className="form-group">
                                                    <label className="form-label" ><strong>Gender</strong></label>
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
                                                    <label className="form-label" ><strong>Address</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={address}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label" ><strong>Date of birth</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={dob ? new Date(dob).toLocaleDateString() : ''}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Status</strong></label>
                                                    <select
                                                        className="form-control"
                                                        id="updateTypeStatus"
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        {/* Add more options if needed */}
                                                    </select>
                                                </div>
                                                <div className="form-group">
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
                </div>
                <div style={{ marginBottom: '30px', display: "flex", justifyContent: "space-between" }}>

                    <></><button type="button" className="btn btn-primary" onClick={() => handleSave(accountId)}>Save</button>

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

                <div >
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-lg-6">
                                    {/* USER DATA*/}

                                    {/* END USER DATA*/}
                                </div>

                            </div>

                            <div class="table__header">
                                <h1 style={{ textAlign: "center" }}><strong>Customer List</strong></h1>

                                <div class="input-group" >
                                    <input type="search" placeholder="Search Data..."
                                        value={search}
                                        onChange={handleSearchChange} />
                                    <img src="images/icon/search.png" alt=""></img>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {/* DATA TABLE */}
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead style={{ textAlign: 'center' }}>
                                                <tr>

                                                    <th>Customer ID</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ textAlign: 'center' }}>
                                                {sortAndFilterData().map((customer, index) => (
                                                    <tr key={customer.customerId}>
                                                        <td >{customer.customerId}</td>
                                                        <td><img src={customer.account.img
                                                            || "http://via.placeholder.com/300"}
                                                            alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: "50%" }} /></td>
                                                        <td>{customer.account.name}</td>
                                                        <td>{customer.phone}</td>
                                                        <td>{customer.address}</td>
                                                        <td><p className={`status ${customer.account.status}`}>{customer.account.status}</p></td>
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