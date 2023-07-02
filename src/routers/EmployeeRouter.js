import React from 'react'
import HeaderManager from '../components/ManagerUI/HeaderManager'
import SlideBar from '../components/ManagerUI/SlideBar'
import { Routes, Route, Navigate } from "react-router-dom";

export default function EmployeeRouter() {
    return (
        <div>
            <div class="d-flex" id="wrapper">
                <SlideBar />
                <div id="page-content-wrapper">
                    <HeaderManager />
                    <Routes>
                        <Route></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
