
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import './FireBaseConfig';
// import { storage } from 'firebase/storage';
import { storage } from './FireBaseConfig';
import moment from 'moment';



function Table() {

    const [modalAddIsOpen, setAddModalIsOpen] = useState(false);
    const [modalEditIsOpen, setEditModalIsOpen] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const [employeeData, setEmployeeData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);
    const [account, setAccount] = useState([]);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [img, setImage] = useState('');
    const [status, setstatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [address, setAddress] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newImage, setTempImageUrl] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [isDeleted, setIsDeleted] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [accountId, setAccountId] = useState('')
    const [employeeId, setEmployeeId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [ModalIsOpen, setModalIsOpen] = useState('');
    const [Search, setSearch] = useState('');

    const [url, setUrl] = useState('');

    const deleteEmployee = (employeeId) => {
        axios.delete(`https://localhost:7013/api/Employee/${employeeId}`)
            .then(response => {
                console.log('Employee deleted successfully');
                const updatedEmployeeList = employeeList.filter(employee => employee.employeeId !== employeeId);
                setEmployeeList(updatedEmployeeList);
                // Thực hiện các hành động khác sau khi xóa thành công
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
                // Xử lý lỗi khi xóa khách hàng
            });
    }


    const fetchEmpoloyeeList = () => {
        axios.get('https://localhost:7013/api/Employee')
            .then(response => {
                setEmployeeList(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {


        axios
            .get(`https://localhost:7013/api/Employee/${employeeId}`)
            .then(response => {
                const { data } = response.data;

                setEmployeeData(data);
                setEmployeeId(data.employeeId)
                setAccountId(data.account.accountId);
                setUserName(data.account.name);
                setstatus(data.account.status);
                setStartDate(data.startDate);
                setendDate(data.endDate);
                setIsDeleted(data.account.isDeleted);
                setCreatedDate(data.account.createdDate);
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







    }, [employeeId]);
    const handleChangeSubmit = () => {
        const updatedEmployee = {
            employeeId: employeeId,
            // accountId: 27,
            img: url,//them vao giup tao Phung
            status: "Available",
            name: userName,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phone: phone,
            email: email,
            password: password
        };


        axios
            .put(`https://localhost:7013/api/Employee`, updatedEmployee)
            .then(response => {
                console.log('Employee updated successfully:', response.data);
                // setModalIsOpen(false);
                // Do something after successful update
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };





    useEffect(() => {
        axios.get('https://localhost:7013/api/Employee')
            .then(response => {
                setEmployeeList(response.data.data);
                console.log(account);
            })
            .catch(error => {
                console.error(error);
            });
        fetchEmpoloyeeList();
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

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref(`Employee/${file.name}`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };


    const handleSubmit = () => {
        // Tạo object chứa dữ liệu form
        const formData = {
            name: newUserName,
            email: newEmail,
            img: url,
            password: newPassword,
            status: newStatus,
            gender: newGender,
            firstName: newFirstName,
            lastName: newLastName,
            phone: newPhone

        };

        // Gửi dữ liệu form đến API
        axios.post('https://localhost:7013/api/Employee', formData)
            .then(response => {
                // Xử lý kết quả từ API (nếu cần)
                console.log(response.data);
                // setModalIsOpen(false);
            })
            .catch(error => {
                // Xử lý lỗi (nếu có)
                console.error(error);
            });
    };





    return (

        <div>

            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={() => setEditModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',

                    },
                    content: {
                        width: '800px',
                        height: '800px',
                        margin: 'auto',
                        overflow: 'auto'
                    }
                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <hr className="border-light m-0" />
                                <div className="card-body">
                                    <h3 style={{ textAlign: "center" }}><strong>Edit Employee</strong></h3>

                                    <div style={{ display: 'flex' }}>
                                        <div><img src={img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '50%' }} /></div>
                                        <div style={{ paddingTop: '15px', paddingLeft: '10px', width: 'auto', fontSize: '25px' }}><strong>{userName}</strong>
                                            <br></br>
                                            <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Account ID</strong>{accountId}</div>
                                            <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Employee ID</strong>{employeeId}</div>
                                        </div>
                                        <div style={{ marginLeft: '300px', marginTop: '15px' }}><strong>createdDate</strong><br></br>{createdDate.split('T')[0]}</div>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                            <div className="form-group">
                                                <label className="form-label"><strong>First name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Last name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Status</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={status}
                                                    onChange={(e) => setstatus(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Start Date</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={moment(startDate).format('YYYY-MM-DD')}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="form-group"><strong>Gender</strong></label>
                                                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="">Choose gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                            <div className="form-group">
                                                <label className="form-label"><strong>E-mail</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Password</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Phone</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>End Date</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={moment(endDate).format('YYYY-MM-DD')}
                                                    onChange={(e) => setendDate(e.target.value)}
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
                    <button type="button" className="btn btn-primary" onClick={handleChangeSubmit}>Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditModalIsOpen(false)}>Close</button>
                </div>

            </Modal>
            <Modal
                isOpen={modalAddIsOpen}
                onRequestClose={() => setAddModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        width: '800px',
                        height: '800px',
                        margin: 'auto',
                        overflow: 'auto'
                    }
                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <hr className="border-light m-0" />
                                <div className="card-body">
                                    <h3 style={{ textAlign: "center" }}><strong>Add Employee</strong></h3>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                            <div className="form-group">
                                                <label className="form-label"><strong>User name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newUserName}
                                                    onChange={(e) => setNewUserName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>First name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newFirstName}
                                                    onChange={(e) => setNewFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Last name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newLastName}
                                                    onChange={(e) => setNewLastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Phone</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newPhone}
                                                    onChange={(e) => setNewPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Start Date</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newStartDate}
                                                    onChange={(e) => setNewStartDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>End Date</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newEndDate}
                                                    onChange={(e) => setNewEndDate(e.target.value)}
                                                />
                                            </div>


                                            <div className="form-group">
                                                <label className="form-label"><strong>E-mail</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Password</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-group"><strong>Gender</strong></label>
                                        <select id="gender" value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                                            <option value="">Choose gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <input
                                            type="text"
                                            className="form-control mb-1"
                                            value={newGender}
                                            onChange={(e) => setNewGender(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label"><strong>Image</strong></label>
                                        <br></br>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                                <input type="file" onChange={handleImageUpload} />
                                            </div>
                                            <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>
                                                <img src={newImage || "http://via.placeholder.com/300"}
                                                    alt="Avatar" style={{ width: '100px', height: '100px' }} />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setAddModalIsOpen(false)}>Close</button>
                </div>
            </Modal>



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
                            <div class="table__header">
                                <h1 style={{ textAlign: "center" }}><strong>Employee List</strong></h1>
                                <div class="input-group" >
                                    <input type="search" placeholder="Search Data..."
                                        onChange={(e) => { setSearch(e.target.value) }} />
                                    <img src="images/icon/search.png" alt=""></img>
                                </div>

                            <div className="row">

                                <div className="col-md-12">
                                    {/* DATA TABLE */}

                                    <div style={{ textAlign: 'right', margin: '5px 10px' }}>


                                        <div className="table-data__tool-right">
                                            {/* <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                <i className="zmdi zmdi-plus" />add item</button> */}

                                            <button className="btn btn-primary " onClick={() => setAddModalIsOpen(true)}>
                                                Add employee
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead style={{ textAlign: 'center' }}>
                                                <tr>
                                                    <th >Employee ID</th>
                                                    <th>Image</th>
                                                    <th>Last name</th>
                                                    <th>First Name</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody style={{ textAlign: 'center' }}>
                                                {employeeList.map(employee => (
                                                    <tr key={employee.employeeId}>

                                                        <td >{employee.employeeId}</td>
                                                        <td>
                                                            <img src={employee.account.img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: "50%" }} />
                                                        </td>
                                                        <td>{employee.lastName}</td>
                                                        <td>{employee.firstName}</td>
                                                        <td>{employee.phone}</td>
                                                        <td>{employee.status}</td>
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
                                                                    title="Edit"
                                                                    onClick={() => {
                                                                        setEditModalIsOpen(true);
                                                                        setEmployeeId(employee.employeeId); // Truyền employeeId vào đây
                                                                    }}
                                                                >
                                                                    <i class="zmdi zmdi-edit" />
                                                                </button>
                                                                <button
                                                                    className="item"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="Delete"
                                                                    onClick={() => deleteEmployee(employee.employeeId)}
                                                                >
                                                                    <i className="zmdi zmdi-delete" />
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
                                <div />

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
