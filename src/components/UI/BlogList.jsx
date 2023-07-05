
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Blog1 from "../../assets/all-images/blog-img/blog-1.jpg"

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    axios.get(`https://localhost:7013/api/Blog`)
      .then(response => {
        const data = response.data.data;
        setBlogs(data);
      })
      .catch(error => {
        console.error('Error fetching blog list:', error);
      });
  }, []);

  return (
    <>
      {blogs.map(blog => (
        <Col lg="4" md="6" sm="6" className="mb-5" key={blog.id}>
          <div className="blog__item">
            
            {/* Bấm vào ảnh để xem blog details */}
            <Link to = {`/blogs/${blog.blogId}`} >
              <img src = {blog.img} alt="" className="blog-image" style={{ width: '415px', height: '297.17px'}}/>
            </Link>         
            
            <div className="blog__info p-3">            
                    
              {/* Bấm vào title để xem Blog Details */}
              <Link to={`/blogs/${blog.blogId}`} className="blog__title">
                {blog.title}
              </Link>             

              <p className="section__description mt-3">
                {blog.sumarry.length > 100
                ? blog.sumarry.substr(0, 100)
                : blog.sumarry}
              </p>
              
              {/* Bấm vào để xem Blog Details */}
              <Link to={`/blogs/${blog.blogId}`} className="read__more">
              ⊳ Xem chi tiết
              </Link>
              
              <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
                <span className="blog__author">
                  <i className="ri-user-line"></i>
                </span>
                <div className="d-flex align-items-center gap-3">
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {blog.createdDate}
                  </span>
                  {/* <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i>
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default BlogList;
