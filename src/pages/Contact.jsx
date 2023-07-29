import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import "../styles/contact.css";
import RatingForm from "../components/UI/RatingForm";

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

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setIsOpen(false);
  const [booking, setBooking] = useState([])
  const [process, setProcess] = useState([])
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const handleRatingOpen = () => {
    setIsRatingOpen(true);
  };

  const handleRatingSubmit = (formData) => {
    // Xử lý dữ liệu rating và comment ở đây (ví dụ: gửi lên backend)
    console.log('Rating and comment:', formData);
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios.get(`https://vinclean.azurewebsites.net/api/Process`)
      .then(response => {
        const data = response.data.data
        const accId = localStorage.getItem('id');
        const foundItem = data.filter(item => item.accountId == accId);
        // setProcess(response.data.data);
        setProcess(foundItem);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleRowClick = (process) => {
    setOpen(true);
    setBooking(process);
  };

  // DateDetails
  const dateDetails = booking.date;
  const date = new Date(dateDetails);
  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const handleClick = () => {
    const url = 'https://vinclean.azurewebsites.net/api/Order';
    const data = {
      customerId: booking.customerId,
      processId: booking.processId,
      serviceId: booking.serviceId,
      note: booking.note,
      total: booking.price,
      pointUsed: booking.pointUsed,
      orderDate: booking.date,
      finishedDate: booking.date,
      employeeId: booking.employeeId,
      startTime: booking.startTime,
      endTime: booking.endTime,
      dateWork: booking.date,
      startWorking: booking.startWorking,
      endWorking: booking.endWorking
    };
    console.log(data)
    axios.post(url, data)
      .then(response => {
        console.log('Success:', response.data);
        // Thêm các xử lý thành công tại đây (nếu cần)
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        // Thêm các xử lý lỗi tại đây (nếu cần)
      });

    setIsOpen(true);
  };

  return (
    <Helmet title="Các hoạt động đã đặt">
      <CommonSection title="Các hoạt động đã đặt" />
      <section>

        <Container>
          <Row>
            <Col lg="12" md="12">
              <h4 className="fw-bold mb-4">Hoạt động</h4>
              <div className="table-responsive m-b-40">
                <table className="table table-borderless table-data3">
                  <thead>
                    <tr>
                      <th>Dịch vụ</th>
                      <th>Hạng mục</th>
                      <th>Nhân viên</th>
                      <th>Ngày đặt</th>
                      <th>Trạng thái</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {process.map((processing) => (
                      <tr className="pointer" key={processing.processId} onClick={() => handleRowClick(processing)}>
                        <td>{processing.typeName}</td>
                        <td>{processing.serviceName}</td>
                        <td>{processing.employeeName}</td>
                        {/* <td>{order.dateWork}</td> */}
                        <td>{new Date(processing.date).toLocaleDateString(undefined, options)}</td>
                        {processing.status == 'Completed' ?
                          (
                            <td className="complete">{processing.status}</td>
                          ) : processing.status == 'Incoming' ?
                            (
                              <td className="denied">{processing.status}</td>
                            ) : (
                              <td className="process">{processing.status}</td>
                            )}
                        {/* <td className="complete">{processing.status}</td> */}
                        <td className="process">{processing.price} VND</td>
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
                              <h4 className="fw-bold mb-3"><strong>Thông tin đặt</strong></h4>
                              <br></br>
                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="fs-6 mb-0"><strong>Dịch vụ:</strong></h6>
                                <p className="section__description mb-0">{booking.typeName}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="fs-6 mb-0"><strong>Option:</strong></h6>
                                <p className="section__description mb-0">{booking.serviceName}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Địa chỉ:</strong></h6>
                                <p className="section__description mb-0">{booking.address}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Ngày đặt:</strong></h6>
                                {/* <p className="section__description mb-0">{booking.date}</p> */}
                                <p className="section__description mb-0">{formattedDate}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Thời gian bắt đầu:</strong></h6>
                                <p className="section__description mb-0">{booking.startTime}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Thời gian kết thúc:</strong></h6>
                                <p className="section__description mb-0">{booking.endTime}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Nhân viên:</strong></h6>
                                <p className="section__description mb-0">{booking.employeeName}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>SĐT của nhân viên:</strong></h6>
                                <p className="section__description mb-0">{booking.employeePhone}</p>
                              </div>
                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Phụ thu:</strong></h6>
                                <p className="section__description mb-0">{booking.subPrice ? booking.subPrice:0 } VND</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Ghi chú:</strong></h6>
                                {/* <p className="section__description mb-0 bordered">{booking.note}</p> */}
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <p className="section__description mb-0 mt-2 note-container">{booking.note}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2 ">
                                <h6 className="mb-0 h3 mt-3"><strong>Tổng tiền:</strong></h6>
                                <p className="section__description mb-0 h3 mt-3 text-success"><strong>{booking.price} VND</strong></p>
                              </div>
                            </div>
                            {booking.status == 'Completed' ?
                              (
                                <div>
                                  <Row>
                                    <Col lg="6" md="6">
                                      <Button variant="contained" className="container mt-3 mr-3" disabled>Sửa</Button>
                                    </Col>
                                    <Col lg="6" md="6">
                                      <Button variant="contained" className="container mt-3 mr-3" onClick={handleClick}>Check Out</Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : booking.status == 'Incoming' ?
                                (
                                  <div>
                                    <Row>
                                      <Col lg="6" md="6">
                                        <Button variant="contained" className="container mt-3 mr-3" >Sửa</Button>
                                      </Col>
                                      <Col lg="6" md="6">
                                        <Button variant="contained" className="container mt-3 mr-3" disabled>Check Out</Button>
                                      </Col>
                                    </Row>
                                  </div>
                                ) : (
                                  <div>
                                    <Row>
                                      <Col lg="6" md="6">
                                        <Button variant="contained" className="container mt-3 mr-3" disabled>Sửa</Button>
                                      </Col>
                                      <Col lg="6" md="6">
                                        <Button variant="contained" className="container mt-3 mr-3" disabled>Check Out</Button>
                                      </Col>
                                    </Row>
                                  </div>
                                )}
                          </Col>
                        </Row>
                        <Modal
                          open={isOpen}
                          onClose={handleClose2}
                          aria-labelledby="child-modal-title"
                          aria-describedby="child-modal-description"
                        >
                          <Box sx={{ ...style, width: 450 }}>
                            <h2 id="child-modal-title">Checkout Thành Công</h2>
                            <h5 id="child-modal-title">Rating</h5>
                            <p id="child-modal-description">
                              Sao sao sao sao sao
                            </p>
                            <div className=" d-flex align-items-center gap-2">
                              <h6 className="mb-0 fs-6">Note:</h6>
                            </div>

                            <div className=" d-flex align-items-center gap-2">
                              <p className="section__description mb-0 mt-2 note-container">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <Row>
                              <Col lg="6" md="6">
                                <Button variant="contained" className="container mt-3" onClick={handleClose}>Đóng</Button>
                              </Col>
                              <Col lg="6" md="6">
                                <Button variant="contained" className="container mt-3" onClick={handleRatingOpen}>Đánh giá</Button>
                              </Col>
                            </Row>
                            {/* <Button className="mt-3" onClick={handleClose}>Close</Button> */}
                          </Box>
                        </Modal>
                      </Box>
                    </Modal>
                    {isRatingOpen && (
                      <Modal
                        open={isRatingOpen}
                        onClose={() => setIsRatingOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <RatingForm
                            serviceId={booking.serviceId} // Giá trị serviceId từ UI
                            customerId={booking.customerId} // Giá trị customerId từ UI
                            onClose={() => setIsRatingOpen(false)}
                            onRatingSubmit={handleRatingSubmit} />
                        </Box>
                      </Modal>
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container >
      </section >
    </Helmet >
    
  );
};

export default Contact;
