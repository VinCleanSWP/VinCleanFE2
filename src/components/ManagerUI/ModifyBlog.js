import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../../firebase/index';

export default function BlogDetail() {


    const [blog, setBlog] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSummary, setBlogSummary] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [OldImageUrl, setOldImageUrl] = useState('');

    const [tempImageUrl, setTempImageUrl] = useState('');



    const blogId = useParams();
    const id = parseInt(blogId.id);

    useEffect(() => {
        axios
            .get(`https://localhost:7013/api/Blog/${id}`)
            .then(response => {
                const { title, sumarry, content, img } = response.data.data;
                setBlog(response.data.data);
                setBlogTitle(title);
                setBlogSummary(sumarry);
                setBlogContent(content);

                setTempImageUrl(img);
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

    const handleSaveChanges = () => {
        const updatedBlog = {
            ...blog,
            title: blogTitle,
            summary: blogSummary,
            content: blogContent,
            img: tempImageUrl
        };

        axios
            .put(`https://localhost:7013/api/Blog`, updatedBlog)
            .then(response => {
                console.log('Update successful:', response.data);
                setOldImageUrl(tempImageUrl); // Lưu trữ ảnh mới như là ảnh cũ sau khi lưu
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
            })
            .catch(error => {
                console.log(error);
            });
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
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 style={{ textAlign: "center" }}><strong>Edit Blog #{id}</strong></h3>
                                            <div>
                                                <label className="form-label"> <strong>Image</strong></label>
                                                <div >
                                                    <img src={tempImageUrl || "http://via.placeholder.com/1080x250"}
                                                        alt="Temporary Image"
                                                        style={{ width: '1080px', height: '250px' }} />
                                                </div>
                                                <input type="file" onChange={handleImageUpload} />
                                            </div>
                                            <div>
                                                <label><strong>Title:</strong></label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-1"
                                                    value={blogTitle}
                                                    onChange={handleTitleChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Summary:</strong></label>
                                                <ReactQuill
                                                    value={blogSummary}
                                                    onChange={handleSummaryChange}
                                                    suppressContentEditableWarning={true}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Content:</strong></label>
                                                <ReactQuill
                                                    value={blogContent}
                                                    onChange={handleContentChange}
                                                    suppressContentEditableWarning={true}
                                                />
                                            </div>

                                            <div>
                                                <h2>Preview:</h2>
                                                <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}>
                                                    <img src={tempImageUrl || "http://via.placeholder.com/1080x250"} alt="Temporary Image"
                                                        style={{ width: '1080px', height: '250px' }} />
                                                </div>
                                                <h3>{blogTitle}</h3>
                                                <div dangerouslySetInnerHTML={{ __html: blogSummary }} />
                                                <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                                            </div>
                                            <div style={{ textAlign: 'right', marginRight: '5px' }}>
                                                <button type="button" className="btn btn-primary m-r-5" onClick={handleSaveChanges}>Save Changes</button>
                                                <button type="button" className="btn btn-primary" onClick={handleDeleteBlog}>Delete</button>
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
    );
}