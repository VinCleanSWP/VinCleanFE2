import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Verification() {
    const [newToken, setNewToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = `https://vinclean.azurewebsites.net/api/Account/reset-password`;
        const requestData = {
            token: newToken,
            password: newPassword,
            confirmPassword: verifyPassword
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
                alert('doi mat khau thanh cong')
                navigate('/login');
            })
            .catch((error) => {
                console.error('API error:', error);
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
                                            <input type="password" name="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                            <div className="invalid-feedback">Nhập lại mật khẩu</div>
                                        </div>

                                        <div className="col-12">
                                            <label for="yourPassword" className="form-label">Xác Thực Mật khẩu</label>
                                            <input type="password" name="confirmPassword" className="form-control" id="verifyPassword" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
                                            <div className="invalid-feedback">Nhập lại mật khẩu lần 2</div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                <label className="form-check-label" for="acceptTerms">Tôi đồng ý với <a href="#">những điều khoản và điều kiện</a> sử dụng</label>
                                                <div className="invalid-feedback">Bạn phải đồng ý những điều khoản và điều kiện trên trước khi xác nhận.</div>
                                            </div>
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
