import React from 'react'
import { Routes, Route, Navigate, Link } from "react-router-dom";
import MyCalendar from '../components/EmployeeUI/Calender';
import EPSideBar from '../components/EmployeeUI/SideBar';
import EPHeader from '../components/EmployeeUI/EmployeeHeader';
import EmpProfile from '../components/EmployeeUI/EmpProfile';
import Dashboard from '../components/EmployeeUI/Dashboard';

export default function EmployeeRouter() {
    return (
        <div >
            <div className="page-wrapper">
                < EPHeader />
                <Routes>
                    <Route path='/calendar' element={<MyCalendar/>}></Route>      
                    <Route path='/' element={<MyCalendar/>}></Route>
                    <Route path='/dashboard' element={<Dashboard />}></Route>
                    <Route path='/profile' element={<EmpProfile />}></Route>
                </Routes>

            </div>
        </div>
    )
}
