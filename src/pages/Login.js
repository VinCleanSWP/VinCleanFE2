import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('https://vinclean.azurewebsites.net/api/Account/Login', { email, password })

            .then(response => {
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 1) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    localStorage.setItem('img', response.data.data.img);
                    localStorage.setItem('id', response.data.data.accountId);
                    // localStorage.setItem('cid', response.data.data.customerId);
                    const accountId = localStorage.getItem('id');
                    // navigate('/')
                    window.location.href = '/';
                }
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 2) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    localStorage.setItem('id', response.data.data.accountId);
                    localStorage.setItem('img', response.data.data.img);
                    // navigate('/')
                    window.location.href = '/dashboard';
                }
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 3 ) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    localStorage.setItem('img', response.data.data.img);
                    localStorage.setItem('id', response.data.data.accountId);
                    // navigate('/')
                    window.location.href = '/dashboard';
                }
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 6 ) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    localStorage.setItem('img', response.data.data.img);
                    localStorage.setItem('id', response.data.data.accountId);
                    // navigate('/')
                    window.location.href = '/dashboard';
                }
                // Proceed with the desired action upon successful login
            }).catch(error => {
                alert("Login Faill!! \nInvalid email or password")
                console.error('Login fail!', error.response.data.errors);
                setError('Invalid email or password');
            })
    };

    return (
        <div class="container" >
            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4" >
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div class="d-flex justify-content-center py-4">
                                <a href="index.html" class="logo d-flex align-items-center w-auto">
                                </a>
                            </div>{/* End Logo */}

                            <div className="card mb-3">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Xin chào</h5>
                                        <p className="text-center small">Đăng nhập hoặc Tạo tài khoản</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>

                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">Email</label>
                                            <div class="input-group has-validation">
                                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                                {/* <input type="text" name="username" class="form-control" id="yourUsername" required /> */}
                                                <input type="email" name="username" class="form-control" id="yourUsername" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <div class="invalid-feedback">Hãy nhập lại email</div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Mật khẩu</label>
                                            {/* <input type="password" name="password" class="form-control" id="yourPassword" required /> */}
                                            <input type="password" name="password" class="form-control" id="yourPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <div class="invalid-feedback">Hãy nhập lại mật khẩu</div>
                                        </div>

                                        {/* <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                <label class="form-check-label" for="rememberMe">Nhớ tôi</label>
                                            </div>
                                        </div> */}

                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">Đăng nhập</button>
                                        </div>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        <div class="col-12">
                                            <p class="small mb-0">Bạn mới biết đến Vin Clean? <Link to="/signup">Đăng ký</Link></p>
                                        </div>
                                        <div class="col-12">
                                            <p class="small mb-0">Quên mật khẩu? <Link to="/reset">Bấm vào đây</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}