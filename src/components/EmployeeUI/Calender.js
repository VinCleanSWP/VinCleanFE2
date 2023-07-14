import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getProcessAPI, updateEndWorkingAPI, updateStartWorkingAPI } from '../../API/Employee/employeeConfig';
import { Alert, Button,  Modal,  Table } from 'antd';
import '../EmployeeUI/Calender.css';

moment.locale('vi');
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
            employeeName: event.employeeName
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
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
    if (data.start && status === 'Đang làm việc') {
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
      fetchData();
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
            disabled={(record.status === 'Đang làm việc' && !selectedEvent.data.startTime) || (record.status === 'Hoàn Thành'&& selectedEvent.data.endWorking)}
          >Cập nhật</Button>
        )
      ),
    },

  ];
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

  return (
    <div>
    <h2 style={{color:'black',fontSize:'45px',  fontWeight:'bold',padding:'10px 35px'}}>Calendar</h2>

    <div style={{ height: '1300px', backgroundColor:'white', padding:"20px", borderRadius:"10px", margin:'15px'}}>
    
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

      <Modal
        visible={!!selectedEvent}
        onCancel={() => setSelectedEvent(null)}
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

            </div>
            <Table columns={columns} dataSource={data} pagination={false} className="custom-modal" />
          </div>

        )}
      </Modal>

    </div>
    </div>

  );
};

export default MyCalendar;
