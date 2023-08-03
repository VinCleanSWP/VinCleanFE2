import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from 'axios';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Modal1 from '@mui/material/Modal';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import "../styles/contact.css";
import RatingForm from "../components/UI/RatingForm";
import { ToastContainer, toast } from 'react-toastify';
import { Alert, Button, Input, Modal, Select, Space, Table, Upload } from 'antd';
import Swal from "sweetalert2";


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

const itemsPerPage = 12;

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setIsOpen(false);
  const [booking, setBooking] = useState([])
  const [process, setProcess] = useState([])
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const [isMo, setIsMo] = useState(false);
  const handleDong = () => setIsMo(false);

  const handleRatingOpen = () => {
    setIsRatingOpen(true);
  };

  const handleRatingSubmit = (formData) => {
    console.log('Rating and comment:', formData);
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = () => {
    axios
      .get('https://vinclean.azurewebsites.net/api/Order')
      // .get('https://localhost:7013/api/Order')
      .then((response) => {
        const data = response.data.data;
        const mail = localStorage.getItem('email');
        const foundItem = data.filter(
          (item) => item.email === mail && item.status !== 'Completed' && item.status !== 'Cancel'
        );
        setProcess(foundItem);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [modal, setModal] = useState({})

  const handleRowClick = (process, id) => {
    setOpen(true);
    setBooking(process);
    setSelectedEvent(process)
    axios.get(`https://vinclean.azurewebsites.net/api/Order/GetALL/${id}`)
      // axios.get(`https://localhost:7013/api/Order/GetALL/${id}`)
      .then(response => {
        console.log('Success:', response.data.data);
        setModal(response.data.data)
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  };

  // DateDetails
  // const dateDetails = booking.date;
  const dateW = new Date(booking.date);
  const cDate = new Date(booking.createdDate);
  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  const dateWork = dateW.toLocaleDateString(undefined, options);
  const createDate = cDate.toLocaleDateString(undefined, options);

  const handleClick = () => {
    axios.put(`https://vinclean.azurewebsites.net/api/Order/StatusCompleted?processid=${booking.orderId}`)
      // axios.put(`https://localhost:7013/api/Order/StatusCompleted?processid=${booking.orderId}`)
      .then(response => {
        console.log('Success:', response.data.data);
        toast.success('Checkout Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchOrderData();
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });

    setIsOpen(true);
  };

  const handleCancel = async () => {

    try {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })

      if (text) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
          title: 'Are you sure to Cancel it?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Cancel it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const cancelInfo = {
              orderId: booking.orderId,
              cancelBy: localStorage.getItem('id'),
              reasonCancel: text
            };
            console.log(cancelInfo)
            axios.put('https://vinclean.azurewebsites.net/api/Order/Cancel', cancelInfo)
              .then((response) => {
                console.log('OK');
                setTimeout(() => {
                  setSelectedEvent(null)
                  fetchOrderData();
                }, 3000);
                swalWithBootstrapButtons.fire(
                  'Cancelled!',
                  'this order has been cancelled.',
                  'success'
                )
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                console.log('KO');
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })

      }

    } catch (error) {
    }
  }

  // const xoa = () => {
  //   cancelBooking();
  // }

  // const cancelBooking = async () => {
  //   const cancelInfo = {
  //     orderId: booking.orderId,
  //     cancelBy: localStorage.getItem('id'),
  //     reasonCancel: "string"
  //   };

  //   try {
  //     const response = await axios.put('https://vinclean.azurewebsites.net/api/Order/Cancel', cancelInfo);
  //     // const response = await axios.put('https://localhost:7013/api/Order/Cancel', cancelInfo);
  //     if (response.status === 200) {
  //       console.log('OK');
  //       toast.success('Cancel Successfully!', {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         handleDong();
  //         setSelectedEvent(null)
  //         fetchOrderData();
  //       }, 3000);
  //     } else {
  //       console.log('KO');
  //     }
  //   } catch (error) {
  //   }
  // }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(process.length / itemsPerPage);
  const currentData = process.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  function formatCurrency(amount) {
    return amount ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
  }

  return (
    <Helmet title="Các hoạt động đã đặt">
      <CommonSection title="Các hoạt động đã đặt" />
      <section>

        <Container>
          <Row>
            <Col lg="12" md="12">
              <h4 className="fw-bold mb-4">Hoạt động</h4>
              <div className="table-responsive m-b-40">
                <table className="table table-borderless table-hover table-data3">
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
                    {currentData.map((processing) => (
                      // {process.map((processing) => (
                      // <tr className="pointer" key={processing.processId} onClick={() => handleRowClick(processing)}>
                      <tr className="pointer" key={processing.orderId} onClick={() => handleRowClick(processing, processing.orderId)}>
                        <td>{processing.typeName}</td>
                        <td>{processing.serviceName}</td>
                        <td>{processing.employeeName}</td>
                        {/* <td>{order.dateWork}</td> */}
                        <td>{new Date(processing.date).toLocaleDateString(undefined, options)}</td>
                        {processing.status == 'Incoming' ? (
                          <td className="listorder complete" style={{ color: '#ff6a00' }}>{processing.status}</td>
                        ) : (
                          <td className="listorder complete" style={{ color: '#0053e4' }}>{processing.status}</td>
                        )}
                        <td className="process" style={{ color: '#35cb28' }}>{formatCurrency(processing.price)}</td>
                      </tr>
                    ))}
                    {/* <Modal
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
                                <h6 className="fs-6 mb-0"><strong>Mã dịch vụ:</strong></h6>
                                <p className="section__description mb-0">{booking.orderId}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="fs-6 mb-0"><strong>Dịch vụ:</strong></h6>
                                <p className="section__description mb-0">{booking.typeName}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="fs-6 mb-0"><strong>Hạng mục:</strong></h6>
                                <p className="section__description mb-0">{booking.serviceName}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Địa chỉ:</strong></h6>
                                <p className="section__description mb-0">{booking.address}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Ngày tạo đơn:</strong></h6>
                                <p className="section__description mb-0">{createDate}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Ngày đặt:</strong></h6>
                                <p className="section__description mb-0">{dateWork}</p>
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
                                <h6 className="mb-0 fs-6"><strong>Email của nhân viên:</strong></h6>
                                <p className="section__description mb-0">{booking.employeeEmail}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Phụ thu:</strong></h6>
                                <p className="section__description mb-0">{booking.subPrice ? booking.subPrice : 0} VND</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <h6 className="mb-0 fs-6"><strong>Ghi chú:</strong></h6>
                              </div>

                              <div className=" d-flex align-items-center gap-2">
                                <p className="section__description mb-0 mt-2 note-container">{booking.note}</p>
                              </div>

                              <div className=" d-flex align-items-center gap-2 ">
                                <h6 className="mb-0 h3 mt-3"><strong>Tổng tiền:</strong></h6>
                                <p className="section__description mb-0 h3 mt-3 text-success"><strong>{booking.price}.000 VND</strong></p>
                              </div>
                            </div>
                            {booking.status == 'Processing' ?
                              (
                                <div>
                                  <Row>
                                    <Col lg="6" md="6">
                                      <Button variant="contained" className="container mt-3 mr-3" disabled>Hủy</Button>
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
                                        <Button variant="contained" className="container mt-3 mr-3" onClick={handleCancel}>Hủy</Button>
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
                                        <Button variant="contained" className="container mt-3 mr-3" disabled>Hủy</Button>
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
                          </Box>
                        </Modal>
                      </Box>
                    </Modal> */}

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
                                {booking.status == 'Incoming' ? (
                                  <div style={{ flex: '1' }}>
                                    <p>
                                      <strong>Trạng Thái hiện tại: </strong> <label className='status Incoming' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                    </p>
                                  </div>
                                ) : (
                                  <div style={{ flex: '1' }}>
                                    <p>
                                      <strong>Trạng Thái hiện tại: </strong> <label className='status Processing' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                    </p>
                                  </div>
                                )}
                                <p><strong>Ngày đặt: </strong> {createDate}</p>
                                <p><strong>Địa chỉ: </strong> {booking.address}</p>
                                <p><strong>Ngày thực hiện: </strong> {dateWork}</p>
                                <p><strong>Giờ bắt đầu: </strong> {booking.startTime}</p>
                                <p><strong>Giờ kết thúc: </strong> {booking.endTime}</p>
                                <p><strong>Điểm sử dụng: </strong> {booking.pointUsed ? booking.pointUsed : 0}</p>
                                <p><strong>Phụ Thu: </strong> {booking.subPrice ? booking.subPrice : 0}</p>
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
                                    <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"}</p>
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

                          {booking.status == 'Processing' ?
                            (
                              <div>
                                <Row>
                                  <Col lg="6" md="6">
                                    <Button variant="contained" className="container mt-3 mr-3" disabled>Hủy dịch vụ</Button>
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
                                      <Button variant="contained" className="container mt-3 mr-3" onClick={handleCancel}>Hủy dịch vụ</Button>
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
                                      <Button variant="contained" className="container mt-3 mr-3" disabled>Hủy dịch vụ</Button>
                                    </Col>
                                    <Col lg="6" md="6">
                                      <Button variant="contained" className="container mt-3 mr-3" disabled>Check Out</Button>
                                    </Col>
                                  </Row>
                                </div>
                              )}
                          <Modal1
                            open={isOpen}
                            onClose={handleClose2}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box sx={{ ...style, width: 450 }}>
                              <h2 id="child-modal-title">Checkout Thành Công</h2>
                              <Row>
                                <Col lg="6" md="6">
                                  <Button variant="contained" className="container mt-3" onClick={handleClose2}>Đóng</Button>
                                </Col>
                                <Col lg="6" md="6">
                                  <Button variant="contained" className="container mt-3" onClick={handleRatingOpen}>Đánh giá</Button>
                                </Col>
                              </Row>
                            </Box>
                          </Modal1>
                        </div>
                      )}
                    </Modal>

                    {/* <Modal1
                      open={isMo}
                      onClose={handleDong}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box sx={{ ...style, width: 450 }}>
                        <h2 id="child-modal-title">Cho tao hủy đi please</h2>
                        <Row>
                          <Col lg="6" md="6">
                            <Button variant="contained" className="container mt-3" onClick={handleDong}>Đóng</Button>
                          </Col>
                          <Col lg="6" md="6">
                            <Button variant="contained" className="container mt-3" onClick={handleCancel}>Xóa mẹ đi</Button>
                          </Col>
                        </Row>
                      </Box>
                    </Modal1> */}

                    {isRatingOpen && (
                      <Modal1
                        open={isRatingOpen}
                        onClose={() => setIsRatingOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <RatingForm
                            serviceId={booking.serviceId}
                            customerId={booking.customerId}
                            onClose={() => setIsRatingOpen(false)}
                            onRatingSubmit={handleRatingSubmit} />
                        </Box>
                      </Modal1>
                    )}

                  </tbody>
                </table>

                {/* Hiển thị phân trang */}
                <div style={{ float: 'right' }}>
                  <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                </div>
              </div>
            </Col>
          </Row>
        </Container >
      </section >
      <ToastContainer />
    </Helmet >
  );
};

export default Contact;
