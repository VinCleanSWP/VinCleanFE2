import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: 1,
    status: "Active"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đăng kí lên API sử dụng Axios
    axios
      .post('https://localhost:7013/api/Account', formData) // Thay thế 'API_ENDPOINT' bằng đường dẫn của API đích
      .then((response) => {
        // Xử lý phản hồi từ API (nếu cần)
        console.log(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error(error);
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
                    <h5 className="card-title text-center pb-0 fs-4">Tạo tài khoản</h5>
                    <p className="text-center small">Bạn chỉ mất 30s để đăng ký</p>
                  </div>

                  <form className="row g-3 needs-validation" onSubmit={handleSubmit} novalidate>
                    
                    <div className="col-12">
                      <label for="yourName" className="form-label">Tên của bạn</label>
                      <input type="text" name="name" className="form-control" id="yourName" value={formData.name} onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập tên của bạn</div>
                    </div>

                    <div className="col-12">
                      <label for="yourUsername" className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" name="email" className="form-control" id="yourEmail" value={formData.email} onChange={handleChange} required />
                        <div className="invalid-feedback">Nhập lại email</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="yourPassword" className="form-label">Mật khẩu</label>
                      <input type="password" name="password" className="form-control" id="yourPassword" value={formData.password} onChange={handleChange} required />
                      <div className="invalid-feedback">Nhập lại mật khẩu</div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                        <label className="form-check-label" for="acceptTerms">Tôi đồng ý với <a href="#">những điều khoản và điều kiện</a> sử dụng</label>
                        <div className="invalid-feedback">Bạn phải đồng ý những điều khoản và điều kiện trên trước khi xác nhận.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">Đăng ký</button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Bạn đã có tài khoản rồi? <Link to="/login">Đăng nhập</Link></p>
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

export default Signup;
