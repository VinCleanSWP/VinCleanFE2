import React, { useState } from 'react';

export default function ResetPassword() {
    const [email, setEmail] = useState('');

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
                                        <h5 className="card-title text-center pb-0 fs-4">Reset your password</h5>
                                        <p className="text-center small">Enter your email to reset password</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate /*onSubmit={handleSubmit}*/>
                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">Email</label>
                                            <div class="input-group has-validation">
                                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                                {/* <input type="text" name="username" class="form-control" id="yourUsername" required /> */}
                                                <input type="email" name="username" class="form-control" id="yourUsername" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <div class="invalid-feedback">Please enter your email.</div>
                                            </div>
                                        </div>
                                        <div class="col-12 mt-3">
                                            <button class="btn btn-primary w-100" type="submit">Login</button>
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
