import React, { useRef, useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../EmployeeUI/header.css';
import logo from '../../assets/all-images/logo.png';
function EPHeader() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [img, setImg] = useState('');


    const fetchAccountData = async () => {
        try {
            if (localStorage.getItem('id')) {
                const response = await axios.get(`https://localhost:7013/api/Account/${localStorage.getItem('id')}`); // Thay đổi đường dẫn API tương ứng
                // Xử lý dữ liệu tài khoản đã nhận được từ response.data
                console.log(response.data); // Hoặc cập nhật các state khác trong component của bạn
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        // Xóa thông tin đăng nhập từ localStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('img');
        setLoggedIn(false);
        setEmail('');
        window.location.href = '/home';
    };

    useEffect(() => {
        // Kiểm tra xem đã có thông tin đăng nhập trong localStorage hay chưa
        const isLoggedIn = localStorage.getItem('loggedIn');
        const storedEmail = localStorage.getItem('email');
        const storedName = localStorage.getItem('name');
        const storedId = localStorage.getItem('id');
        const storedImg = localStorage.getItem('img');
        console.log(storedId)
        console.log(storedImg)

        if (isLoggedIn && storedEmail) {
            setLoggedIn(true);
            setEmail(storedEmail);
            setName(storedName);
            setId(storedId);
            setImg(storedImg);
            fetchAccountData();
        }
    }, []);
    return (

        <div className="header-employee" >
            <div className="nav-links">
                
                <li className="nav-links-db">
                    <img src={logo} alt="logo" style={{  height: '75px' }} />
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/calendar">Calendar</Link>
                </li>
                <div className="nav-links-welcome">
                <li >
                    <a>Welcome, {name}</a>
                </li>
                <li className="nav-links-profile">
                    <Link to="/profile">
                        <img src={img || "http://via.placeholder.com/300"} alt="Avatar" style={{ width: '60px', height: '60px',borderRadius:'50%' }} />
                    </Link>
                </li>
                <li className="nav-links-logout">
                    <MdOutlineLogout onClick={handleLogout} />
                </li>
                </div>
            </div>
        </div>
    );
}

export default EPHeader;
