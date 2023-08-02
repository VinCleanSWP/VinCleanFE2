import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../../firebase/index';
import { ToastContainer, toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function BlogDetail() {


    const [blog, setBlog] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSummary, setBlogSummary] = useState('');
    const [blogContent, setBlogContent] = useState('');

    const [tempImageUrl, setTempImageUrl] = useState('');


    const blogId = useParams();
    const id = parseInt(blogId.id);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`https://localhost:7013/api/Blog/${id}`)
            .then(response => {
                const { title, sumarry, content, img } = response.data.data;
                setBlog(response.data.data);
                setBlogTitle(title);
                setBlogSummary(sumarry);
                setBlogContent(content);
                setTempImageUrl(response.data.data.img);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref(`Employee/${file.name}`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };

    const handleTitleChange = e => {
        setBlogTitle(e.target.value);
    };

    const handleSummaryChange = value => {
        setBlogSummary(value);
    };

    const handleContentChange = value => {
        setBlogContent(value);
    };

    const handleSaveChanges = async () => {
        const updatedBlog = {
            ...blog,
            title: blogTitle,
            sumarry: blogSummary,
            content: blogContent,
            img: tempImageUrl
        };
        console.log(updatedBlog)
        axios
            .put(`https://localhost:7013/api/Blog`, updatedBlog)
            .then(response => {
                console.log('Update successful:', response.data);
                // setOldImageUrl(tempImageUrl); // Lưu trữ ảnh mới như là ảnh cũ sau khi lưu
                toast.success('Update Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/bloglist");




            })

            .catch(error => {
                console.error('Error:', error);
            });


    };

    const handleDeleteBlog = () => {
        axios
            .delete(`https://localhost:7013/api/Blog/${id}`)
            .then(response => {
                console.log('Blog deleted:', response.data);
                toast.success('Delete Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/bloglist");
            })

            .catch(error => {
                console.log(error);
            });
    };




    return (
        <div className="page-container">
            <div className="main-content">
                <div className="section__content section__content--p30" style={{ backgroundColor: '#ffffff' }}>
                    <div className="container-fluid">
                        <div className="row m-t-30">
                            <div className="col-md-12">

                                <div className="container left">
                                    <div className="card">
                                        <div className="card-body">
                                            <div style={{ display: 'flex' }}>

                                                <h3 className="card-title" ><b>Blog Editor Default</b></h3>
                                                <button style={{ marginLeft: "75%", color: '#ff1744' }} onClick={handleDeleteBlog}><RiDeleteBin6Line size={26}></RiDeleteBin6Line></button>


                                            </div>
                                            <div>
                                                <label className="form-label"><i>*Image</i></label>
                                                <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}>
                                                    <img src={tempImageUrl} alt="Temporary Image" />
                                                </div>
                                                <input type="file" onChange={handleImageUpload} />
                                            </div>

                                            <form className="" style={{ marginTop: "10px" }}>
                                                <div className="input-group mb-3">
                                                    <label className=" input-group-text">Title:</label>
                                                    <input className="form-control"
                                                        type="text"
                                                        value={blogTitle}
                                                        onChange={handleTitleChange}
                                                    />
                                                </div>
                                            </form>
                                            <div>
                                                <b><label>Summary:</label></b>
                                                <ReactQuill
                                                    value={blogSummary}
                                                    onChange={handleSummaryChange}
                                                    suppressContentEditableWarning={true}
                                                />
                                            </div>
                                            <div>
                                                <b><label>Content:</label></b>
                                                <ReactQuill
                                                    value={blogContent}
                                                    onChange={handleContentChange}
                                                    suppressContentEditableWarning={true}
                                                />
                                            </div>
                                            <div>
                                                <h2>Preview:</h2>
                                                <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}>
                                                    <img src={tempImageUrl} alt="Temporary Image" />
                                                </div>
                                                <h3>{blogTitle}</h3>
                                                <div dangerouslySetInnerHTML={{ __html: blogSummary }} />
                                                <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <Link to='/bloglist'>
                                                    <button type="button" class="btn btn-secondary" data-mdb-ripple-color="dark" style={{ marginRight: '20px' }}>
                                                        Close
                                                    </button>
                                                </Link>

                                                <button type="button" class="btn btn-primary mr-2" data-mdb-ripple-color="dark" onClick={handleSaveChanges}>
                                                    Save Changes
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
}
