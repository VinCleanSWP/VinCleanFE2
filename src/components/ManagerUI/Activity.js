import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { Alert, Button, Input, Modal, Select, Space, Table, Upload } from 'antd';

function Activity() {
    const [bookingData, setBookingData] = useState([]);
    const [modal, setModal] = useState({});
    const [modalCancel, setModalCancel] = useState({});
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' để sắp xếp tăng dần, 'desc' để sắp xếp giảm dần
    const [selectedEvent, setSelectedEvent] = useState(null);



    const handleCancelClick = (id) => {
        setSelectedEvent(id);
        axios.get(`https://vinclean.azurewebsites.net/api/Order/GetALL/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModalCancel(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    };

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get('https://vinclean.azurewebsites.net/api/Order')
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }, []);
    const showDetail = (id) => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Order/GetALL/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModal(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }

    const formatTime = (timeString) => {
        if (timeString) {
            const [hours, minutes] = timeString.split(":");
            return `${hours}:${minutes}`;
        }
        return "";
    };
    const formatCurrency = (amount) => {
        var amount1 = amount;   
        return amount1 ? amount1.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
    }

    ///Search and sort
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortAndFilterData = () => {
        const sortedData = [...bookingData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        const filteredData = sortedData.filter(m =>
            m.orderId.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.name.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.typeName.toLowerCase().includes(search.toLowerCase()) ||
            format(new Date(m.date), 'dd/MM/yyyy').toString().toLowerCase().includes(search.toLowerCase()) ||
            formatTime(m.startTime).toString().toLowerCase().includes(search.toLowerCase()) ||
            m.address.toString().toLowerCase().includes(search.toLowerCase())
        );

        return filteredData;
    };

    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    


    return (
        <div>
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row m-t-30">
                                <div className="col-md-12">
                                    <form action="">
                                        <div class="table__header">
                                            <h2><strong>Customer Order</strong></h2>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."
                                                    value={search}
                                                    onChange={handleSearchChange} />
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead>
                                                <tr>
                                                    <th>Id <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Customer <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span> </th>
                                                    <th>Type services <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th onClick={toggleSortOrder}><div>Date<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></div></th>
                                                    <th>Time<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Address<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Price<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortAndFilterData().map((booking) => {
                                                    // Add a condition to check if the status is 'completed'
                                                    if (booking.status === 'Completed') {
                                                        return (
                                                            <tr key={booking.orderId}>
                                                                <td>{booking.orderId}</td>
                                                                <td>{booking.name}</td>
                                                                <td>{booking.typeName}</td>
                                                                <td>{format(new Date(booking.date), 'dd/MM/yyyy')}</td>
                                                                <td>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
                                                                <td>{booking.address}</td>
                                                                <td><p className="status Completed" style={{ margin: 0 }}>{formatCurrency(modal.price)}</p></td>
                                                                <td>
                                                                    <div className="table-data-feature">
                                                                        <button
                                                                            className="item"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="More"
                                                                            onClick={(e) => showDetail(booking.orderId)}
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#myModal"
                                                                        >
                                                                            <i className="zmdi zmdi-more" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return null; // If the status is not 'completed', don't render anything
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* END DATA TABLE*/}
                                </div>
                                <div className="col-md-12">
                                    <form action="">
                                        <div class="table__header">
                                            <h2><strong>Order Cancel</strong></h2>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."
                                                    value={search}
                                                    onChange={handleSearchChange} />
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead>
                                                <tr>
                                                    <th>Id <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Customer <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span> </th>
                                                    <th>Type services <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th onClick={toggleSortOrder}><div>Date<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></div></th>
                                                    <th>Time<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Address<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Status<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortAndFilterData().map((booking) => {
                                                    // Add a condition to check if the status is 'completed'
                                                    if (booking.status === 'Cancel') {
                                                        return (
                                                            <tr key={booking.orderId}>
                                                                <td>{booking.orderId}</td>
                                                                <td>{booking.name}</td>
                                                                <td>{booking.typeName}</td>
                                                                <td>{format(new Date(booking.date), 'dd/MM/yyyy')}</td>
                                                                <td>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
                                                                <td>{booking.address}</td>
                                                                <td><p className="status cancelled" style={{ margin: 0 }}>{booking.status}</p></td>
                                                                <td>
                                                                    <div className="table-data-feature">
                                                                        <button
                                                                            className="item"
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="More"
                                                                            onClick={(e) => handleCancelClick(booking.orderId)}
                                                                        >
                                                                            <i className="zmdi zmdi-more" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return null; // If the status is not 'completed', don't render anything
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* END DATA TABLE*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="myModal" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <h5 className="modal-title" id="exampleModalLabel"><strong>Order Details  ID: {modal.orderId} </strong></h5>
                                    <h5 className="status Completed modal-title" style={{ marginLeft: '350px', minWidth: "210px" }}> <span style={{ marginRight: "5px" }}>Total</span> {formatCurrency(modal.price)} </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <strong>Customer</strong>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className="px-2.5 input-group-text">Name</label>
                                            <input value={modal.name} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                            <img src={modal.accountImage ? modal.accountImage : "https://firebasestorage.googleapis.com/v0/b/swp-vinclean-7b1d3.appspot.com/o/Employee%2Fuser-default.jpg?alt=media&token=983b62d3-504c-4874-beb9-2b7dffe8f332"} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className=" input-group mb-3">
                                            <label className="px-2 input-group-text">Phone</label>
                                            <input value={modal.phone} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                            <label className="input-group-text">Email</label>
                                            <input value={modal.email} className="form-control" />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className=" px-3 input-group-text">Dob</label>
                                            <input value={modal.dob ? new Date(modal.dob).toLocaleDateString() : ''} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3">
                                            <label className="input-group-text" style={{ marginLeft: "100px" }}>Address</label>
                                            <input value={modal.address} className="form-control" />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className="px-3 input-group-text">Date</label>
                                            <input value={modal.date ? new Date(modal.date).toLocaleDateString() : ''} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3">
                                            <label className="input-group-text" style={{ marginLeft: "100px" }}>Time</label>
                                            <input value={`${modal.startTime} - ${modal.endTime}`} className="form-control" />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className="px-3 input-group-text">Type</label>
                                            <input value={modal.typeName} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3">
                                            <label className="input-group-text" style={{ marginLeft: "100px" }}>Servce</label>
                                            <input value={modal.serviceName} className="form-control" />
                                        </div>
                                    </form>
                                    <div className="input-group mb-3">
                                        <label className="px-3 input-group-text">Note</label>
                                        <textarea value={modal.note} className="form-control" />
                                    </div>

                                    <strong>Employee</strong>
                                    {modal.employeeName ? (
                                        <>
                                            <form className="form-inline">
                                                <div className='input-group mb-3'>
                                                    <span className='input-group-text'>Name</span>
                                                    <input type="text" className="form-control" value={modal.employeeName} />
                                                </div>
                                                <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                                    <img src={modal.employeeImage} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} />
                                                </div>
                                            </form>
                                            <form className="form-inline">
                                                <div className="input-group mb-3">
                                                    <label className="px-2.5 input-group-text">Phone</label>
                                                    <input value={modal.employeePhone} className="form-control" />
                                                </div>
                                                <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                                    <label className="input-group-text">Email</label>
                                                    <input value={modal.employeeEmail} className="form-control" />
                                                </div>
                                            </form>
                                            <form className="form-inline">
                                                <div className="input-group mb-3">
                                                    <label className="px-10 input-group-text">Start Working</label>
                                                    <input value={modal.startWorking} className="form-control" />
                                                </div>
                                                <div className="px-6 input-group mb-3" style={{ marginLeft: "100px" }}>
                                                    <label className="input-group-text">End Working</label>
                                                    <input value={modal.endWorking} className="form-control" />
                                                </div>
                                            </form>
                                            <div className="input-group mb-3">
                                                <label className="px-3 input-group-text">Note</label>
                                                <textarea value={modal.note} className="form-control" />
                                            </div>
                                        </>
                                    ) : (
                                        <p><i>No employee assigned.</i></p>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                    <h2 style={{ textAlign: "center" }}>Order Detail</h2>
                                    <div class="process" style={{ marginTop: "30px" }}>
                                        <div class="process-info">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}>Order Infor</h4>
                                            <div class="info-content" style={{ marginLeft: "10px" }}>
                                                <p><strong>Order ID:</strong> {modalCancel.orderId}</p>
                                                <p><strong>Status:</strong> <label className='status cancelled' style={{ padding: "0px 10px" }}>{modalCancel.status}</label></p>
                                                <p><strong>Service:</strong> {modalCancel.typeName} - {modalCancel.serviceName} </p>
                                                <p><strong>Time: </strong> {modalCancel.startTime} - {modalCancel.endTime}</p>
                                                <p><strong>Date: </strong> {modalCancel.date ? new Date(modalCancel.date).toLocaleDateString() : ''}</p>
                                                <p><strong>Note: </strong> {modalCancel.note ? modalCancel.note : "<Nothing>"}</p>
                                            </div>
                                        </div>
                                        <div class="process-info1">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}> Customer Infor</h4>
                                            <div class="info-content" style={{ marginLeft: "10px" }}>
                                                <p><strong>ID: </strong> {modalCancel.customerId}</p>
                                                <p><strong>Customer:</strong> {modalCancel.name} </p>
                                                <p><strong>Address</strong> {modalCancel.address}</p>
                                                <p><strong>Phone:</strong> {modalCancel.phone}</p>
                                                <p><strong>Email:</strong> {modalCancel.email}</p>
                                                <p><strong>Dob:</strong> {modalCancel.dob ? new Date(modalCancel.dob).toLocaleDateString() : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div><p className='status cancelled' style={{ marginTop: "20px" }}><strong> {modalCancel.status}</strong></p></div>
                                    <div style={{ margin: "15px", display: "flex", justifyContent: "space-between", margin: "0px 20px" }}>
                                        <div>
                                            <div >
                                                <p><strong>AccountID: </strong> {modalCancel.cancelBy}</p>
                                                <p><strong>Cancel By: </strong> {modalCancel.cancelByName}</p>
                                                <p><strong>Role: </strong> {modalCancel.cancelByRole}</p>
                                                <p><strong>Reason: </strong> {modalCancel.reasonCancel}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p><strong>Cancel Date: </strong>{(modalCancel.cancelDate ? format(new Date(modalCancel.cancelDate), 'dd/MM/yyy') : "").toString()}</p>

                                            <p><strong>Cancel Time: </strong> {(modalCancel.cancelDate ? format(new Date(modalCancel.cancelDate), 'HH:mm:ss') : "").toString()}
                                            </p>
                                        </div>

                                        {/* <p>Thời gian bắt đầu: {modalCancel.date.toLocaleString('vi-VN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                            <br></br>Thời gian kết thúc dự kiến: {modalCancel.date.toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}</p> */}

                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', margin: '5px' }}>
                                        <div style={{ flex: '1' }}>
                                            <p>

                                            </p>

                                        </div>
                                        <div style={{ flex: '1', marginRight: '5px', justifyContent: 'flex-end' }}>
                                        </div>
                                    </div>



                                </div>

                            )}

                        </Modal>


                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Activity;

// function getStatusColor(status) {
//     switch (status) {
//         case 'Total':
//             return 'black';
//         case 'Processing':
//             return 'green';
//         case 'Completed':
//             return 'red';
//         default:
//             return 'red';
//     }
// }
