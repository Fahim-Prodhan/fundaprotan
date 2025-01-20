import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import AddProjects from '../addProjects/AddProjects';
import UpdateProjects from '../updateProjects/UpdateProjects';
import Swal from 'sweetalert2';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [projectToUpdate, setProjectToUpdate] = useState(null);
    const [loading, setLoading] = useState(false)


    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);


    useEffect(() => {
        setLoading(true)
        fetchProjects();
    }, [currentPage, itemsPerPage, searchTerm]);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/api/project/projects?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            const data = await response.json();
            setProjects(data.projects);
            setCount(data.totalCount);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // fetchProjects();

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDelete =  (projectId) => {

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
                    const response = await fetch(`/api/project/delete/${projectId}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        // Refresh the project list after deletion
                        fetchProjects();
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

    const getPageNumbers = () => {
        if (numberOfPages <= 3) {
            return [...Array(numberOfPages).keys()].map(e => e + 1);
        }
        if (currentPage === 1) {
            return [1, 2, 3];
        }
        if (currentPage === numberOfPages) {
            return [numberOfPages - 2, numberOfPages - 1, numberOfPages];
        }
        return [currentPage - 1, currentPage, currentPage + 1];
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
                <h1>All Projects</h1>
            </div>
            <div className='flex my-4 gap-4 flex-wrap'>
                <AddProjects />
                {/* Search Box */}
                <form className='flex gap-1' onSubmit={e => e.preventDefault()}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input name='search' type="text" className="grow" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                    </label>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id}>
                                <th>{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                <td>{project.title}</td>
                                <td>{project.description.slice(0, 50)} ...</td>
                                <td>
                                    <div className='flex text-2xl gap-2'>
                                        <button onClick={() => { setProjectToUpdate(project); document.getElementById('my_modal_4').showModal(); }}><FaEdit className='text-blue-500'></FaEdit></button>
                                        <UpdateProjects project={projectToUpdate} />
                                        <button onClick={() => handleDelete(project._id)}><MdDelete className='text-error' /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className='flex justify-center mt-12 gap-4'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {getPageNumbers().map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
                        key={page}
                    >
                        {page}
                    </button>
                ))}
                {numberOfPages > 3 && currentPage < pages.length && <p className='btn'>....</p>}
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Projects;
