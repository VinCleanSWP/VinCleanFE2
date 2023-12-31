import React, { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/vi";
import { ToastContainer, toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getProcessAPI,
  getProcessImageAPIbyID,
  updateCanncelJobAPI,
  updateEndWorkingAPI,
  updateLocationAPI,
  updateProcessImageAPI,
  updateStartWorkingAPI,
  updateSubPriceAPI,
} from "../../API/Employee/employeeConfig";
import {
  Alert,
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import "../EmployeeUI/Calender.css";
import CameraCapture from "../EmployeeUI/Camera/Camera";
import { storage } from "../../firebase";
import { Option } from "antd/es/mentions";
moment.locale("vi");
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ProcessImage, setProcessImage] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState("");
  const [idImage, setIdImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOther, setModalOther] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [items, setItems] = useState(["30000", "50000"]);
  const [latitudeLGPS, setLatitudeGPS] = useState("");
  const [longtitudeGPS, setLongtitudeGPS] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputNote, setInputNote] = useState("");
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const formats = {
    monthHeaderFormat: "MMMM",
    dayHeaderFormat: "dddd  -  DD/MM/YYYY",
  };
  var today = new Date();
  const date = moment(today).format("YYYY-MM-DD");
  const time = moment(today).format("HH:mm:ss");
  const messages = {
    today: "Hôm nay",
    previous: "Sau",
    next: "Tiếp",
    month: "Tháng",
    week: "Tuần",
    day: "Ngày",
    agenda: "Lịch công việc",
    noEventsInRange: "Không có lịch công việc",
    date: "Ngày",
    time: "Giờ",
    event: "thông tin công việc",
  };

  useEffect(() => {
    fetchData(); //loading data
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProcessAPI();

      const formattedEvents = response.data
        .filter(
          (event) =>
            event.employeeAccountId === parseInt(localStorage.getItem("id")) && event.status !== "Cancel"
        )
        .map((event) => {
          console.log(event.date);
          const date = moment(event.date).format("YYYY-MM-DD");
          const start = new Date(`${date}T${event.startTime}`);
          const end = new Date(`${date}T${event.endTime}`);
          console.log(date);
          console.log(event.startTime);
          console.log(start);
          return {
            id: event.orderId,
            start,
            end,
            title: (
              <div class="event-title">
                <p>{event.typeName}</p>
                <p>
                  LH:{event.phone} - {event.address}
                </p>
                <p>Ghi Chú: {event.note}</p>
              </div>
            ),

            phone: event.phone,
            email: event.email,
            price: event.price,
            data: {
              status: event.status,
              startTime: event.startTime,
              startWorking: event.startWorking,
              endWorking: event.endWorking,
              name: event.name,
              employeeAccountId: event.employeeAccountId,
              employeeId: event.employeeId,
              note: event.note,
              address: event.address,
              typeName: event.typeName,
              nameservice: event.serviceName,
              employeeName: event.employeeName,
              subPrice: event.subPrice,
            },
          };
        });
      console.log(formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDataDropDown = async (id) => {
    try {
      console.log(id);
      const response = await getProcessImageAPIbyID(id);
      setProcessImage(response.data); // giống get set ,sẽ set all data vào process
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const location = async () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLatitudeGPS(latitude);
        setLongtitudeGPS(longitude);
      }
    );
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    location();
    const dataGPS = {
      orderId: event.id,
      latitude: latitudeLGPS,
      longtitude: longtitudeGPS,
    };
    await updateLocationAPI(dataGPS);
    console.log(dataGPS);
  };
  const handleShowMore = (events, date) => {
    console.log("Events:", events);
    console.log("Date:", date);
  };

  const handleClick = async (status) => {
    // Gửi processId và status qua API hoặc xử lý logic khác tại đây
    console.log("Process ID:", selectedEvent.id);
    console.log("Status:", status);
    console.log(selectedEvent.data.startWorking);
    console.log(time);
    if (!data.start && status === "Đang làm việc") {
      const sw = {
        processId: selectedEvent.id,
        startWorking: time,
      };
      console.log(sw);
      await updateStartWorkingAPI(sw);
      console.log("update");
      toast.success("Cập Nhật thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!data.startWorking && status === "Hoàn Thành") {
      const ew = {
        processId: selectedEvent.id,
        endWorking: time,
      };
      console.log(ew);
      await updateEndWorkingAPI(ew);
      toast.success("Cập Nhật thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Cập Nhật  thất bại", {
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
    setSelectedEvent(null);
    fetchData();
  };
  const columns = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) =>
        record.status !== "Chờ" && (
          <Button
            onClick={() => handleClick(record.status)}
            disabled={
              (record.status === "Đang làm việc" &&
                selectedEvent.data.startWorking) ||
              (record.status === "Hoàn Thành" && selectedEvent.data.endWorking)
            }
          >
            Cập nhật
          </Button>
        ),
    },
  ];
  const data = [
    {
      key: "1",
      status: "Chờ",
      time: selectedEvent ? selectedEvent.data.startTime : "",
    },
    {
      key: "2",
      status: "Đang làm việc",
      time: selectedEvent ? selectedEvent.data.startWorking : "",
    },
    {
      key: "3",
      status: "Hoàn Thành",
      time: selectedEvent ? selectedEvent.data.endWorking : "",
    },
  ];
  const handleImageUpload = async (file, record) => {
    setIdImage(record);
    console.log(idImage);
    const storageRef = storage.ref(
      `Order/order${selectedEvent.id}/${file.name}`
    );
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const imgUrl = await fileRef.getDownloadURL();
    setCapturedImageUrl(imgUrl);
    console.log(capturedImageUrl);
    const updateImg = {
      id: idImage.id,
      image: capturedImageUrl,
    };
    console.log(updateImg);
    await updateProcessImageAPI(updateImg);
    fetchDataDropDown(selectedEvent.id);
  };
  const handleCaptureImage = async (imageUrl) => {
    setCapturedImageUrl(imageUrl);
    console.log(imageUrl);
    console.log(capturedImageUrl);
    const updateImg = {
      id: idImage.id,
      image: capturedImageUrl,
    };
    console.log(updateImg);
    await updateProcessImageAPI(updateImg);
    fetchDataDropDown(selectedEvent.id);
    setShowCamera(false);
  };
  useEffect(() => {
    console.log(idImage); // Đây sẽ hiển thị giá trị mới của idImage
  }, [idImage]);
  const handleOpenCamera = (record) => {
    setShowCamera(true);
    setIdImage(record);
    console.log(idImage);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    setSelectedImage(null);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  const handleOther = () => {
    setModalOther(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalOther(false);
    setInputNote("");
    setError("");
    setSelectedValue("");
  };
  // bảng dropdown của antd
  const expandedRowRender = (record1) => {
    const columns = [
      {
        title: "No",
        dataIndex: "index",
        key: "index",
        render: (text, record, rowIndex) => rowIndex + 1,
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        visible: false,
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        render: (img) => (
          <img
            src={img || "http://via.placeholder.com/300"}
            alt="Hình ảnh"
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => handleImageClick(img)}
          />
        ),
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => {
          const isRecordVerify = record.type === "Verify";
          const isRecordIncoming = record.type === "Processing";
          const isRecordCompleted = record.type === "Completed";
          const isIncoming = selectedEvent.data.status === "Incoming";
          const isProcessing = selectedEvent.data.status === "Processing";
          const isCompleted = selectedEvent.data.status === "Completed";
          console.log(record.type);
          const isDisable =
            
            (isProcessing && (isRecordVerify|| isRecordIncoming )) ||
            (isCompleted &&
              (isRecordVerify || isRecordIncoming || isRecordCompleted));
          return (
            <Space>
              <Button
                onClick={() => handleOpenCamera(record)}
                disabled={isDisable}
              >
                Chụp ảnh
              </Button>
              <Upload
                beforeUpload={(file) => handleImageUpload(file, record)}
                showUploadList={false}
                disabled={isDisable}
              >
                <Button icon={<UploadOutlined />} disabled={isDisable}>
                  Tải ảnh
                </Button>
              </Upload>
            </Space>
          );
        },
      },
    ];

    let filteredProcessImages = [];

    if (record1.status === "Đang làm việc") {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === "Processing"
      );
    } else if (record1.status === "Hoàn Thành") {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === "Completed"
      );
    } else if (record1.status === "Chờ") {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === "Verify"
      );
    }

    const data = filteredProcessImages.map((image, index) => ({
      index: index + 1,
      key: image.id.toString(),
      id: image.id,
      type: image.type,
      name: image.name,
      image: image.image,
    }));
    console.log(data);
    function formatCurrency(amount) {
      var amount1 = amount * 1000;
      return amount1
        ? amount1.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        : "";
    }
    return (
      <Table
        columns={columns.filter((col) => col.dataIndex !== "id")}
        dataSource={data}
        pagination={false}
      />
    );
  };
  const component = {
    event: (props) => {
      const eventType = props?.event?.data?.status;
      switch (eventType) {
        case "Processing":
          return (
            <div
              class="rbc-event"
              style={{
                background: "#f4a700",
                color: "black",
                height: "100%",
                width: "100%",
              }}
            >
              {props.title}
            </div>
          );
        case "Completed":
          return (
            <div
              class="rbc-event"
              style={{
                background: "green",
                color: "black",
                height: "100%",
                width: "100%",
              }}
            >
              {props.title}
            </div>
          );
        case "Incoming":
          return (
            <div
              class="rbc-event"
              style={{
                background: "#fbec15",
                color: "black",
                height: "100%",
                width: "100%",
              }}
            >
              {props.title}
            </div>
          );
        default:
          return null;
      }
    },
  };

  const onSelectChange = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
    setError("");
  };
  const onInputNote = (event) => {
    const inputValue = event.target.value;
    const isSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);
    const isNotEmpty = inputValue.trim() !== "";

    if (!isSpecialChars && isNotEmpty) {
      setInputNote(inputValue);
      setError(""); // Xóa thông báo lỗi nếu chuỗi hợp lệ
    } else {
      setError("Chuỗi không được chứa kí tự đặc biệt và không để trống.");
    }
  };
  const isValidNumber = (value) => {
    const numberValue = parseInt(value, 10);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 1000000;
  };

  const handleAddItem = () => {
    if (isValidNumber(inputValue)) {
      setItems([...items, inputValue]);
      setInputValue("");
      setError1("");
    } else {
      setError1("Giá trị phải là số từ 0 đến 1 triệu.");
    }
  };
  const handleSubmit = async () => {
    if (selectedValue) {
      console.log("Selected value:", selectedValue);
      const data = {
        subPrice: parseInt(selectedValue),
        processId: selectedEvent.id,
      };
      console.log(data);
      await updateSubPriceAPI(data);
      setModalOther(false);
      setSelectedEvent(null);
      fetchData();
      toast.success("Thêm phụ thu thành công", {
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
  const handleSubmitCanncel = async () => {
    if (inputNote) {
      console.log("Selected value:", selectedEvent);
      const data = {
        processId: selectedEvent.id,
        oldEmployeeId: selectedEvent.data.employeeId,
        note: inputNote,
         createAt: date+"T"+time,
        createBy: selectedEvent.data.employeeAccountId
      };
      console.log(data);
      await updateCanncelJobAPI(data);
      setModalOther(false);
      setSelectedEvent(null);
      setInputNote("");
      setError("");
      toast.success("Yêu cầu thành công", {
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
    setError("Lý do không được bỏ trống.");
  };
  const handleDisabledCannelwhenIncom = () => {
    if (selectedEvent?.data?.status !== "Incoming") {
      return true;
    }
    return false;
  };
  const handleDisabledCannelwhenCompleted = () => {
    if (selectedEvent?.data?.status === "Completed") {
      return true;
    }
    return false;
  };
  function formatCurrency(amount) {
    var amount1 = amount;
    return amount1
      ? amount1.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "";
  }
  //-----------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div
        style={{
          paddingBottom: "0px",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "5px",
        }}
      >
        <h2
          style={{
            color: "black",
            fontSize: "45px",
            fontWeight: "bold",
            border: "1px solid black",
            padding: "10px 35px",
            borderRadius: "10px",
            background: "#4D96FF",
          }}
        >
          Lịch Công Việc
        </h2>
      </div>
      <div
        style={{
          height: "1300px",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "15px",
        }}
      >
        <Calendar
          formats={formats}
          localizer={localizer}
          messages={messages}
          events={events}
          defaultDate={moment().toDate()}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          min={new Date().setHours(6, 0, 0)}
          max={new Date().setHours(23, 0, 0)}
          onShowMore={handleShowMore}
          onSelectEvent={handleEventClick}
          components={component}
          showAllEvents
        />
        <div>
          <Modal
            title="Xem Ảnh"
            visible={modalVisible}
            onCancel={handleCloseModal}
            footer={null}
          >
            <img src={selectedImage} />
          </Modal>
        </div>
        <div>
          <Modal visible={modalOther} onCancel={handleCloseModal} footer={null}>
            <div>
              <h2 style={{ textAlign: "center" }}>Tác Vụ Khác Công Việc</h2>
              <p style={{ marginBottom: "3px" }}>
                <strong>Phụ Thu Thêm: </strong>
              </p>
              <div>
                <Select
                  style={{ width: 300, margin: "5px" }}
                  placeholder="Chọn giá trị"
                  onChange={onSelectChange}
                  value={
                    selectedValue !== ""
                      ? selectedValue
                      : selectedEvent
                      ? selectedEvent.data.subPrice
                      : ""
                  }
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          padding: 8,
                        }}
                      >
                        <Input
                          style={{ flex: "auto" }}
                          value={inputValue}
                          onChange={onInputChange}
                          ref={inputRef}
                        />
                        <Button
                          type="primary"
                          style={{ flex: "none", marginLeft: "8px" }}
                          onClick={handleAddItem}
                        >
                          Thêm
                        </Button>
                      </div>
                    </div>
                  )}
                >
                  {items.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Button onClick={handleSubmit}>Xác Nhận</Button>
              </div>
              {error1 && <span style={{ color: "red" }}>{error1}</span>}
              <p>
                <strong>Lưu Ý:</strong> Phụ thu phải báo trước với khách hàng và
                được sự đồng ý của khách hàng.
              </p>

              <p style={{ marginBottom: "3px" }}>
                <strong>Yêu Cầu chuyển Công Việc:</strong>
              </p>
              <div
                style={{ display: "flex", flexWrap: "nowrap", margin: "5px" }}
              >
                <Input
                  style={{ width: 300, marginRight: "5px" }}
                  placeholder="Lý do huỷ"
                  value={inputNote}
                  onChange={onInputNote}
                  ref={inputRef}
                  disabled={handleDisabledCannelwhenIncom()}
                />
                <Button
                  onClick={handleSubmitCanncel}
                  disabled={handleDisabledCannelwhenIncom()}
                >
                  Xác Nhận
                </Button>
              </div>
              {error && <span style={{ color: "red" }}>{error}</span>}
              <p>
                <strong>Lưu Ý:</strong> Huỷ công việc chỉ được thực hiện khi
                trạng thái công việc là CHỜ.
              </p>
            </div>
          </Modal>
        </div>
        {/* mở camera ở đây */}
        <Modal
          visible={showCamera}
          onCancel={handleCloseCamera}
          footer={null}
          width={720}
        >
          <CameraCapture
            onCaptureImage={handleCaptureImage}
            processId={selectedEvent?.id}
          />
        </Modal>

        <Modal
          visible={!!selectedEvent}
          onCancel={() => setSelectedEvent(null)}
          width={850}
          footer={[
            <Button key="cancel" onClick={() => setSelectedEvent(null)}>
              Đóng
            </Button>,
          ]}
        >
          {selectedEvent && (
            <div>
              <h2 style={{ textAlign: "center" }}>Mô Tả Công Việc</h2>
              <div class="process">
                <div class="process-info">
                  <h4 style={{ textAlign: "center", margin: "10px" }}>
                    {" "}
                    Thông tin khách hàng
                  </h4>
                  <div class="info-content">
                    <p>
                      <strong>Tên KH:</strong> {selectedEvent.data.name}{" "}
                    </p>
                    <p>
                      <strong>SĐT:</strong> {selectedEvent.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedEvent.email}
                    </p>
                  </div>
                </div>
                <div class="process-info1">
                  <h4 style={{ textAlign: "center", margin: "10px" }}>
                    {" "}
                    Thông tin Công Việc
                  </h4>
                  <div class="info-content">
                    <p>
                      <strong>Tên dịch vụ:</strong>{" "}
                      {selectedEvent.data.nameservice}{" "}
                    </p>
                    <p>
                      <strong>Địa Chỉ:</strong> {selectedEvent.data.address}
                    </p>
                    <p>
                      <strong>Ghi Chú:</strong> {selectedEvent.data.note}
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{ display: "flex", flexWrap: "nowrap", margin: "5px" }}
              >
                <div style={{ flex: "1", fontSize: "15px", marginLeft: "5px" }}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Mã công việc:</strong> {selectedEvent.id}
                  </p>
                  <p tyle={{ fontSize: "15px" }}>
                    Thời gian bắt đầu:{" "}
                    {selectedEvent.start.toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br></br>
                    Thời gian kết thúc dự kiến:{" "}
                    {selectedEvent.end.toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div>
                    <strong>Trạng Thái hiện tại:</strong>{" "}
                    {selectedEvent.data.status === "Incoming" ? (
                      <span style={{ color: "#fbec15" }}>
                        <strong>chờ</strong>
                      </span>
                    ) : selectedEvent.data.status === "Completed" ? (
                      <span style={{ color: "green" }}>
                        <strong>hoàn thành</strong>
                      </span>
                    ) : selectedEvent.data.status === "Processing" ? (
                      <span style={{ color: "#f4a700" }}>
                        <strong>Đang làm việc</strong>
                      </span>
                    ) : (
                      selectedEvent.data.status
                    )}
                  </div>
                </div>

                <div
                  style={{
                    flex: "1",
                    marginRight: "5px",
                    marginLeft: "25px",
                    justifyContent: "flex-end",
                  }}
                >
                  <p style={{ fontSize: "15px" }}>
                    <strong>Phụ Thu: </strong>{" "}
                    <strong style={{ color: "green" }}>
                      {formatCurrency(selectedEvent.data.subPrice)}
                    </strong>
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Tổng Tiền Thu Hộ: </strong>{" "}
                    <strong style={{ color: "green" }}>
                      {formatCurrency(selectedEvent.price)}
                    </strong>
                  </p>
                  <Button
                    style={{ marginTop: "10px" }}
                    onClick={handleOther}
                    disabled={handleDisabledCannelwhenCompleted()}
                  >
                    Tác vụ khác
                  </Button>
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                expandable={{
                  expandedRowRender: expandedRowRender,
                  onExpand: (expanded, record) => {
                    if (expanded) {
                      fetchDataDropDown(selectedEvent.id);
                      console.log(selectedEvent.id);
                      console.log(record.status);
                    }
                  },
                }}
                pagination={false}
                className="custom-modal"
              />
            </div>
          )}
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyCalendar;
