import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import React, { useEffect, useState } from 'react';
import Helmet from "../Helmet/Helmet";
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    const [commentDate, setCommentDate] = useState([]);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    useEffect(() => {
        axios.get(`https://vinclean.azurewebsites.net/api/Blog/${blogid}`)
            .then(response => {
                const data = response.data.data;
                setBlog(data);
            })
            .catch(error => {
                console.error('Error fetching blog detail:', error);
            });

        axios.get(`https://vinclean.azurewebsites.net/api/Blog`)
            .then(response => {
                const data = response.data.data;
                setBlogs(data);
            })
            .catch(error => {
                console.error('Error fetching blog list:', error);
            });

        axios
            .get(`https://vinclean.azurewebsites.net/api/Comment?blogId=${blogid}`)
            .then(response => {
                setComments(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);
    const fetchComments = (blogid) => {
        axios.get(`https://vinclean.azurewebsites.net/api/Comment?blogId=${blogid}`)
            .then(response => {
                setComments(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchCommentAuthors = async () => {
            const authors = [];
            const img = [];
            const createdDate = [];
            let successfulResponses = 0;

            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                if (comment.blogId === blogid) {
                    try {
                        const response = await axios.get(`https://vinclean.azurewebsites.net/api/Account/${comment.modifiedBy}`);
                        const account = response.data.data;
                        authors.push(account.name);
                        img.push(account.img);
                        createdDate.push(comment.createdDate);
                        successfulResponses++;
                    } catch (error) {
                        console.error('Error fetching account name:', error);
                        authors.push('');
                        img.push('');
                        createdDate.push('');
                    }
                }
            }

            if (successfulResponses === authors.length) {
                setCommentAuthors(authors);
                setImgAuthors(img);
                setCommentDate(createdDate);
            }
        };

        fetchCommentAuthors();
    }, [comments, blogid]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        const commentData = {
            content: comment,
            blogId: blogid,
            modifiedBy: accountId
        };

        try {
            const response = await axios.post('https://vinclean.azurewebsites.net/api/Comment', commentData);
            console.log('Bình luận đã được đăng:', response.data);

            const updatedCommentsResponse = await axios.get(`https://vinclean.azurewebsites.net/api/Comment?blogId=${blogid}`);
            const updatedComments = updatedCommentsResponse.data.data;

            setComment('');
            setComments(updatedComments);
        } catch (error) {
            console.log(error);
        }
        fetchComments(blogid);

    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`https://vinclean.azurewebsites.net/api/Comment/${commentId}`)
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
        <div>
            <div className="page-container">
                <div className="main-content">
                    <div className="section__content section__content--p30" style={{ backgroundColor: '#ffffff' }}>
                        <div className="container-fluid">
                            <div className="row m-t-30">
                                <div className="col-md-12">
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
                                                            <p className="section__description" dangerouslySetInnerHTML={{ __html: blog.sumarry }}></p>
                                                            <p className="section__description" dangerouslySetInnerHTML={{ __html: blog.content }}></p>

                                                            <h6 className="ps-5 fw-normal">
                                                                <blockquote className="fs-4"></blockquote>
                                                            </h6>
                                                            <p className="section__description"></p>
                                                        </div>
                                                        <div className="comment__list mt-5">
                                                            <h4>Tất cả bình luận</h4>
                                                            <h4 className="mb-5"></h4>
                                                            {comments.length > 0 && (
                                                                comments
                                                                    .filter((comment) => comment.blogId === blogid)
                                                                    .map((comment, index) => {
                                                                        const accountName = commentAuthors[index];
                                                                        const accountImg = imgAuthors[index];
                                                                        const accountcreatedDate = commentDate[index];

                                                                        const isSelected = selectedCommentId === comment.id;

                                                                        return (
                                                                            <div
                                                                                key={comment.id}
                                                                                style={{ whiteSpace: 'pre-line' }}
                                                                            >
                                                                                <Row>
                                                                                    <Col lg="1">
                                                                                        <img className="avatar-image" src={accountImg} alt="Avatar" />
                                                                                    </Col>

                                                                                    <Col lg="10">
                                                                                        <h6>{accountName}</h6>
                                                                                        <div className="date">{moment(accountcreatedDate).format('DD/MM/YYYY')}</div>
                                                                                        <div
                                                                                            className={`comment-box ${isSelected ? 'selected' : ''}`}
                                                                                            onClick={() => setSelectedCommentId(comment.id)}
                                                                                        >
                                                                                            <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                                                                                        </div>
                                                                                        {isSelected && comment.modifiedBy === accountId && (
                                                                                            <button
                                                                                                className="btn btn-danger btn-sm"
                                                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                                            >
                                                                                                Xóa
                                                                                            </button>
                                                                                        )}
                                                                                    </Col>
                                                                                </Row>
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
                                                                        placeholder="Ghi bình luận ở đây..."
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
                                                    <Col lg="4" md="4">
                                                        <div className="recent__post mb-4">
                                                            <h5 className="fw-bold">Bài gần đây</h5>
                                                        </div>
                                                        {blogs.map((blog) => (
                                                            <div className="recent__blog-post mb-4" key={blog.id}>
                                                                <div className="recent__blog-item d-flex gap-3">
                                                                    <img src={blog.img} alt="" className="w-25 rounded-2" />
                                                                    <h6>
                                                                        <Link to={`/blogs/${blog.blogId}`}>{blog.title}</Link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </section>
                                    </Helmet>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
