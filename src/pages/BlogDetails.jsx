import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import React, { useEffect, useState } from 'react';
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
  const [commentAuthors, setCommentAuthors] = useState([]);
  const [imgAuthors, setImgAuthors] = useState([]);
  const accountId = localStorage.getItem('id');

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
  

  useEffect(() => {
    const fetchCommentAuthors = async () => {
      const authors = [];
      const img = [];
      let successfulResponses = 0;

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment.blogId === blogid) {
          try {
            const response = await axios.get(`https://localhost:7013/api/Account/${comment.modifiedBy}`);
            const account = response.data.data;
            authors.push(account.name);
            img.push(account.img);
            successfulResponses++;
          } catch (error) {
            console.error('Error fetching account name:', error);
            authors.push('');
            img.push('');
          }
        }
      }

      if (successfulResponses === authors.length) {
        setCommentAuthors(authors);
        setImgAuthors(img);
      }
    };

    fetchCommentAuthors();
  }, [comments, blogid]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const commentData = {
      content: comment,
      blogId: blogid,
      modifiedBy: accountId
    };

    axios.post('https://localhost:7013/api/Comment', commentData)
      .then(response => {
        console.log('Comment posted:', response.data);
        setComment('');
        setComments(prevComments => [...prevComments, response.data.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`https://localhost:7013/api/Comment/${commentId}`)
      .then(response => {
        console.log('Comment deleted:', response.data);
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const dateTime = blog.createdDate;
  const formattedDateTime = moment(dateTime).format('MMMM Do YYYY, h:mm:ss a');

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
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i>{formattedDateTime}
                  </span>
                </div>

                <p className="section__description">{blog.content}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4"></blockquote>
                </h6>
                
                <p className="section__description"></p>
              </div>

              <div className="comment__list mt-5">
                <h4 className="mb-5"></h4>
                {comments.length > 0 && (
                  comments
                    .filter((comment) => comment.blogId === blogid)
                    .map((comment, index) => {
                      const accountName = commentAuthors[index];
                      const accountImg = imgAuthors[index];

                      return (
                        <div key={comment.id} style={{ whiteSpace: 'pre-line' }}>
                          <img src={accountImg} alt="Avatar" />
                          <h6>{accountName}</h6>
                          <div className="comment-box">
                            <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                          </div>
                          <div>
                            {comment.modifiedBy === accountId && (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              <div className="leave__comment-form mt-5">
                <p className="section__description"></p>

                <Form onSubmit={handleSubmitComment}>
                  <FormGroup>
                    <textarea
                      rows="5"
                      className="w-100 py-2 px-3"
                      placeholder="Comment..."
                      value={comment}
                      onChange={handleCommentChange}
                    ></textarea>
                    <button type="submit" className="btn comment__btn mt-3">
                      Gửi bình luận
                    </button>
                  </FormGroup>
                </Form>
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
