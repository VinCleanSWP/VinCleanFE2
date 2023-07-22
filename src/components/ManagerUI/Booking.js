import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { BsImage } from "react-icons/bs";
import { FcAddDatabase } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Booking() {
    const [bookingData, setBookingData] = useState([]);
    const [modal, setModal] = useState({});
    const [employeeData, setEmployeeData] = useState([]);
    const [processImageData, setProcessImageData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedProcessId, setSelectedProcessId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [processIdImage, setProcessIdImage] = useState('');
    const [EmpNameProcessImage, setEmpNameProcessImage] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);


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
        const dataMail ={
                processId: selectedProcessId,
                to: "example@gmail.com",
                subject: "",
                body: ""
        }
        console.log(dataMail)
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
                console.log(data);
        fetchData();
                axios.post('https://localhost:7013/api/Email/SendAssignToCustomer', dataMail)
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
                axios.post('https://localhost:7013/api/Email/SendAssignToEmployee', dataMail)
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
    };

    const handleProcessImage = (processId, employeeName) => {
        setProcessIdImage(processId)
        setEmpNameProcessImage(employeeName)
        axios.get(`https://localhost:7013/api/ProcessImage/Process/${processId}`)
            .then(response => {
                setProcessImageData(response.data.data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleButtonClick = () => {
        // Lấy giá trị của "type" và "name" từ các trường input
        const selectedType = document.getElementById('type').value;
        const enteredName = document.getElementById('name').value;
        const processImgData = {
            processId: processIdImage,
            type: selectedType,
            name: enteredName,
            image: ""
        }
        console.log(processImgData)
        // Gửi dữ liệu đến dịch vụ thông qua axios
        axios.post('https://localhost:7013/api/ProcessImage', processImgData)
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
                handleProcessImage(processIdImage);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    };



    useEffect(() => {
        // Gọi API để lấy dữ liệu
        fetchData();
    }, []);
    const fetchData = () => {
        axios.get('https://localhost:7013/api/Process')
            .then(response => {
                // Cập nhật dữ liệu lấy từ API vào state
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching booking data:', error);
            });
    }
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


    {/*-----Location Google Map------ */ }
    const [coordinate, setCoords] = useState(null);
    const [address, setAddress] = useState(null);
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);


    const handleLocation = (id) => {
        setCoords(null);
        setAddress(null);
        setHasLocationData(false);
      
        axios
          .get(`https://localhost:7013/api/WorkingBy/Process/${id}`)
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
                                                            <td>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
                                                            <td>{booking.address}</td>
                                                            <td ><p className={`status ${booking.status}`} style={{ minWidth: '100px' }}>{booking.status}</p></td>
                                                            <td>
                                                                <div className="table-data-feature">
                                                                    <button className="item" data-toggle="tooltip" data-placement="top" title="Send" data-bs-toggle="modal" data-bs-target="#imageprocess"
                                                                        onClick={() => handleProcessImage(booking.processId, booking.employeeName)}>
                                                                        <BsImage></BsImage>
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
                                            <input value={modal.name} className="form-control" />
                                        </div>
                                        <div className="px-5 input-group mb-3" style={{ marginLeft: "100px" }}>
                                            <img src={modal.accountImage} alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100, marginTop: 0 }} />
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
                                                    <img src="https://reactjs.org/logo-og.png" alt="react logo" style={{ width: '100px', height: "100px", borderRadius: 100 }} />
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

                    {/*-----Modal Assign Employee------ */}
                    <div className='modal fade' id="imageprocess" tabIndex="-1" aria-hidden="true">
                        <div className='modal-dialog modal-lg modal-dialog-centered'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title'><strong>Employee: </strong>{EmpNameProcessImage}</h5>
                                    <button className="item" data-toggle="tooltip" data-placement="top" title="More" data-bs-toggle="modal" data-bs-target="#map"
                                        style={{ marginLeft: "20px", color: '#d50000' }}
                                        onClick={() => handleLocation(processIdImage)}>
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
                                                <img src= {img.image ? img.image :"https://firebasestorage.googleapis.com/v0/b/swp-vinclean-7b1d3.appspot.com/o/Employee%2Fuser-default.jpg?alt=media&token=983b62d3-504c-4874-beb9-2b7dffe8f332"} alt="" className="" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />

                                                <div>
                                                    {/* Hiện tên khách hàng */}

                                                    <h6 className="mb-0 mt-3">
                                                        <b>Type:</b> <span className={`status ${img.type}`} style={{ padding: "5px 20px" }}>{img.type}</span>
                                                    </h6>
                                                    <h6 className="mb-0 mt-3">
                                                        <b>Name:</b> {img.name}
                                                    </h6>



                                                    {/* Hiện tên dịch vụ */}
                                                    <p className="section__description"> Process Id: {img.processId}</p>
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
                                                <div style={{justifyContent:'center', textAlign:'center', margin:"100px"}} ><h4>Không có dữ liệu vị trí.</h4></div>
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
