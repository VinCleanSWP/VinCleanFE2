import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho giao diện trình soạn thảo Quill
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetail() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [blog, setBlog] = useState([]);
    const blogId = useParams();
    const id = parseInt(blogId.id)
    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.post(`https://localhost:7013/api/Blog`)
            .then(response => {
                setBlog(response.data.data); // Lưu dữ liệu vào state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // Chỉ gọi API một lần khi component được tạo

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
        <div className='container left'>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Blog Editor Default</h5>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <label>Summary:</label>
                        <ReactQuill value={summary} onChange={handleSummaryChange} />
                    </div>
                    <div>
                        <label>Content:</label>
                        <ReactQuill value={content} onChange={handleContentChange} />
                    </div>
                    <div>
                        <h2>Preview:</h2>
                        <h3>{title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: summary }} />
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    )
}