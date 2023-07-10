import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho giao diện trình soạn thảo Quill
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SendEmail() {
    const [to, setTitle] = useState('');
    const [subject, setSummary] = useState('');
    const [body, setContent] = useState('');
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.post(`https://localhost:7013/api/Email`)
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
        <div >
            {/* PAGE CONTAINER*/}
            <div className="page-container">
                {/* MAIN CONTENT*/}
                <div className="main-content">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row m-t-30">
                                <div className="col-md-12">
                                <form action="">
                                        <div class="table__header">
                                            <h2><strong>Send Email</strong></h2>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."/>
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="card" style={{borderRadius:"20px", boxSizing: 'border-box',boxShadow: "0 0.1rem 0.4rem #0002"}}>
                                        <div class="card-body">
                                            <h5 class="card-title">VinClean</h5>
                                            <div>
                                                <label>To: </label>
                                                <input type="text" value={to} onChange={handleTitleChange} />
                                            </div>
                                            <div>
                                                <label>Subject:</label>
                                                <ReactQuill value={subject} onChange={handleSummaryChange} />
                                            </div>
                                            <div>
                                                <label>Body:</label>
                                                <ReactQuill value={body} onChange={handleContentChange} />
                                            </div>
                                            <div>
                                                <h2>Preview:</h2>
                                                <b>To: {to}</b>
                                                <div dangerouslySetInnerHTML={{ __html: "<strong>Subject:</strong>" + subject }}/>
                                                <div dangerouslySetInnerHTML={{ __html: "<strong>Body:</strong>" + body }} />
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

    )
}