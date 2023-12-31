import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   // Gửi dữ liệu đăng kí lên API sử dụng Axios
  //   axios
  //     .post('https://vinclean.azurewebsites.net/api/Account', formData) // Thay thế 'API_ENDPOINT' bằng đường dẫn của API đích
  //     .then((response) => {
  //       // Xử lý phản hồi từ API (nếu cần)
  //       console.log(response.data);
  //       navigate('/verifytoken');
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi (nếu có)
  //       console.error(error);
  //     });
  // };

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('2 mật khẩu không trùng khớp');
      return;
    }
    const requestData = {
      email: formData.email,
      // password: formData.password,
      password: newPassword,
      // confirmPassword: formData.confirmPassword,
      confirmPassword: confirmPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      // address: formData.address
      address: 'nothing'
    };
    const emailData = {
      to: formData.email
    }
    axios
      .post('https://vinclean.azurewebsites.net/api/Customer/registration', requestData)
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        axios
          .post('https://vinclean.azurewebsites.net/api/Email/VerifyAccount', emailData)
          .then((response) => {
            console.log(response.data);
            navigate('/verifytoken');
          })
          .catch((error) => {
            console.error(error);
          });
        // navigate('/verifytoken');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Fail, Existed Email !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    // axios
    //   .post('https://vinclean.azurewebsites.net/api/Email/VerifyAccount', emailData)
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate('/verifytoken');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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

                    {/* <div className="col-12">
                      <label for="yourName" className="form-label">Tên của bạn</label>
                      <input type="text" name="name" className="form-control" id="yourName" value={formData.name} onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập tên của bạn</div>
                    </div> */}

                    <div className="col-12">
                      <label for="yourFirstName" className="form-label">Họ</label>
                      <input type="text" name="firstName" className="form-control" id="yourFirstName"
                        pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                        title="Tên không được xuất hiện số và kí tự đặc biệt."
                        value={formData.firstName}
                        onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập họ của bạn</div>
                    </div>

                    <div className="col-12">
                      <label for="yourLastName" className="form-label">Tên</label>
                      <input type="text" name="lastName" className="form-control" id="yourLastName"
                        pattern="^[A-Za-zÀ-ỹà-ỹ ]+$"
                        title="Tên không được xuất hiện số và kí tự đặc biệt."
                        value={formData.lastName}
                        onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập tên của bạn</div>
                    </div>

                    <div className="col-12">
                      <label for="yourEmail" className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" name="email" className="form-control" id="yourEmail" value={formData.email} onChange={handleChange} required />
                        <div className="invalid-feedback">Nhập lại email</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label for="yourPassword" className="form-label">Mật khẩu</label>
                      <input type="password" name="password" className="form-control" id="yourPassword"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        value={newPassword}
                        onChange={handleNewPasswordChange} required />
                      <div className="invalid-feedback">Nhập lại mật khẩu</div>
                    </div>

                    <div className="col-12">
                      <label for="yourConfirmPassword" className="form-label">Xác nhận mật khẩu</label>
                      <input type="password" name="confirmPassword" className="form-control" id="yourConfirmPassword"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange} required />
                      <div className="invalid-feedback">Nhập lại mật khẩu</div>
                    </div>

                    <div className="col-12">
                      <label for="yourPhone" className="form-label">Điện thoại</label>
                      <input type="text" name="phone" className="form-control" id="yourPhone"
                        maxLength="10"
                        pattern="^0\d{9}$"
                        title="Số điện thoại phải bắt đầu bằng số 0 và bao gồm 10 chữ số."
                        value={formData.phone}
                        onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập số điện thoại của bạn</div>
                    </div>

                    {/* <div className="col-12">
                      <label for="yourAddress" className="form-label">Địa chỉ</label>
                      <input type="text" name="address" className="form-control" id="yourAddress" value={formData.address} onChange={handleChange} required />
                      <div className="invalid-feedback">Hãy nhập địa chỉ của bạn</div>
                    </div> */}

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
        <ToastContainer />

      </section>

    </div>
  );
}

export default Signup;
