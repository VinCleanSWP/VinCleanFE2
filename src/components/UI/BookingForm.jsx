
import React, { useState, useEffect } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import { format, set } from 'date-fns';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button className="normal-button" onClick={onClose}>Close</button>
    </div>
  );
};

const BookingForm = ({ serviceId, selectedServiceName, selectedServiceType, selectedServiceCost }) => {
  const { id } = useParams();
  const [customerid, setCustomerid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyTime, setJourneyTime] = useState("");
  const [message, setMessage] = useState("");
  const [journeyHours, setJourneyHours] = useState("");
  const [journeyMinutes, setJourneyMinutes] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [totalPoint, setTotalPoint] = useState(0);
  const [lastTotalPoint, setLastTotalPoint] = useState(totalPoint);
  const [discountedPrice, setDiscountedPrice] = useState();
  const [isPointUsed, setIsPointUsed] = useState(false);
  const [DataAccount, setDataAccount] = useState("");
  const [selectedServiceCostChange, setSelectedServiceCost] = useState(0);
  const date = moment(journeyDate).format('YYYY-MM-DD');



  const accountID = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Customer/Account/${accountID}`)
      .then(response => {
        const data = response.data.data;
        setDataAccount(data);
        setCustomerid(data.customerId);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setTotalPoint(data.totalPoint);
      })
      .catch(error => {
        console.error("Error fetching customer account:", error);
      });
  }, []);

  // useEffect(() => {
  //   // Calculate the discounted price based on the totalPoint
  //   const calculateDiscountedPrice = () => {
  //     const discount = Math.floor(totalPoint / 100) * 5;
  //     const newDiscountedPrice = selectedServiceCost - discount;
  //     setDiscountedPrice(newDiscountedPrice > 0 ? newDiscountedPrice : 0);
  //   };

  //   calculateDiscountedPrice();
  // }, [totalPoint, selectedServiceCost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
    setDiscountedPrice(0);

    return;
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const data = {
      customerId: customerid,
      starTime: journeyTime + ":00",
      date: date,
      serviceId: serviceId,
      address: address,
      phone: phoneNumber,
      note: message,
      price: discountedPrice, // Use the discounted price
      pointUsed: lastTotalPoint
    };

    axios.post('https://localhost:7013/api/Process', data)
      .then(response => {
        console.log(response.data);
        setSubmittedData(response.data);
        setIsPopupOpen(false);
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
        console.error(error);
      });

    setJourneyHours(0);
    setJourneyMinutes(0);
    setAddress('');
    setPhoneNumber('');
    setMessage('');
  };

  const handleUseTotalPoint = () => {

    const pointsToUse = Math.floor(totalPoint / 100) * 100;
    const discountAmount = Math.floor(pointsToUse / 100) * 5;
    // setOldTotalPoint(totalPoint)
    if (!handleNotUseTotalPoint) {
      setTotalPoint(0);
    }
    setLastTotalPoint(totalPoint);
    setDiscountedPrice(discountAmount > 0 ? selectedServiceCost - discountAmount : selectedServiceCost);

    setIsPointUsed(true);
  };

  const handleNotUseTotalPoint = () => {
    // setOldTotalPoint(totalPoint);
    // console.log(totalPoint);
    // console.log(oldTotalPoint);

    setTotalPoint(Math.floor(totalPoint / 100) * 100);
    setLastTotalPoint(0);

    setIsPointUsed(false);
    setDiscountedPrice(selectedServiceCost);
  };

  const handleReset = (e) => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress("");
    setJourneyDate("");
    setJourneyTime("");
    setMessage("");
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSubmittedData(null);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };


  return (
    <Form onSubmit={handleSubmit}>
      {/* {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )} */}

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <label className="form-label">Tên</label>
        <input type="text" placeholder="Nhập tên" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <label className="form-label">Họ</label>
        <input type="text" placeholder="Nhập họ" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <label className="form-label">Số điện thoại</label>
        <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <label className="form-label">Địa chỉ</label>
        <input type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <label className="form-label">Chọn ngày</label>
        <input type="date" placeholder="Chọn ngày làm" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <label className="form-label">Chọn giờ</label>
        <input type="time" placeholder="Chọn giờ làm" className="time__picker" value={journeyTime} onChange={(e) => setJourneyTime(e.target.value)} />
      </FormGroup>
      <FormGroup>
      <label className="form-label">Ghi chú</label>
        <textarea rows={5} type="textarea" className="textarea" placeholder="Ghi ở đây ..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      </FormGroup>

      {localStorage.getItem('loggedIn') ?
        <button className="normal-button buttonReset blue" type="submit">Xác nhận</button>
        : <Link to='/login'><button className="normal-button buttonReset blue">Đăng nhập để đặt dịch vụ</button></Link>
      }
      {/* <button className="normal-button buttonReset blue" type="submit">Xác nhận</button> */}

      <button class="buttonReset float-right" type="button" onClick={handleReset}>
        <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
          <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
        </svg>
        Làm mới
      </button>

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={handleClosePopup}
        ClassName="custom-overlay"

        style={{
          content: {
            width: '670px',  // Điều chỉnh kích thước chiều rộng của Modal
            height: '500px', // Điều chỉnh kích thước chiều cao của Modal
            margin: 'auto',  // Căn giữa theo chiều ngang
            borderRadius: '8px', // Bo tròn góc của Modal
            // Các thuộc tính khác để tùy chỉnh kiểu dáng
          }
        }}
      >

        {/* Render the content of the popup */}
        {
          <div class="submit-form mb-4">
            <h3><strong>Xác nhận thông tin</strong></h3>
            <br></br>
            <p><strong>ID của bạn:</strong> {customerid}</p>
            <p><strong>Tên bạn:</strong> {lastName + ' ' + firstName}</p>
            <p><strong>Thời gian bắt đầu làm:</strong> {journeyTime + ":00"}</p>
            <p><strong>Dịch vụ bạn đã chọn:</strong> {selectedServiceName}</p>
            <p><strong>Date:</strong> {journeyDate}</p>
            <p><strong>Tạm tính:</strong> {selectedServiceCost}</p>
            <div>
              <p><strong>Bạn có muốn dùng số điểm đã tích không?</strong></p>

              <div>
                <button className="use-button" onClick={handleUseTotalPoint}>
                  Dùng {Math.floor(totalPoint / 100) * 100} pts
                </button>
                <button className="cancel-button" onClick={handleNotUseTotalPoint}>
                  Không
                </button>
              </div>
              {/* Làm switch button */}

            </div>
            <br></br>

            <p><strong>Tổng tiền:</strong> {discountedPrice}</p>
            <p><strong>Ghi chú:</strong>{message}</p>
            {/* Các thông tin khác */}
            <button className="close-button" onClick={handleClosePopup}>Đóng</button>
            <button className="submit-button" onClick={handleConfirm}>Xác nhận</button>
          </div>
        }
      </Modal>
      <ToastContainer />
    </Form>
  );
};

export default BookingForm;
