import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProfileCustomer() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [customer, setCustomer] = useState([]);
    const id = localStorage.getItem('id');

    // --- Start Booking Session ---
    const [booking, setBooking] = useState([])
    const [orders, setOrder] = useState([])

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://localhost:7013/api/Order`)
            .then(response => {
                setOrder(response.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleRowClick = (order) => {
        setOpen(true);
        setBooking(order);
    };

    // DateDetails
    const dateDetails = booking.dateWork;
    const date = new Date(dateDetails);
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    // DateList
    const dateList = orders.dateWork;
    const date1 = new Date(dateList);
    const options1 = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };

    // --- End Booking Session ---

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://localhost:7013/api/Customer/Account/${id}`)
            .then(response => {
                setCustomer(response.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentPassword !== customer.account.password) {
            setMessage('Incorrect current password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }
        setTimeout(() => {
            customer.account.password = newPassword;
            updateUserPassword(newPassword);
            setMessage('Password changed successfully.');
        }, 1000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleSubmitInfo = async (e) => {
        e.preventDefault();

        const updatedUser = {
            customerId: customer.customerId,
            email: localStorage.getItem('email'),
            password: customer.account.password,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            address: customer.address,
            dob: customer.account.dob,
            gender: customer.account.gender,
            // img: "Lam deo gi co",
        };

        try {
            const response = await axios.put('https://localhost:7013/api/Customer', updatedUser);
            if (response.status === 200) {
                console.log('OK');
            } else {
                console.log('KO');
            }
        } catch (error) {
            // setErrorMessage('An error occurred. Please try again.');
        }
    };

    const updateUserPassword = async (newPassword) => {
        try {
            const apiUrl = 'https://localhost:7013/api/Account';
            // Tạo một đối tượng chứa dữ liệu mới (password mới)
            const updatedUserData = {
                accountId: localStorage.getItem('id'),
                name: localStorage.getItem('name'),
                password: newPassword,
                email: localStorage.getItem('email'),
                roleId: localStorage.getItem('role'),
                status: customer.account.status,
                img: customer.account.img,
                gender: customer.account.gender
            };
            // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
            const response = await axios.put(apiUrl, updatedUserData);
            // Kiểm tra trạng thái phản hồi từ API
            if (response.status === 200) {
                console.log('Mật khẩu của người dùng đã được cập nhật thành công.');
            } else {
                console.log('Có lỗi xảy ra trong quá trình cập nhật mật khẩu của người dùng.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div className='container'>
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Account settings
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Order History</a>
                                {/* <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a> */}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                {/* Edit Profile */}
                                <div className="tab-pane fade active show" id="account-general">
                                    <form onSubmit={handleSubmitInfo}>
                                        <h4 className="card-body fw-bold">Edit Profile</h4>
                                        <div className="card-body media align-items-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt className="d-block ui-w-80" />
                                            <div className="media-body ml-4">
                                                <label className="btn btn-outline-primary">
                                                    Upload new photo
                                                    <input type="file" className="account-settings-fileinput" />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                                <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                            </div>
                                        </div>
                                        <hr className="border-light m-0" />
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">FirstName</label>
                                                <input type="text" className="form-control" maxlength="15" id="firstName"
                                                    name="firstName" defaultValue={customer.firstName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">LastName</label>
                                                <input type="text" className="form-control" maxlength="30" id="lastName"
                                                    name="lastName" defaultValue={customer.lastName} onChange={handleInputChange} required />
                                            </div>
                                            {/* <div className="form-group">
                                                <label className="form-label">Age</label>
                                                <input type="text" className="form-control" maxlength="30" id="dob"
                                                    name="dob" defaultValue={customer.account.dob} onChange={handleInputChange} required />
                                            </div> */}
                                            <div className="form-group">
                                                <label className="form-label">Gender:</label>
                                                <select id="gender" name="gender" Value={customer.account && customer.account.gender} onChange={handleInputChange}>
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                <p>Selected gender: {customer.account && customer.account.gender}</p>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="form-control" id="phone"
                                                    name="phone" defaultValue={customer.phone} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <input type="text" className="form-control" id="address"
                                                    name="address" defaultValue={customer.address} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control mb-1" defaultValue={customer.account && customer.account.email} disabled />
                                                <div className="alert alert-warning mt-3">
                                                    Your email is not confirmed. Please check your inbox.<br />
                                                    <a href="javascript:void(0)">Resend confirmation</a>
                                                </div>
                                            </div>
                                            <div className="text-right mt-3 mb-3">
                                                <button type="submit" className="btn btn-primary">Save changes</button>&nbsp;
                                                <button type="button" className="btn btn-default">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* Change password */}
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <h4 className="fw-bold mb-4">Change Password</h4>
                                        <form onSubmit={handleSubmit}>
                                            {message && <p style={{ color: 'red' }}>{message}</p>}
                                            {/* {customer.account && <p style={{ color: 'red' }}>{customer.account.password}</p>} */}

                                            <div className="form-group">
                                                <label className="form-label">Current password</label>
                                                <input type="password" className="form-control" id="currentPassword"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">New password</label>
                                                <input type="password" className="form-control" id="newPassword"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Repeat new password</label>
                                                <input type="password" className="form-control" id="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange} />
                                            </div>
                                            <div className="text-right mt-3 mb-3">
                                                <button type="submit" className="btn btn-primary">Save changes</button>&nbsp;
                                                <button type="button" className="btn btn-default">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Account info */}
                                <div className="tab-pane fade" id="account-info">
                                    <Container>
                                        <Row>
                                            <Col lg="12" md="12">
                                                <h4 className="fw-bold mt-4 mb-4">Booking</h4>

                                                <div className="table-responsive m-b-40">
                                                    <table className="table table-borderless table-data3">
                                                        <thead>
                                                            <tr>
                                                                <th>Service</th>
                                                                <th>Option</th>
                                                                <th>Employee</th>
                                                                <th>Date</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orders.map((order) => (
                                                                <tr className="pointer pointertext" key={order.orderId} onClick={() => handleRowClick(order)}>
                                                                    <td>{order.type}</td>
                                                                    <td>{order.serviceName}</td>
                                                                    <td>{order.employeeName}</td>
                                                                    {/* <td>{order.dateWork}</td> */}
                                                                    <td>{new Date(order.dateWork).toLocaleDateString(undefined, options1)}</td>
                                                                    <td className="process">{order.total}.000 VND</td>
                                                                </tr>
                                                            ))}
                                                            <Modal
                                                                open={open}
                                                                onClose={handleClose}
                                                                aria-labelledby="modal-modal-title"
                                                                aria-describedby="modal-modal-description"
                                                            >
                                                                <Box sx={style}>
                                                                    <Row>
                                                                        <Col lg="12" md="12">
                                                                            <div className="contact__info">
                                                                                <h4 className="fw-bold mb-3">Booking Details</h4>
                                                                                <br></br>
                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0">Service:</h6>
                                                                                    <p className="section__description mb-0">{booking.type}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0">Option:</h6>
                                                                                    <p className="section__description mb-0">{booking.serviceName}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">Address:</h6>
                                                                                    <p className="section__description mb-0">{booking.address}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">Date:</h6>
                                                                                    {/* <p className="section__description mb-0">{booking.date}</p> */}
                                                                                    <p className="section__description mb-0">{formattedDate}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">StartTime:</h6>
                                                                                    <p className="section__description mb-0">{booking.startTime}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">EndTime:</h6>
                                                                                    <p className="section__description mb-0">{booking.endTime}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">Employee:</h6>
                                                                                    <p className="section__description mb-0">{booking.employeeName}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">EmployeePhone:</h6>
                                                                                    <p className="section__description mb-0">{booking.employeePhone}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6">Note:</h6>
                                                                                    {/* <p className="section__description mb-0 bordered">{booking.note}</p> */}
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <p className="section__description mb-0 mt-2 note-container">{booking.note}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2 ">
                                                                                    <h6 className="mb-0 h3 mt-3">Total:</h6>
                                                                                    <p className="section__description mb-0 h3 mt-3 text-success">{booking.total}000 VND</p>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Box>
                                                            </Modal>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                            {/* {booking.orderId != null ? (
                                                <Col lg="0" md="0">
                                                    <div className="contact__info">
                                                        <h4 className="fw-bold mb-3">Booking Details</h4>
                                                        <br></br>
                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="fs-6 mb-0">Service:</h6>
                                                            <p className="section__description mb-0">{booking.type}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="fs-6 mb-0">Option:</h6>
                                                            <p className="section__description mb-0">{booking.serviceName}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">Address:</h6>
                                                            <p className="section__description mb-0">{booking.address}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">Date:</h6>
                                                            <p className="section__description mb-0">{booking.dateWork}</p>
                                                            <p className="section__description mb-0">{formattedDate}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">StartTime:</h6>
                                                            <p className="section__description mb-0">{booking.startTime}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">EndTime:</h6>
                                                            <p className="section__description mb-0">{booking.endTime}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">Employee:</h6>
                                                            <p className="section__description mb-0">{booking.employeeName}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2">
                                                            <h6 className="mb-0 fs-6">EmployeePhone:</h6>
                                                            <p className="section__description mb-0">{booking.employeePhone}</p>
                                                        </div>

                                                        <div className=" d-flex align-items-center gap-2 ">
                                                            <h6 className="mb-0 h3 mt-3">Total:</h6>
                                                            <p className="section__description mb-0 h3 mt-3 text-success">{booking.total}.000 VND</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : (
                                                <Col lg="4" md="4">

                                                </Col>
                                            )} */}
                                        </Row>
                                    </Container >
                                </div>
                                {/* Social */}
                                <div className="tab-pane fade" id="account-social-links">
                                    <div className="card-body pb-2">
                                        <div className="form-group">
                                            <label className="form-label">Twitter</label>
                                            <input type="text" className="form-control" defaultValue="https://twitter.com/user" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Facebook</label>
                                            <input type="text" className="form-control" defaultValue="https://www.facebook.com/user" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Google+</label>
                                            <input type="text" className="form-control" defaultValue />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">LinkedIn</label>
                                            <input type="text" className="form-control" defaultValue />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Instagram</label>
                                            <input type="text" className="form-control" defaultValue="https://www.instagram.com/user" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-connections">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-twitter">Connect to <strong>Twitter</strong></button>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <a href="javascript:void(0)" className="float-right text-muted text-tiny"><i className="ion ion-md-close" /> Remove</a>
                                            <i className="ion ion-logo-google text-google" />
                                            You are connected to Google:
                                        </h5>
                                        nmaxwell@mail.com
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <button type="button" className="btn btn-facebook">Connect to <strong>Facebook</strong></button>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <button type="button" className="btn btn-instagram">Connect to <strong>Instagram</strong></button>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="account-notifications">
                                    <div className="card-body pb-2">
                                        <h6 className="mb-4">Activity</h6>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone comments on my article</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone answers on my forum thread</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Email me when someone follows me</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body pb-2">
                                        <h6 className="mb-4">Application</h6>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">News and announcements</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Weekly product updates</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="switcher">
                                                <input type="checkbox" className="switcher-input" defaultChecked />
                                                <span className="switcher-indicator">
                                                    <span className="switcher-yes" />
                                                    <span className="switcher-no" />
                                                </span>
                                                <span className="switcher-label">Weekly blog digest</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="text-right mt-3 mb-3">
                    <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
                    <button type="button" className="btn btn-default">Cancel</button>
                </div> */}
            </div>
        </div>
    )
}
