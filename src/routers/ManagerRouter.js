import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import ADHeader from '../components/ManagerUI/ADHeader'
import SideBar from '../components/ManagerUI/SideBar'
import ADFooter from '../components/ManagerUI/ADFooter'
import ADHome from '../components/ManagerUI/ADHome'
import Profile from '../components/ManagerUI/Profile'
import Calendar from '../components/ManagerUI/Calendar'
import Form from '../components/ManagerUI/Form'
import Alert from '../components/ManagerUI/Alert'
import Booking from '../components/ManagerUI/Booking';
import Activity from '../components/ManagerUI/Activity';
import Request from '../components/ManagerUI/Request';
import Employee from '../components/ManagerUI/Emloyee';
import Service from '../components/ManagerUI/Service';
import Customer from '..//components/ManagerUI/Customer';
import BlogList from '../components/ManagerUI/BlogList';
import BlogDetails from '../components/ManagerUI/BlogDetails';
import ModifyBlog from '../components/ManagerUI/ModifyBlog';
import CreateBlog from '../components/ManagerUI/CreateBlog';
export default function ManagerRouter() {
    return (
        <div >
            <div className="page-wrapper">
                <ADHeader />
                <SideBar />
                <Routes>
                    <Route path='/manager' element={<ADHome />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/booking' element={<Booking />}></Route>
                    <Route path='/calendar' element={<Calendar />}></Route>
                    <Route path='/form' element={<Form />}></Route>
                    <Route path='/alert' element={<Alert />}></Route>
                    <Route path='/activity' element={<Activity />}></Route>
                    <Route path='/request' element={<Request />}></Route>
                    <Route path='/employee' element={<Employee />}></Route>
                    <Route path='/customer' element={<Customer />}></Route>
                    <Route path='/service' element={<Service />}></Route>
                    <Route path='/bloglist' element={<BlogList />}></Route>
                    <Route path='/modifyblog/:id' element={<ModifyBlog />}></Route>
                    <Route path='/blogs/:id' element={<BlogDetails />}></Route>
                    <Route path='/createblog' element={<CreateBlog />}></Route>

                </Routes>
                <ADFooter />
            </div>
        </div>
    )
}
