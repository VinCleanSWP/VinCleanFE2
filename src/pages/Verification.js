import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Verification() {
    const [newToken, setNewToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('2 mật khẩu không trùng khớp');
            return;
        }
        const apiUrl = `https://vinclean.azurewebsites.net/api/Account/reset-password`;
        const requestData = {
            token: newToken,
            password: newPassword,
            confirmPassword: confirmPassword
        };
        axios
            .post(apiUrl, requestData)
            .then((response) => {
                console.log('API response:', response.data);
                toast.success('Reset Password Successfully!', {
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
                    navigate('/login');
                }, 3000);
            })
            .catch((error) => {
                console.error('API error:', error);
                alert('Sai Token')
            });

    };

    return (
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="d-flex justify-content-center py-4">
                                <a href="index.html" className="logo d-flex align-items-center w-auto">
                                </a>
                            </div>{/* End Logo */}

                            <div className="card mb-3">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Xác thực tài khoản</h5>
                                        {/* <p className="text-center small">Bạn chỉ mất 30s để đăng ký</p> */}
                                    </div>

                                    <form className="row g-3 needs-validation" onSubmit={handleSubmit} novalidate>

                                        <div className="col-12">
                                            <label for="yourName" className="form-label">Token của bạn</label>
                                            <input type="text" name="token" className="form-control" id="yourName" value={newToken} onChange={(e) => setNewToken(e.target.value)} required />
                                            <div className="invalid-feedback">Hãy nhập token của bạn</div>
                                        </div>

                                        <div className="col-12">
                                            <label for="yourPassword" className="form-label">Mật khẩu</label>
                                            <input type="password" name="password" className="form-control" id="newPassword"
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                value={newPassword}
                                                onChange={handleNewPasswordChange} required />
                                            <div className="invalid-feedback">Nhập lại mật khẩu</div>
                                        </div>

                                        <div className="col-12">
                                            <label for="yourPassword" className="form-label">Xác Thực Mật khẩu</label>
                                            <input type="password" name="confirmPassword" className="form-control" id="verifyPassword"
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange} required />
                                            <div className="invalid-feedback">Nhập lại mật khẩu lần 2</div>
                                        </div>

                                        <div className="col-12">
                                            <h5>Mật khẩu phải đáp ứng được những yêu cầu dưới đây</h5>
                                            <ol>
                                                <li>Mật khẩu phải chứa ít nhất một ký tự viết thường.</li>
                                                <li>Mật khẩu phải chứa ít nhất một ký tự viết hoa.</li>
                                                <li>Mật khẩu phải chứa ít nhất một chữ số.</li>
                                                <li>Mật khẩu chỉ được chứa các ký tự chữ và số (viết thường, viết hoa).</li>
                                                <li>Mật khẩu phải có ít nhất 8 ký tự.</li>
                                            </ol>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">Xác nhận</button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <ToastContainer />
        </div>
    )
}
