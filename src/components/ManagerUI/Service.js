import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FireBaseConfig';
import { storage } from "./FireBaseConfig";
import '../../styles/serviceadmin.css';
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
        axios.get(`https://localhost:7013/api/Type`)
            .then(response => {
                const data = response.data.data;
                setType(data);
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7013/api/Type/${servicetypeid}`)
            .then(response => {
                const data = response.data.data;
                setTypeName(data.type1)
                setTypeImage(data.img)
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });

        axios.get(`https://localhost:7013/api/Service/Type/${servicetypeid}`)
            .then(response => {
                const data = response.data.data;
                setServiceList(data)
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });
    }, [servicetypeid]);

    useEffect(() => {
        axios.get(`https://localhost:7013/api/Service/Type`)
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
        axios.put(`https://localhost:7013/api/Service`, editedService)
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
        const editedType = {
            typeId: servicetype.typeId,
            type1: TypeName,
            img: TempImageUrl,
            avaiable: true

        }
        axios.put(`https://localhost:7013/api/Type`, editedType)
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

            }).catch(error => {
                console.log("Put fail");
            });
    }
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
                style={{ width: '60%' }}
            >

                <div className="card-body" >
                    <div>
                        <div>
                            <label className="form-label"><strong>Image</strong></label>
                            <br></br>
                            <input type="file" onChange={handleImageUpload} />
                            <img src={TypeImage || "http://via.placeholder.com/300"} alt="Type" style={{ width: '100px', height: '100px' }} />
                            <img src={TempImageUrl} alt="Type" style={{ width: '100px', height: '100px' }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label"><strong>Type Name</strong></label>
                            <input
                                type="text"
                                className="form-control mb-1"
                                value={TypeName}
                                onChange={(e) => setTypeName(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary mr-2" onClick={saveType} style={{ marginBottom: '10px' }}>
                            Save Type
                        </button>
                    </div>


                    <table style={{ width: '100%', borderCollapse: 'collapse' }} >
                        <thead>
                            <tr style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>
                                <th style={{ width: '20%' }}>Type ID</th>
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
                                            sv.status
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
                                            sv.cost
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
                <header className="header-desktop">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="header-wrap">
                                {/* Rest of the header code */}
                            </div>
                        </div>
                    </div>
                </header>
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
                                                    <th style={{ width: '20%' }}>Type ID</th>
                                                    <th style={{ width: '20%' }}>Name</th>
                                                    <th style={{ width: '20%' }}>Status</th>
                                                    <th style={{ width: '20%' }}>Image</th>
                                                    <th style={{ width: '20%' }} />
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
            <div />
            <ToastContainer />

        </div>
    );
};

export default Service;
