import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('https://localhost:7013/api/Account/Login', { email, password })

            .then(response => {
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 1) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    localStorage.setItem('id', response.data.data.accountId);
                    const accountId = localStorage.getItem('id');
                    // navigate('/home')
                    window.location.href = '/';
                }
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 2) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    // navigate('/home')
                    window.location.href = '/';
                }
                if (response.data.success === true && response.data.message === "OK" && response.data.data.roleId === 3) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('role', response.data.data.roleId);
                    // navigate('/home')
                    window.location.href = '/';
                }
                // Proceed with the desired action upon successful login
            }).catch(error => {
                alert("Login Faill!! \nInvalid email or password")
                console.error('Login fail!', error.response.data.errors);
                setError('Invalid email or password');
            })
    };

    return (
        <div class="container">
            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
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
                                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                        <p className="text-center small">Enter your username & password to login</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>

                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">Username</label>
                                            <div class="input-group has-validation">
                                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                                {/* <input type="text" name="username" class="form-control" id="yourUsername" required /> */}
                                                <input type="email" name="username" class="form-control" id="yourUsername" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <div class="invalid-feedback">Please enter your username.</div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Password</label>
                                            {/* <input type="password" name="password" class="form-control" id="yourPassword" required /> */}
                                            <input type="password" name="password" class="form-control" id="yourPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <div class="invalid-feedback">Please enter your password!</div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                <label class="form-check-label" for="rememberMe">Remember me</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">Login</button>
                                        </div>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        <div class="col-12">
                                            <p class="small mb-0">Don't have account?<Link to="/signup">Create an account</Link></p>
                                        </div>
                                        <div class="col-12">
                                            <p class="small mb-0">Forgot your Password?<Link to="/reset"> Click here</Link></p>
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