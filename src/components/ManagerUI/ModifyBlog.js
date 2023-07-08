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
        <div className="container left">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Blog Editor Default</h5>
                    <div>
                        <label className="form-label">Image</label>
                        <div style={{ border: '1px solid black', padding: '10px', overflow: 'hidden' }}>
                            <img src={tempImageUrl} alt="Temporary Image" />
                        </div>
                        <input type="file" onChange={handleImageUpload} />
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={blogTitle}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <label>Summary:</label>
                        <ReactQuill
                            value={blogSummary}
                            onChange={handleSummaryChange}
                            suppressContentEditableWarning={true}
                        />
                    </div>
                    <div>
                        <label>Content:</label>
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
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleDeleteBlog}>Delete</button>
                </div>
            </div>
        </div>
    );
}
