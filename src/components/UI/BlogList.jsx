import { Col, Input } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Blog`)
      .then(response => {
        const data = response.data.data;
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch(error => {
        console.error('Error fetching blog list:', error);
      });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterBlogs(e.target.value);
  };

  const filterBlogs = (searchValue) => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <div className="search-container">
        <Input type="text" value={searchTerm} onChange={handleChange} placeholder="Search blogs..." />
        <br></br>
      </div>
      {filteredBlogs.map(blog => (
        <Col lg="4" md="6" sm="6" className="mb-5" key={blog.id}>
          <div className="blog__item">
            {/* <img src={blog.image} alt="" className="w-100" /> */}
            <div className="blog__info p-3">
              <h1>{blog.title}</h1>
              {/* <Link to={`/blogs/${blog.title}`} className="blog__title">
                {blog.title}
              </Link> */}
              <p className="section__description mt-3">
                {blog.sumarry.length > 100
                  ? blog.sumarry.substr(0, 100)
                  : blog.sumarry}
              </p>
              <Link to={`/blogs/${blog.blogId}`} className="read__more">
                Read More
              </Link>
              <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
                <span className="blog__author">
                  <i className="ri-user-line"></i>
                </span>
                <div className="d-flex align-items-center gap-3">
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {blog.createdDate}
                  </span>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i>
                  </span>
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
