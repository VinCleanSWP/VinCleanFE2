import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Manager from "../pages/Manager";
import Customer from "../pages/Customer";
import ProfileCustomer from "../pages/ProfileCustomer";
import ResetPassword from "../pages/ResetPassword";
import Verification from "../pages/Verification";
import VerifyToken from "../pages/VerifyToken";


const Routers = () => {
  const role = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="verifytoken" element={<VerifyToken />} />
      <Route path="/" element={(role == 1) ? <Navigate to="/home" /> : ((role == 2) ? <Navigate to="/customer" /> : <Navigate to="/manager" />)} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/manager" element={<Manager />} />
      <Route path="/customer" element={<Customer />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<CarListing />} />
      <Route path="/servicetype/:id" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/activity" element={localStorage.getItem('loggedIn') ? <Contact /> : <Login />} />
      {/* <Route path="/profile" element={<ProfileCustomer />} /> */}
      <Route path="/profile" element={localStorage.getItem('loggedIn') ? <ProfileCustomer /> : <Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
