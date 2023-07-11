import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho giao diện trình soạn thảo Quill
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { storage } from '../../firebase/index';

export default function BlogDetail() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [blog, setBlog] = useState([]);
    const blogId = useParams();
    const id = parseInt(blogId.id)
    const [tempImageUrl, setTempImageUrl] = useState('');
    const handleSave = () => {
        const blogData = {
            ...blog,
            title: title,
            sumarry: summary,
            content: content,
            img: tempImageUrl
        };
        // Gọi API để lấy dữ liệu
        axios.post(`https://localhost:7013/api/Blog`, blogData)
            .then(response => {
                toast.success('Create Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setBlog(response.data.data); // Lưu dữ liệu vào state

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const handleImageUpload = async e => {
        const file = e.target.files[0];
        const storageRef = storage.ref(`Employee/${file.name}`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const imgUrl = await fileRef.getDownloadURL();
        setTempImageUrl(imgUrl);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSummaryChange = (value) => {
        setSummary(value);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };
    return (
        <div className="page-container">
            {/* MAIN CONTENT*/}
            <div className="main-content">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row m-t-30">
                            <div className="col-md-12">
                                <div className="container left">

                                    <div className='container left'>
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 style={{ textAlign: "center" }}><strong>Create Blog</strong></h5>
                                                <div>
                                                    <label><strong>Title:</strong></label>
                                                    <input type="text" className="form-control mb-1" value={title} onChange={handleTitleChange} />
                                                </div>
                                                <div>
                                                    <label><strong>Summary:</strong></label>
                                                    <ReactQuill value={summary} onChange={handleSummaryChange} />
                                                </div>
                                                <div>
                                                    <label><strong>Content:</strong></label>
                                                    <ReactQuill value={content} onChange={handleContentChange} />
                                                </div>
                                                <div>
                                                    <label className="form-label"> <strong>Image</strong></label>
                                                    <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}> <img src={tempImageUrl || "http://via.placeholder.com/1080x250"}
                                                        alt="Temporary Image"
                                                        style={{ width: '1080px', height: '250px' }} />
                                                    </div>

                                                    <input type="file" onChange={handleImageUpload} />
                                                </div>
                                                <div>
                                                    <h2>Preview</h2>
                                                    <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}>
                                                        <img src={tempImageUrl || "http://via.placeholder.com/1080x250"} alt="Temporary Image"
                                                            style={{ width: '1080px', height: '250px' }} />
                                                    </div>
                                                    <h3>{title}</h3>
                                                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                                </div>
                                                <div style={{ textAlign: 'right', marginRight: '5px' }}>
                                                    <button type="button" className="btn btn-primary m-r-5" onClick={handleSave}>Save</button>

                                                </div>

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

    )
}