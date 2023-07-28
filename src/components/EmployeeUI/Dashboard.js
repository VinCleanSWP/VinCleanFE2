import React, { useState, useEffect } from 'react'
import { GetOrderRangeAPI, GetOrderbyIDAPI } from '../../API/Employee/employeeConfig';
import { Button, DatePicker, Modal, Table } from 'antd';
import moment from 'moment';

export default function Dashboard() {
    const [employee, setEmployee] = useState([]);
    const id = localStorage.getItem('id');
    const [startDate, setStartDate] = useState(moment().startOf('month'));
    const [endDate, setEndDate] = useState(moment().endOf('month'));
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        // Gọi API để lấy dữ liệu khi startMonth và endMonth thay đổi
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        const data = {
            startMonth: startDate.format('YYYY-MM-DD'),
            endMonth: endDate.format('YYYY-MM-DD'),
            employeeId: 5,
        };
        try {
            const response = await GetOrderRangeAPI(data);
            setEmployee(response);
            console.log(employee);
            const totalJobs = response.length;
            const totalRevenue = response.reduce((acc, curr) => acc + curr.total, 0);

            setTotalJobs(totalJobs);
            setTotalRevenue(totalRevenue);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleCurrentMonthClick = () => {
        const startMonth = moment().startOf('month');
        const endMonth = moment().endOf('month');
        setStartDate(startMonth);
        setEndDate(endMonth);
    };

    const handlePreviousMonthClick = () => {
        const startMonth = startDate.clone().subtract(1, 'month').startOf('month');
        const endMonth = startDate.clone().subtract(1, 'month').endOf('month');
        setStartDate(startMonth);
        setEndDate(endMonth);
    };

    const handleNextMonthClick = () => {
        const startMonth = endDate.clone().add(1, 'month').startOf('month');
        const endMonth = endDate.clone().add(1, 'month').endOf('month');
        setStartDate(startMonth);
        setEndDate(endMonth);
    };
    const handleRowClick = async (record) => {
        setSelectedRow(record);
        try {
          const response = await GetOrderbyIDAPI(record.orderId);
          setOrderDetail(response.data);
          console.log(orderDetail);
          setIsModalVisible(true);
        } catch (error) {
          console.error('Failed to fetch order detail:', error);
        }
      };
      const handleModalClose = () => {
        setIsModalVisible(false);
      };
    const columns = [
        {
            title: 'Mã Công Việc',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Ngày làm việc',
            dataIndex: 'dateWork',
            key: 'dateWork',
            render: (dateWork) => {
                const dateWithoutTime = dateWork.split('T')[0];
                return dateWithoutTime;
            },
        },
        {
            title: 'Tổng dịch vụ',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `${total}.000VND`,
        }
    ];
    const buttonStyle = {
        marginRight: '10px',
        backgroundColor: 'white', // Màu nền mặc định của button
        '&:hover': {
            backgroundColor: '#40a9ff', // Màu nền khi hover
        },
        '&:active': {
            backgroundColor: '#096dd9', // Màu nền khi nhấn (active)
        },
    };


  // ... fetchData và columns như trước

    const monthRange = `${startDate.format('MMMM')}`;
    return (
        <div>
            <div style={{ paddingBottom: '0px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '5px' }}>
                <h2 style={{ color: 'black', fontSize: '45px', fontWeight: 'bold', border: '1px solid black', padding: '10px 35px', borderRadius: '10px', background: '#4D96FF' }}>Tổng Quan Công Việc</h2>
            </div>
            <div style={{ height: '100%', backgroundColor: 'white', padding: "20px", border: '1px solid black', borderRadius: "10px", margin: '15px' }}>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    
                    <div style={{ textAlign: 'left' }}>
                        <p style={{fontSize: '20px', marginLeft: '20px'}}><strong>Xin chào!! {localStorage.getItem('name')}.</strong></p>
                        <h3 style={{ textAlign: 'center', color: 'black' }}><strong>Danh sách các công việc đã hoành thành trong {monthRange}</strong></h3>
                    <div style={{ textAlign: 'right', marginRight: '30px' }}>
                        <p><strong>Tổng số công việc hoành thành trong {monthRange}:</strong><strong style={{ color: 'red'}}> {totalJobs}</strong></p>
                        <p><strong>Tổng số tiền đã thu trong {monthRange}:</strong> <strong style={{ color: 'red'}}>{totalRevenue}.000VND</strong></p>
                    </div>
                    </div>
                    
                </div>
                
                <div style={{ margin: '10px' }}>
                    <Button style={buttonStyle} onClick={handleCurrentMonthClick}>Tháng hiện tại</Button>
                    <Button style={buttonStyle} onClick={handlePreviousMonthClick}>Tháng trước</Button>
                    <Button style={buttonStyle} onClick={handleNextMonthClick}>Tháng sau</Button>
                </div>
                <Table dataSource={employee} columns={columns} pagination={false} onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })} />
            
            <Modal

        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {orderDetail && (
          <div>
            <p style={{ textAlign: 'center',fontSize: '20px' }}><strong>Thông tin chi tiết công việc</strong></p>
            <p>Mã Công Việc: {orderDetail.orderId}</p>
            <p>Loại dịch vụ: {orderDetail.type}</p>
            <p>Tên dịch vụ: {orderDetail.serviceName}</p>
            <p>Ngày làm việc: {orderDetail.dateWork.split('T')[0]}</p>
            <p>Thời gian bắt đầu: {orderDetail.startTime}</p>
            <p>Thời gian kết thúc: {orderDetail.endTime}</p>
            <p>Address: {orderDetail.address}</p>
            <p>Tên Khách Hàng: {orderDetail.customerName}</p>
            <p>Địa chỉ email: {orderDetail.customerEmail}</p>
            <p>SDT liên hệ: {orderDetail.phone}</p>
            <p>Phụ Thu: {orderDetail.subPrice}</p>
            <p>Tổng phí dịch vụ: {orderDetail.total}</p>
            
            
          </div>
        )}
      </Modal>
      </div>
        </div>


    )
}
