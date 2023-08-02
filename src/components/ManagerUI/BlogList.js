import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillFileAdd } from "react-icons/ai";


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7013/api/Blog')
            .then(response => {
                setBlogs(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
            });
    }, []);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const sortAndFilterData = () => {
        // Kiểm tra nếu blogs không phải là một mảng
        if (!Array.isArray(blogs)) {
            return []; // hoặc giá trị mặc định phù hợp nếu cần
        }
    
        const sortedData = [...blogs];
    
        const filteredData = sortedData.filter(m =>
            m.blogId.toString().toLowerCase().includes(search.toLowerCase()) ||
            m.title.toString().toLowerCase().includes(search.toLowerCase())
        );
    
        return filteredData;
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
                                    <form>
                                        <div class="table__header">
                                            <h1 style={{ textAlign: "center" }}><strong>Blog List</strong></h1>
                                            <div class="input-group" >
                                                <input type="search" placeholder="Search Data..."
                                                    value={search}
                                                    onChange={handleSearchChange} />
                                                <img src="images/icon/search.png" alt=""></img>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE */}
                                    {/* <div style={{ textAlign: 'right', marginRight:"5px"}}>
                                            <button >
                                                <Link to="/createblog" style={{ textDecoration: "none", color:'green' }}> <AiFillFileAdd size={30}></AiFillFileAdd></Link>
                                            </button>
                                        </div> */}
                                    <div className="table-data__tool-right">
                                        {/* <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                <i className="zmdi zmdi-plus" />add item</button> */}
                                
                                        <div className="table-data__tool">
                                            {/* DATA TABLE*/}
                                            <div className="table-responsive m-b-40" style={{ borderRadius: '15px' }}>
                                                <table className="table table-borderless table-data3 shadow-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Blog Id</th>
                                                            <th>Title</th>
                                                            <th><Link to="/createblog" style={{ textDecoration: "none", color:'blueviolet', marginRight:"20px" }}> <AiFillFileAdd size={30}></AiFillFileAdd></Link></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {sortAndFilterData().filter((blog) => {
                                                            if (search.toLowerCase() === '') {
                                                                return blog;
                                                            }
                                                            else if (blog.title.toLowerCase().includes(search.toLowerCase())

                                                            ) {
                                                                return blog;
                                                            }
                                                        })
                                                            .map(request => (
                                                                <tr key={request.blogId}>
                                                                    <td>{request.blogId}</td>
                                                                    <td>{request.title}</td>

                                                                    <td>
                                                                        <div className="table-data-feature">
                                                                            <Link to={`/modifyblog/${request.blogId}`}> <button
                                                                                className="item"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="Edit"

                                                                            >
                                                                                <i class="zmdi zmdi-edit" />
                                                                            </button></Link>

                                                                            <Link to={`/blogs/${request.blogId}`}>
                                                                                <button className="item" data-toggle="tooltip" data-placement="top" title="More"><i className="zmdi zmdi-more" /></button>

                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* END DATA TABLE*/}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/*-----Modal Assign Employee------ */}

                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
