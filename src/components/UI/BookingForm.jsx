
import React, { useState, useEffect } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import { format, set } from 'date-fns';

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
  const [selectedServiceCostChange, setSelectedServiceCost] = useState(0);



  const accountID = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Customer/Account/${accountID}`)
      .then(response => {
        const data = response.data.data;
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
      date: journeyDate,
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
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Journey Date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="time" placeholder="Journey Time" className="time__picker" value={journeyTime} onChange={(e) => setJourneyTime(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <textarea rows={5} type="textarea" className="textarea" placeholder="Write" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      </FormGroup>

      <button className="normal-button" type="submit">Xác nhận</button>

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
            <h3>Submitted Data</h3>
            <br></br>
            <p><strong>ID của bạn:</strong> {customerid}</p>
            <p><strong>Tên bạn:</strong> {lastName + ' ' + firstName}</p>
            <p><strong>Thời gian bắt đầu làm:</strong> {journeyTime + ":00"}</p>
            <p><strong>Dịch vụ bạn đã chọn:</strong> {selectedServiceName}</p>
            {/* <p>Date: {format(new Date(journeyDate), 'dd/MM/yyyy')}</p> */}
            <p><strong>Tạm tính:</strong> {selectedServiceCost}</p>
            <div>
              <p><strong>Bạn có muốn dùng số điểm đã tích không?</strong></p>

              <div>
                <button className="normal-button" onClick={handleUseTotalPoint}>
                  Dùng {Math.floor(totalPoint / 100) * 100} pts
                </button>
                <button className="normal-button" onClick={handleNotUseTotalPoint}>
                  No
                </button>
              </div>
            {/* Làm switch button */}

            </div>
            <br></br>

            <p><strong>Tổng tiền:</strong> {discountedPrice}</p>
            <p><strong>Note:</strong> {message}</p>
            {/* Các thông tin khác */}
            <button className="normal-button" onClick={handleClosePopup}>Close</button>
            <button className="submit-button" onClick={handleConfirm}>Xác nhận</button>
          </div>
        }
      </Modal>
    </Form>
  );
};

export default BookingForm;
