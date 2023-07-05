
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
  const accountID = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Customer/Account/${accountID}`)
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

  const handleReset = (e) => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress("");
    setJourneyDate("");
    setJourneyTime("");
    setMessage("");
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


      <button className="buttonReset blue" type="submit">Submit</button>
      {/* <button className="ml-3 bordered float-right">
        <i className="fas fa-undo-alt px-1"></i>
      </button> */}

      <button class="buttonReset float-right" type="button" onClick={handleReset}>
        <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
          <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
        </svg>
        Refresh
      </button>

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
