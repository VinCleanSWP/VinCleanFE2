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

export default function ManagerRouter() {
    return (
        <div className="page-wrapper">
            <ADHeader />
            <SideBar />
            <Routes>
                <Route path='/manager' element={<ADHome />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/table' element={<Table />}></Route>
                <Route path='/calendar' element={<Calendar />}></Route>
                <Route path='/form' element={<Form />}></Route>
                <Route path='/alert' element={<Alert />}></Route>
            </Routes>
            <ADFooter />
        </div>
    )
}