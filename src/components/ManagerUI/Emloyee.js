
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import './FireBaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { storage } from 'firebase/storage';
import { storage } from './FireBaseConfig';
import moment from 'moment';
import Swal from 'sweetalert2';


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
    const [Data, setData] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [isDeleted, setIsDeleted] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [accountId, setAccountId] = useState('')
    const [employeeId, setEmployeeId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [ModalIsOpen, setModalIsOpen] = useState('');
    const [search, setSearch] = useState('');
    const [url, setUrl] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [statusError, setStatusError] = useState('');

    const deleteEmployee = (employeeId) => {
        if (localStorage.getItem("role") === "3") {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure to Delete this Account?',
                text: "Double-check before you delete this account!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://vinclean.azurewebsites.net/api/Employee/${employeeId}`)
                        .then(response => {
                            console.log('Employee delete successfully:', response.data);
                            fetchEmployeeList();
                            setEmployeeList(response.data.data);
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'This Account has been deleted.',
                                'success'
                            )
                        })
                        .catch(error => {
                            console.error('Error deleting customer:', error);
                            // Xử lý lỗi khi xóa khách hàng
                        });

                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'this account is safe :)',
                        'error'
                    )
                }
            })
        } Swal.fire(
            'Not Excepted?',
            'You does not have permission?',
            'warning'
        )
        setEditModalIsOpen(false)
        setAddModalIsOpen(false);
    };


    const fetchEmployeeList = () => {
        axios.get('https://vinclean.azurewebsites.net/api/Employee')
            .then(response => {

                setEmployeeList(response.data.data);

            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        axios
            .get(`https://vinclean.azurewebsites.net/api/Employee/${employeeId}`)
            .then(response => {
                const { data } = response.data;

                setEmployeeData(data);
                setEmployeeId(data.employeeId)
                setAccountId(data.account.accountId);
                setUserName(data.account.name);
                setstatus(data.status);
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
    const handleChangeSubmit = (e) => {
        console.log(localStorage.getItem("role"))
        if (localStorage.getItem("role") === "3") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
            e.preventDefault();
            setUserNameError('');
            setFirstNameError('');
            setLastNameError('');
            setPhoneError('');
            setEmailError('');
            setPasswordError('');
            setGenderError('');

            if (!firstName.trim()) {
                setFirstNameError('Please enter a first name.');
                return;
            }
            if (!lastName.trim()) {
                setLastNameError('Please enter a last name.');
                return;
            }
            if (!status.trim()) {
                setStatusError('Please enter a status.');
                return;
            }
            if (!gender.trim()) {
                setGenderError('Please select a gender.');
                return;
            }
            if (!email.trim()) {
                setEmailError('Please enter an email.');
                return;
            }
            if (!emailRegex.test(email.trim())) {
                setEmailError('Please enter a valid email address.');
                return;
            }
            if (!password.trim()) {
                setPasswordError('Please enter a password.');
                return;
            }
            if (!phone.trim()) {
                setPhoneError('Please enter a phone number.');
                return;
            }
            if (!phoneRegex.test(phone.trim())) {
                setPhoneError('Please enter a valid 10-digit phone number.');
                return;
            }
            const selectedStatus = document.getElementById('statusType').value;
            const updatedEmployee = {
                employeeId: employeeId,
                // accountId: 27,
                img: newImage,//them vao giup tao Phung
                status: selectedStatus,
                name: userName,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phone: phone,
                email: email,
                password: password
            };
            axios
                .put(`https://vinclean.azurewebsites.net/api/Employee`, updatedEmployee)
                .then(response => {
                    console.log('Employee updated successfully:', response.data);
                    fetchEmployeeList();
                    toast.success('Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error
                });
        }else{Swal.fire(
            'Not Excepted?',
            'You does not have permission?',
            'warning'
        )
        }
        setEditModalIsOpen(false)
        setAddModalIsOpen(false);

    };

    useEffect(() => {
        axios.get('https://vinclean.azurewebsites.net/api/Employee')
            .then(response => {
                setEmployeeList(response.data.data);
                console.log(account);
            })
            .catch(error => {
                console.error(error);
            });
        fetchEmployeeList();
    }, []);
    useEffect(() => {
        axios.get('https://vinclean.azurewebsites.net/api/Account')
            .then(response => {
                setAccount(response.data.data);


            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`Employee/${file.name}`);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        console.log(imgUrl);
        setTempImageUrl(imgUrl);
    };


    const handleSubmit = (e) => {
        console.log(localStorage.getItem("role"))
        if (localStorage.getItem("role") === "3") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
            e.preventDefault();
            setUserNameError('');
            setFirstNameError('');
            setLastNameError('');
            setPhoneError('');
            setEmailError('');
            setPasswordError('');
            setGenderError('');

            // Validation for each field
            if (!newUserName.trim()) {
                setUserNameError('Please enter a username.');
                return;
            }
            if (!newFirstName.trim()) {
                setFirstNameError('Please enter a first name.');
                return;
            }
            if (!newLastName.trim()) {
                setLastNameError('Please enter a last name.');
                return;
            }
            if (!newPhone.trim()) {
                setPhoneError('Please enter a phone number.');
                return;
            }
            if (!phoneRegex.test(newPhone.trim())) {
                setPhoneError('Please enter a valid 10-digit phone number.');
                return;
            }
            if (!emailRegex.test(newEmail.trim())) {
                setEmailError('Please enter a valid email address.');
                return;
            }
            if (!newEmail.trim()) {
                setEmailError('Please enter an email.');
                return;
            }
            if (!newPassword.trim()) {
                setPasswordError('Please enter a password.');
                return;
            }
            if (!newGender.trim()) {
                setGenderError('Please select a gender.');
                return;
            }


            const formData = {
                name: newUserName,
                email: newEmail,
                img: newImage,
                password: newPassword,
                gender: newGender,
                firstName: newFirstName,
                lastName: newLastName,
                phone: newPhone
            };
            console.log(formData);

            // Gửi dữ liệu form đến API
            axios.post('https://vinclean.azurewebsites.net/api/Employee', formData)
                .then(response => {
                    // Xử lý kết quả từ API (nếu cần)
                    fetchEmployeeList();
                    console.log(response.data);
                    toast.success('Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setAddModalIsOpen(false);
                    setData(response.data);


                    // setModalIsOpen(false);
                })
                .catch(error => {
                    toast.error('Faild!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                });

        }else{Swal.fire(
            'Not Excepted?',
            'You does not have permission?',
            'warning'
        )
        }
        setEditModalIsOpen(false)
        setAddModalIsOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortAndFilterData = () => {
        const sortedData = [...employeeList];

        const filteredData = sortedData.filter(m =>
            m.employeeId.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.firstName.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.lastName.toLowerCase().includes(search.toLowerCase()) ||
            m.phone.toString().toLowerCase().includes(search.toLowerCase())

        );

        return filteredData;
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
                        height: 'auto',
                        margin: 'auto',
                        overflow: 'auto'
                    }
                }}
            >
                <div>
                    <div className="card overflow-hidden">
                        <div className="row no-gutters row-bordered row-border-light">

                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <hr className="border-light m-0" />
                                    <div className="card-body" >
                                        <h3 style={{ textAlign: "center" }}><strong>Edit Employee</strong></h3>

                                        <div style={{ display: 'flex' }}>
                                            <div><img src={newImage || img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '120px', height: '120px', borderRadius: '100%' }} /></div>
                                            <div style={{ paddingTop: '15px', paddingLeft: '10px', width: 'auto', fontSize: '25px' }}><strong>{userName}</strong>
                                                <br></br>
                                                <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Account ID</strong>{accountId}</div>
                                                <div style={{ fontSize: '13px' }}><strong style={{ marginRight: "5px" }}>Employee ID</strong>{employeeId}</div>
                                            </div>
                                            <div style={{ marginLeft: '300px', marginTop: '15px' }}><strong>createdDate</strong><br></br>{createdDate.split('T')[0]}</div>

                                        </div>

                                        <div>
                                            <input type="file" onChange={handleImageUpload} />

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
                                                    {firstNameError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{firstNameError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Last name</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    {lastNameError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{lastNameError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Status</strong></label>
                                                    <select id="statusType" className="form-control" >
                                                        <option value="Available">Available</option>
                                                        <option value="NonAvailable">NonAvailable</option>
                                                    </select>

                                                </div>

                                                <div>
                                                    <label className="form-group"><strong>Gender</strong></label>
                                                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                        <option value="">Choose gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-1"
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        />
                                                    </select>
                                                    {genderError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{genderError}</div>}
                                                    {/* <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    /> */}
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
                                                    {emailError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{emailError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Password</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    {passwordError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{passwordError}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"><strong>Phone</strong></label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                    {phoneError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{phoneError}</div>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="text-right mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditModalIsOpen(false)}>Close</button>
                        <span className="mr-2"></span>
                        <button type="button" className="btn btn-primary mr-2" onClick={handleChangeSubmit} >Update </button>
                    </div>
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
                                <div className="card-body" style={{ height: '700px' }}>
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
                                                {userNameError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{userNameError}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>First name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newFirstName}
                                                    onChange={(e) => setNewFirstName(e.target.value)}
                                                />
                                                {firstNameError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{firstNameError}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Last name</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newLastName}
                                                    onChange={(e) => setNewLastName(e.target.value)}
                                                />
                                                {lastNameError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{lastNameError}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Phone</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newPhone}
                                                    onChange={(e) => setNewPhone(e.target.value)}
                                                />
                                                {phoneError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{phoneError}</div>}
                                            </div>
                                        </div>
                                        <div style={{ flex: '1', width: '50%', height: 'auto', margin: '0px 10px' }}>


                                            <div className="form-group">
                                                <label className="form-label"><strong>E-mail</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                />
                                                {emailError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{emailError}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label"><strong>Password</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                {passwordError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{passwordError}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label"><strong>Gender</strong></label>
                                        <select id="gender" value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                                            <option value="">Choose gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {genderError && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{genderError}</div>}

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
                    <button type="button" className="btn btn-secondary" onClick={() => setAddModalIsOpen(false)}>Close</button>
                    <span className="mr-2"></span>
                    <button type="button" className="btn btn-primary mr-2" onClick={handleSubmit}>Submit</button>


                </div>

            </Modal>
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* HEADER DESKTOP*/}

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
                                        value={search}
                                        onChange={handleSearchChange} />
                                    <img src="images/icon/search.png" alt=""></img>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-12">
                                    {/* DATA TABLE */}

                                    <div style={{ textAlign: 'right', margin: '5px 10px' }}>


                                        <div className="table-data__tool-right">
                                            {/* <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                <i className="zmdi zmdi-plus" />add item</button> */}

                                            <button type="button" class="btn btn-primary mr-2" data-mdb-ripple-color="dark" onClick={() => setAddModalIsOpen(true)}>
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
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ textAlign: 'center' }}>
                                                {sortAndFilterData().map(employee => (
                                                    <tr key={employee.employeeId}>

                                                        <td >{employee.employeeId}</td>
                                                        <td>
                                                            <img src={employee.account.img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: "50%" }} />
                                                        </td>
                                                        <td>{employee.lastName}</td>
                                                        <td>{employee.firstName}</td>
                                                        <td>{employee.phone}</td>
                                                        <td><p className={`status ${employee.status}`}>{employee.status}</p></td>
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
            <ToastContainer />
        </div>

    );
};

export default Table;