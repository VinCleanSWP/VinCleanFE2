import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardAdmin() {
    const [income, setIncome] = useState();
    const [customer, setCustomer] = useState();
    const [employee, setEmployee] = useState();
    const [booking, setBooking] = useState();
    const [blog, setBlog] = useState();
    const [service, setService] = useState();
    const [rating, setRating] = useState();
    const [total1, setTotal1] = useState(0);
    const [total2, setTotal2] = useState(0);
    const [total3, setTotal3] = useState(0);
    const [total4, setTotal4] = useState(0);
    const [total5, setTotal5] = useState(0);
    const [total6, setTotal6] = useState(0);
    const [type1, setType1] = useState();
    const [type2, setType2] = useState();
    const [type3, setType3] = useState();
    const [type4, setType4] = useState();
    const [type5, setType5] = useState();
    const [type6, setType6] = useState();

    const numberOfCustomer = customer ? customer.length : 0;
    const numberOfEmployee = employee ? employee.length : 0;
    const numberOfBooking = booking ? booking.length : 0;
    const numberOfBlogs = blog ? blog.length : 0;
    const numberOfType1 = type1 ? type1.length : 0;
    const numberOfType2 = type2 ? type2.length : 0;
    const numberOfType3 = type3 ? type3.length : 0;
    const numberOfType4 = type4 ? type4.length : 0;
    const numberOfType5 = type5 ? type5.length : 0;
    const numberOfType6 = type6 ? type6.length : 0;


    // Tổng income
    const totalIncome = () => {
        let sum = 0;
        booking && booking.forEach(order => {
            sum += order.total;
        });
        setIncome(sum);
    };

    useEffect(() => {
        totalIncome();
    }, [booking]);


    // Trung bình cộng Rating
    const calculateAverageRating = () => {
        if (!rating || rating.length === 0) {
            return 0; // Trả về 0 nếu state 'rating' không tồn tại hoặc không có giá trị
        }
        const totalRating = rating.reduce((sum, item) => sum + item.rate, 0);
        const averageRating = totalRating / rating.length;
        return averageRating;
    };

    // Khi muốn hiển thị giá trị trung bình cộng của rating, bạn gọi hàm calculateAverageRating():
    const averageRating = calculateAverageRating();

    // Phân loại rating
    const categorizeRating = () => {
        if (!rating || rating.length === 0) {
            return {
                '0': [],
                '1': [],
                '2': [],
                '3': [],
                '4': [],
                '5': [],
            };
        }

        // Tạo một đối tượng để lưu trữ các mảng con
        const categorizedRatings = {
            '0': [],
            '1': [],
            '2': [],
            '3': [],
            '4': [],
            '5': [],
        };

        // Phân loại các rating vào mảng con tương ứng
        rating.forEach((item) => {
            const rate = item.rate;
            if (rate >= 0 && rate <= 5) {
                categorizedRatings[rate.toString()].push(item);
            }
        });

        return categorizedRatings;
    };

    // Khi muốn lấy các mảng con đã phân loại từ 0 đến 5, bạn gọi hàm categorizeRating():
    const categorizedRatings = categorizeRating();
    const totalRatings = rating ? rating.length : 0;

    // Chia theo tỉ lệ phần trăm
    const percentageRatings = {};
    for (let i = 0; i <= 5; i++) {
        const ratingsCount = categorizedRatings[i.toString()].length;
        const percentage = (ratingsCount / totalRatings) * 100;
        percentageRatings[i] = percentage.toFixed(2); // Làm tròn tỉ lệ phần trăm đến 2 chữ số sau dấu thập phân
    }

    const formatDateTime = (inputDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    useEffect(() => {
        // Tính tổng giá tiền của mỗi type khi state type1 đến type6 thay đổi
        setTotal1(type1?.reduce((total, item) => total + (item.total || 0), 0) || 0);
        setTotal2(type2?.reduce((total, item) => total + (item.total || 0), 0) || 0);
        setTotal3(type3?.reduce((total, item) => total + (item.total || 0), 0) || 0);
        setTotal4(type4?.reduce((total, item) => total + (item.total || 0), 0) || 0);
        setTotal5(type5?.reduce((total, item) => total + (item.total || 0), 0) || 0);
        setTotal6(type6?.reduce((total, item) => total + (item.total || 0), 0) || 0);
    }, [type1, type2, type3, type4, type5, type6]);

    function formatCurrency(amount) {
        return amount ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "";
    }

    // Gọi API cần thiết
    useEffect(() => {
        // Customer
        axios.get('https://localhost:7013/api/Customer')
            .then(response => {
                setCustomer(response.data.data); // Lưu dữ liệu từ API vào state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Employee
        axios.get('https://localhost:7013/api/Employee')
            .then(response => {
                setEmployee(response.data.data); // Lưu dữ liệu từ API vào state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Booking
        axios.get('https://localhost:7013/api/Order')
            .then(response => {
                const data = response.data.data;
                setBooking(response.data.data); // Lưu dữ liệu từ API vào state
                setType1(data.filter((item) => item.typeId === 1));
                setType2(data.filter((item) => item.typeId === 2));
                setType3(data.filter((item) => item.typeId === 3));
                setType4(data.filter((item) => item.typeId === 4));
                setType5(data.filter((item) => item.typeId === 5));
                setType6(data.filter((item) => item.typeId === 6));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Blog
        axios.get('https://localhost:7013/api/Blog')
            .then(response => {
                setBlog(response.data.data); // Lưu dữ liệu từ API vào state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Type
        axios.get('https://localhost:7013/api/Type')
            .then(response => {
                setService(response.data.data); // Lưu dữ liệu từ API vào state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Rating
        axios.get('https://localhost:7013/api/Rating')
            .then(response => {
                setRating(response.data.data); // Lưu dữ liệu từ API vào state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="page-container">
            {/* MAIN CONTENT*/}
            <div className="main-content">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <h1 className="table__header" style={{ textAlign: "center" }}><strong>Service List</strong></h1>
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="m-4">Total income</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0 mb-4 ml-3"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{formatCurrency(income)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-2">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="m-4">Customer</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0 mb-4 ml-3"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{numberOfCustomer}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-2">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="m-4">Employee</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0 mb-4 ml-3"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{numberOfEmployee}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-2">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="m-4">Booking</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0 mb-4 ml-3"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{numberOfBooking}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-2">
                                <div className="card daily-sales">
                                    <div className="card-block">
                                        <h6 className="m-4">Blogs</h6>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-9">
                                                <h3 className="f-w-300 d-flex align-items-center m-b-0 mb-4 ml-3"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>{numberOfBlogs}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --------------------------------------------- */}

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Dọn Dẹp Theo giờ</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total1 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total1)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType1}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Vệ Sinh Sofa, Nệm, Thảm</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total2 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total2)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType2}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Vệ Sinh Điều Hòa</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total3 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total3)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType3}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Khử Khuẩn</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total4 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total4)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType4}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Sửa Cửa</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total5 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total5)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType5}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xl-4">
                                <div className="card card-social">
                                    <div className="card-block border-bottom">
                                        <div className="row align-items-center justify-content-center m-3">
                                            <div className="col-auto">
                                                <h4>Vệ Sinh Điện Máy</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center card-active  m-3">
                                            {total6 !== 0 ? (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>
                                                    {formatCurrency(total6)}
                                                </h6>
                                            ) : (
                                                <h6 className="text-center m-b-10">
                                                    <span className="text-muted m-r-5">Total:</span>0
                                                </h6>
                                            )}
                                            <div className="col-6">
                                                <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Booking:</span>{numberOfType6}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* {service && service.map((item) => (
                                <div key={item.id} className="col-md-12 col-xl-4">
                                    <div className="card card-social">
                                        <div className="card-block border-bottom">
                                            <div className="row align-items-center justify-content-center m-3">
                                                <div className="col-auto">
                                                    <h4>{item.type1}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-block">
                                            <div className="row align-items-center justify-content-center card-active m-3">
                                                <div className="col-6">
                                                    <h6 className="text-center m-b-10">
                                                        <span className="text-muted m-r-5">Income:</span>
                                                        {item.target.toLocaleString()}
                                                    </h6>
                                                </div>
                                                <div className="col-6">
                                                    <h6 className="text-center m-b-10">
                                                        <span className="text-muted m-r-5">Booking:</span>
                                                        {item.duration.toLocaleString()}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))} */}

                            {/* -------------------------------------------- */}

                            <div className="col-xl-4 col-md-6">
                                <div className="card user-list">
                                    <div className="card-header">
                                        <h5>Rating</h5>
                                    </div>
                                    <div className="card-block">
                                        <div className="row align-items-center justify-content-center m-b-20 m-3">
                                            <div className="col-6">
                                                <h2 className="f-w-300 d-flex align-items-center float-left m-0">{averageRating.toFixed(1)}<i className="fas fa-star f-10 m-l-10 text-c-yellow"></i></h2>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="d-flex align-items-center float-right m-0">{rating && rating.length} reviews<i className="fas fa-caret-up text-c-green f-22 m-l-10"></i></h6>
                                            </div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-xl-12">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>5</h6>
                                                <h6 className="align-items-center float-right">{categorizedRatings['5'].length}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${percentageRatings[5]}%` }} aria-valuenow={percentageRatings[5]} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>4</h6>
                                                <h6 className="align-items-center float-right">{categorizedRatings['4'].length}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${percentageRatings[4]}%` }} aria-valuenow={percentageRatings[4]} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>3</h6>
                                                <h6 className="align-items-center float-right">{categorizedRatings['3'].length}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${percentageRatings[3]}%` }} aria-valuenow={percentageRatings[3]} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>2</h6>
                                                <h6 className="align-items-center float-right">{categorizedRatings['2'].length}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${percentageRatings[2]}%` }} aria-valuenow={percentageRatings[2]} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <h6 className="align-items-center float-left"><i className="fas fa-star f-10 m-r-10 text-c-yellow"></i>1</h6>
                                                <h6 className="align-items-center float-right">{categorizedRatings['1'].length}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${percentageRatings[1]}%` }} aria-valuenow={percentageRatings[1]} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8 col-md-6">
                                <div className="card Recent-Users">
                                    <div className="card-header">
                                        <h5>Recent Booking</h5>
                                    </div>
                                    <div className="card-block px-0 py-3">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <tbody>
                                                    {/* <tr className="unread">
                                                        <td><img className="rounded-circle" style={{ width: "40px" }} src="assets/images/user/avatar-1.jpg" alt="activity-user" /></td>
                                                        <td>
                                                            <h6 className="mb-1">Isabella Christensen</h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>11 MAY 12:56</h6>
                                                        </td>
                                                        <td><a href="#!" className="label theme-bg2 text-black f-12 mr-2">Reject</a><a href="#!" className="label theme-bg text-black f-12">Approve</a></td>
                                                    </tr> */}

                                                    {booking && booking
                                                        .slice()
                                                        .sort((a, b) => b.orderId - a.orderId)
                                                        .slice(0, 6)
                                                        .reverse()
                                                        .map((item) => (
                                                            <tr key={item.id} className="unread">
                                                                <td>
                                                                    <img
                                                                        className="rounded-circle"
                                                                        style={{ width: "40px" }}
                                                                        src={item.customerImage}
                                                                        alt="activity-user"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1">{item.customerName}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1">{item.type}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted">{formatDateTime(item.dateWork)}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1">{formatCurrency(item.total)}</h6>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
