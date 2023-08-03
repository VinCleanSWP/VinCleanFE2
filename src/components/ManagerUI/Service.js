import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FireBaseConfig';
import { storage } from "./FireBaseConfig";
import '../../styles/serviceadmin.css';
import { FcAddDatabase } from "react-icons/fc";
import Swal from 'sweetalert2';
const Service = () => {
    const [servicetype, setType] = useState([]);
    const [servicelist, setServiceList] = useState([]);

    const [modalServiceIsOpen, setServiceModalIsOpen] = useState(false);
    const [modalTypeIsOpen, setTypeModalIsOpen] = useState(false);
    const accountId = localStorage.getItem('id');
    const [servicetypeid, setServiceTypeId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [TempImageUrl, setTempImageUrl] = useState('');

    const [Name, setName] = useState('');
    const [Cost, setCost] = useState('');
    const [MinimalSlot, setMinimalSlot] = useState('');
    const [Description, setDescription] = useState('');
    const [Status, setStatus] = useState('');
    const [TypeName, setTypeName] = useState('');
    const [TypeImage, setTypeImage] = useState('');

    const [editingServiceId, setEditingServiceId] = useState('');
    const [editingServiceName, setEditingServiceName] = useState('');
    const [editingServiceCost, setEditingServiceCost] = useState('');
    const [editingServiceDescription, setEditingServiceDescription] = useState('');
    const [editingServiceStatus, setEditingServiceStatus] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`https://vinclean.azurewebsites.net/api/Type`)
            .then(response => {
                const data = response.data.data;
                setType(data);
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handelDetal(servicetypeid);
    }, [servicetypeid]);

    const handelDetal = (servicetypeId) => {
        axios.get(`https://vinclean.azurewebsites.net/api/Type/${servicetypeId}`)
            .then(response => {
                const data = response.data.data;
                setTypeName(data.type1)
                setTypeImage(response.data.data)
                setEditingServiceId(data.typeId)
                console.log(response.data.data.img);
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });

        axios.get(`https://vinclean.azurewebsites.net/api/Service/Type/${servicetypeId}`)
            .then(response => {
                const data = response.data.data;
                setServiceList(data)
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });
    };

    useEffect(() => {
        axios.get(`https://vinclean.azurewebsites.net/api/Service/Type`)
            .then(response => {
                const data = response;
                setServiceId(data.ServiceId);
                setCost(data.cost);
                setName(data.name);
                setMinimalSlot(data.minimalSlot);
                setDescription(data.description);
                setStatus(data.status);
                console.log(data.name);
            })
            .catch(error => {
                console.error('Error fetching list:', error);
            });
    }, []);



    const startEditingService = (serviceId, serviceName, serviceStatus, serviceDescription, serviceCost) => {

        setEditingServiceId(serviceId);
        setEditingServiceName(serviceName);
        setEditingServiceStatus(serviceStatus);
        setEditingServiceCost(serviceCost);

        setEditingServiceDescription(serviceDescription);

    };
    console.log(editingServiceStatus);
    const saveEditedService = () => {
        // Tạo đối tượng dữ liệu mới từ các giá trị chỉnh sửa
        const editedService = {
            serviceId: editingServiceId,
            name: editingServiceName,
            cost: editingServiceCost,
            description: editingServiceDescription,
            status: editingServiceStatus
        };
        console.log(editedService);

        // Gửi yêu cầu PUT để cập nhật dịch vụ
        axios.put(`https://vinclean.azurewebsites.net/api/Service`, editedService)
            .then(response => {
                toast.success('Save successfull!', {
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
                console.log("Put fail");
            });
    };
    const saveType = () => {
        const updateTypeStatus = document.getElementById('updateTypeStatus').value;
        const editedType = {
            typeId: editingServiceId,
            type1: TypeName,
            img: TempImageUrl ? TempImageUrl :   TypeImage.img,
            avaiable: updateTypeStatus === "true" ? true : false

        }
        console.log(editedType)
        axios.put(`https://vinclean.azurewebsites.net/api/Type`, editedType)
            .then((response) => {
                toast.success('Save successfull!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                fetchData();
                setTypeModalIsOpen(false);
                


            }).catch(error => {
                console.log("Put fail");
            });
    }

    const handleButtonAddTypeClick = () => {
        // Lấy giá trị của "type" và "name" từ các trường input
        const selectedStatus = document.getElementById('statusType').value;
        const enteredName = document.getElementById('name').value;
        const processImgData = {
            avaiable: selectedStatus === "true" ? true : false,
            type1: enteredName,
            img: TypeImage.img || TempImageUrl
        }
        console.log(processImgData)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Do you want to create this Service?',
            text: "Double-check before you create this service!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('https://vinclean.azurewebsites.net/api/Type', processImgData)
                    .then(response => {
                        // Xử lý phản hồi từ dịch vụ (service) nếu cần thiết
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            'Successfully!',
                            'This service created successfully.',
                            'success'
                        )
                        fetchData();
                        handleImageUpload(TempImageUrl);
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
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

    const handleButtonAddServiceClick = (typeId) => {
        // Lấy giá trị của "type" và "name" từ các trường input
        const serviceName = document.getElementById('serviceName').value;
        const cost = document.getElementById('cost').value;
        const discription = document.getElementById('discription').value;
        const processImgData = {
            typeId: typeId,
            name: serviceName,
            cost: parseFloat(cost),
            description: discription,
        }
        console.log(processImgData)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Do you want to create this Service?',
            text: "Double-check before you create this service!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('https://vinclean.azurewebsites.net/api/Service', processImgData)
                    .then(response => {
                        // Xử lý phản hồi từ dịch vụ (service) nếu cần thiết
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            'Successfully!',
                            'This service created successfully.',
                            'success'
                        )
                        handelDetal(typeId);
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
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

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref(`Employee/${file.name}`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };


    return (
        <div>
            <Modal
                isOpen={modalTypeIsOpen}
                onRequestClose={() => setTypeModalIsOpen(false)}
                contentLabel="Add Employee"
                style={{ width: '' }}
            >

                <div className="card-body" >
                    <div>
                        <div>
                            <label className="form-label"><strong>Image</strong></label>
                            <br></br>
                            <input type="file" onChange={handleImageUpload} />
                            <img src={TempImageUrl || TypeImage.img || "http://via.placeholder.com/300"} alt="Type" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <label className="form-label"><strong>Type Name</strong></label>
                        <div className="form-group" style={{ display: "flex" }}>

                            <input
                                type="text"
                                className="form-control mb-1"
                                value={TypeName}
                                onChange={(e) => setTypeName(e.target.value)}
                            />
                            <select id="updateTypeStatus" className="form-control" style={{ width: "200px" }}>
                                <option value="true">Available</option>
                                <option value="false">Deleted</option>
                            </select>

                        </div>
                        <form className="form-inline" style={{ display: "block" }} >
                            <div className=" input-group mb-3 " style={{ position: "relative" }}>
                                <label className="px-2 input-group-text">Service Name</label>
                                <input className="form-control" id="serviceName" />

                            </div>
                            <div className=" input-group mb-3" >
                                <label className="input-group-text">Cost</label>
                                <input className="form-control" id="cost" type="number" min="0" required />
                            </div>
                            <div className=" input-group mb-3" >
                                <label className="input-group-text">Discription</label>
                                <textarea className="form-control" id="discription" />
                            </div>
                        </form>
                        <div style={{ display: "flex" }}>
                            <button type="button" className="btn btn-primary mr-2" onClick={saveType} style={{ marginBottom: '10px' }}>
                                Save Type
                            </button>
                            <button type="button" style={{ marginLeft: "65%" }}
                                onClick={() => handleButtonAddServiceClick(servicetypeid)}
                            ><FcAddDatabase size={50}></FcAddDatabase></button>
                        </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }} >
                        <thead>
                            <tr style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>
                                <th style={{ width: '20%' }}>ID</th>
                                <th style={{ width: '20%' }}>Name</th>
                                <th style={{ width: '20%' }}>Status</th>
                                <th style={{ width: '20%' }}>Description</th>
                                <th style={{ width: '20%' }}>Cost</th>
                                <th style={{ width: '20%' }}></th>


                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {servicelist.map(sv => (
                                <tr key={sv.serviceId} >
                                    <td >{sv.serviceId}</td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <input
                                                value={editingServiceName}
                                                onChange={e => setEditingServiceName(e.target.value)}
                                            />
                                        ) : (
                                            sv.name
                                        )}
                                    </td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <select
                                                value={editingServiceStatus}
                                                onChange={e => setEditingServiceStatus(e.target.value)}
                                            >
                                                <option value="Available">Available</option>
                                                <option value="Deleted">Deleted</option>
                                            </select>
                                        ) : (
                                            <label>{sv.status}</label>
                                        )}
                                    </td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <input
                                                type="text"
                                                value={editingServiceDescription}
                                                onChange={e => setEditingServiceDescription(e.target.value)}
                                            />
                                        ) : (
                                            sv.description
                                        )}
                                    </td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <input
                                                type="text"
                                                value={editingServiceCost}
                                                onChange={e => setEditingServiceCost(e.target.value)}
                                            />
                                        ) : (
                                            <input value={sv.cost}></input>
                                        )}
                                    </td>
                                    <td>
                                        <div className="table-data-feature">
                                            {editingServiceId === sv.serviceId ? (
                                                <button
                                                    className="item"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Save"
                                                    onClick={saveEditedService}
                                                >
                                                    <i className="zmdi zmdi-check" />
                                                </button>
                                            ) : (
                                                <button
                                                    className="item"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Edit"

                                                    onClick={() =>

                                                        startEditingService(sv.serviceId, sv.name, sv.status, sv.description, sv.cost)

                                                    }
                                                >
                                                    <i className="zmdi zmdi-edit" />
                                                </button>
                                            )}
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-right mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setTypeModalIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* HEADER DESKTOP*/}

                {/* END HEADER DESKTOP*/}
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                {/* Rest of the code */}
                            </div>
                            <h1 class="table__header" style={{ textAlign: "center" }}><strong>Service List</strong></h1>
                            <div className="row">
                                <div className="col-md-12">
                                    {/* DATA TABLE */}
                                    <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '20%' }}>Type </th>
                                                    <th style={{ width: '20%' }}>Name</th>
                                                    <th style={{ width: '20%' }}>Status</th>
                                                    <th style={{ width: '20%' }}>Image</th>
                                                    <th style={{ width: '20%' }}><button
                                                        style={{ marginRight: "25px" }} data-bs-toggle="modal" data-bs-target="#imageprocess"
                                                    ><FcAddDatabase size={30}></FcAddDatabase></button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {servicetype.map(Service => (
                                                    <tr key={Service.typeId}>
                                                        <td>{Service.typeId}</td>
                                                        <td>{Service.type1}</td>
                                                        <td>{Service.avaiable ? 'Available' : 'Deleted'}</td>
                                                        <td>
                                                            <img src={Service.img} style={{ width: '100px', height: 'auto' }} />
                                                        </td>
                                                        <td>
                                                            <div className="table-data-feature">
                                                                <button
                                                                    className="item"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="Edit"
                                                                    onClick={() => {
                                                                        setTypeModalIsOpen(true);
                                                                        setServiceTypeId(Service.typeId);
                                                                        handelDetal(Service.typeId);
                                                                    }}
                                                                >
                                                                    <i className="zmdi zmdi-edit" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* END DATA TABLE */}
                                </div>
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal fade' id="imageprocess" tabIndex="-1" aria-hidden="true">
                <div className='modal-dialog modal-lg modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'><strong>Create a new service: </strong></h5>
                            <button className="item" data-toggle="tooltip" data-placement="top" title="More" data-bs-toggle="modal" data-bs-target="#map"
                                style={{ marginLeft: "20px", color: '#d50000' }}
                            >
                            </button>
                            <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <h6><i>*Double-check before you create a new service</i></h6>
                            <form className="form-inline" >
                                <div className=" input-group mb-3 " style={{ position: "relative" }}>
                                    <label className="px-2 input-group-text">Type</label>
                                    <select id="statusType" className="form-control" style={{ width: "200px" }}>
                                        <option value="true">Available</option>
                                        <option value="false">Deleted</option>
                                    </select>

                                </div>
                                <div className=" input-group mb-3" style={{ marginLeft: "50px" }}>
                                    <label className="input-group-text">Name</label>
                                    <input className="form-control" id="name" />
                                </div>
                                <button className=" input-group mb-3" type="button" style={{ marginLeft: "10px" }}
                                    onClick={() => handleButtonAddTypeClick()}
                                ><FcAddDatabase size={50}></FcAddDatabase></button>
                            </form>
                            <form className="form-inline" >

                            </form>
                            <hr style={{ margin: "10px 0" }} /> {/* Đường thẳng ngăn cách */}

                            <h5 style={{ textAlign: 'center' }}><b>Image Card</b></h5>
                            <div >
                                <input type="file" onChange={handleImageUpload} />
                                <img src={TempImageUrl || "http://via.placeholder.com/300"} alt="Type" style={{ width: '200px', height: '200px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div />
            <ToastContainer />

        </div>
    );
};

export default Service;
