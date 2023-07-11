// import React, { useEffect, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'moment/locale/vi';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { getProcessAPI, updateEndWorkingAPI, updateStartWorkingAPI } from '../../API/Employee/employeeConfig';
// import { Alert, Button,  Modal,  Table } from 'antd';

// moment.locale('vi');
// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const formats = {
//     monthHeaderFormat: 'MMMM',
//     dayHeaderFormat: 'dddd  -  DD/MM/YYYY',
//   };
//   var today = new Date();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const messages = {
//     today: 'Hôm nay',
//     previous: 'Sau',
//     next: 'Tiếp',
//     month: 'Tháng',
//     week: 'Tuần',
//     day: 'Ngày',
//     agenda: 'Lịch công việc',
//   };


//   useEffect(() => {
//     fetchData();//loading data
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await getProcessAPI();
//       const formattedEvents = response.data.filter(event => event.employeeId === 6).map(event => {
//         const date = new Date(event.date).toISOString().split('T')[0];
//         const start = new Date(`${date}T${event.startTime}`);
//         const end = new Date(`${date}T${event.endTime}`);
//         console.log(date);
//         console.log(event.startTime);
//         console.log(start);
//         return {
//           id: event.processId,
//           start,
//           end,
//           title: (
//             <div style={{ fontSize: '15px' }}>
//               <div>{event.serviceName}</div>
//               <div>LH:{event.phone} - {event.address}</div>
//               <div>Note: {event.note}</div>
//             </div>
//           ),
//           data: {
//             status: event.status,
//             startTime:event.startTime,
//             startWorking: event.startWorking,
//             endWorking: event.endWorking,
//           }
//         };
//       }
//       );
//       console.log(formattedEvents);
//       setEvents(formattedEvents);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     }
//   };

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//   };
//   const handleShowMore = (events, date) => {
//     console.log('Events:', events);
//     console.log('Date:', date);
//   };

//   const handleClick = async (status) => {
//     // Gửi processId và status qua API hoặc xử lý logic khác tại đây
//     console.log('Process ID:', selectedEvent.id);
//     console.log('Status:', status);
//     console.log(selectedEvent.data.startWorking);
//     console.log(time);
//     if(!data.start && status==='Đang làm việc'){
//       const sw = {
//         processId:selectedEvent.id,
//         startWorking:time,
//       };
//       console.log(sw);
//       await updateStartWorkingAPI(sw);
//     } else if(!data.start && status==='Hoàn Thành'){
//       const ew = {
//         processId:selectedEvent.id,
//         endWorking:time,
//       };
//       console.log(ew);
//       await updateEndWorkingAPI(ew);
//     }else{
//       <Alert message="Error Text" type="error" />
//     }
//   };
//   const columns = [
//     {
//       title: 'Trạng thái',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Thời gian',
//       dataIndex: 'time',
//       key: 'time',
//     },
//     {
//       title: 'Hành động',
//       key: 'action',
//       render: (_, record) => (
//         record.status !== 'Chờ' && (
//           <Button 
//           onClick={() => handleClick(record.status)}
//           disabled={record.status === 'Chờ' || record.time}
//           >Cập nhật</Button>
//         )
//       ),
//     },
    
//   ];
//   const data = [
//     {
//       key: '1',
//       status: 'Chờ',
//       time: selectedEvent ? selectedEvent.data.startTime : '',
//     },
//     {
//       key: '2',
//       status: 'Đang làm việc',
//       time: selectedEvent ? selectedEvent.data.startWorking : '',
//     },
//     {
//       key: '3',
//       status: 'Hoàn Thành',
//       time: selectedEvent ? selectedEvent.data.endWorking : '',
//     },
//   ];
//   return (
//     <div style={{ height: '500pt' }}>
//       <Calendar
//         formats={formats}
//         localizer={localizer}
//         messages={messages}
//         events={events}
//         defaultDate={moment().toDate()}
//         defaultView='week'
//         startAccessor="start"
//         endAccessor="end"
//         min={new Date().setHours(6, 0, 0)}
//         max={new Date().setHours(23, 0, 0)}
//         onShowMore={handleShowMore}
//         onSelectEvent={handleEventClick}
//       />


//       <Modal
//         visible={!!selectedEvent}
//         onCancel={() => setSelectedEvent(null)}
//         footer={[
//           <Button key="cancel" onClick={() => setSelectedEvent(null)}>
//             Đóng
//           </Button>,
//         ]}
//       >
//         {selectedEvent && (
//           <div>
//             <h2>{selectedEvent.title}</h2>
//             <p>Thời gian bắt đầu: {selectedEvent.start.toLocaleString('vi-VN', {
//               year: 'numeric',
//               month: '2-digit',
//               day: '2-digit',
//               hour: '2-digit',
//               minute: '2-digit',
//             })}
//               <br></br>Thời gian kết thúc dự kiến: {selectedEvent.end.toLocaleString('vi-VN', {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//               })}</p>
//             <Table columns={columns} dataSource={data} pagination={false} />
//           </div>

//         )}
//       </Modal>

//     </div>

//   );
// };

// export default MyCalendar;
