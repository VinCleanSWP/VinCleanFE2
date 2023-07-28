import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import Box from '@mui/material/Box';
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


export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [employee, setEmployee] = useState([]);
    const [tempImageUrl, setTempImageUrl] = useState('');
    const id = localStorage.getItem('id');

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://localhost:7013/api/Employee`)
            .then(response => {
                const data = response.data.data
                const foundUser = data.find(emp => emp.account.accountId == id);
                setEmployee(foundUser);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // --- Start Booking Session ---
    const [booking, setBooking] = useState([])
    const [orders, setOrder] = useState([])

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://localhost:7013/api/Order`)
            .then(response => {
                const data = response.data.data
                const mail = localStorage.getItem('email');
                const foundItem = data.filter(item => item.employeeEmail == mail);
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

    const [totalAmount, setTotalAmount] = useState(0);

    const totalIncome = () => {
        let sum = 0;
        orders.forEach(order => {
            sum += order.total;
        });
        setTotalAmount(sum);
    };

    useEffect(() => {
        totalIncome();
      }, [orders]);

    return (
        <div className='container'>

            <h2 style={{ color: 'black', fontSize: '45px', fontWeight: 'bold', padding: '10px 35px' }}>Dashboard</h2>
            <Row>
                <Col lg="8" md="8">
                    <div className="tab-content">
                        <div class="Account__StyledAvatar-sc-1d5h8iz-3 profile-left">
                            <img src={employee.account && employee.account.img} alt="avatar" />
                            <div class="info">
                                Tài khoản của
                                <strong>{employee.lastName} {employee.firstName}</strong>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg="4" md="4">
                    <div className="tab-content">
                        <div class="Account__StyledAvatar-sc-1d5h8iz-3 profile-left">
                            <div class="info">
                                Tổng doanh thu:
                                <strong>{totalAmount}.000 VND</strong>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>




            <div className="tab-pane" id="account-info">
                <Container>
                    <Row>
                        <Col lg="12" md="12">
                            <h4 className="fw-bold mt-4 mb-4">Danh sách công việc</h4>

                            <div className="table-responsive m-b-40">
                                <table className="table table-borderless table-data3">
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
                                                            <h4 className="fw-bold mb-3">Chi tiết công việc</h4>
                                                            <br></br>
                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="fs-6 mb-0">Loại dịch vụ:</h6>
                                                                <p className="section__description mb-0">{booking.type}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="fs-6 mb-0">Dịch vụ:</h6>
                                                                <p className="section__description mb-0">{booking.serviceName}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Địa chỉ:</h6>
                                                                <p className="section__description mb-0">{booking.address}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Ngày:</h6>
                                                                {/* <p className="section__description mb-0">{booking.date}</p> */}
                                                                <p className="section__description mb-0">{formattedDate}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Thời gian bắt đầu:</h6>
                                                                <p className="section__description mb-0">{booking.startTime}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Thời gian kết thúc:</h6>
                                                                <p className="section__description mb-0">{booking.endTime}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Nhân viên:</h6>
                                                                <p className="section__description mb-0">{booking.employeeName}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Số điện thoại nhân viên:</h6>
                                                                <p className="section__description mb-0">{booking.employeePhone}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <h6 className="mb-0 fs-6">Ghi chú:</h6>
                                                                {/* <p className="section__description mb-0 bordered">{booking.note}</p> */}
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2">
                                                                <p className="section__description mb-0 mt-2 note-container">{booking.note}</p>
                                                            </div>

                                                            <div className=" d-flex align-items-center gap-2 ">
                                                                <h6 className="mb-0 h3 mt-3">Tổng:</h6>
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
                    </Row>
                </Container >
            </div>
        </div>

    )
}
