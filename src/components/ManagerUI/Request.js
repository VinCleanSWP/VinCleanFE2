import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import Swal from 'sweetalert2';

function Request() {
    const [requestData, setrequestData] = useState([]);
    const [modal, setModal] = useState({});
    const [modal2, setModal2] = useState({});
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedProcessId, setSelectedProcessId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');// 'asc' để sắp xếp tăng dần, 'desc' để sắp xếp giảm dần



    const handleEmployeeSelect = (employeeId) => {
        setSelectedEmployees(employeeId);
    };

    const handleProcessSelect = (processId) => {
        setSelectedProcessId(processId);
    };

    useEffect(() => {
        assignTask();
    }, []);

    const formatTime = (timeString) => {
        if (timeString) {
            const [hours, minutes] = timeString.split(":");
            return `${hours}:${minutes}`;
        }
        return "";
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Gọi API để lấy dữ liệu
        axios.get('https://vinclean.azurewebsites.net/api/OrderRequest')
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setrequestData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching request data:', error);
            });
    };
    const showDetail = (id) => {

        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/OrderRequest/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModal(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching request data:', error);
            });
    }
    const showDetailProcess = (id) => {

        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Order/GetALL/${id}`)
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setModal2(response.data.data);
                console.log(id);
            })
            .catch(error => {
                console.error('Error fetching request data:', error);
            });
    }

    const assignTask = (date, start, end) => {
        // Gọi API để lấy dữ liệu
        console.log({ date, start, end });
        axios.post(`https://vinclean.azurewebsites.net/api/Employee/selectemployee`, { date, start, end })
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setEmployeeData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }

    const updateClick = () => {
        const data = {
            processId: selectedProcessId,
            employeeId: selectedEmployees
        };
        const dataMail = {
            processId: selectedProcessId,
            to: "example@gmail.com",
            subject: "",
            body: ""
        }
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Do you want to assgin this task?',
            text: "Double check before you assign!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Iam sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Assigned!',
                    'You have assigned successfully.',
                    'success'
                )
                console.log(data);
                axios.put('https://vinclean.azurewebsites.net/api/WorkingBy/AcceptedRequest', data)
                    .then(response => {
                        console.log(response.data);
                        axios.post('https://vinclean.azurewebsites.net/api/Email/SendAssignToCustomer', dataMail)
                            .then(response => {
                                console.log(response.data);
                                toast.success('Send Email Customer Successfully!', {
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
                        axios.post('https://vinclean.azurewebsites.net/api/Email/SendAssignToEmployee', dataMail)
                            .then(response => {
                                console.log(response.data);
                                toast.success('Send Email Employee Successfully!', {
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
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    };

    const sendEmail = async (processId, oldEmployeEmail) => {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Reason',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "Do you want to Denied this Process!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, denied it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Denied!',
                        'this process has been denied.',
                        'success'
                    )
                    const dataMail = {
                        processId: 0,
                        to: oldEmployeEmail,
                        subject: "Từ Chối Yêu Cầu Đổi Việc",
                        body: ` <p><b>Process ID: ${processId}</b></p>
                    <p>Yêu cầu của bạn ${oldEmployeEmail} không được chấp thuận.</p>
                    <p><b>Lý do: </b> ${text}</p>
                    <p>Nếu Có Thắc Mắc gì vui lòng liên hệ trực tiếp với ban quản lý.</p>`
                    }
                    axios.put(`https://vinclean.azurewebsites.net/api/ProcessSlot/Denied/${processId}`)
                        .then(response => {
                            console.log(response.data);
                            axios.post('https://vinclean.azurewebsites.net/api/Email', dataMail)
                                .then(response => {
                                    console.log(response.data);
                                    toast.success('Send Email Denied Successfully!', {
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
                            fetchData();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    fetchData();
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            })
        }


    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortAndFilterData = () => {
        const sortedData = [...requestData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        const filteredData = sortedData.filter(m =>
            m.customerName.toLowerCase().includes(search.toLowerCase()) ||
            m.oldEmployeeName.toLowerCase().includes(search.toLowerCase()) ||
            m.address.toLowerCase().includes(search.toLowerCase()) ||
            m.processId.toString().toLowerCase().includes(search.toLowerCase()) ||
            format(new Date(m.date), 'dd/MM/yyyy').toString().toLowerCase().includes(search.toLowerCase()) ||
            formatTime(m.startTime).toString().toLowerCase().includes(search.toLowerCase())
        );

        return filteredData;
    };

    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
    const formatCurrency = (amount) => {
        var amount1 = amount;
        return amount1 ? amount1.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
    }
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
                                            <h2><strong>Request Change Task</strong></h2>
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
                                                    <th>Order Id <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span> </th>
                                                    <th>Customer<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Employee <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th onClick={toggleSortOrder}><div>Date<span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></div></th>
                                                    <th>Time <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Address <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th>Status <span className='icon-arrow' ><FcAlphabeticalSortingAz /></span></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortAndFilterData()
                                                    .map(request => (
                                                        <tr key={request.orderId}>
                                                            <td>{request.orderId}</td>
                                                            <td>{request.customerName}</td>
                                                            <td>{request.oldEmployeeName} </td>
                                                            <td>{format(new Date(request.date), 'dd/MM/yyyy')}</td>
                                                            <td>{formatTime(request.startTime)} - {formatTime(request.endTime)}</td>
                                                            <td>{request.address}</td>
                                                            <td><p className={`status ${request.status}`} style={{ minWidth: '100px' }}>{request.status}</p></td>
                                                            <td>
                                                                <div className="table-data-feature">
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="Send"
                                                                        onClick={() => sendEmail(request.processId, request.oldEmployeEmail)}>
                                                                        <i className="zmdi zmdi-mail-send" />
                                                                    </button>
                                                                    <button className={`item ${request.NewEmployeeName ? 'assigned' : ''}`} data-toggle="tooltip" data-placement="top" title="Assign"
                                                                        onClick={(p) => {
                                                                            assignTask(request.date, request.startTime, request.endTime);
                                                                            handleProcessSelect(request.orderId);
                                                                        }}
                                                                        data-bs-toggle="modal" data-bs-target="#assign">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z" /></svg>
                                                                    </button>
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More"
                                                                        onClick={(e) => {
                                                                            showDetail(request.orderId);
                                                                            showDetailProcess(request.orderId);
                                                                        }}
                                                                        data-bs-toggle="modal" data-bs-target="#myModal">
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
                                    <h5 className="modal-title" id="exampleModalLabel"><strong>Request Details  ID: {modal2.processId} </strong></h5>
                                    <h5 className={`status ${modal.status} modal-title`} style={{ marginLeft: '400px', width: '130px' }}> <span style={{ marginRight: "5px" }}>•</span> {modal.status} </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 20px" }}>
                                        <div>
                                            <div >
                                                <p><strong>AccountID: </strong> {modal.accountId}</p>
                                                <p><strong>Cancel By: </strong> {modal.name}</p>
                                                <p><strong>Role: </strong> {modal.role}</p>
                                                <p><strong>Reason: </strong> {modal.reason}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p><strong>Created Date: </strong>{(modal.createdDate ? format(new Date(modal.createdDate ? modal.createdDate : ""), 'dd/MM/yyy') : "").toString()}</p>

                                            <p><strong>Time: </strong> {(modal.createdDate ? format(new Date(modal.createdDate ? modal.createdDate : ""), 'HH:mm:ss') : "").toString()}</p>
                                        </div>

                                        {/* <p>Thời gian bắt đầu: {modal2.date.toLocaleString('vi-VN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                            <br></br>Thời gian kết thúc dự kiến: {modal2.date.toLocaleString('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}</p> */}

                                    </div>
                                    <div>
                                        <h2 style={{ textAlign: "center" }}>Order Detail</h2>
                                        <div class="process" style={{ marginTop: "30px" }}>
                                            <div class="process-info">
                                                <h4 style={{ textAlign: "center", margin: "10px" }}>Order Infor</h4>
                                                <div class="info-content" style={{ marginLeft: "10px" }}>
                                                    <p><strong>Order ID:</strong> {modal2.orderId}</p>
                                                    <p><strong>Status:</strong> <label className={`status ${modal2.status}`} style={{ padding: "0px 10px" }}>{modal2.status}</label></p>
                                                    <p><strong>Service:</strong> {modal2.typeName} - {modal2.serviceName} </p>
                                                    <p><strong>Time: </strong> {modal2.startTime} - {modal2.endTime}</p>
                                                    <p><strong>Date: </strong> {modal2.date ? new Date(modal2.date).toLocaleDateString() : ''}</p>
                                                    <p><strong>Note: </strong> {modal2.note ? modal2.note : "<Nothing>"}</p>
                                                    <p><strong>Sub Pirce: </strong>{formatCurrency(modal2.subPrice ? modal2.subPrice : "0")} </p>
                                                    <p style={{ fontSize: "20px" }}><strong>Total: </strong><label style={{ color: "green" }}>{formatCurrency(modal2.price)} </label></p>
                                                </div>
                                            </div>
                                            <div class="process-info1">
                                                <h4 style={{ textAlign: "center", margin: "10px" }}> Customer Infor</h4>
                                                <div class="info-content" style={{ marginLeft: "10px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div style={{ marginRight: "" }}>
                                                            <p><strong>ID: </strong> {modal2.customerId}</p>
                                                            <p><strong>Customer:</strong> {modal2.name} </p>
                                                            <p><strong>Address</strong> {modal2.address}</p>
                                                            <p><strong>Phone:</strong> {modal2.phone}</p>
                                                            <p><strong>Email:</strong> {modal2.email}</p>
                                                            <p><strong>Dob:</strong> {modal2.dob ? new Date(modal2.dob).toLocaleDateString() : ''}</p>
                                                            <p><strong>Point Used: </strong> {modal2.pointUsed ? modal2.pointUsed : 0}</p>
                                                        </div>
                                                        <div><img src={modal.customerImage || "https://firebasestorage.googleapis.com/v0/b/swp-vinclean-7b1d3.appspot.com/o/Employee%2Fuser-default.jpg?alt=media&token=983b62d3-504c-4874-beb9-2b7dffe8f332"} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div><p className='status cancelled' style={{ marginTop: "20px" }}><strong> { }</strong></p></div>

                                        <div style={{ display: 'flex', flexWrap: 'nowrap', margin: '5px' }}>
                                            <div style={{ flex: '1' }}>
                                                <p>

                                                </p>

                                            </div>
                                            <div style={{ flex: '1', marginRight: '5px', justifyContent: 'flex-end' }}>
                                            </div>
                                        </div>



                                    </div>
                                    <div>
                                        <h2 style={{ textAlign: "center" }}>Employee</h2>
                                        <div class="process" style={{ marginTop: "30px" }}>
                                            <div class="process-info">
                                                <h4 style={{ textAlign: "center", margin: "10px" }}> Old Employee</h4>
                                                <div class="info-content" style={{ marginLeft: "10px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div style={{ marginRight: "" }}>
                                                            <p><strong>ID: </strong> {modal.oldEmployeeId}</p>
                                                            <p><strong>Employee:</strong> {modal.oldEmployeeName} </p>
                                                            <p><strong>Phone:</strong> {modal.oldEmployePhone}</p>
                                                            <p><strong>Email:</strong> {modal.oldEmployeEmail}</p>
                                                        </div>
                                                        <div><img src={modal.oldEmployeImg || "https://firebasestorage.googleapis.com/v0/b/swp-vinclean-7b1d3.appspot.com/o/Employee%2Fuser-default.jpg?alt=media&token=983b62d3-504c-4874-beb9-2b7dffe8f332"} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="process-info1">
                                                <h4 style={{ textAlign: "center", margin: "10px" }}> New Employee</h4>
                                                <div class="info-content" style={{ marginLeft: "10px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        {modal.newEmployeeId ? (
                                                            <>
                                                                <div style={{ marginRight: "" }}>
                                                                    <p><strong>ID: </strong> {modal.newEmployeeId}</p>
                                                                    <p><strong>Employee:</strong> {modal.newEmployeeName} </p>
                                                                    <p><strong>Phone:</strong> {modal.newEmployePhone}</p>
                                                                    <p><strong>Email:</strong> {modal.newEmployeEmail}</p>
                                                                </div>
                                                                <div><img src={modal.newEmployeImg || "https://firebasestorage.googleapis.com/v0/b/swp-vinclean-7b1d3.appspot.com/o/Employee%2Fuser-default.jpg?alt=media&token=983b62d3-504c-4874-beb9-2b7dffe8f332"} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} /></div>
                                                            </>
                                                        ) : (
                                                            <p>No Employee Assigned</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                    </div>
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
                                                            <img src={u.account.img ? u.account.img : 'http://via.placeholder.com/300'} alt="img" style={{ width: '100px', height: '80px', borderRadius: "50%", margin: "5px 0px" }} />
                                                        </td>

                                                    </tr>
                                                )}-
                                            </tbody>
                                        </table>
                                        <button style={{ marginLeft: '87%' }} type='button'
                                            className='btn btn-primary float-start'
                                            onClick={() => updateClick()}
                                        >Submit</button>
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
            </div>
            <ToastContainer />
        </div>
    );
}
export default Request;

function getStatusColor(status) {
    switch (status) {
        case 'Waiting':
            return 'yellow';
        case 'Accepted':
            return 'green';
        case 'Denied':
            return 'red';
        default:
            return 'black';
    }
}
