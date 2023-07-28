import React, { useState, useEffect } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import { format, set } from 'date-fns';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Switch from "react-switch";
import { TbReload } from "react-icons/tb";

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
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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
        setPhoneNumber(data.phone);
        setAddress(data.address);
      })
      .catch(error => {
        console.error("Error fetching customer account:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
    setDiscountedPrice(0);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const data = {
      customerId: customerid,
      starTime: journeyTime + ":00",
      name: lastName + ' ' + firstName,
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


  };
  console.log(firstName);

  const handleUseTotalPoint = () => {
    const pointsToUse = Math.floor(totalPoint / 100) * 100;
    const discountAmount = Math.floor(pointsToUse / 100) * 5;

    setLastTotalPoint(totalPoint);
    setDiscountedPrice(discountAmount > 0 ? selectedServiceCost - discountAmount : selectedServiceCost);
    setIsPointUsed(true);
  };

  const handleNotUseTotalPoint = () => {
    setTotalPoint(Math.floor(totalPoint / 100) * 100);
    setLastTotalPoint(totalPoint);
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



  const handleSwitchChange = (isChecked) => {
    setIsSwitchOn(isChecked);
    if (isChecked) {
      handleUseTotalPoint();
    } else {
      handleNotUseTotalPoint();
    }
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="text" placeholder="Tên" value={firstName} onChange={(e) => setFirstName(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: firstName ? 'black' : 'gray',
            opacity: firstName ? '1' : '0.5',
            fontFamily: 'Arial'
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="text" placeholder="Họ" value={lastName} onChange={(e) => setLastName(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: lastName ? 'black' : 'gray',
            opacity: lastName ? '1' : '0.5'
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="text" placeholder="SĐT" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: phoneNumber ? 'black' : 'gray',
            opacity: phoneNumber ? '1' : '0.5'
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: address ? 'black' : 'gray',
            opacity: address ? '1' : '0.5'
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="date" placeholder="Ngày đặt" value={journeyDate} min={tomorrowString} onChange={(e) => setJourneyDate(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: journeyDate ? 'black' : 'gray',
            opacity: journeyDate ? '1' : '0.5'
          }}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4" style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <input type="time" placeholder="Thời gian" value={journeyTime} onChange={(e) => setJourneyTime(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: journeyTime ? 'black' : 'gray',
            opacity: journeyTime ? '1' : '0.5'
          }}
        />
      </FormGroup>
      <FormGroup style={{ border: '2px solid gray', borderRadius: '10px' }}>
        <textarea rows={5} type="textarea" className="textarea" placeholder="Ghi chú" value={message} onChange={(e) => setMessage(e.target.value)}
          style={{
            fontWeight: 'bold',
            color: message ? 'black' : 'gray',
            opacity: message ? '1' : '0.5'
          }}
        ></textarea>
      </FormGroup>


      <div style={{textAlign:"right"}}>
      <button onClick={handleReset} style={{marginRight:"25px"}}>
        <TbReload size={30} color="grey"></TbReload>
      </button>
      {localStorage.getItem('loggedIn') ?
      
        <button type="submit" class="btn btn-success" >Xác nhận</button>
        : <Link to='/login'><button className="normal-button buttonReset blue">Đăng nhập để đặt dịch vụ</button></Link>
      }
      {/* <button className="normal-button buttonReset blue" type="submit">Xác nhận</button> */}
      </div>

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={handleClosePopup}
        ClassName="custom-overlay"
        style={{
          overlay: {
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '800px',
            height: '800px',
            margin: 'auto',

          }
        }}
      >
        {/* Render the content of the popup */}
        <div>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="account-general">
                  <hr className="border-light m-0" />
                  <div className="card-body"> <h3 style={{ textAlign: 'center' }}><strong>Thông tin đặt dịch vụ</strong></h3>
                    <br></br>
                    <p><strong>ID của bạn:</strong> {customerid}</p>
                    <p><strong>Tên bạn:</strong> {lastName + ' ' + firstName}</p>
                    <p><strong>SĐT:</strong> {phoneNumber}</p>
                    <p><strong>SĐT:</strong> {address}</p>
                    <p><strong>Thời gian bắt đầu làm:</strong> {journeyTime + ":00"}</p>
                    <p><strong>Dịch vụ bạn đã chọn:</strong> {selectedServiceName}</p>
                    <p><strong>Ngày đặt:</strong> {journeyDate}</p>
                    <p><strong>Tạm tính:</strong> {isSwitchOn ? discountedPrice : selectedServiceCost}</p>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p>
                        <strong>
                          Dùng{" "}
                          <span style={{ color: '#162b75' }}>{totalPoint}</span> điểm tích lũy?
                        </strong>
                      </p>
                      <Switch
                        checked={isSwitchOn}
                        onChange={handleSwitchChange}
                        onColor="#162b75"
                        onHandleColor="#162b75"
                        handleDiameter={24}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={48}
                        className="react-switch"
                      />
                      <span>{isSwitchOn ? handleUseTotalPoint : handleNotUseTotalPoint}</span>
                    </div>



                    <br></br>


                    <p>
                      <strong>Ghi chú:</strong>
                    </p>
                    <textarea
                      rows={5}
                      value={message}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className=" btn btn-primary" onClick={handleClosePopup}>Đóng</button>
            <button className=" btn btn-success" onClick={handleConfirm}>Xác nhận</button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </Form>
  );
};

export default BookingForm;
