import React from 'react'
import { Routes, Route, Navigate, Link } from "react-router-dom";
import MyCalendar from '../components/EmployeeUI/Calender';
import EPSideBar from '../components/EmployeeUI/SideBar';
import EPHeader from '../components/EmployeeUI/EmployeeHeader';

export default function EmployeeRouter() {
    return (
        <div >
            <div className="page-wrapper">
                < EPHeader/>

                <Routes>
                    <Route path='/calendar' element={<MyCalendar/>}></Route>
                </Routes>
                
            </div>
        </div>
    )
}
