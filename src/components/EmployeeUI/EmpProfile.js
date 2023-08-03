import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { async } from 'q';
import '../../styles/profile-customer.css'
import { storage } from '../../firebase/index';
import { ToastContainer, toast } from 'react-toastify';
import { Alert, Button, Input, Modal, Space, Table, Upload } from 'antd';

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

const gioitinh = [
    {
        id: 1,
        gender: "Nam",
        sex: "Male"
    },
    {
        id: 2,
        gender: "Nữ",
        sex: "Female"
    },
    {
        id: 3,
        gender: "Khác",
        sex: "Other"
    }
]

export default function EmpProfile() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [customer, setCustomer] = useState([]);
    const [gender1, setGender] = useState('');
    const id = localStorage.getItem('id');
    const [errorMessage, setErrorMessage] = useState('')
    const [tempImageUrl, setTempImageUrl] = useState('');
    const [currentGender, setCurrentGender] = useState('');
    const [currentImg, setCurrentImg] = useState('');

    // ------------PasswordState----------
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // ------------End PasswordState----------

    // --- Start Booking Session ---
    const [booking, setBooking] = useState([])
    const [orders, setOrder] = useState([])

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Order`)
            .then(response => {
                const data = response.data.data
                const mail = localStorage.getItem('email');
                const foundItem = data.filter(item => item.employeeEmail == mail && (item.status == 'Completed' || item.status == 'Cancel'));
                // setOrder(response.data.data);
                setOrder(foundItem);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleRowClick = (order) => {
        setOpen(true);
        setBooking(order);
        setSelectedEvent(order)
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
        axios.get(`https://vinclean.azurewebsites.net/api/Employee/Account/${id}`)
        // axios.get(`https://localhost:7013/api/Employee/Account/${id}`)
            .then(response => {
                const data = response.data.data
                setCustomer(data);
                setCurrentGender(data.account.gender);
                setCurrentImg(data.account.img);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

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

    const handleGender = (e) => {
        e.preventDefault();
        setGender(e.target.value)
        setCheck(e.target.value)
    };

    const [check, setCheck] = useState(customer.account && customer.account.gender)

    const handleSubmitInfo = async (e) => {
        e.preventDefault();
        const updatedUser = {
            employeeId: customer.employeeId,
            accountId: id,
            // name: customer.account.name,
            name: customer.firstName + " " + customer.lastName,
            customerId: customer.customerId,
            email: customer.account.email,
            password: customer.account.password,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            status: "Active",
            gender: gender1 || currentGender,
            img: tempImageUrl || customer.account.img,
        };

        try {
            const response = await axios.put('https://vinclean.azurewebsites.net/api/Employee', updatedUser);
            if (response.status === 200) {
                console.log('OK');
                toast.success('Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setErrorMessage('Update Successfully');
            } else {
                console.log('KO');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }

        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Employee`)
            .then(response => {
                const data = response.data.data
                const foundUser = data.find(emp => emp.account.accountId == id);
                setCustomer(foundUser);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const updateUserPassword = async (newPassword) => {
        try {
            const apiUrl = 'https://vinclean.azurewebsites.net/api/Account';
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
                toast.success('Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log('Mật khẩu của người dùng đã được cập nhật thành công.');
            } else {
                console.log('Có lỗi xảy ra trong quá trình cập nhật mật khẩu của người dùng.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`Employee/${file.name}`);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };

    function formatCurrency(amount) {
        return amount ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
    }

    // ---------------MODAL-------------------

    const [selectedEvent, setSelectedEvent] = useState(null);

    const dateW = new Date(booking.date);
    const cDate = new Date(booking.createdDate);
    const dateWork = dateW.toLocaleDateString(undefined, options);
    const createDate = cDate.toLocaleDateString(undefined, options);

    return (
        <div className='container'>
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Cài đặt tài khoản
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <div class="Account__StyledAvatar-sc-1d5h8iz-3 profile-left">
                                    <img src={tempImageUrl || currentImg} alt="avatar" />
                                    <div class="info">
                                        Tài khoản của
                                        <strong>{customer.lastName} {customer.firstName}</strong>
                                    </div>
                                </div>
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">Thông tin chung</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Bảo mật</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Lịch sử công việc</a>
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
                                        <h4 className="card-body fw-bold">Thông tin cá nhân</h4>
                                        <div className="card-body media align-items-center">
                                            <img src={tempImageUrl || currentImg} alt className="d-block ui-w-80" />
                                            <div className="media-body ml-4">
                                                <label className="btn btn-outline-primary">
                                                    Chọn ảnh
                                                    <input type="file" className="account-settings-fileinput" onChange={handleImageUpload} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                                <div className="text small mt-1">Allowed JPG, GIF or PNG.</div>
                                            </div>
                                        </div>
                                        <hr className="border-light m-0" />
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">Tên</label>
                                                <input type="text" className="form-control" maxLength="30" id="firstName" pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                                                    name="firstName" defaultValue={customer.firstName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Họ</label>
                                                <input type="text" className="form-control" maxLength="30" id="lastName" pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                                                    name="lastName" defaultValue={customer.lastName} onChange={handleInputChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Giới tính: </label>
                                                {gioitinh.map(sex => (
                                                    <div key={sex.id}>
                                                        <input type='radio'
                                                            name='gender'
                                                            value={sex.sex}
                                                            checked={check === sex.sex || (!check && sex.sex === currentGender)}
                                                            onChange={handleGender} />{sex.gender}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" id="phone" maxLength="10" title="Số điện thoại bao gồm 10 chữ số."
                                                    name="phone" defaultValue={customer.phone} onChange={handleInputChange} pattern="[0-9]{10}" required />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control mb-1" defaultValue={customer.account && customer.account.email} disabled />
                                            </div>
                                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                            <div className="text-right mt-3 mb-3">
                                                <button type="button" className="btn btn-default">Hủy</button>
                                                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>&nbsp;
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* Change password */}
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <h4 className="fw-bold mb-4">Đổi mật khẩu</h4>
                                        <form onSubmit={handleSubmit}>
                                            {message && <p style={{ color: 'red' }}>{message}</p>}
                                            <div className="form-group">
                                                <label className="form-label">Mật khẩu hiện tại</label>
                                                <input type="password" className="form-control" id="currentPassword"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Mật khẩu mới</label>
                                                <input type="password" className="form-control" id="newPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Nhập lại mật khẩu</label>
                                                <input type="password" className="form-control" id="confirmPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange} />
                                            </div>
                                            <div className="text-left mt-3 mb-3">
                                                <h5>Mật khẩu phải đáp ứng được những yêu cầu dưới đây</h5>
                                                <ol>
                                                    <li>Mật khẩu phải chứa ít nhất một ký tự viết thường.</li>
                                                    <li>Mật khẩu phải chứa ít nhất một ký tự viết hoa.</li>
                                                    <li>Mật khẩu phải chứa ít nhất một chữ số.</li>
                                                    <li>Mật khẩu chỉ được chứa các ký tự chữ và số (viết thường, viết hoa).</li>
                                                    <li>Mật khẩu phải có ít nhất 8 ký tự.</li>
                                                </ol>
                                            </div>
                                            <div className="text-right mt-3 mb-3">
                                                <button type="button" className="btn btn-default">Hủy</button>
                                                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>&nbsp;
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Order History */}
                                <div className="tab-pane fade" id="account-info">
                                    <Container>
                                        <Row>
                                            <Col lg="12" md="12">
                                                <h4 className="fw-bold mt-4 mb-4">Danh sách công việc</h4>

                                                <div className="table-responsive m-b-40">
                                                    <table className="table table-borderless table-hover table-data3">
                                                        <thead>
                                                            <tr>
                                                                <th>Loại dịch vụ</th>
                                                                <th>Dịch vụ</th>
                                                                <th>Nhân viên</th>
                                                                <th>Ngày</th>
                                                                <th>Giá</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orders.map((order) => (
                                                                <tr className="pointer pointertext" key={order.orderId} onClick={() => handleRowClick(order)}>
                                                                    <td>{order.typeName}</td>
                                                                    <td>{order.serviceName}</td>
                                                                    <td>{order.employeeName}</td>
                                                                    {/* <td>{order.dateWork}</td> */}
                                                                    <td>{new Date(order.date).toLocaleDateString(undefined, options1)}</td>
                                                                    <td className="process" style={{ color: '#35cb28' }}>{formatCurrency(order.price)}</td>
                                                                </tr>
                                                            ))}

                                                            <Modal
                                                                visible={!!selectedEvent}
                                                                onCancel={() => setSelectedEvent(null)}
                                                                width={850}
                                                                footer={[
                                                                    // <Button key="cancel" onClick={() => setSelectedEvent(null)}>
                                                                    //   Đóng
                                                                    // </Button>,
                                                                ]}
                                                            >

                                                                {selectedEvent && (
                                                                    <div>
                                                                        <h2 style={{ textAlign: "center" }}>Thông tin dịch vụ</h2>
                                                                        <div class="process" style={{ marginTop: "30px" }}>
                                                                            <div class="process-info">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}>Thông tin khách hàng</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    <p><strong>Mã khách hàng: </strong> {booking.customerId} </p>
                                                                                    <p><strong>Tên khách hàng: </strong> {booking.name} </p>
                                                                                    <p><strong>SĐT khách hàng: </strong> {booking.phone}</p>
                                                                                    <p><strong>Email khách hàng: </strong> {booking.email}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="process-info1">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}> Thông tin nhân viên</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    {booking.employeeId == null ? (
                                                                                        <div>
                                                                                            <p><strong>Mã nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>Tên nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>SĐT nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>Email nhân viên: </strong> Incoming</p>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>
                                                                                            <p><strong>Mã nhân viên: </strong> {booking.employeeId} </p>
                                                                                            <p><strong>Tên nhân viên: </strong> {booking.employeeName} </p>
                                                                                            <p><strong>SĐT nhân viên: </strong> {booking.employeePhone}</p>
                                                                                            <p><strong>Email nhân viên: </strong> {booking.employeeEmail}</p>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="process" style={{ marginTop: "30px" }}>
                                                                            <div class="process-info1">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}>Chi tiết dịch vụ</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    <p><strong>Mã đơn hàng: </strong> {booking.orderId}</p>
                                                                                    <p><strong>Tên dịch vụ: </strong> {booking.typeName} - {booking.serviceName}</p>
                                                                                    {booking.status == 'Cancel' ? (
                                                                                        <div style={{ flex: '1' }}>
                                                                                            <p>
                                                                                                <strong>Trạng Thái hiện tại: </strong> <label className='status cancelled' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                                                                            </p>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div style={{ flex: '1' }}>
                                                                                            <p>
                                                                                                <strong>Trạng Thái hiện tại: </strong> <label className='status Completed' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                                                                            </p>
                                                                                        </div>
                                                                                    )}
                                                                                    <p><strong>Ngày đặt: </strong> {createDate}</p>
                                                                                    <p><strong>Địa chỉ: </strong> {booking.address}</p>
                                                                                    <p><strong>Ngày thực hiện: </strong> {dateWork}</p>
                                                                                    <p><strong>Giờ bắt đầu: </strong> {booking.startTime}</p>
                                                                                    <p><strong>Giờ kết thúc: </strong> {booking.endTime}</p>
                                                                                    <p><strong>Điểm sử dụng: </strong> {booking.pointUsed ? booking.pointUsed : 0}</p>
                                                                                    <p><strong>Phụ Thu: </strong> {booking.subPrice ? formatCurrency(booking.subPrice) : 0}</p>
                                                                                    <div className=" d-flex align-items-center gap-2 ">
                                                                                        <h6 className="mb-0 h3 mt-3"><strong>Tổng tiền:</strong></h6>
                                                                                        <p className="section__description mb-0 h3 mt-3 text-success"><strong>{formatCurrency(booking.price)}</strong></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div class="process" style={{ marginTop: "30px" }}> */}
                                                                        {booking.status == "Cancel" ? (
                                                                            <div class="process" style={{ marginTop: "30px" }}>
                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Ghi chú</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Lý do hủy</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"} NHỚ BỔ SUNG</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div class="process" style={{ marginTop: "30px" }}>
                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Ghi chú</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Modal>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}
