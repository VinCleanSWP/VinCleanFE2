import React, { useState, useEffect } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { format, set } from "date-fns";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Switch from "react-switch";
import { TbReload } from "react-icons/tb";
import { vi } from "date-fns/locale";
import { fi } from "date-fns/locale";
import {
  CheckEmployeeAPI,
  GetServicebyIDAPI,
} from "../../API/Employee/employeeConfig";

const BookingForm = ({
  selectedServiceID,
  selectedServiceName,
  selectedServiceType,
  selectedServiceCost,
}) => {
  const { id } = useParams();
  const [customerid, setCustomerid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyTime, setJourneyTime] = useState("");
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [totalPoint, setTotalPoint] = useState(0);
  const [lastTotalPoint, setLastTotalPoint] = useState(totalPoint);
  const [discountedPrice, setDiscountedPrice] = useState(selectedServiceCost);
  const [isPointUsed, setIsPointUsed] = useState(false);
  const [DataAccount, setDataAccount] = useState("");
  const [selectedServiceCostChange, setSelectedServiceCost] = useState(0);
  const date = moment(journeyDate).format("YYYY-MM-DD");
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validArea, setValidArea] = useState(true);
  const [validBuilding, setValidBuilding] = useState(true);
  const [validFloor, setValidFloor] = useState(true);
  const [validRoom, setValidRoom] = useState(true);

  const [validTime, setValidTime] = useState(true);
  const [validService, setValidService] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [AreaOptions, setAreaOptions] = useState([]);
  const [building, setBuilding] = useState([]);
  const [servicebyId, setServicebyId] = useState([]);
  const accountID = localStorage.getItem("id");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate());
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() + 7);
  const last7DaysString = last7Days.toISOString().split("T")[0];
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy", { locale: vi });
  const viDate = moment(journeyDate).format("DD/MM/YYYY");

  useEffect(() => {
    axios
      .get(`https://vinclean.azurewebsites.net/api/BuildingType`)
      .then((response) => {
        setAreaOptions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching building types:", error);
      });
  }, []);

  // axios.get(`https://vinclean.azurewebsites.net/api/Building/Type/${AreaOptions.id}`)
  //   .then(response => {
  //     setBuilding(response.data.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching building types:', error);
  //   });

  useEffect(() => {
    axios
      .get(
        `https://vinclean.azurewebsites.net/api/Customer/Account/${accountID}`
      )
      .then((response) => {
        const data = response.data.data;
        setDataAccount(data);
        setCustomerid(data.customerId);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setTotalPoint(data.totalPoint);
        setPhoneNumber(data.phone);
        setAddress(data.address);
      })
      .catch((error) => {
        console.error("Error fetching customer account:", error);
      });
  }, []);
  useEffect(() => {
    GetservicebyID(selectedServiceID);
  }, []);
  const validateData = () => {
    // if (!(firstName.trim() & lastName.trim() & phoneNumber.trim() & address.trim() & date.trim() & journeyTime.trim())) {
    //   alert('Vui lòng điền thông tin');
    //   return false;
    // }
    setValidTime(true);
    // setValidAddress(true);
    setValidFirstName(true);
    setValidPhone(true);
    setValidLastName(true);
    setValidDate(true);
    setValidService(true);
    setValidArea(true);
    setValidBuilding(true);
    setValidFloor(true);
    setValidRoom(true);
    const phoneRegex = /^\d{10}$/;
    const addressRegex = /^S\d+\.\d+\s\d+$/;

    if (!firstName.trim()) {
      setValidFirstName("vui lòng nhập tên");

      return false;
    } else {
      setValidFirstName(true);
    }

    if (!lastName.trim()) {
      setValidLastName("Vui lòng nhập họ");

      return false;
    } else {
      setValidLastName(true);
    }

    if (!phoneNumber.trim()) {
      setValidPhone("Vui lòng nhập số điện thoại");

      return false;
    } else {
      if (!phoneRegex.test(phoneNumber.trim())) {
        setValidPhone("Số điện thoại phải là một dãy số gồm 10 kí tự");

        return false;
      } else {
        setValidPhone(true);
      }
    }
    if (!selectedOption.trim()) {
      setValidArea("Vui lòng nhập phân khu");

      return false;
    }
    if (!selectedBuilding.trim()) {
      if (showTextBox) {
        setValidBuilding(true);
      } else {
        setValidBuilding("Vui lòng chọn tòa");
        return false;
      }
    }
    if (!selectedFloor.trim()) {
      if (showTextBox) {
        setValidFloor(true);
      } else {
        setValidFloor("Vui lòng chọn tầng");
        return false;
      }
    }
    if (!selectedRoom.trim()) {
      if (showTextBox) {
        setValidRoom(true);
      } else {
        setValidRoom("Vui lòng chọn phòng");
        return false;
      }
    }
    if (!journeyDate.trim()) {
      setValidDate("Vui lòng nhập ngày");

      return false;
    }

    if (!isTimeValid(journeyDate, journeyTime)) {
      setValidTime("Thời gian đặt không hợp lệ");
      return false;
    } else {
      setValidTime(true);
    }

    if (selectedServiceID == null) {
      setValidService("Vui lòng chọn dịch vụ");
      return false;
    }
    return true;
  };
  const isTimeValid = (date, time) => {
    if (!date || !time || date.length !== 10 || time.length !== 5) {
      return false;
    }
    const currentTime = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    // Thời gian đặt phải sau 7h30 sáng cùng ngày
    const sevenThirtyAM = new Date(selectedDateTime);
    sevenThirtyAM.setHours(7, 30, 0, 0);

    // Thời gian đặt phải trước 22 giờ cùng ngày
    const tenPM = new Date(selectedDateTime);
    tenPM.setHours(22, 0, 0, 0);

    // Thời gian đặt phải sau 2 giờ từ hiện tại
    const twoHoursFromNow = new Date(currentTime);
    twoHoursFromNow.setHours(
      currentTime.getHours() + 2,
      currentTime.getMinutes(),
      0,
      0
    );
    // console.log("hiện tại " + currentTime);
    // console.log("giờ chọn " + selectedDateTime);
    // console.log("trước hai giờ " + twoHoursFromNow);
    // console.log("trước 10 giờ   " + tenPM);
    if (
      selectedDateTime <= sevenThirtyAM || // Kiểm tra sau 7h30 sáng
      selectedDateTime >= tenPM || // Kiểm tra trước 22 giờ
      selectedDateTime <= twoHoursFromNow // Kiểm tra sau 2 giờ từ hiện tại
    ) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData()) {
      setIsPopupOpen(true);
      setDiscountedPrice(selectedServiceCost);

      GetservicebyID(selectedServiceID);
    }
  };

  const GetservicebyID = async (id) => {
    const response = await GetServicebyIDAPI(id);
    setServicebyId(response.data);
    console.log(servicebyId);
  };
  const CheckEmployee = async () => {
    const startTimeObj = new Date(`${date}T${journeyTime}`);
    startTimeObj.setHours(
      startTimeObj.getHours() + servicebyId.minimalSlot,
      startTimeObj.getMinutes()
    );
    const endHour = startTimeObj.getHours().toString().padStart(2, "0");
    const endMinute = startTimeObj.getMinutes().toString().padStart(2, "0");
    const checkemployee = {
      date: date,
      start: journeyTime,
      end: `${endHour}:${endMinute}`, // Format: "HH:mm"
    };
    const response = await CheckEmployeeAPI(checkemployee);
    if (response.data) {
      console.log(response.data);
      return true;
    }
    return false;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    //check còn nhân viên hay không

    if (CheckEmployee) {
      console.log("còn nhân viên");
      const data = {
        customerId: customerid,
        starTime: journeyTime + ":00",
        date: date,
        serviceId: selectedServiceID,
        address: showTextBox
          ? address
          : selectedOption +
            " " +
            selectedBuilding +
            selectedFloor +
            selectedRoom,
        phone: phoneNumber,
        buildingId: showTextBox ? 37 : buildingId,
        note: message,
        price: discountedPrice, // Use the discounted price
        pointUsed: lastTotalPoint,
      };

      console.log(data);
      axios
        .post(`https://vinclean.azurewebsites.net/api/Order`, data)
        .then((response) => {
          console.log(response.data);
          setSubmittedData(response.data);
          setIsPopupOpen(false);
          toast.success("Đặt thành công!", {
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
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("hết nhân viên");
      setIsPopupOpen(false);
      toast.error("Xin lỗi quí khách, hiện tại hết nhân viên.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleUseTotalPoint = () => {
    const pointsToUse = Math.floor(totalPoint / 100) * 100;
    const discountAmount = Math.floor(pointsToUse / 100) * 5;

    setLastTotalPoint(totalPoint);
    setDiscountedPrice(
      discountAmount > 0
        ? selectedServiceCost - discountAmount
        : selectedServiceCost
    );
    setIsPointUsed(true);
  };

  const handleNotUseTotalPoint = () => {
    setTotalPoint(Math.floor(totalPoint / 100) * 100);
    setLastTotalPoint(totalPoint);
    setIsPointUsed(false);
    setDiscountedPrice(selectedServiceCost);
  };

  const handleReset = (e) => {
    e.preventDefault();

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress("");
    setJourneyDate("");
    setJourneyTime("");
    setMessage("");
    setAddress("");
    setSelectedOption("");
    setSelectedRoom("");
    setSelectedFloor("");
    setSlectedBuilding("");
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
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBuilding, setSlectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showTextBox, setShowTextBox] = useState(false);
  const [availableFloors, setAvailableFloors] = useState([]);
  const matchedBuilding =
    building &&
    building.find((buildingItem) => buildingItem.name === selectedBuilding);
  const floorValue = matchedBuilding ? matchedBuilding.floor : "";

  const roomValue = matchedBuilding ? matchedBuilding.room : "";
  const buildingId = matchedBuilding ? matchedBuilding.id : "";

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedOption = AreaOptions.find(
      (option) => option.type === selectedValue
    );

    if (selectedOption) {
      // setSelectedOptionId(selectedOption.id);
      axios
        .get(
          `https://vinclean.azurewebsites.net/api/Building/Type/${selectedOption.id}`
        )
        .then((response) => {
          setBuilding(response.data.data);
          const floors = response.data.data.find(
            (option) => option.name === selectedBuilding
          );
          console.log(floors);
          // Tạo danh sách từ 1 đến option.floor
          const floorOptions = Array.from(
            { length: Math.max(...floors) },
            (_, index) => (index + 1).toString()
          );
          setAvailableFloors(floorOptions);
        })
        .catch((error) => {
          console.error("Error fetching building types:", error);
        });
    } else {
      // setSelectedOptionId(null);
      setAvailableFloors([]);
    }
    setSelectedOption(selectedValue);

    if (selectedValue === "Manhattan") {
      setShowTextBox(true);
    } else {
      setShowTextBox(false);
    }
  };

  function formatCurrency(amount) {
    var amount1 = amount;
    return amount1
      ? amount1.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "";
  }
  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div>
          {" "}
          {validFirstName && (
            <div
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "0px",
                paddingTop: "0px",
              }}
            >
              {validFirstName}
            </div>
          )}
          <FormGroup
            className="booking__form d-inline-block me-4 mb-4"
            style={{
              border: validFirstName ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <input
              type="text"
              placeholder="Tên"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                fontWeight: "bold",
                color: firstName ? "black" : "gray",
                opacity: firstName ? "1" : "0.5",
                fontFamily: "Arial",
              }}
            />
          </FormGroup>
          {validLastName && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              {validLastName}
            </div>
          )}
          <FormGroup
            className="booking__form d-inline-block ms-1 mb-4"
            style={{
              border: validLastName ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <input
              type="text"
              placeholder="Họ"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                fontWeight: "bold",
                color: lastName ? "black" : "gray",
                opacity: lastName ? "1" : "0.5",
              }}
            />
          </FormGroup>
          {validPhone && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              {validPhone}
            </div>
          )}
          <FormGroup
            className="booking__form d-inline-block me-4 mb-4"
            style={{
              border: validPhone ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <input
              type="text"
              placeholder="SĐT"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                fontWeight: "bold",
                color: phoneNumber ? "black" : "gray",
                opacity: phoneNumber ? "1" : "0.5",
              }}
            />
          </FormGroup>
          {validDate && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              {validDate}
            </div>
          )}
          <FormGroup
            className="booking__form d-inline-block me-4 mb-4"
            style={{
              border: validDate ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <input
              type="date"
              placeholder="Ngày đặt"
              value={journeyDate}
              min={tomorrowString}
              max={last7DaysString}
              onChange={(e) => setJourneyDate(e.target.value)}
              style={{
                fontWeight: "bold",
                color: journeyDate ? "black" : "gray",
                opacity: journeyDate ? "1" : "0.5",
              }}
            />
          </FormGroup>
          {validTime && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              {validTime}
            </div>
          )}
          <FormGroup
            className="booking__form d-inline-block ms-1 mb-4"
            style={{
              border: validTime ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <input
              type="time"
              placeholder="Thời gian"
              value={journeyTime}
              onChange={(e) => setJourneyTime(e.target.value)}
              style={{
                fontWeight: "bold",
                color: journeyTime ? "black" : "gray",
                opacity: journeyTime ? "1" : "0.5",
              }}
            />
          </FormGroup>
        </div>

        <div>
          <div>
            {" "}
            {validArea && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
                {validArea}
              </div>
            )}
          </div>

          <FormGroup
            className="booking__form d-inline-block ms-1 mb-4"
            style={{
              border: validArea ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "200px",
            }}
          >
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              style={{
                fontWeight: "bold",
                color: selectedOption ? "black" : "gray",
                opacity: selectedOption ? "1" : "0.5",
                width: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              <option value="">Chọn phân khu</option>
              {AreaOptions.map((option) => (
                <option key={option.id} value={option.type}>
                  {option.type}
                </option>
              ))}
            </select>

            {showTextBox && (
              <input
                style={{
                  color: address ? "black" : "gray",
                  opacity: address ? "1" : "0.5",
                  fontWeight: "bold",
                  color: "grey",
                  fontSize: "14px",
                  marginTop: "0px",
                }}
                type="text"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}
          </FormGroup>

          {validBuilding && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
              {validBuilding}
            </div>
          )}

          <FormGroup
            className="booking__form d-inline-block ms-1 mb-4"
            style={{
              border: validBuilding ? "2px solid gray" : "2px solid red",
              borderRadius: "10px",
              width: "200px",
            }}
          >
            <select
              value={selectedBuilding}
              onChange={(e) => setSlectedBuilding(e.target.value)}
              style={{
                fontWeight: "bold",
                color: selectedBuilding ? "black" : "gray",
                opacity: selectedBuilding ? "1" : "0.5",
                width: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              <option value="">Chọn số tòa</option>
              {building.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <div>
            {" "}
            {validFloor && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
                {validFloor}
              </div>
            )}
            <FormGroup
              className="booking__form d-inline-block ms-1 mb-4"
              style={{
                border: validFloor ? "2px solid gray" : "2px solid red",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                style={{
                  fontWeight: "bold",
                  color: selectedFloor ? "black" : "gray",
                  opacity: selectedFloor ? "1" : "0.5",
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
              >
                <option value="">Chọn số tầng</option>
                {Array.from({ length: floorValue }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </FormGroup>
            <div>
              {" "}
              {validRoom && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "0px" }}
                >
                  {validRoom}
                </div>
              )}
              <FormGroup
                className="booking__form d-inline-block ms-1 mb-4"
                style={{
                  border: validRoom ? "2px solid gray" : "2px solid red",
                  borderRadius: "10px",
                  width: "200px",
                }}
              >
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  style={{
                    fontWeight: "bold",
                    color: selectedFloor ? "black" : "gray",
                    opacity: selectedFloor ? "1" : "0.5",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <option value="">Chọn số phòng</option>
                  {Array.from({ length: roomValue }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>

      {validService && (
        <div style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>
          {validService}
        </div>
      )}
      <FormGroup style={{ border: "2px solid gray", borderRadius: "10px" }}>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Ghi chú"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            fontWeight: "bold",
            color: message ? "black" : "gray",
            opacity: message ? "1" : "0.5",
          }}
        ></textarea>
      </FormGroup>

      <div style={{ textAlign: "right" }}>
        <button
          type="button"
          onClick={handleReset}
          style={{ marginRight: "25px" }}
        >
          <TbReload size={30} color="black"></TbReload>
        </button>
        {localStorage.getItem("loggedIn") ? (
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        ) : (
          <Link to="/login">
            <button className="normal-button buttonReset blue">
              Đăng nhập để đặt dịch vụ
            </button>
          </Link>
        )}
        {/* <button className="normal-button buttonReset blue" type="submit">Xác nhận</button> */}
      </div>

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={handleClosePopup}
        ClassName="custom-overlay"
        style={{
          overlay: {
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "800px",
            height: "800px",
            margin: "auto",
          },
        }}
      >
        {/* Render the content of the popup */}
        <div>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="account-general">
                  <hr className="border-light m-0" />
                  <div className="card-body" style={{ height: "700px" }}>
                    {" "}
                    <h3 style={{ textAlign: "center" }}>
                      <strong>Thông tin đặt dịch vụ</strong>
                    </h3>
                    <br></br>
                    {/* <p><strong>ID của bạn:</strong> {customerid}</p>
                    <p><strong>Tên bạn:</strong> {lastName + ' ' + firstName}</p>
                    <p><strong>SĐT:</strong> {phoneNumber}</p>
                    <p>
                      <strong>Địa chỉ:</strong>{" "}
                      {showTextBox ? (
                        address
                      ) : (
                        <>
                          {"Phân khu: " + selectedOption + " " + "Tòa: " + selectedBuilding + " Tầng: " + selectedFloor + " Phòng: " + selectedRoom}
                        </>
                      )}
                    </p>
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
                    </div> */}
                    <div style={{ display: "flex" }}>
                      {/* Cột thứ nhất */}
                      <div
                        style={{
                          flex: 1,
                          paddingRight: "10px",
                          borderRight: "1px solid #ccc",
                          marginRight: "10px",
                        }}
                      >
                        <p>
                          <strong>ID của bạn:</strong> {customerid}
                        </p>
                        <p>
                          <strong>Tên bạn:</strong> {lastName + " " + firstName}
                        </p>
                        <p>
                          <strong>SĐT:</strong> {phoneNumber}
                        </p>
                        <p>
                          <strong>Địa chỉ:</strong>
                          <br></br>{" "}
                          {showTextBox ? (
                            address
                          ) : (
                            <>
                              <strong >{"Phân khu: "}</strong>
                              {selectedOption}
                              
                              <strong style={{ marginLeft: "25px"}}>{"Tòa: "}</strong>
                              {selectedBuilding}
                              <br />
                              <strong >{"Tầng: "}</strong>
                              {selectedFloor}
                              <strong style={{ marginLeft: "100px"}}>{"Phòng: "}</strong>
                              {selectedRoom}
                            </>
                          )}
                        </p>
                      </div>

                      {/* Đường phân cách */}
                      <div
                        style={{
                          width: "1px",
                          backgroundColor: "#ccc",
                          margin: "0 10px",
                        }}
                      ></div>

                      {/* Cột thứ hai */}
                      <div style={{ flex: 1, paddingLeft: "10px" }}>
                        <p>
                          <strong>Thời gian bắt đầu làm:</strong>{" "}
                          {journeyTime + ":00"}
                        </p>
                        <p>
                          <strong>Dịch vụ bạn đã chọn:</strong>{" "}
                          {selectedServiceName}
                        </p>
                        <p>
                          <strong>Ngày tạo đơn:</strong> {formattedDate}
                        </p>
                        <p>
                          <strong>Ngày đặt:</strong> {viDate}
                        </p>
                        <p>
                          <strong>Tạm tính:</strong>{" "}
                          <strong style={{ color: "green" }}>
                            {formatCurrency(
                              isSwitchOn ? discountedPrice : selectedServiceCost
                            )}
                          </strong>
                        </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p>
                            <strong>
                              Dùng{" "}
                              <span style={{ color: "#162b75" }}>
                                {totalPoint}
                              </span>{" "}
                              điểm tích lũy?
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
                          <span>
                            {isSwitchOn
                              ? handleUseTotalPoint
                              : handleNotUseTotalPoint}
                          </span>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <p>
                      <strong>LƯU Ý:</strong> Dịch vụ có thể có thêm phụ thu
                      thêm tuỳ hiện trạng(nhân viên sẽ báo giá sau)
                    </p>
                    <br></br>
                    <p>
                      <strong>Ghi chú:</strong>
                    </p>
                    <textarea
                      rows={5}
                      value={message}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            <button className=" btn btn-secondary" onClick={handleClosePopup}>
              Đóng
            </button>
            <button className=" btn btn-primary" onClick={handleConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </Form>
  );
};

export default BookingForm;
