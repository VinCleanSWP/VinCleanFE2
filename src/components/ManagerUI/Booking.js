import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAlphabeticalSortingAz } from "react-icons/fc";

function Booking() {
    const [bookingData, setBookingData] = useState([]);
    const [modal, setModal] = useState({});
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedProcessId, setSelectedProcessId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');


    const handleEmployeeSelect = (employeeId) => {
        setSelectedEmployees(employeeId);
    };

    const handleProcessSelect = (processId) => {
        setSelectedProcessId(processId);
    };

    const formatTime = (timeString) => {
        if (timeString) {
            const [hours, minutes] = timeString.split(":");
            return `${hours}:${minutes}`;
        }
        return "";
    };
    const updateClick = () => {
        const data = {
            processId: selectedProcessId,
            employeeId: selectedEmployees
        };
        axios.post('https://localhost:7013/api/WorkingBy', data)
            .then(response => {
                console.log(response.data);
                toast.success('Assigned Successfully!', {
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

    const sendEmail = (processId) => {
        console.log({ processId })
        toast.success('Send Email Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        axios.post('', { processId })
            .then(response => {
                console.log(response.data);
                toast.success('Assigned Successfully!', {
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


    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get('https://localhost:7013/api/Process')
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }, []);

    useEffect(() => {
        assignTask();
    }, []);

    const showDetail = (id) => {

        // Gọi API để lấy dữ liệu
        axios.get(`https://localhost:7013/api/Process/GetALL/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModal(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }
    const assignTask = (date, start, end) => {
        // Gọi API để lấy dữ liệu
        console.log({ date, start, end });
        axios.post(`https://localhost:7013/api/Employee/selectemployee`, { date, start, end })
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setEmployeeData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
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

        const filteredData = sortedData.filter(booking =>
            booking.processId.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.name.toString().toLowerCase().includes(search.toLowerCase()) ||
            // booking.typeName.toLowerCase().includes(search.toLowerCase()) ||
            format(new Date(booking.date), 'dd/MM/yyyy').toString().toLowerCase().includes(search.toLowerCase()) ||
            // booking.startWorking.toString().toLowerCase().includes(search.toLowerCase()) ||
            // booking.address.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.status.toString().toLowerCase().includes(search.toLowerCase())
        );

        return filteredData;
    };

    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };




    return (
        <div >
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
                                            <h2><strong>Customer Booking</strong></h2>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."
                                                    value={search}
                                                    onChange={handleSearchChange} />
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead>
                                                <tr>
                                                    <th>Id <span className='icon-arrow'><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Customer <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Services<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th onClick={toggleSortOrder}><div>Date<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></div></th>
                                                    <th>Time<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Address<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Status<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortAndFilterData()
                                                    .map(booking => (
                                                        <tr key={booking.processId}>
                                                            <td>{booking.processId}</td>
                                                            <td>{booking.name}</td>
                                                            <td>{booking.typeName}</td>
                                                            <td>{format(new Date(booking.date), 'dd/MM/yyyy')}</td>
                                                            <td>{formatTime(booking.startWorking)} - {formatTime(booking.endWorking)}</td>
                                                            <td>{booking.address}</td>
                                                            <td ><p className={`status ${booking.status}`} style={{ minWidth: '100px' }}>{booking.status}</p></td>
                                                            <td>
                                                                <div className="table-data-feature">
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="Send"
                                                                        onClick={() => sendEmail(booking.processId)}>
                                                                        <i className="zmdi zmdi-mail-send" />
                                                                    </button>
                                                                    <button className={`item ${booking.employeeName ? 'assigned' : ''}`}
                                                                        data-toggle="tooltip" data-placement="top" title="Assign"
                                                                        onClick={(p) => {
                                                                            assignTask(booking.date, booking.startTime, booking.endTime);
                                                                            handleProcessSelect(booking.processId);
                                                                        }}
                                                                        data-bs-toggle="modal" data-bs-target="#assign">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z" /></svg>
                                                                    </button>
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More" onClick={(e) => showDetail(booking.processId)} data-bs-toggle="modal" data-bs-target="#myModal">
                                                                        <i className="zmdi zmdi-more" />
                                                                    </button>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END DATA TABLE*/}
                    </div>
                    <div className="modal fade" id="myModal" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <h5 className="modal-title" id="exampleModalLabel"><strong>Booking Details  ID: {modal.processId} </strong></h5>
                                    <h5 className={`status ${modal.status} modal-title`} style={{ marginLeft: '400px', width: '130px' }}> <span style={{ marginRight: "5px" }}>•</span> {modal.status} </h5>
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
                                            <img src={modal.accountImage} alt="react logo" style={{ width: '120px', height: "120px", borderRadius: 100 }} />
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
                                                    <img src="https://reactjs.org/logo-og.png" alt="react logo" style={{ width: '120px', height: "120px", borderRadius: 100 }} />
                                                </div>
                                            </form>
                                            <form className="form-inline">
                                                <div className="input-group mb-3">
                                                    <label className="px-2.5 input-group-text">Phone</label>
                                                    <input value={modal.employeePhone} className="form-control" />
                                                </div>
                                                <div className="px-5 input-group mb-3">
                                                    <label className="input-group-text" style={{ marginLeft: "100px" }}>Email</label>
                                                    <input value={modal.employeeEmail} className="form-control" />
                                                </div>
                                            </form>
                                            <form className="form-inline">
                                                <div className="input-group mb-3">
                                                    <label className="px-2.5 input-group-text">Start Working</label>
                                                    <input value={modal.startWorking} className="form-control" />
                                                </div>
                                                <div className="px-6 input-group mb-3" style={{ marginLeft: "100px" }}>
                                                    <label className="input-group-text">End Working</label>
                                                    <input value={modal.endWorking} className="form-control" />
                                                </div>
                                            </form>
                                            <div className='input-group mb-3'>
                                                <span className='input-group-text'>Name</span>
                                                <input type="text" className="form-control"
                                                    value={modal.processId}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p><i>No employee assigned.</i></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*-----Modal Assign Employee------ */}
                    <div className='modal fade' id="assign" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'><strong>Employee</strong></h5>
                                    <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                                </div>
                                <div className="modal-body">
                                    <div className="table-responsive table-responsive-data2">
                                        <table className="table table-data2 table-responsive">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <label className="au-checkbox">
                                                            <input type="checkbox" />
                                                            <span className="au-checkmark" />
                                                        </label>
                                                    </th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th>Image</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeData.map(u =>
                                                    <tr className="tr-shadow" key={u.employeeId}>
                                                        <td>
                                                            {/* Chọn nhiều employee và cho vô Array */}
                                                            {/* <label className="au-checkbox">
                                                                <input type="checkbox" 
                                                                checked={selectedEmployees.includes(u.employeeId)}
                                                                onChange={() => handleEmployeeSelect(u.employeeId)} />
                                                                <span className="au-checkmark" />
                                                            </label> */}
                                                            <label className="au-checkbox">
                                                                <input type="checkbox"
                                                                    checked={selectedEmployees === u.employeeId}
                                                                    onChange={() => handleEmployeeSelect(u.employeeId)} />
                                                                <span className="au-checkmark" />
                                                            </label>
                                                        </td>
                                                        <td style={{ whiteSpace: 'nowrap' }}>{u.account.name}</td>
                                                        <td>
                                                            <span className="block-email">{u.account.email}</span>
                                                        </td>
                                                        <td className="desc">{u.phone}</td>
                                                        <td style={{ color: getStatusColor(u.status) }}>{u.status}</td>
                                                        <td style={{ display: 'inline', padding: "10px" }}>
                                                            <img src={u.account.img ? u.account.img : 'http://via.placeholder.com/300'} alt="img" style={{ width: '100px', height: '80px' }} />
                                                        </td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                                            <button type='button' className='btn btn-success float-start'
                                                onClick={() => updateClick()}>Assign</button>
                                        </div>


                                    </div>

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
            </div >
            <ToastContainer />
        </div>


    );

}
export default Booking;

function getStatusColor(status) {
    switch (status) {
        case 'Incoming':
            return 'orange';
        case 'Processing':
            return 'green';
        case 'Completed':
            return 'red';
        case 'Available':
            return 'green';
        case 'NotAvailable':
            return 'red';
        default:
            return 'black';
    }
}
