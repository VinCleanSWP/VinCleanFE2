import React, { useState, useEffect } from "react";
import {
  GetOrderRangeAPI,
  GetOrderRequestAPI,
  GetOrderbyIDAPI,
} from "../../API/Employee/employeeConfig";
import { Button, DatePicker, Modal, Table, Tabs, Tag } from "antd";
import moment from "moment";
import "../EmployeeUI/Dasboard.css";
import TabPane from "antd/es/tabs/TabPane";

export default function Dashboard() {
  const [employee, setEmployee] = useState([]);
  const id = localStorage.getItem("id");
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment().endOf("month"));
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderRequest, setorderRequest] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu khi startMonth và endMonth thay đổi
    fetchData();
    
  }, [startDate, endDate]);

  const fetchData = async () => {
    const data = {
      startMonth: startDate.format("YYYY-MM-DD"),
      endMonth: endDate.format("YYYY-MM-DD"),
      employeeId: localStorage.getItem("id"),
    };
    try {
      const response = await GetOrderRangeAPI(data);
      setEmployee(response);
      console.log(employee);
      const totalJobs = response.length;
      const totalRevenue = response.reduce((acc, curr) => acc + curr.price, 0);

      setTotalJobs(totalJobs);
      setTotalRevenue(totalRevenue);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleCurrentMonthClick = () => {
    const startMonth = moment().startOf("month");
    const endMonth = moment().endOf("month");
    setStartDate(startMonth);
    setEndDate(endMonth);
  };
  useEffect(() => {
    fetchDatarequest(); 
  }, [localStorage.getItem("id")]);
  const fetchDatarequest = async () => {
    try {
    const response = await GetOrderRequestAPI();

    const orderRequest = response.data
      .filter(
        (event) => event.accountId === parseInt(localStorage.getItem("id"))
      )
      .map((event) => {
        return {
            orderId: event.orderId,
            status: event.status,
            reason:event.reason,
            date: event.date.split("T")[0],
            createdDate: event.createdDate,
        };
      }
      );
      console.log(orderRequest);
      setorderRequest(orderRequest);
    } catch (error) {
        console.error('Failed to fetch data:', error);
      }
  };
  const handlePreviousMonthClick = () => {
    const startMonth = startDate.clone().subtract(1, "month").startOf("month");
    const endMonth = startDate.clone().subtract(1, "month").endOf("month");
    setStartDate(startMonth);
    setEndDate(endMonth);
  };

  const handleNextMonthClick = () => {
    const startMonth = endDate.clone().add(1, "month").startOf("month");
    const endMonth = endDate.clone().add(1, "month").endOf("month");
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
      console.error("Failed to fetch order detail:", error);
    }
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Mã Công Việc",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Ngày làm việc",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => {
        const dateWithoutTime = date.split("T")[0];
        return dateWithoutTime;
      },
    },
    {
      title: "Tổng dịch vụ",
      dataIndex: "price",
      key: "price",
      render: (total) => `${formatCurrency(total)}`,
    },
  ];
  const columns2 = [
    {
      title: "Mã Công Việc",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
        title: "Ngày làm việc",
        dataIndex: "createdDate",
        key: "createdDate",
        sorter: (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
        render: (date) => {
            if (!date) return null;
          const formattedDate = new Date(date).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
          return formattedDate;
        },
    },
    {
        title: "Lý do",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          let tagColor = "";
          let statusText = "";
      
          switch (status) {
            case "Accepted":
              tagColor = "green";
              statusText = "Được chấp nhận";
              break;
            case "Waiting":
              tagColor = "blue";
              statusText = "Đợi duyệt";
              break;
            case "Denied":
              tagColor = "red";
              statusText = "Không được chấp nhận";
              break;
            default:
              statusText = status;
              break;
          }
      
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
    },
  ];
  const buttonStyle = {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "white", // Màu nền mặc định của button
    "&:hover": {
      backgroundColor: "#40a9ff", // Màu nền khi hover
    },
    "&:active": {
      backgroundColor: "#096dd9", // Màu nền khi nhấn (active)
    },
  };

  function formatCurrency(amount) {
    var amount1 = amount;
    return amount1
      ? amount1.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "";
  }

  const handleTabChange = (key) => {
    // Xử lý khi tab thay đổi, ví dụ: load dữ liệu mới theo tab
    console.log("Tab changed: ", key);
  };

  const monthRange = `${startDate.format("MMMM")}`;
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
          Tổng Quan Công Việc
        </h2>
      </div>
      <div
        style={{
          height: "100%",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "15px",
        }}
      >
        
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab={<span style={{ width: "100%",fontWeight: "bold"}}>Danh sách công việc</span>} key="1">
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <h3 style={{ textAlign: "center", color: "black" }}>
              <strong>
                Danh sách các công việc đã hoành thành trong {monthRange}
              </strong>
            </h3>
            <div style={{ textAlign: "right", marginRight: "30px" }}>
              <p>
                <strong>
                  Tổng số công việc hoành thành trong {monthRange}:
                </strong>
                <strong style={{ color: "red" }}> {totalJobs}</strong>
              </p>
              <p>
                <strong>Tổng số tiền đã thu trong {monthRange}:</strong>{" "}
                <strong style={{ color: "red" }}>
                  {formatCurrency(totalRevenue)}
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div style={{ margin: "10px" }}>
          <Button style={buttonStyle} onClick={handleCurrentMonthClick}>
            Tháng hiện tại
          </Button>
          <Button style={buttonStyle} onClick={handlePreviousMonthClick}>
            Tháng trước
          </Button>
          <Button style={buttonStyle} onClick={handleNextMonthClick}>
            Tháng sau
          </Button>
        </div>
          <Table
            dataSource={employee}
            columns={columns}
            pagination={false}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </TabPane>



        <TabPane  tab={<span style={{ width: "100%",fontWeight: "bold"}}>Yêu cầu huỷ công việc</span>} key="2">
        
            <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div style={{ textAlign: "left" }}>
          <h3 style={{ textAlign: "center", color: "black",marginTop: "20px" }}>
              <strong>
                Danh sách các yêu cầu huỷ công việc 
              </strong>
            </h3>
            
          </div>
        </div>
          <Table dataSource={orderRequest} columns={columns2} pagination={false} />
        </TabPane>
      </Tabs>

        <Modal
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          {orderDetail && (
            <div>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                <strong>Thông tin chi tiết công việc</strong>
              </p>
              <p>Mã Công Việc: {orderDetail.orderId}</p>
              <p>Loại dịch vụ: {orderDetail.typeName}</p>
              <p>Tên dịch vụ: {orderDetail.serviceName}</p>
              <p>Ngày làm việc: {orderDetail.date.split("T")[0]}</p>
              <p>Thời gian bắt đầu: {orderDetail.startTime}</p>
              <p>Thời gian kết thúc: {orderDetail.endTime}</p>
              <p>Address: {orderDetail.address}</p>
              <p>Tên Khách Hàng: {orderDetail.name}</p>
              <p>Địa chỉ email: {orderDetail.email}</p>
              <p>SDT liên hệ: {orderDetail.phone}</p>
              <p>Phụ Thu: {formatCurrency(orderDetail.subPrice)}</p>
              <p>Tổng phí dịch vụ: {formatCurrency(orderDetail.price)}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
