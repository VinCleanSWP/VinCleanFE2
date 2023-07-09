import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                                        <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                            <div class="input-group">
                                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light" style={{ borderRadius: '100px' }}
                                                    onChange={(e) => { setSearch(e.target.value) }} />
                                                <div class="input-group-append">
                                                    <button id="button-addon1" type="submit" class="btn btn-link text-primary" style={{ borderRadius: '70px' }} ><i class="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {/* DATA TABLE*/}
                                    <div className="table-responsive m-b-40" style={{ borderRadius: '15px' }}>
                                        <table className="table table-borderless table-data3 shadow-sm">
                                            <thead>
                                                <tr>
                                                    <th>Blog Id</th>
                                                    <th>Title</th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blogs.filter((blog) => {
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
