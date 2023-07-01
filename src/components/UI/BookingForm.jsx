
import React, { useState, useEffect } from "react";

import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button className="normal-button" onClick={onClose}>Close</button>
    </div>
  );
};

const BookingForm = ({ selectedServiceId, selectedServiceName, selectedServiceType }) => {
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

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Customer/Account/23`)
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

    if (!firstName || !lastName || !phoneNumber || !address || !journeyDate || !journeyTime || !selectedServiceName) {
      setNotification(
        <div style={{ border: '1px solid red', borderRadius: '5px', padding: '10px' }}>
          <span style={{ color: 'red' }}>Please fill in all the fields</span>
        </div>
      );
      return;
    }

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
        setSubmittedData(response.data);
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
    setSubmittedData(null);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}

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

      <button className="normal-button" type="submit">Submit</button>

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={handleClosePopup}
        ClassName="custom-overlay"

        style={{
          content: {
            width: '600px',  // Điều chỉnh kích thước chiều rộng của Modal
            height: '400px', // Điều chỉnh kích thước chiều cao của Modal
            margin: 'auto',  // Căn giữa theo chiều ngang
            borderRadius: '8px', // Bo tròn góc của Modal
            // Các thuộc tính khác để tùy chỉnh kiểu dáng
          }
        }}
      >

        {/* Render the content of the popup */}
        {submittedData && (
          <div class="mb-4 fw-bold ">
            <h3>Submitted Data</h3>
            <p>Customer ID: {submittedData.customerId}</p>
            <p>Customer name: {lastName + ' ' + firstName}</p>
            <p>Start Time: {submittedData.starTime}</p>
            <p>Service Type: {selectedServiceType}</p>
            <p>Service Name: {selectedServiceName}</p>
            <p>Status: {submittedData.status}</p>
            <p>Date: {submittedData.date}</p>
            <p>Note: {submittedData.note}</p>
            {/* Các thông tin khác */}
            <button className="normal-button" onClick={handleClosePopup}>Close</button>
          </div>
        )}
      </Modal>
    </Form>
  );
};

export default BookingForm;
