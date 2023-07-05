import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import React, { useEffect, useState } from 'react';
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import moment from 'moment';
import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";

import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const id = useParams();
  const [blog, setBlog] = useState();
  const [blogs, setBlogs] = useState([]);
  const blogid = parseInt(id.id);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [blogId, setBlogId] = useState(blogid);

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Blog/${blogid}`)
      .then(response => {
        const data = response.data.data;
        setBlog(data);
      })
      .catch(error => {
        console.error('Error fetching blog detail:', error);
      });
      
      axios.get(`https://localhost:7013/api/Blog`)
      .then(response => {
        const data = response.data.data;
        setBlogs(data);
      })
      .catch(error => {
        console.error('Error fetching blog list:', error);
      });
      
    axios
      .get(`https://localhost:7013/api/Comment?blogId=${blogid}`)
      .then(response => {
        setComments(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  


  if (!blog) {
    return <div>Loading...</div>;
  }
  const dateTime = blog.createdDate;

  const formattedDateTime = moment(dateTime).format('DD/MM/YYYY');
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const commentData = {
      content: comment,
      blogId: blogid
    };

    axios.post('https://localhost:7013/api/Comment', commentData)
      .then(response => {
        console.log('Comment posted:', response.data);
        setComment('');
        setBlogId('');
        setComments(prevComments => [...prevComments, response.data.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Helmet title={blog.title}>
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details">
                <img src={blog.img} alt="" className="w-100" />
                <h2 className="section__title mt-4">{blog.title}</h2>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i class="ri-user-line"></i>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-calendar-line"></i>{formattedDateTime}
                  </span>

                  {/* <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-time-line"></i>
                  </span> */}
                </div>

                <p className="section__description">{blog.content}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4"></blockquote>
                </h6>
                
                <p className="section__description"></p>
              </div>

              <div className="comment__list mt-5">
                <h4 className="mb-5"></h4>

                <div className="single__comment d-flex gap-3">
                  {/* <img src="" alt="" /> */}
                  <div className="comment__content">
                    <h6 className=" fw-bold"></h6>
                    <p className="section__description mb-0"></p>
                    <p className="section__description">
                      {comments.map(comment => {
                        if (comment.blogId === blogid) {
                          return (
                            <div key={comment.id} style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                          );
                        }
                        return null;
                      })}
                    </p>
                  </div>
                </div>

                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <p className="section__description">
                  </p>

                  <Form>
                    <FormGroup className=" d-flex gap-3">
                      <Input                     
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={handleFullNameChange}
                      />
                      <Input
                      
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <form onSubmit={handleSubmitComment}>
                        <textarea
                          rows="5"
                          className="w-100 py-2 px-3"
                          placeholder="Comment..."
                          value={comment}
                          onChange={handleCommentChange}

                        ></textarea>
                        <button type="submit" className="btn comment__btn mt-3">
                          Bình luận
                        </button>
                      </form>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </Col>

          {/* Bài gần đây góc bên phải */}
            <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Bài gần đây</h5>
              </div>
              
              {blogs.map((blog) => (
                <div className="recent__blog-post mb-4" key={blog.blogId}>
                  <div className="recent__blog-item d-flex gap-3">
                    <img src={blog.img} alt="" className="w-25 rounded-2" />
                    
                    <h6>
                      <Link to={`/blogs/${blog.title}`}>{blog.title}</Link>
                    </h6>
                  
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
