import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi';
import { UploadOutlined } from '@ant-design/icons';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getProcessAPI, getProcessImageAPIbyID, updateEndWorkingAPI, updateLocationAPI, updateProcessImageAPI, updateStartWorkingAPI, updateSubPriceAPI } from '../../API/Employee/employeeConfig';
import { Alert, Button, Image, Input, Modal, Select, Space, Table, Upload } from 'antd';
import '../EmployeeUI/Calender.css';
import CameraCapture from '../EmployeeUI/Camera/Camera';
import { storage } from '../../firebase';
import { Option } from 'antd/es/mentions';
moment.locale('vi');
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ProcessImage, setProcessImage] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState('');
  const [idImage, setIdImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState(['30000', '50000']);
  const [latitudeLGPS, setLatitudeGPS] = useState('');
  const [longtitudeGPS, setLongtitudeGPS] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const formats = {
    monthHeaderFormat: 'MMMM',
    dayHeaderFormat: 'dddd  -  DD/MM/YYYY',
  };
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const messages = {
    today: 'Hôm nay',
    previous: 'Sau',
    next: 'Tiếp',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Lịch công việc',
  };





  useEffect(() => {
    fetchData();//loading data
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProcessAPI();

      const formattedEvents = response.data.filter(event => event.employeeAccountId === parseInt(localStorage.getItem('id'))).map(event => {
        const date = new Date(event.date).toISOString().split('T')[0];
        const start = new Date(`${date}T${event.startTime}`);
        const end = new Date(`${date}T${event.endTime}`);
        console.log(date);
        console.log(event.startTime);
        console.log(start);
        return {
          id: event.processId,
          start,
          end,
          title: (
            <div class="event-title">

              <p>LH:{event.phone} - {event.address}</p>
              <p>Note: {event.note}</p>
            </div>
          ),
          data: {
            status: event.status,
            startTime: event.startTime,
            startWorking: event.startWorking,
            endWorking: event.endWorking,
            name: event.name,
            phone: event.phone,
            email: event.email,
            note: event.note,
            address: event.address,
            typeName: event.typeName,
            nameservice: event.serviceName,
            employeeName: event.employeeName,
            subPrice: event.subPrice,
          }
        };
      }
      );
      console.log(formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const fetchDataDropDown = async (id) => {
    try {
      console.log(id);
      const response = await getProcessImageAPIbyID(id);
      setProcessImage(response.data);// giống get set ,sẽ set all data vào process
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  const location = async () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setLatitudeGPS(latitude)
      setLongtitudeGPS(longitude)
    })
  }

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    location();
    const dataGPS = {
      orderId: event.id ,
      latitude: latitudeLGPS,
      longtitude: longtitudeGPS
    }
    await updateLocationAPI(dataGPS);
    console.log(dataGPS)
  };


  const handleShowMore = (events, date) => {
    console.log('Events:', events);
    console.log('Date:', date);
  };

  const handleClick = async (status) => {
    // Gửi processId và status qua API hoặc xử lý logic khác tại đây
    console.log('Process ID:', selectedEvent.id);
    console.log('Status:', status);
    console.log(selectedEvent.data.startWorking);
    console.log(time);
    if (!data.start && status === 'Đang làm việc') {
      const sw = {
        processId: selectedEvent.id,
        startWorking: time,
      };
      console.log(sw);
      await updateStartWorkingAPI(sw);
      console.log("update");
    } else if (!data.startWorking && status === 'Hoàn Thành') {
      const ew = {
        processId: selectedEvent.id,
        endWorking: time,
      };
      console.log(ew);
      await updateEndWorkingAPI(ew);

    } else {
      <Alert message="Error Text" type="error" />
    }
    setSelectedEvent(null);
    fetchData();
  };
  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        record.status !== 'Chờ' && (
          <Button
            onClick={() => handleClick(record.status)}
            disabled={(record.status === 'Đang làm việc' && !selectedEvent.data.startTime) || (record.status === 'Hoàn Thành' && selectedEvent.data.endWorking)}
          >Cập nhật</Button>
        )
      ),
    },

  ];
  const data = [
    {
      key: '1',
      status: 'Chờ',
      time: selectedEvent ? selectedEvent.data.startTime : '',
    },
    {
      key: '2',
      status: 'Đang làm việc',
      time: selectedEvent ? selectedEvent.data.startWorking : '',
    },
    {
      key: '3',
      status: 'Hoàn Thành',
      time: selectedEvent ? selectedEvent.data.endWorking : '',
    },
  ];
  const handleImageUpload = async (file, record) => {
    setIdImage(record);
    console.log(idImage);
    const storageRef = storage.ref(`Process/process${selectedEvent.id}/${file.name}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const imgUrl = await fileRef.getDownloadURL();
    setCapturedImageUrl(imgUrl);
    console.log(capturedImageUrl);
    const updateImg = {
      id: idImage.id,
      image: capturedImageUrl
    }
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
      image: capturedImageUrl
    }
    console.log(updateImg);
    await updateProcessImageAPI(updateImg);
    fetchDataDropDown(selectedEvent.id);
    setShowCamera(false);

  };
  const handleOpenCamera = (record) => {
    setIdImage(record);
    console.log(idImage);
    setShowCamera(true);

  };

  const handleCloseCamera = () => {

    setShowCamera(false);

  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  // bảng dropdown của antd
  const expandedRowRender = (record1) => {
    const columns = [
      {
        title: 'No',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, rowIndex) => rowIndex + 1,
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        visible: false
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (img) => (
          <img
            src={img || "http://via.placeholder.com/300"}
            alt="Hình ảnh"
            style={{ width: '100px', cursor: 'pointer' }}
            onClick={() => handleImageClick(img)}
          />
        ),
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (_, record) => (
          <Space>
            <Button onClick={() => handleOpenCamera(record)}>Chụp ảnh</Button>
            <Upload beforeUpload={(file) => handleImageUpload(file, record)} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Tải ảnh</Button>
            </Upload>
          </Space>
        ),
      },
    ];

    let filteredProcessImages = [];

    if (record1.status === 'Đang làm việc') {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === 'Processing'
      );
    } else if (record1.status === 'Hoàn Thành') {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === 'Completed'
      );
    } else if (record1.status === 'Chờ') {
      filteredProcessImages = ProcessImage.filter(
        (image) => image.type === 'Verify'
      );
    }

    const data = filteredProcessImages.map((image, index) => ({
      index: index + 1,
      key: image.id.toString(),
      id: image.id,
      name: image.name,
      image: image.image,
    }));
    console.log(data);

    return (
      <Table columns={columns.filter(col => col.dataIndex !== 'id')} dataSource={data} pagination={false} />
    );
  };
  const component = {
    event: (props) => {
      const eventType = props?.event?.data?.status;
      switch (eventType) {
        case "Processing":
          return (
            <div class="rbc-event" style={{ background: "#fbec15", color: 'black', height: '100%', width: '100%' }}>
              {props.title}
            </div>
          );
        case "Completed":
          return (
            <div class="rbc-event" style={{ background: "#6BCB77", color: 'black', height: '100%', width: '100%' }}>
              {props.title}
            </div>
          );
        case "Incoming":
          return (
            <div class="rbc-event" style={{ background: "#FF6B6B", color: 'black', height: '100%', width: '100%' }}>
              {props.title}
            </div>
          );
        default:
          return null;
      }
    }
  }



  const onSelectChange = (value) => {
    setSelectedValue(value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue) {
      setItems([...items, inputValue]);
      setInputValue('');
      inputRef.current.focus();
    }
  };
  const handleSubmit = async () => {
    console.log('Selected value:', selectedValue);
    const data = {
      subPrice: parseInt(selectedValue),
      processId: selectedEvent.id
    }
    console.log(data);
    await updateSubPriceAPI(data);
  };
  return (
    <div>
      <h2 style={{ color: 'black', fontSize: '45px', fontWeight: 'bold', padding: '10px 35px' }}>Calendar</h2>

      <div style={{ height: '1300px', backgroundColor: 'white', padding: "20px", borderRadius: "10px", margin: '15px' }}>

        <Calendar
          formats={formats}
          localizer={localizer}
          messages={messages}
          events={events}
          defaultDate={moment().toDate()}
          defaultView='week'
          startAccessor="start"
          endAccessor="end"
          min={new Date().setHours(6, 0, 0)}
          max={new Date().setHours(23, 0, 0)}
          onShowMore={handleShowMore}
          onSelectEvent={handleEventClick}
          components={component}
        />
        <div>
          <Modal visible={modalVisible} onCancel={handleCloseModal} footer={null}>
            <img src={selectedImage} />
          </Modal>


        </div>
        {/* mở camera ở đây */}
        <Modal
          visible={showCamera}
          onCancel={handleCloseCamera}
          footer={null}
          width={720}
        >
          <CameraCapture onCaptureImage={handleCaptureImage} processId={selectedEvent?.id} />
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
                  <h4 style={{ textAlign: "center", margin: "10px" }}> Thông tin khách hàng</h4>
                  <div class="info-content">
                    <p><strong>Tên KH:</strong> {selectedEvent.data.name} </p>
                    <p><strong>SĐT:</strong> {selectedEvent.data.phone}</p>
                    <p><strong>Email:</strong> {selectedEvent.data.email}</p>
                  </div>
                </div>
                <div class="process-info1">
                  <h4 style={{ textAlign: "center", margin: "10px" }}> Thông tin Công Việc</h4>
                  <div class="info-content">
                    <p><strong>Tên dịch vụ:</strong> {selectedEvent.data.nameservice} </p>
                    <p><strong>Địa Chỉ:</strong> {selectedEvent.data.address}</p>
                    <p><strong>Ghi Chú:</strong> {selectedEvent.data.note}</p>
                  </div>
                </div>
              </div>
              <div style={{ margin: "9px" }}>
                <p><strong>Mã công việc:</strong> {selectedEvent.id}</p>
                <p>Thời gian bắt đầu: {selectedEvent.start.toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                  <br></br>Thời gian kết thúc dự kiến: {selectedEvent.end.toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</p>
                <p>
                  <strong>Trạng Thái hiện tại:</strong>{" "}
                  {selectedEvent.data.status === "Incoming" ? (
                    <span style={{ color: "#fbec15" }}><strong>chờ</strong></span>
                  ) : selectedEvent.data.status === "Completed" ? (
                    <span style={{ color: "green" }}><strong>hoàn thành</strong></span>
                  ) : selectedEvent.data.status === "Processing" ? (
                    <span style={{ color: "#fbec15" }}><strong>chờ</strong></span>
                  ) : (
                    selectedEvent.data.status
                  )}
                </p>
                <div>
                  <div>
                    <Select
                      style={{ width: 300 }}
                      placeholder="Chọn giá trị"
                      onChange={onSelectChange}
                      value={selectedEvent.data.subPrice}
                      dropdownRender={(menu) => (
                        <div>
                          {menu}
                          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input
                              style={{ flex: 'auto' }}
                              value={inputValue}
                              onChange={onInputChange}
                              ref={inputRef}
                            />
                            <Button
                              type="primary"
                              style={{ flex: 'none', marginLeft: '8px' }}
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
                    <Button onClick={handleSubmit}>Submit</Button>
                  </div>
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
                pagination={false} className="custom-modal" />
            </div>

          )}
        </Modal>

      </div>
    </div>

  );
};

export default MyCalendar;
