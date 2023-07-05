
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase/index';



function Table() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
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
    const [employeeId, setEmployeeId] = useState('');
    const [customerId, setCustomerId] = useState('');

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


            })
            .catch(error => {
                console.error('Error:', error);
            });







    }, [customerId]);

    useEffect(() => {


        axios
            .get(`https://localhost:7013/api/Employee/${employeeId}`)
            .then(response => {
                const { data } = response.data;

                setEmployeeData(data);
                setUserName(data.account.name);

                setFirstName(data.firstName);
                setLastName(data.lastName);
                setGender(data.gender);
                setPhone(data.phone);
                setEmail(data.account.email);
                setPassword(data.account.password);


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
        console.log(updatedEmployee);


        axios
            .put(`https://localhost:7013/api/Employee`, updatedEmployee)
            .then(response => {
                console.log('Employee updated successfully:', response.data);
                setModalIsOpen(false);
                // Do something after successful update
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };




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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`Employee/${file.name}`);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setUrl(imgUrl);
        console.log(imgUrl);
    };


    const handleSubmit = () => {
        // Tạo object chứa dữ liệu form
        const formData = {
            name: userName,
            email: email,
            img: url,
            password: password,

            gender: gender,
            firstName: firstName,
            lastName: lastName,
            phone: phone

        };

        // Gửi dữ liệu form đến API
        axios.post('https://localhost:7013/api/Employee', formData)
            .then(response => {
                // Xử lý kết quả từ API (nếu cần)
                console.log(response.data);
                setModalIsOpen(false);
            })
            .catch(error => {
                // Xử lý lỗi (nếu có)
                console.error(error);
            });
    };



    console.log(customerList);

    return (

        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{
                    overlay: {
                        zIndex: 9999
                    },
                    content: {
                        width: '600px',
                        height: '600px',
                        margin: 'auto'
                    }
                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">User name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Image</label>

                                            <input type="file" onChange={handleImageUpload} />


                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">First name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Last name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-group">Gender</label>
                                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="">Choose gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">img</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{
                    overlay: {
                        zIndex: 9999
                    },
                    content: {
                        width: '600px',
                        height: '600px',
                        margin: 'auto'
                    }
                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label">User name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Image</label>

                                            <input type="file" onChange={handleImageUpload} />


                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">First name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Last name</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-group">Gender</label>
                                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="">Choose gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleChangeSubmit}>Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>Close</button>
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
                                    <h3 className="title-5 m-b-35">Employee List</h3>
                                    <div className="table-data__tool">

                                        <div className="table-data__tool-right">
                                            {/* <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                <i className="zmdi zmdi-plus" />add item</button> */}

                                            <button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>
                                                Add employee
                                            </button>



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
                                                    <th>Employee ID</th>
                                                    <th>Image</th>
                                                    <th>Last name</th>
                                                    <th>First Name</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeList.map(employee => (
                                                    <tr key={employee.employeeId}>

                                                        <td>{employee.employeeId}</td>
                                                        <td>
                                                            <img src={employee.account.img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '100px', height: '100px' }} />
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
                                                                        setModalIsOpen(true);
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
            <div />
        </div>
    );
}

export default Table;
