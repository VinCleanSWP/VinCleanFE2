import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const [emailReset, setEmailReset] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = `https://vinclean.azurewebsites.net/api/Account/forgot-password?email=${emailReset}`;
        const requestData = {
            email: emailReset,
        };
        const reset = {
            to: emailReset,
        };
        axios
                .post("https://vinclean.azurewebsites.net/api/Email/ResetPassword", reset)
                .then((response) => {
                    console.log('API response:', response.data);
                    navigate('/verification');
                    axios
            .post(apiUrl, requestData)
            .then((response) => {
                console.log('API response:', response.data);
                navigate('/verification');
            })
            .catch((error) => {
                console.error('API error:', error);
            });
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
                                        <h5 className="card-title text-center pb-0 fs-4">Reset your password</h5>
                                        <p className="text-center small">Enter your email to reset password</p>
                                    </div>

                                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="yourUsername" className="form-label">Email</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="form-control"
                                                    value={emailReset}
                                                    onChange={(e) => setEmailReset(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your email.</div>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <button className="btn btn-primary w-100" type="submit">Login</button>
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
