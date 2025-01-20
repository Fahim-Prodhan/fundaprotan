import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OurBlogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get(`/api/blogs`)
            .then(res => {
                setBlogs(res.data.blogs)
            })
    }, [])
    return (
        <div>
        <h1 className='text-center pb-12 text-3xl md:text-5xl font-bold text-[#2C3333]'>Latest Blogs</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                blogs.slice(0, 3).map(blog => <div key={blog._id} className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img src={blog.imageUrl} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p>{blog.description.slice(0, 100)}....</p>

                        <Link  className="btn bg-[#03C988] text-white my-4" to={`/blogs-details/${blog._id}`}><button>view Details</button></Link>
                    </div>
                </div>
                )
            }
        </div>
        <div className='text-center '>
            <Link to='/blogs'>
                <button className='btn btn-outline btn-success my-12'>See All</button>
            </Link>
        </div>
    </div>
    );
};

export default OurBlogs;