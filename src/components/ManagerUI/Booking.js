import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { BsImage } from "react-icons/bs";
import { FcAddDatabase } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";
import Swal from 'sweetalert2';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Booking() {
    const [bookingData, setBookingData] = useState([]);
    const [modal, setModal] = useState({});
    const [employeeData, setEmployeeData] = useState([]);
    const [processImageData, setProcessImageData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedorderId, setSelectedorderId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderIdImage, setorderIdImage] = useState('');
    const [EmpNameProcessImage, setEmpNameProcessImage] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);


    const handleEmployeeSelect = (employeeId) => {
        setSelectedEmployees(employeeId);

    };
    const resetSelection = () => {
        setSelectedEmployees([]);
        setSelectedorderId(null);
    };

    const handleProcessSelect = (orderId) => {
        resetSelection();
        setSelectedorderId(orderId);
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
            orderId: selectedorderId,
            employeeId: selectedEmployees
        };
        const dataMail = {
            orderId: selectedorderId,
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
                console.log(dataMail)
                axios.post('https://vinclean.azurewebsites.net/api/Location', data)
                    .then(response => {
                        console.log(response.data);

                        fetchData();
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



    const handleProcessImage = (orderId, employeeName) => {
        setorderIdImage(orderId)
        setEmpNameProcessImage(employeeName)
        axios.get(`https://vinclean.azurewebsites.net/api/OrderImage/Order/${orderId}`)
            .then(response => {
                setProcessImageData(response.data.data)
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleDined = async (orderId) => {
        closeModal();
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
            const dataMail = {
                orderId: orderId,
                to: "example@gmail.com",
                subject: text,
                body: ""
            }
            const dataCancel = {
                orderId: orderId,
                cancelBy: localStorage.getItem('id'),
                reasonCancel: text,
            }
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Do you want to Cancel this Process?',
                text: "Double-check before what you do!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'This Process has been Denied.',
                        'success'
                    )
                    axios.put(`https://vinclean.azurewebsites.net/api/Order/Cancel`, dataCancel)
                        .then(response => {
                            fetchData();
                            console.log(fetchData());
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        });

                    axios.post('https://vinclean.azurewebsites.net/api/Email/DeniedProcess', dataMail)
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

    const closeModal = () => {
        const modal = document.getElementById('myModal');
        if (modal) {
            const backdrop = document.getElementsByClassName('modal-backdrop')[0];
            modal.classList.remove('show');
            modal.style.display = 'none';
            if (backdrop) {
                backdrop.remove();
            }
        }
    };


    const handleButtonClick = () => {
        // Lấy giá trị của "type" và "name" từ các trường input
        const selectedType = document.getElementById('type').value;
        const enteredName = document.getElementById('name').value;
        const processImgData = {
            orderId: orderIdImage,
            type: selectedType,
            name: enteredName,
            image: ""
        }
        console.log(processImgData)
        // Gửi dữ liệu đến dịch vụ thông qua axios
        axios.post('https://vinclean.azurewebsites.net/api/OrderImage', processImgData)
            .then(response => {
                // Xử lý phản hồi từ dịch vụ (service) nếu cần thiết
                console.log(response.data);
                toast.success('Add Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleProcessImage(orderIdImage);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    };



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://vinclean.azurewebsites.net/api/Order')
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    };

    useEffect(() => {
        assignTask();
    }, []);

    const showDetail = (id) => {

        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Order/GetALL/${id}`)
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
        axios.post(`https://vinclean.azurewebsites.net/api/Employee/selectemployee`, { date, start, end })
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setEmployeeData(response.data);
                console.log(response.data);
                fetchData();
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
            booking.orderId.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.name.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.typeName.toLowerCase().includes(search.toLowerCase()) ||
            format(new Date(booking.date), 'dd/MM/yyyy').toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.startTime.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.address.toString().toLowerCase().includes(search.toLowerCase()) ||
            booking.status.toString().toLowerCase().includes(search.toLowerCase())
        );

        return filteredData;
    };

    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };


    {/*-----Location Google Map------ */ }
    const [coordinate, setCoords] = useState(null);
    const [address, setAddress] = useState(null);
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);


    const handleLocation = (id) => {
        setCoords(null);
        setAddress(null);
        setHasLocationData(false);

        axios
            .get(`https://vinclean.azurewebsites.net/api/Location/Process/${id}`)
            .then((response) => {
                const { latitude, longtitude } = response.data.data;
                if (latitude !== 0 && longtitude !== 0) {
                    setCoords({ lat: latitude, lng: longtitude });
                    setHasLocationData(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    // Lấy tọa độ
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    //         setCoords({ lat: latitude, lng: longitude })
    //     })
    // }, [])
    console.log(coordinate)
    // lấy địa chỉ
    useEffect(() => {
        if (coordinate) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: coordinate }, (results, status) => {
                if (status === "OK") {
                    if (results[0]) {
                        setAddress(results[0].formatted_address);
                    }
                } else {
                    console.error("Geocoder failed due to: " + status);
                }
            });
        }
    }, [coordinate]);
    useEffect(() => {
        setIsMarkerVisible(!!address);
    }, [address]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBzPHYhJBDKgWJkoXH43NEs7P-SCGTAvnQ"
    })

    const [map, setMap] = React.useState(null)
    {/*-----Location Google Map------ */ }

    function formatCurrency(amount) {
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
                                                {sortAndFilterData().map((booking) => {
                                                    if (booking.status !== 'Completed' && booking.status !== 'Cancel')
                                                        return (
                                                            <tr key={booking.orderId}>
                                                                <td>{booking.orderId}</td>
                                                                <td>{booking.name}</td>
                                                                <td>{booking.typeName}</td>
                                                                <td>{format(new Date(booking.date), 'dd/MM/yyyy')}</td>
                                                                <td>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
                                                                <td>{booking.address}</td>
                                                                <td ><p className={`status ${booking.status}`} style={{ minWidth: '100px' }}>{booking.status}</p></td>
                                                                <td>
                                                                    <div className="table-data-feature">
                                                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Send" data-bs-toggle="modal" data-bs-target="#imageprocess"
                                                                            onClick={() => handleProcessImage(booking.orderId, booking.employeeName)}>
                                                                            <BsImage></BsImage>
                                                                        </button>
                                                                        <button className={`item ${booking.employeeName ? 'assigned' : ''}`}
                                                                            data-toggle="tooltip" data-placement="top" title="Assign"
                                                                            onClick={(p) => {
                                                                                assignTask(booking.date, booking.startTime, booking.endTime);
                                                                                handleProcessSelect(booking.orderId);
                                                                            }}
                                                                            data-bs-toggle="modal" data-bs-target="#assign">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z" /></svg>
                                                                        </button>
                                                                        <button className="item" data-toggle="tooltip" data-placement="top" title="More" onClick={(e) => showDetail(booking.orderId)} data-bs-toggle="modal" data-bs-target="#myModal">
                                                                            <i className="zmdi zmdi-more" />
                                                                        </button>

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                })}
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
                                    <h5 className="modal-title" id="exampleModalLabel"><strong>Booking Details  ID: {modal.orderId} </strong></h5>
                                    <button style={{ marginLeft: '30px', }}
                                        onClick={() => handleDined(modal.orderId)}
                                        data-bs-dismiss="modal">
                                        <VscError color='red' size={26}></VscError>
                                    </button>
                                    <h5 className={`status ${modal.status} modal-title`} style={{ marginLeft: '300px', width: '130px' }}> <span style={{ marginRight: "5px" }}>•</span> {modal.status} </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                <p style={{textAlign:"end"}}><strong>Created Date:</strong> {modal.createdDate ? new Date(modal.createdDate).toLocaleDateString() : ''}</p>
                                    <div style={{ display: "flex" }}>
                                        <div class="process-info">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}>Order Infor</h4>
                                            <div class="info-content" style={{ marginLeft: "10px" }}>
                                                <p><strong>Order ID:</strong> {modal.orderId}</p>
                                                <p><strong>Status:</strong> <label className='status cancelled' style={{ padding: "0px 10px" }}>{modal.status}</label></p>
                                                <p><strong>Service:</strong> {modal.typeName} - {modal.serviceName} </p>
                                                <p><strong>Time: </strong> {modal.startTime} - {modal.endTime}</p>
                                                <p><strong>Date: </strong> {modal.date ? new Date(modal.date).toLocaleDateString() : ''}</p>
                                                <p><strong>Note: </strong> {modal.note ? modal.note : "<Nothing>"}</p>
                                            </div>
                                        </div>
                                        <div class="process-info1">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}> Customer Infor</h4>
                                            <div class="info-content" style={{ marginLeft: "10px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>
                                                        <p><strong>ID: {modal.customerId} </strong></p>
                                                        <p><strong>Customer:</strong> {modal.name} </p>
                                                        <p><strong>Address</strong> {modal.address}</p>
                                                        <p><strong>Phone:</strong> {modal.phone}</p>
                                                        <p><strong>Email:</strong> {modal.email}</p>
                                                        <p><strong>Dob:</strong> {modal.dob ? new Date(modal.dob).toLocaleDateString() : ''}</p>
                                                    </div>
                                                    <div> <img src={modal.accountImage} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} /></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", marginTop: "20px" }}>
                                        <div class="process-info">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}> Price</h4>
                                            <div class="info-content" style={{ marginLeft: "10px" }}>
                                                <p><strong>Sub Price:</strong> {formatCurrency(modal.subPrice)}</p>
                                                <p><strong>Point Used:</strong> {modal.pointUsed} </p>
                                                <p style={{ fontFamily: "Arial, sans-serif", fontSize: "25px" }}><strong>Price:</strong> <label className='status Incoming' style={{ padding: "0px 20px" }}>{formatCurrency(modal.price)}</label></p>
                                            </div>
                                        </div>
                                        <div class="process-info1">
                                            <h4 style={{ textAlign: "center", margin: "10px" }}> Employee Infor</h4>
                                            {modal.employeeName ? (

                                                <div class="info-content" style={{ marginLeft: "10px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div>
                                                            <p><strong>ID: {modal.employeeId} </strong></p>
                                                            <p><strong>Customer:</strong> {modal.employeeName} </p>
                                                            <p><strong>Phone:</strong> {modal.employeePhone}</p>
                                                            <p><strong>Email:</strong> {modal.employeeEmail}</p>
                                                        </div>
                                                        <div> <img src={modal.employeeImage} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} /></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p><i>No employee assigned.</i></p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='input-group' style={{marginTop:"20px"}}>
                                        <span className='input-group-text'>Name</span>
                                        <input type="text" className="form-control"
                                            value={modal.orderId}
                                        />
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

                    {/*-----Modal Assign Employee------ */}
                    <div className='modal fade' id="imageprocess" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'><strong>Employee: </strong>{EmpNameProcessImage}</h5>
                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More" data-bs-toggle="modal" data-bs-target="#map"
                                        style={{ marginLeft: "20px", color: '#d50000' }}
                                        onClick={() => handleLocation(orderIdImage)}>
                                        <FaLocationDot size={20}></FaLocationDot>
                                    </button>
                                    <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                                </div>
                                <div className="modal-body">
                                    <h6><i>*Add more Image Card</i></h6>
                                    <form className="form-inline" >
                                        <div className=" input-group mb-3 " style={{ position: "relative" }}>
                                            <label className="px-2 input-group-text">Type</label>
                                            <select id="type" className="form-control" style={{ width: "200px" }}>
                                                <option value="Verify">Verify</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Completed">Completed</option>
                                            </select>

                                        </div>
                                        <div className=" input-group mb-3" style={{ marginLeft: "50px" }}>
                                            <label className="input-group-text">Name</label>
                                            <input className="form-control" id="name" />
                                        </div>
                                        <button className=" input-group mb-3" type="button" style={{ marginLeft: "10px" }}
                                            onClick={() => handleButtonClick()}><FcAddDatabase size={50}></FcAddDatabase></button>
                                    </form>
                                    <hr style={{ margin: "10px 0" }} /> {/* Đường thẳng ngăn cách */}

                                    <h5 style={{ textAlign: 'center' }}><b>Image Card</b></h5>
                                    {processImageData.map((img) => (
                                        <div key={img.id} className="testimonial py-4 px-3" style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.3)", borderRadius: "20px" }}>

                                            {/* Hiện comment */}

                                            <div className="mt-3 d-flex align-items-center gap-4">

                                                {/* Hiện ảnh */}
                                                <img src={img.image ? img.image : "http://via.placeholder.com/300"} alt="" className="" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />

                                                <div>
                                                    {/* Hiện tên khách hàng */}

                                                    <h6 className="mb-0 mt-3">
                                                        <b>Type:</b> <span className={`status ${img.type}`} style={{ padding: "5px 20px" }}>{img.type}</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-3">
                                                        <b>Name:</b> {img.name}
                                                    </h6>



                                                    {/* Hiện tên dịch vụ */}
                                                    <p className="section__description"> Process Id: {img.orderId}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*-----Modal Assign Employee------ */}
                    <div className="modal fade show z-index" id="map" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <h6 className="modal-title" id="exampleModalLabel"><strong>Address: </strong>{address}</h6>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    {isLoaded && (
                                        <div>
                                            {hasLocationData && coordinate ? (
                                                <GoogleMap
                                                    mapContainerStyle={{ width: '100%', height: '700px' }}
                                                    center={coordinate}
                                                    zoom={13}
                                                    onLoad={map => setMap(map)}
                                                >
                                                    {isMarkerVisible && <Marker position={coordinate} />}
                                                </GoogleMap>
                                            ) : (
                                                <div style={{ justifyContent: 'center', textAlign: 'center', margin: "100px" }} ><h4>Không có dữ liệu vị trí.</h4></div>
                                            )}
                                        </div>
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
