import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function VerifyToken() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = `https://vinclean.azurewebsites.net/api/Account/Verify?token=${token}`;
        axios
            .post(apiUrl)
            .then((response) => {
                console.log('API response:', response.data);
                toast.success('Xác Thực Mã Token Thành Công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
                                <a href="index.html" className="logo d-flex align-items-center w-auto"></a>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Xác thực tài khoản</h5>
                                        {/* <p className="text-center small">Enter your email to reset password</p> */}
                                    </div>

                                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="yourUsername" className="form-label">Token</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                <input
                                                    type="text"
                                                    name="token"
                                                    id="token"
                                                    className="form-control"
                                                    value={token}
                                                    onChange={(e) => setToken(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Làm ơn nhập token.</div>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-3">
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
