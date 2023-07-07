import React from 'react'
import { Link } from 'react-router-dom'

export default function SlideBar() {
    return (
        <div>
            <div className="border-end bg-light" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom text-bg-light">VinClean</div>
                <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard">Dashboard</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/task">Task</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/employee">Employee</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/services">Services</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/blog">Blog</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/customer">Customer</Link>
                    
                </div>
            </div>
        </div>
    )
}
