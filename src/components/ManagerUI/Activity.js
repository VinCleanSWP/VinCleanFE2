import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function Activity() {
    const [bookingData, setBookingData] = useState([]);
    const [modal, setModal] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get('https://localhost:7013/api/Order')
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
        axios.get(`https://localhost:7013/api/Order/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModal(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }


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
                                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                            <div class="input-group">
                                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light" style={{ borderRadius: '100px' }}
                                                    onChange={(e) => { setSearch(e.target.value) }} />
                                                <div class="input-group-append">
                                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary" style={{ borderRadius: '70px' }} ><i class="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Customer</th>
                                                    <th>Type services</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Address</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingData.filter((m) => {
                                                    if (search.toLowerCase() === '') {
                                                        return m;
                                                    }
                                                    else if (m.orderId.toString().toLowerCase().includes(search.toLowerCase()) ||
                                                        m.customerId.toString().toLowerCase().includes(search.toLowerCase()) ||
                                                        m.type.toLowerCase().includes(search.toLowerCase()) ||
                                                        m.dateWork.toString().toLowerCase().includes(search.toLowerCase()) ||
                                                        m.startTime.toString().toLowerCase().includes(search.toLowerCase()) ||
                                                        m.address.toString().toLowerCase().includes(search.toLowerCase()) ||
                                                        m.customerId.toString().toLowerCase().includes(search.toLowerCase())
                                                    ) {
                                                        return m;
                                                    }
                                                }).map(booking => (
                                                        <tr key={booking.orderId}>
                                                            <td>{booking.orderId}</td>
                                                            <td>{booking.customerId}</td>
                                                            <td>{booking.type}</td>
                                                            <td>{format(new Date(booking.dateWork), 'dd/MM/yyyy')}</td>
                                                            <td>{booking.startTime} - {booking.endTime}</td>
                                                            <td>{booking.address}</td>
                                                            <td style={{ color: 'red' }}>{booking.total}.000</td>
                                                            <td>
                                                                <div className="table-data-feature">
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More"
                                                                        onClick={(e) => showDetail(booking.orderId)} data-bs-toggle="modal" data-bs-target="#myModal">
                                                                        <i className="zmdi zmdi-more" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
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
                                    <h5 className="modal-title" style={{ color: 'green', marginLeft: '400px' }}> <span style={{ marginRight: "5px" }}>Total</span> {modal.total}.000 </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <strong>Customer</strong>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className="px-2.5 input-group-text">Name</label>
                                            <input value={modal.customerName} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                            <img src="https://reactjs.org/logo-og.png" alt="react logo" style={{ width: '150px', }} />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className=" input-group mb-3">
                                            <label className="px-2 input-group-text">Phone</label>
                                            <input value={modal.phone} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                            <label className="input-group-text">Email</label>
                                            <input value={modal.customerEmail} className="form-control" />
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
                                            <input value={modal.dateWork ? new Date(modal.dateWork).toLocaleDateString() : ''} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3">
                                            <label className="input-group-text" style={{ marginLeft: "100px" }}>Time</label>
                                            <input value={`${modal.startTime} - ${modal.endTime}`} className="form-control" />
                                        </div>
                                    </form>
                                    <form className="form-inline">
                                        <div className="input-group mb-3">
                                            <label className="px-3 input-group-text">Type</label>
                                            <input value={modal.type} className="form-control" />
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
                                                    <img src="https://reactjs.org/logo-og.png" alt="react logo" style={{ width: '150px', }} />
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