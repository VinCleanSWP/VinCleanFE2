import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import './profile.css'
import 'firebase/storage';
import './FireBaseConfig';
import { storage } from './FireBaseConfig';
import { ToastContainer, toast } from 'react-toastify';

const gioitinh = [
    {
        id: 1,
        gender: "Nam",
    },
    {
        id: 2,
        gender: "Nữ",
    },
    {
        id: 3,
        gender: "Khác",
    }
]

function Profile() {
    const [accountData, setAccountData] = useState({});
    const [tempImageUrl, setTempImageUrl] = useState('');
    const [currentImg, setCurrentImg] = useState('');
    const [currentGender, setCurrentGender] = useState('');
    const [gender1, setGender] = useState('');
    const id = localStorage.getItem('id');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    // ------------PasswordState----------
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // ------------End PasswordState----------

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const id = localStorage.getItem('id');
                if (id) {
                    const response = await axios.get(`https://vinclean.azurewebsites.net/api/Account/${id}`);
                    setAccountData(response.data.data);
                    setCurrentGender(response.data.data.gender);
                    setCurrentImg(response.data.data.img);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAccountData();
    }, []);

    const handleSubmitInfo = async (e) => {
        e.preventDefault();

        const updatedUser = {
            accountId: id,
            email: accountData.email,
            password: accountData.password,
            name: name || accountData.name,
            roleId: 3,
            status: "string",
            dob: selectedDate || accountData.dob,
            gender: gender1 || currentGender,
            img: tempImageUrl || accountData.img
        };
        console.log(updatedUser)

        try {
            const response = await axios.put('https://vinclean.azurewebsites.net/api/Account', updatedUser);
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
            } else {
                console.log('KO');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }

        axios.get(`https://vinclean.azurewebsites.net/api/Account/${id}`)
            .then(response => {
                setAccountData(response.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`Employee/${file.name}`);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };

    const dob = new Date(accountData && accountData.dob);
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const day = String(dob.getDate()).padStart(2, '0');
    const formattedDOB = `${year}-${month}-${day}`;

    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSelectedDate(value !== selectedDate ? value : accountData.dob);
    };
    const handleGender = (e) => {
        e.preventDefault();
        setGender(e.target.value)
        setCheck(e.target.value)
    };
    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };
    const [check, setCheck] = useState(accountData && accountData.gender)

    // ----------Change Password-----------

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
        if (currentPassword !== accountData.password) {
            setMessage('Incorrect current password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }
        setTimeout(() => {
            accountData.password = newPassword;
            updateUserPassword(newPassword);
            setMessage('Password changed successfully.');
        }, 1000);
    };

    const updateUserPassword = async (newPassword) => {
        try {
            const apiUrl = 'https://vinclean.azurewebsites.net/api/Account';
            // Tạo một đối tượng chứa dữ liệu mới (password mới)
            const updatedUserData = {
                accountId: localStorage.getItem('id'),
                name: name || localStorage.getItem('name'),
                password: newPassword,
                email: localStorage.getItem('email'),
                roleId: localStorage.getItem('role'),
                status: accountData.status,
                img: accountData.img,
                gender: accountData.gender
            };
            // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
            const response = await axios.put(apiUrl, updatedUserData);
            // Kiểm tra trạng thái phản hồi từ API
            if (response.status === 200) {
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
                console.log('Mật khẩu của người dùng đã được cập nhật thành công.');
            } else {
                console.log('Có lỗi xảy ra trong quá trình cập nhật mật khẩu của người dùng.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Account settings
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                                <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <form onSubmit={handleSubmitInfo}>
                                        <div className="card-body media align-items-center">
                                            <img style={{ borderRadius: "100%", objectFit: 'cover', width: '100px', height: "100px" }} src={tempImageUrl || currentImg} alt="" className="" />
                                            <div className="media-body ml-4">
                                                <label className="btn btn-outline-primary"  >
                                                    Upload new photo
                                                    <input type="file" onChange={handleImageUpload} className="account-settings-fileinput" />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                                <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                            </div>
                                        </div>
                                        <hr className="border-light m-0" />
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="form-label">Username</label>
                                                <input type="text" className="form-control mb-1" defaultValue={accountData.name} onChange={handleNameChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Birthday</label>
                                                <TextField
                                                    id="dob"
                                                    name="dob"
                                                    className="form-control"
                                                    type="date"
                                                    pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                                                    title="Invalid data."
                                                    value={selectedDate || formattedDOB}
                                                    onChange={handleDateChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Gender: </label>
                                                {gioitinh.map(sex => (
                                                    <div key={sex.id}>
                                                        <input type='radio'
                                                            name='gender'
                                                            value={sex.gender}
                                                            checked={check === sex.gender || (!check && sex.gender === currentGender)}
                                                            onChange={handleGender} />{sex.gender}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control mb-1" defaultValue={accountData.email} disabled />
                                            </div>
                                            <div className="text-right m-4">
                                                <button type="button" className="btn btn-default mr-3">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>&nbsp;
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="account-change-password">
                                    <div className="card-body pb-2">
                                        <h4 className="fw-bold mb-4">Change password</h4>
                                        <form onSubmit={handleSubmit}>
                                            {message && <p style={{ color: 'red' }}>{message}</p>}
                                            <div className="form-group">
                                                <label className="form-label">Current password</label>
                                                <input type="password" className="form-control" id="currentPassword"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">New password</label>
                                                <input type="password" className="form-control" id="newPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange} />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Confirm password</label>
                                                <input type="password" className="form-control" id="confirmPassword"
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange} />
                                            </div>
                                            <div className="text-left mt-3 mb-3">
                                                <h5>The password must meet the following requirements</h5>
                                                <ol>
                                                    <li>Password must contain at least one lowercase character.</li>
                                                    <li>Password must contain at least one uppercase character.</li>
                                                    <li>Password must contain at least one digit.</li>
                                                    <li>Passwords can only contain alphanumeric characters (lowercase, uppercase).</li>
                                                    <li>Password must be at least 8 characters.</li>
                                                </ol>
                                            </div>
                                            <div className="text-right m-4">
                                                <button type="button" className="btn btn-default mr-3">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>&nbsp;
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Profile;
