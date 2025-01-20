import React from 'react';
import { Link } from 'react-router-dom';

const AllBlogsCard = ({ blog }) => {
    const descriptionSlice = blog.description.slice(0, 100)
    return (
        <div>
            <div className="hero bg-base-100 shadow-xl">
                <div className="hero-content flex-col-reverse lg:flex-row p-12">
                    <div>
                        <h1 className="md:text-2xl text-xl font-bold text-[#02A95C]">{blog.title}</h1>
                        <p className="py-6"> <span className='font-bold'>Description:</span> {descriptionSlice}...</p>
                        <Link to={`/blogs-details/${blog._id}`}> <button className="btn  bg-[#FF9800] text-white">Read More</button> </Link>
                    </div>
                    <img src={blog.imageUrl} className="md:max-w-md rounded-lg shadow-2xl order-1" />
                </div>
         
            </div>
        </div>
    );
};

export default AllBlogsCard;