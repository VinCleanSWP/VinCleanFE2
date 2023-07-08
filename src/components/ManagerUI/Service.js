import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from "reactstrap";
const Service = () => {
    const [servicetype, setType] = useState([]);
    const [servicelist, setServiceList] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const accountId = localStorage.getItem('id');
    const [servicetypeid, setServiceTypeId] = useState('');
    const [ServiceId, setServiceId] = useState('');
    const [Name, setName] = useState('');
    const [Cost, setCost] = useState('');
    const [MinimalSlot, setMinimalSlot] = useState('');
    const [Description, setDescription] = useState('');
    const [Status, setStatus] = useState('');
    const [TypeName, setTypeName] = useState('');
    const [TypeImage, setTypeImage] = useState('');


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
                setStatus(data.status)
                console.log(data.name)
            })

            .catch(error => {
                console.error('Error fetching  list:', error);
            });
    }, []);

    return (


        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Employee"

                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    },
                    content: {
                        width: '800px',
                        height: '800px',
                        margin: 'auto'
                    }
                }}

            >
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label"><strong>Type Id</strong></label>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={servicetypeid}
                                                onChange={(e) => ServiceId(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label"><strong>Image</strong></label>
                                            <br></br>
                                            <img src={TypeImage || "http://via.placeholder.com/300"} alt="Type" style={{ width: '100px', height: '100px' }} />

                                            {/* <input type="file" onChange={handleImageUpload} /> */}


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
                                        <div className="table-responsive table-responsive-data2">
                                            <table className="table table-data2">
                                                <thead>
                                                    <tr>
                                                        <th>Type ID</th>
                                                        <th>Name</th>

                                                        <th>Status</th>
                                                        <th>Image</th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>v
                                                    {servicelist.map(sv => (
                                                        <tr key={sv.serviceId}>

                                                            <td>{sv.serviceId}</td>
                                                            <td>{sv.name}</td>
                                                            <td>{sv.cost}</td>



                                                            <td>
                                                                <div className="table-data-feature">


                                                                    {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                    <i className="zmdi zmdi-edit" />
                                                                </button> */}
                                                                    {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => setModalIsOpen(true)}>
                                                                <i className="zmdi zmdi-edit" />

                                                                </button> */}
                                                                    <button
                                                                        className="item"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title="Edit"
                                                                        onClick={() => {
                                                                            setModalIsOpen(true);
                                                                            setServiceTypeId(Service.typeId);
                                                                        }}
                                                                    >
                                                                        <i class="zmdi zmdi-edit" />
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
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">
                    {/* <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button> */}
                    <button type="button" className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>



            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* HEADER DESKTOP*/}
                <header className="header-desktop">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="header-wrap">
                                <form className="form-header" action method="POST">
                                    <input className="au-input au-input--xl" type="text" name="search" placeholder="Search for datas & reports..." />
                                    <button className="au-btn--submit" type="submit">
                                        <i className="zmdi zmdi-search" />
                                    </button>
                                </form>
                                <div className="header-button">
                                    <div className="noti-wrap">
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-comment-more" />
                                            <span className="quantity">1</span>
                                            <div className="mess-dropdown js-dropdown">
                                                <div className="mess__title">
                                                    <p>You have 2 news message</p>
                                                </div>
                                                <div className="mess__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-06.jpg" alt="Michelle Moreno" />
                                                    </div>
                                                    <div className="content">
                                                        <h6>Michelle Moreno</h6>
                                                        <p>Have sent a photo</p>
                                                        <span className="time">3 min ago</span>
                                                    </div>
                                                </div>
                                                <div className="mess__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-04.jpg" alt="Diane Myers" />
                                                    </div>
                                                    <div className="content">
                                                        <h6>Diane Myers</h6>
                                                        <p>You are now connected on message</p>
                                                        <span className="time">Yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="mess__footer">
                                                    <a href="#">View all messages</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-email" />
                                            <span className="quantity">1</span>
                                            <div className="email-dropdown js-dropdown">
                                                <div className="email__title">
                                                    <p>You have 3 New Emails</p>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-06.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, 3 min ago</span>
                                                    </div>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-05.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, Yesterday</span>
                                                    </div>
                                                </div>
                                                <div className="email__item">
                                                    <div className="image img-cir img-40">
                                                        <img src="images/icon/avatar-04.jpg" alt="Cynthia Harvey" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Meeting about new dashboard...</p>
                                                        <span>Cynthia Harvey, April 12,,2018</span>
                                                    </div>
                                                </div>
                                                <div className="email__footer">
                                                    <a href="#">See all emails</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-notifications" />
                                            <span className="quantity">3</span>
                                            <div className="notifi-dropdown js-dropdown">
                                                <div className="notifi__title">
                                                    <p>You have 3 Notifications</p>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c1 img-cir img-40">
                                                        <i className="zmdi zmdi-email-open" />
                                                    </div>
                                                    <div className="content">
                                                        <p>You got a email notification</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c2 img-cir img-40">
                                                        <i className="zmdi zmdi-account-box" />
                                                    </div>
                                                    <div className="content">
                                                        <p>Your account has been blocked</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__item">
                                                    <div className="bg-c3 img-cir img-40">
                                                        <i className="zmdi zmdi-file-text" />
                                                    </div>
                                                    <div className="content">
                                                        <p>You got a new file</p>
                                                        <span className="date">April 12, 2018 06:50</span>
                                                    </div>
                                                </div>
                                                <div className="notifi__footer">
                                                    <a href="#">All notifications</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="account-wrap">
                                        <div className="account-item clearfix js-item-menu">
                                            <div className="image">
                                                <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                            </div>
                                            <div className="content">
                                                <a className="js-acc-btn" href="#">john doe</a>
                                            </div>
                                            <div className="account-dropdown js-dropdown">
                                                <div className="info clearfix">
                                                    <div className="image">
                                                        <a href="#">
                                                            <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <h5 className="name">
                                                            <a href="#">john doe</a>
                                                        </h5>
                                                        <span className="email">johndoe@example.com</span>
                                                    </div>
                                                </div>
                                                <div className="account-dropdown__body">
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-account" />Account</a>
                                                    </div>
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-settings" />Setting</a>
                                                    </div>
                                                    <div className="account-dropdown__item">
                                                        <a href="#">
                                                            <i className="zmdi zmdi-money-box" />Billing</a>
                                                    </div>
                                                </div>
                                                <div className="account-dropdown__footer">
                                                    <a href="#">
                                                        <i className="zmdi zmdi-power" />Logout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <div className="col-lg-6">
                                    {/* USER DATA*/}

                                    {/* END USER DATA*/}
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-12">
                                    {/* DATA TABLE */}


                                    <div className="table-responsive table-responsive-data2">
                                        <table className="table table-data2">
                                            <thead>
                                                <tr>
                                                    <th>Type ID</th>
                                                    <th>Name</th>

                                                    <th>Status</th>
                                                    <th>Image</th>
                                                    <th />
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


                                                                {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                    <i className="zmdi zmdi-edit" />
                                                                </button> */}
                                                                {/* <button className="item" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => setModalIsOpen(true)}>
                                                                <i className="zmdi zmdi-edit" />

                                                                </button> */}
                                                                <button
                                                                    className="item"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title="Edit"
                                                                    onClick={() => {
                                                                        setModalIsOpen(true);
                                                                        setServiceTypeId(Service.typeId);
                                                                    }}
                                                                >
                                                                    <i class="zmdi zmdi-edit" />
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
        </div>
    );
}

export default Service;

