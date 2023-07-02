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
  const blogid = parseInt(id.id);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [accountNames, setAccountNames] = useState([]);
  const [commentAuthors, setCommentAuthors] = useState([]);
  const commentList = comments;
  console.log(accountNames);

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Blog/${blogid}`)
      .then(response => {
        const data = response.data.data;
        setBlog(data);
      })
      .catch(error => {
        console.error('Error fetching blog detail:', error);
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
      let successfulResponses = 0;

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment.blogId === blogid) {
          try {
            const response = await axios.get(`https://localhost:7013/api/Account/${comment.modifiedBy}`);
            const account = response.data.data;
            authors.push(account.name);
            successfulResponses++;
          } catch (error) {
            console.error('Error fetching account name:', error);
            authors.push('');
          }
        }
      }

      if (successfulResponses === authors.length) {
        setCommentAuthors(authors);
      }
    };

    fetchCommentAuthors();
  }, [comments, blogid]);
  useEffect(() => {
    axios.get(`https://localhost:7013/api/RelatedPosts?blogId=${blogid}`)
      .then(response => {
        setRelatedPosts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching related posts:', error);
      });
  }, [blogid]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const dateTime = blog.createdDate;
  const formattedDateTime = moment(dateTime).format('MMMM Do YYYY, h:mm:ss a');

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
                    <i className="ri-user-line"></i>
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i>
                  </span>

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

              {/* =============== comment list ============ */}
              <div className="comment__list mt-5">
                <h4 className="mb-5"></h4>
                {comments.length > 0 && (
                  comments
                    .filter((comment) => comment.blogId === blogid)
                    .map((comment, index) => {
                      const accountName = commentAuthors[index];

                      return (
                        <div key={comment.id} style={{ whiteSpace: 'pre-line' }}>
                          {/* <img src={commentImg} alt="Avatar" /> */}
                          <h6>{accountName}</h6>
                          <div className="comment-box">
                            <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                          </div>
                        </div>
                      );
                    })
                )}

              </div>

              {/* =============== comment form ============ */}
              <div className="leave__comment-form mt-5">
                <p className="section__description">
                </p>

                <Form onSubmit={handleSubmitComment}>
                  {/* <FormGroup className=" d-flex gap-3">
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
                  </FormGroup> */}

                  <FormGroup>
                    <textarea
                      rows="5"
                      className="w-100 py-2 px-3"
                      placeholder="Comment..."
                      value={comment}
                      onChange={handleCommentChange}
                    ></textarea>
                    <button type="submit" className="btn comment__btn mt-3">
                      Post a Comment
                    </button>
                  </FormGroup>
                </Form>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Recent Posts</h5>
              </div>
              {relatedPosts.map((item) => (
                <div className="recent__post__item" key={item.blogId}>
                  <div className="post__image">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="post__content">
                    <Link to={`/blog-details/${item.blogId}`}>{item.title}</Link>
                    <p>
                      <i className="ri-calendar-line"></i>
                      {moment(item.createdDate).format('MMMM Do YYYY')}
                    </p>
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
