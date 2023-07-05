import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import ADHeader from '../components/ManagerUI/ADHeader'
import SideBar from '../components/ManagerUI/SideBar'
import ADFooter from '../components/ManagerUI/ADFooter'
import ADHome from '../components/ManagerUI/ADHome'
import Profile from '../components/ManagerUI/Profile'
import Table from '../components/ManagerUI/Table'
import Calendar from '../components/ManagerUI/Calendar'
import Form from '../components/ManagerUI/Form'
import Alert from '../components/ManagerUI/Alert'
import Booking from '../components/ManagerUI/Booking';
import Activity from '../components/ManagerUI/Activity';
import Request from '../components/ManagerUI/Request';


export default function ManagerRouter() {
    return (
        <div >
        <div className="page-wrapper">
            <ADHeader />
            <SideBar />
            <Routes>
                <Route path='/manager' element={<ADHome />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/table' element={<Table />}></Route>
                <Route path='/booking' element={<Booking />}></Route>
                <Route path='/calendar' element={<Calendar />}></Route>
                <Route path='/form' element={<Form />}></Route>
                <Route path='/alert' element={<Alert />}></Route>
                <Route path='/activity' element={<Activity />}></Route>
                <Route path='/request' element={<Request />}></Route>
            </Routes>
            <ADFooter />
        </div>
        </div>
    )
}
