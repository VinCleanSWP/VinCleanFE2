import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';

const BookingForm = () => {
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
  const [submittedData, setSubmittedData] = useState(null); // Thêm state để lưu trữ dữ liệu đã gửi về


  useEffect(() => {
    axios.get(`https://localhost:7013/api/Customer/Account/36`)
      .then(response => {
        const data = response.data.data;
        setCustomerid(data.customerId)
        setFirstName(data.firstName);
        setLastName(data.lastName);
      })
      .catch(error => {
        console.error("Error fetching customer account:", error);
      });
  }, []);

  const handleJourneyTimeChange = (e) => {
    const timeString = e.target.value;
    const [hours, minutes] = timeString.split(':');

    setJourneyHours(parseInt(hours));
    setJourneyMinutes(parseInt(minutes));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      customerId: customerid,
      starTime: journeyTime + ":00",
      date: new Date().toISOString(),
      serviceId: 1,
      address: address,
      phone: phoneNumber,
      note: message
    };

    axios.post('https://localhost:7013/api/Process', data)
      .then(response => {
        console.log(response.data);
        setSubmittedData(response.data); // Lưu trữ dữ liệu đã gửi về
        setIsPopupOpen(true);
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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSubmittedData(null); // Đặt lại dữ liệu đã gửi về sau khi đóng popup
  };

  return (
    
    <Form onSubmit={handleSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label for="firstName">Tên</label>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label for="firstName">Họ</label>
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label for="firstName">Số điện thoại</label>
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label for="firstName">Địa chỉ</label>
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label for="firstName">Ngày làm</label>
        <input type="date" placeholder="Journey Date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label for="firstName">Hẹn giờ</label>
        <input type="time" placeholder="Journey Time" className="time__picker" value={journeyTime} onChange={(e) => setJourneyTime(e.target.value)} />
        {/* <input type="time" placeholder="Journey Time" className="time__picker" value={journeyTime} onChange={handleJourneyTimeChange} /> */}
      </FormGroup>
      <FormGroup>
        <label for="firstName">Ghi chú</label>
        <textarea rows={5} type="textarea" className="textarea" placeholder="Write" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      </FormGroup>


      <button className="normal-button" type="submit">Xác nhận</button>

      <Modal isOpen={isPopupOpen} onRequestClose={handleClosePopup} >

        {/* Nội dung popup */}
        {submittedData && (
          <div>
            <h3>Submitted Data</h3>
            <p>Customer ID: {submittedData.customerId}</p>
            <p>Customer name: {lastName + ' ' + firstName}</p>
            <p>Start Time: {submittedData.starTime}</p>
            <p>Status: {submittedData.status}</p>
            <p>Date: {submittedData.date}</p>
            <p>Note: {submittedData.note}</p>
            {/* Các thông tin khác */}
            <button onClick={handleClosePopup}>Close</button>
          </div>
        )}
      </Modal>
    </Form>
  );
};

export default BookingForm;
