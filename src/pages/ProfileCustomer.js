import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal1 from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Pagination from '@mui/material/Pagination';
import { async } from 'q';
import '../styles/profile-customer.css'
import { storage } from '../firebase/index';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineLock } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Input, Modal, Space, Table, Upload } from 'antd';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const gioitinh = [
    {
        id: 1,
        gender: "Nam",
        sex: "Male"
    },
    {
        id: 2,
        gender: "Nữ",
        sex: "Female"
    },
    {
        id: 3,
        gender: "Khác",
        sex: "Other"
    }
]

const itemsPerPage = 10;


export default function ProfileCustomer() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [customer, setCustomer] = useState([]);
    const [gender1, setGender] = useState('');
    const id = localStorage.getItem('id');
    const [errorMessage, setErrorMessage] = useState('')
    const [tempImageUrl, setTempImageUrl] = useState('');
    const [currentImg, setCurrentImg] = useState('');
    const [currentGender, setCurrentGender] = useState('');

    // ------------PasswordState----------
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // ------------End PasswordState----------

    // --- Start Booking Session ---
    const [booking, setBooking] = useState([])
    const [orders, setOrder] = useState([])

    useEffect(() => {
        axios.get(`https://vinclean.azurewebsites.net/api/Order`)
            // axios.get(`https://vinclean.azurewebsites.net/api/Order`)
            .then(response => {
                const data = response.data.data
                const mail = localStorage.getItem('email');
                const foundItem = data.filter(item => item.email == mail && item.status == 'Completed' || item.status == 'Cancel');
                setOrder(foundItem);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    console.log(orders);

    const handleRowClick = (order) => {
        setOpen(true);
        setBooking(order);
        setSelectedEvent(order)
    };

    // DateDetails
    const dateDetails = booking.dateWork;
    const date = new Date(dateDetails);
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    // DateList
    const dateList = orders.dateWork;
    const date1 = new Date(dateList);
    const options1 = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    // --- End Booking Session ---

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get(`https://vinclean.azurewebsites.net/api/Customer/Account/${id}`)
            // axios.get(`https://vinclean.azurewebsites.net/api/Customer/Account/${id}`)
            .then(response => {
                setCustomer(response.data.data);
                console.log(response.data.data);
                setCurrentGender(response.data.data.account.gender);
                setCurrentImg(response.data.data.account.img);
                setAddress(response.data.data.address)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentPassword !== customer.account.password) {
            setMessage('Incorrect current password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }
        setTimeout(() => {
            customer.account.password = newPassword;
            updateUserPassword(newPassword);
            setMessage('Password changed successfully.');
        }, 1000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleGender = (e) => {
        e.preventDefault();
        setGender(e.target.value)
        setCheck(e.target.value)
    };

    const [check, setCheck] = useState(customer.account && customer.account.gender)

    console.log(customer.address);

    const handleSubmitInfo = async (e) => {
        e.preventDefault();
        const updatedUser = {
            customerId: customer.customerId,
            email: customer.account.email,
            password: customer.account.password,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            // address: customer.address,
            address: diachi3 || customer.address,
            dob: selectedDate || customer.account.dob,
            gender: gender1 || currentGender,
            // gender: customer.account.gender,
            img: tempImageUrl || customer.account.img
        };
        console.log(updatedUser)

        try {
            const response = await axios.put('https://vinclean.azurewebsites.net/api/Customer', updatedUser);
            // const response = await axios.put('https://vinclean.azurewebsites.net/api/Customer', updatedUser);
            if (response.status === 200) {
                console.log('OK');
                setErrorMessage('Update Successfully');
                toast.success('Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            } else {
                console.log('KO');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }

        axios.get(`https://vinclean.azurewebsites.net/api/Customer/Account/${id}`)
            // axios.get(`https://vinclean.azurewebsites.net/api/Customer/Account/${id}`)
            .then(response => {
                setCustomer(response.data.data);
                console.log('thanh cong');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const navigate = useNavigate()

    const updateUserPassword = async (newPassword) => {
        try {
            const apiUrl = 'https://vinclean.azurewebsites.net/api/Account';
            // const apiUrl = 'https://vinclean.azurewebsites.net/api/Account';
            const updatedUserData = {
                accountId: localStorage.getItem('id'),
                name: localStorage.getItem('name'),
                password: newPassword,
                email: localStorage.getItem('email'),
                roleId: localStorage.getItem('role'),
                status: customer.account.status,
                img: customer.account.img,
                gender: customer.account.gender
            };
            // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
            const response = await axios.put(apiUrl, updatedUserData);
            // Kiểm tra trạng thái phản hồi từ API
            if (response.status === 200) {
                console.log('Mật khẩu của người dùng đã được cập nhật thành công.');
                toast.success('Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            } else {
                console.log('Có lỗi xảy ra trong quá trình cập nhật mật khẩu của người dùng.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/')
    };

    const dob = new Date(customer.account && customer.account.dob);
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const day = String(dob.getDate()).padStart(2, '0');
    const formattedDOB = `${year}-${month}-${day}`;

    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        // setSelectedDate(value !== selectedDate ? value : customer.account.dob);
        if (value <= tomorrowString) {
            setSelectedDate(value !== selectedDate ? value : customer.account.dob);
        } else {
            alert("Ngày sinh không hợp lệ");
        }
    };

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`Customer/${file.name}`);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };

    // ĐỊA CHỈ

    const [buildingTypes, setBuildingTypes] = useState([]);
    const [building, setBuilding] = useState([]);
    const [building1, setBuilding1] = useState([]);
    const [phankhu, setPhankhu] = useState();
    const [toa, setToa] = useState();
    const [tang, setTang] = useState();
    const [phong, setPhong] = useState();

    const [address, setAddress] = useState('');
    const [diachi, setDiachi] = useState('');
    const inputString = address;
    const [soKhu, soToa, soTang, soPhong] = inputString.split(' ');

    // const diachi3 = tang ? (phankhu.type + " " + toa + " " + tang + " " + phong) : (phankhu && phankhu.type + " " + diachi)
    const diachi3 = tang ? (phankhu.type + " " + toa + " " + tang + " " + phong) : diachi ? ((phankhu && phankhu.type + " " + diachi)) : (customer.address)

    useEffect(() => {
        getBuildingTypes();
        getBuilding();
    }, []);

    const getBuildingTypes = () => {
        axios.get('https://vinclean.azurewebsites.net/api/BuildingType')
            // axios.get('https://localhost:7013/api/BuildingType')
            .then(response => {
                setBuildingTypes(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching building types:', error);
            });
    };

    const getBuilding = () => {
        axios.get('https://vinclean.azurewebsites.net/api/Building')
            // axios.get('https://localhost:7013/api/Building')
            .then(response => {
                setBuilding(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching building types:', error);
            });
    };

    const handleType = (event) => {
        setPhankhu(event.target.value);
        axios.get(`https://vinclean.azurewebsites.net/api/Building/Type/${event.target.value.id}`)
            // axios.get(`https://localhost:7013/api/Building/Type/${event.target.value.id}`)
            .then(response => {
                setBuilding1(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching building types:', error);
            });
        setTang();
    };

    const handleBuilding = (event) => {
        setToa(event.target.value);
    };

    const handleFloor = (event) => {
        setTang(event.target.value);
    };

    const handleRoom = (event) => {
        setPhong(event.target.value);
    };

    const handleDiaChi = (event) => {
        setTang();
        setDiachi(event.target.value);
    };

    const matchedBuilding = building1 && building1.find(buildingItem => buildingItem.name === toa);
    const floorValue = matchedBuilding ? matchedBuilding.floor : '';

    const matchedFloor = building1 && building1.find(buildingItem => buildingItem.name === toa);
    const roomValue = matchedFloor ? matchedFloor.room : '';


    // ---------------MODAL-------------------

    const [selectedEvent, setSelectedEvent] = useState(null);

    const dateW = new Date(booking.date);
    const cDate = new Date(booking.createdDate);
    const dateWork = dateW.toLocaleDateString(undefined, options);
    const createDate = cDate.toLocaleDateString(undefined, options);

    // ------------------TIEN-------------------

    function formatCurrency(amount) {
        return amount ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    const tomorrowString = tomorrow.toISOString().slice(0, 10);

    // -------------------PAGING---------------------

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentData = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div className='container'>
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Cài đặt tài khoản
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <div class="Account__StyledAvatar-sc-1d5h8iz-3 profile-left">
                                    <img style={{ width: "100px", height: "100px" }} src={tempImageUrl || currentImg} alt="avatar" />
                                    <div class="info">
                                        Tài khoản của
                                        <strong>{customer.lastName} {customer.firstName}</strong>
                                    </div>
                                </div>
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general"><BiSolidUser /> Thông tin chung</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password"><AiOutlineLock /> Bảo mật</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info"><AiOutlineHistory /> Lịch sử đặt</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                {/* Edit Profile */}
                                <div className="tab-pane fade active show" id="account-general">
                                    <form onSubmit={handleSubmitInfo}>
                                        <h4 className="card-body fw-bold">Thông tin cá nhân</h4>
                                        <div className="card-body media align-items-center">
                                            <img style={{ width: "100px", height: "100px", borderRadius: '100%' }} src={tempImageUrl || currentImg} alt className=" " />
                                            <div className="media-body ml-4">
                                                <label className="btn btn-outline-primary">
                                                    Chọn ảnh
                                                    <input type="file" className="account-settings-fileinput" onChange={handleImageUpload} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-default md-btn-flat">Đặt lại</button>
                                                <div className="text small mt-1">Cho phép JPG, GIF or PNG.</div>
                                            </div>
                                        </div>
                                        <hr className="border-light m-0" />
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">Tên</label>
                                                <input type="text" className="form-control" maxLength="30" id="firstName" pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                                                    name="firstName" defaultValue={customer.firstName} onChange={handleInputChange}
                                                    title="Tên không được xuất hiện số và kí tự đặc biệt." required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Họ</label>
                                                <input type="text" className="form-control" maxLength="30" id="lastName" pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                                                    name="lastName" defaultValue={customer.lastName} onChange={handleInputChange}
                                                    title="Tên không được xuất hiện số và kí tự đặc biệt." required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Ngày sinh</label>
                                                <TextField
                                                    id="dob"
                                                    name="dob"
                                                    className="form-control"
                                                    type="date"
                                                    max={tomorrowString}
                                                    value={selectedDate || formattedDOB}
                                                    onChange={handleDateChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Giới tính: </label>
                                                {gioitinh.map(sex => (
                                                    <div key={sex.id}>
                                                        <input type='radio'
                                                            name='gender'
                                                            value={sex.sex}
                                                            checked={check === sex.sex || (!check && sex.sex === currentGender)}
                                                            onChange={handleGender} />{sex.gender}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Số điện thoại</label>
                                                <input type="text" className="form-control" id="phone" maxLength="10" title="Số điện thoại phải bắt đầu bằng số 0 và bao gồm 10 chữ số."
                                                    name="phone" defaultValue={customer.phone} onChange={handleInputChange} pattern="^0\d{9}$" required />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Địa chỉ hiện tại</label>
                                                <input type="text" className="form-control" id="address"
                                                    name="address" defaultValue={customer.address} /* onChange={handleInputChange} */ disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Thay đổi dịa chỉ (Nếu cần)</label>
                                                <div className='row'>
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                <InputLabel id="demo-simple-select-standard-label">Phân khu</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    label="Age"
                                                                    value={phankhu}
                                                                    // value={phankhu || soKhu}
                                                                    onChange={handleType}
                                                                // required
                                                                >
                                                                    {buildingTypes && buildingTypes.map((phankhu) => (
                                                                        <MenuItem value={phankhu}>{phankhu.type}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </div>

                                                    {phankhu && phankhu.type == 'Manhattan' ? (
                                                        <div className="col-md-9">
                                                            <div className="form-group">
                                                                <label className="form-label">Địa chỉ</label>
                                                                <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ của bạn..."
                                                                    name="address" defaultValue={diachi} onChange={handleDiaChi} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="col-md-9">
                                                            {(phankhu && phankhu.type == 'Rainbow') || (phankhu && phankhu.type == 'Origami') ? (
                                                                <div className='row'>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Tòa</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    // value={toa}
                                                                                    // defaultValue={toa || soToa}
                                                                                    onChange={handleBuilding}
                                                                                    required
                                                                                >
                                                                                    {building1 && building1.map((toa) => (
                                                                                        <MenuItem value={toa.name}>{toa.name}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Tầng</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    // value={tang}
                                                                                    // defaultValue={tang || soTang}
                                                                                    onChange={handleFloor}
                                                                                    required
                                                                                >
                                                                                    {Array.from({ length: floorValue }, (_, index) => (
                                                                                        <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Phòng</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    // value={phong}
                                                                                    // defaultValue={phong || soPhong}
                                                                                    onChange={handleRoom}
                                                                                    required
                                                                                >
                                                                                    {Array.from({ length: tang && roomValue }, (_, index) => (
                                                                                        <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className='row'>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Tòa</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    value={toa}
                                                                                    // defaultValue={toa || soToa}
                                                                                    onChange={handleBuilding}
                                                                                // required
                                                                                >
                                                                                    {building1 && building1.map((toa) => (
                                                                                        <MenuItem value={toa.name}>{toa.name}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Tầng</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    // value={tang || soTang}
                                                                                    // defaultValue={tang || soTang}
                                                                                    onChange={handleFloor}
                                                                                // required
                                                                                >
                                                                                    {Array.from({ length: floorValue }, (_, index) => (
                                                                                        <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3 mr-4">
                                                                        <div className="form-group">
                                                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                                                                                <InputLabel id="demo-simple-select-standard-label">Phòng</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="demo-simple-select-standard"
                                                                                    label="Age"
                                                                                    // defaultValue={phong || soPhong}
                                                                                    onChange={handleRoom}
                                                                                // required
                                                                                >
                                                                                    {Array.from({ length: tang && roomValue }, (_, index) => (
                                                                                        <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control mb-1" defaultValue={customer.account && customer.account.email} disabled />

                                            </div>
                                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                            <div className="text-right mt-3 mb-3">
                                                <button type="button" className="btn btn-default" onClick={handleCancel}>Hủy</button>
                                                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>&nbsp;
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* Change password */}
                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <h4 className="fw-bold mb-4">Đổi mật khẩu</h4>
                                        <form onSubmit={handleSubmit}>
                                            {message && <p style={{ color: 'red' }}>{message}</p>}
                                            <div className="form-group">
                                                <label className="form-label">Mật khẩu hiện tại</label>
                                                <input type="password" className="form-control" id="currentPassword"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Mật khẩu mới</label>
                                                <input type="password" className="form-control" id="newPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Nhập lại mật khẩu mới</label>
                                                <input type="password" className="form-control" id="confirmPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange} />
                                            </div>
                                            <div className="text-left mt-3 mb-3">
                                                <h5>Mật khẩu phải đáp ứng được những yêu cầu dưới đây</h5>
                                                <ol>
                                                    <li>Mật khẩu phải chứa ít nhất một ký tự viết thường.</li>
                                                    <li>Mật khẩu phải chứa ít nhất một ký tự viết hoa.</li>
                                                    <li>Mật khẩu phải chứa ít nhất một chữ số.</li>
                                                    <li>Mật khẩu chỉ được chứa các ký tự chữ và số (viết thường, viết hoa).</li>
                                                    <li>Mật khẩu phải có ít nhất 8 ký tự.</li>
                                                </ol>
                                            </div>
                                            <div className="text-right mt-3 mb-3">
                                                <button type="button" className="btn btn-default">Hủy</button>
                                                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>&nbsp;
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Order History */}
                                <div className="tab-pane fade" id="account-info">
                                    <Container>
                                        <Row>
                                            <Col lg="12" md="12">
                                                <h4 className="fw-bold mt-4 mb-4">Lịch sử đặt</h4>
                                                <div className="table-responsive m-b-40">
                                                    <table className="table table-borderless table-hover table-data3">
                                                        <thead>
                                                            <tr>
                                                                <th>Dịch vụ</th>
                                                                <th>Hạng mục</th>
                                                                <th>Nhân viên</th>
                                                                <th>Trạng thái</th>
                                                                <th>Ngày đặt</th>
                                                                <th className='left'>Tổng tiền</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {currentData.map((order) => (
                                                                <tr className="pointer pointertext" key={order.orderId} onClick={() => handleRowClick(order)}>
                                                                    <td>{order.typeName}</td>
                                                                    <td>{order.serviceName}</td>
                                                                    <td>{order.employeeName}</td>
                                                                    {/* <td>{order.dateWork}</td> */}
                                                                    {order.status == 'Completed' ? (
                                                                        <td className="listorder complete" style={{ color: '#28a745' }}>{order.status}</td>
                                                                    ) : (
                                                                        <td className="listorder complete" style={{ color: '#e20303' }}>{order.status}</td>
                                                                    )}
                                                                    <td>{new Date(order.date).toLocaleDateString(undefined, options1)}</td>
                                                                    <td className="process" style={{ color: '#35cb28' }}>{formatCurrency(order.price)}</td>
                                                                </tr>
                                                            ))}
                                                            {/* <Modal1
                                                                open={open}
                                                                onClose={handleClose}
                                                                aria-labelledby="modal-modal-title"
                                                                aria-describedby="modal-modal-description"
                                                            >
                                                                <Box sx={style}>
                                                                    <Row>
                                                                        <Col lg="12" md="12">
                                                                            <div className="contact__info">
                                                                                <h4 className="fw-bold mb-3">Thông tin đặt</h4>
                                                                                <br></br>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0"><strong>Mã dịch vụ:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.orderId}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0"><strong>Dịch vụ:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.typeName}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0"><strong>Hạng mục:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.serviceName}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0"><strong>Ngày tạo đơn:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.createdDate}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="fs-6 mb-0"><strong>Trạng thái:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.status}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Địa chỉ:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.address}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Ngày đặt:</strong></h6>
                                                                                    <p className="section__description mb-0">{formattedDate}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Thời gian đặt:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.startTime}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Thời gian kết thúc:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.endTime}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Nhân viên:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.employeeName}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Số điện thoại nhân viên:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.employeePhone}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Email nhân viên:</strong></h6>
                                                                                    <p className="section__description mb-0">{booking.employeeEmail}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <h6 className="mb-0 fs-6"><strong>Ghi chú:</strong></h6>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2">
                                                                                    <p className="section__description mb-0 mt-2 note-container">{booking.note}</p>
                                                                                </div>

                                                                                <div className=" d-flex align-items-center gap-2 ">
                                                                                    <h6 className="mb-0 h3 mt-3"><strong>Tổng tiền:</strong></h6>
                                                                                    <p className="section__description mb-0 h3 mt-3 text-success"><strong>{booking.price}.000 VND</strong></p>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Box>
                                                            </Modal1> */}


                                                            <Modal
                                                                visible={!!selectedEvent}
                                                                onCancel={() => setSelectedEvent(null)}
                                                                width={850}
                                                                footer={[
                                                                    // <Button key="cancel" onClick={() => setSelectedEvent(null)}>
                                                                    //   Đóng
                                                                    // </Button>,
                                                                ]}
                                                            >

                                                                {selectedEvent && (
                                                                    <div>
                                                                        <h2 style={{ textAlign: "center" }}>Thông tin dịch vụ</h2>
                                                                        <div class="process" style={{ marginTop: "30px" }}>
                                                                            <div class="process-info">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}>Thông tin khách hàng</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    <p><strong>Mã khách hàng: </strong> {booking.customerId} </p>
                                                                                    <p><strong>Tên khách hàng: </strong> {booking.name} </p>
                                                                                    <p><strong>SĐT khách hàng: </strong> {booking.phone}</p>
                                                                                    <p><strong>Email khách hàng: </strong> {booking.email}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="process-info1">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}> Thông tin nhân viên</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    {booking.employeeId == null ? (
                                                                                        <div>
                                                                                            <p><strong>Mã nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>Tên nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>SĐT nhân viên: </strong> Incoming</p>
                                                                                            <p><strong>Email nhân viên: </strong> Incoming</p>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div>
                                                                                            <p><strong>Mã nhân viên: </strong> {booking.employeeId} </p>
                                                                                            <p><strong>Tên nhân viên: </strong> {booking.employeeName} </p>
                                                                                            <p><strong>SĐT nhân viên: </strong> {booking.employeePhone}</p>
                                                                                            <p><strong>Email nhân viên: </strong> {booking.employeeEmail}</p>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="process" style={{ marginTop: "30px" }}>
                                                                            <div class="process-info1">
                                                                                <h4 style={{ textAlign: "center", margin: "10px" }}>Chi tiết dịch vụ</h4>
                                                                                <div class="info-content" style={{ padding: "8px" }}>
                                                                                    <p><strong>Mã đơn hàng: </strong> {booking.orderId}</p>
                                                                                    <p><strong>Tên dịch vụ: </strong> {booking.typeName} - {booking.serviceName}</p>
                                                                                    {booking.status == 'Cancel' ? (
                                                                                        <div style={{ flex: '1' }}>
                                                                                            <p>
                                                                                                <strong>Trạng Thái hiện tại: </strong> <label className='status cancelled' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                                                                            </p>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div style={{ flex: '1' }}>
                                                                                            <p>
                                                                                                <strong>Trạng Thái hiện tại: </strong> <label className='status Completed' style={{ padding: "0px 10px" }}>{booking.status}</label>
                                                                                            </p>
                                                                                        </div>
                                                                                    )}
                                                                                    <p><strong>Ngày đặt: </strong> {createDate}</p>
                                                                                    <p><strong>Địa chỉ: </strong> {booking.address}</p>
                                                                                    <p><strong>Ngày thực hiện: </strong> {dateWork}</p>
                                                                                    <p><strong>Giờ bắt đầu: </strong> {booking.startTime}</p>
                                                                                    <p><strong>Giờ kết thúc: </strong> {booking.endTime}</p>
                                                                                    <p><strong>Điểm sử dụng: </strong> {booking.pointUsed ? booking.pointUsed : 0}</p>
                                                                                    <p><strong>Phụ Thu: </strong> {booking.subPrice ? formatCurrency(booking.subPrice) : 0}</p>
                                                                                    <div className=" d-flex align-items-center gap-2 ">
                                                                                        <h6 className="mb-0 h3 mt-3"><strong>Tổng tiền:</strong></h6>
                                                                                        <p className="section__description mb-0 h3 mt-3 text-success"><strong>{formatCurrency(booking.price)}</strong></p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div class="process" style={{ marginTop: "30px" }}> */}
                                                                        {booking.status == "Cancel" ? (
                                                                            <div class="process" style={{ marginTop: "30px" }}>
                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Ghi chú</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Lý do hủy</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.reasonCancel ? booking.reasonCancel : "<Nothing>"}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div class="process" style={{ marginTop: "30px" }}>
                                                                                <div class="process-info1">
                                                                                    <h4 style={{ textAlign: "center", margin: "10px" }}>Ghi chú</h4>
                                                                                    <div class="info-content" style={{ padding: "8px" }}>
                                                                                        {/* <p><strong>Ghi chú: </strong> {modal.note ? modal.note : "<Nothing>"}</p> */}
                                                                                        <div className=" d-flex align-items-center gap-2">
                                                                                            <p className="section__description mb-0 mt-2 note-container">{booking.note ? booking.note : "<Nothing>"}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Modal>
                                                        </tbody>
                                                    </table>

                                                    <div style={{ float: 'right' }}>
                                                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                                                    </div>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </div >
    )
}
