import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from './FireBaseConfig';


const Service = () => {
    const [servicetype, setType] = useState([]);
    const [servicelist, setServiceList] = useState([]);

    const [modalServiceIsOpen, setServiceModalIsOpen] = useState(false);
    const [modalTypeIsOpen, setTypeModalIsOpen] = useState(false);
    const accountId = localStorage.getItem('id');
    const [servicetypeid, setServiceTypeId] = useState('');
    const [serviceId, setServiceId] = useState('');

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
        axios.get(`https://localhost:7013/api/Service/Type/`)
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



    const startEditingService = (serviceId, serviceName, serviceCost, serviceDescription, serviceStatus) => {
        setEditingServiceId(serviceId);
        setEditingServiceName(serviceName);
        setEditingServiceCost(serviceCost);
        setEditingServiceDescription(serviceDescription);
        setEditingServiceStatus(serviceStatus);
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


            })
            .catch(error => {
                console.log("Put fail");
            });
    };
    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref(`Employee/${file.name}`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        // setTempImageUrl(imgUrl);
    };


    return (
        <div>
            <Modal
                isOpen={modalTypeIsOpen}
                onRequestClose={() => setTypeModalIsOpen(false)}
                contentLabel="Add Employee"

                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    },
                    content: {
                        width: '800px',
                        height: '600px',
                        margin: 'auto',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '200px',
                        overflow: 'auto'

                    }
                }}
            >
                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label"><strong>Type Id</strong></label>
                        <input
                            type="text"
                            className="form-control mb-1"
                            value={servicetypeid}
                            onChange={(e) => setServiceTypeId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label"><strong>Image</strong></label>
                        <br></br>
                        <input type="file" onChange={handleImageUpload} />
                        <img src={TypeImage || "http://via.placeholder.com/300"} alt="Type" style={{ width: '100px', height: '100px' }} />
                    </div>

                    <div className="form-group">
                        <label className="form-label"><strong>Type Name</strong></label>
                        <input
                            type="text"
                            className="form-control mb-1"
                            value={TypeName}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }} >
                        <thead>
                            <tr style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>
                                <th>Type ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicelist.map(sv => (
                                <tr key={sv.serviceId}>
                                    <td>{sv.serviceId}</td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <input
                                                type="text"
                                                value={editingServiceName}
                                                onChange={e => setEditingServiceName(e.target.value)}
                                            />
                                        ) : (
                                            sv.name
                                        )}
                                    </td>
                                    <td>
                                        {editingServiceId === sv.serviceId ? (
                                            <div> <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={editingServiceStatus}
                                                onChange={(e) => setEditingServiceStatus(e.target.value)} /><select type="text"
                                                    value={editingServiceStatus}
                                                    onChange={e => setEditingServiceStatus(e.target.value)}>

                                                    <option value="Available">Available</option>
                                                    <option value="Deleted">Deleted</option>
                                                </select></div>

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
                                                        startEditingService(sv.serviceId, sv.name, sv.cost, sv.description)
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
                </div>
                <div className="text-right mt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setTypeModalIsOpen(false)}
                    >
                        Close
                    </button>
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
                            {/* DATA TABLE */}
                            <div className="table-responsive  m-b-40" style={{ borderRadius: '15px' }}>
                                <table className="table table-borderless table-data3 shadow-sm">
                                    <thead style={{ textAlign: 'center' }}>
                                        <tr>
                                            <th>Type ID</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Image</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: 'center' }}>
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
            <div />
            <ToastContainer />
        </div>
    );
};

export default Service;