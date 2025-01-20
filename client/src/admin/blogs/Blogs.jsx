import React, { useState, useEffect } from 'react';
import AddBlogs from './addBlogs/AddBlogs';
import UpdateBlogs from './updateBlogs/UpdateBlogs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatedBlog, setUpdatedBlog] = useState(null);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/blogs?page=${currentPage}&search=${searchTerm}`);
            const data = await response.json();
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };
    // fetchData();

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        if (totalPages <= 3) {
            return [...Array(totalPages).keys()].map(e => e + 1);
        }
        if (currentPage === 1) {
            return [1, 2, 3];
        }
        if (currentPage === totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages];
        }
        return [currentPage - 1, currentPage, currentPage + 1];
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm);
        setCurrentPage(1);
    };
    const handleDelete = (projectId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/blogs/delete/${projectId}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        // Refresh the project list after deletion
                        fetchData();
                        console.log('Project deleted successfully');
                    } else {
                        console.error('Failed to delete project');
                    }
                } catch (error) {
                    console.error('Error deleting project:', error);
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    };

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div className='py-4 bg-base-200 text-center text-2xl md:text-4xl font-bold my-12'>
                <h1>All Blogs</h1>
            </div>

            <div className='flex my-4 gap-4 flex-wrap'>
                <AddBlogs />
                <form className='flex gap-1' onSubmit={e => e.preventDefault()}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input name='search' type="text" className="grow" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                    </label>
                    <button type='submit' className="btn bg-[#435585] text-white">Search</button>
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={blog.id}>
                                <th>{index + 1}</th>
                                <td>{blog.title}</td>
                                <td>{blog.description.slice(0, 50)} ...</td>
                                <td>
                                    <div className='flex text-2xl gap-2'>
                                        <button onClick={() => { setUpdatedBlog(blog), document.getElementById('my_modal_4').showModal() }}><FaEdit className='text-blue-600'></FaEdit></button>
                                        <UpdateBlogs blog={updatedBlog} />
                                        <MdDelete className='text-error cursor-pointer' onClick={() => handleDelete(blog._id)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center mt-12 gap-4'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {getPageNumbers().map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
                        key={page}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Blogs;
