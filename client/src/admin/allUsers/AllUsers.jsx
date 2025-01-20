import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
import UpdateRole from './updateRole/UpdateRole';
import Swal from 'sweetalert2';
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [roleFilter, setRoleFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            try {
               
                const response = await fetch(`/api/auth/users?page=${currentPage}&limit=${itemsPerPage}&role=${roleFilter}&search=${searchTerm}`);
                const data = await response.json();
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
        
    }, [currentPage, itemsPerPage, roleFilter, searchTerm]);

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



    const handleFilterChange = (role) => {
        setRoleFilter(role);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };
    const openUpdateRoleModal = (user) => {
        setUserToUpdate(user); // Set the user to be updated
        document.getElementById('my_modal_4').showModal();
    };


    // changing Active Status
    const handleActiveStatus = id => {
        Swal.fire({
            title: "Do you want change the status?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Change",
            denyButtonText: `Don't Change`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.get(`/api/auth/user/${id}`)
                    .then(res => {
                        if (res.data.isActive) {
                            axios.patch(`/api/auth/updateStatus/${id}`, { isActive: false })
                                .then(res => {
                                    Swal.fire(`${res.data.username} is Deactivated!`, "", "success")
                                        .then(() => {
                                            location.reload()
                                        });
                                })
                        } else {
                            axios.patch(`/api/auth/updateStatus/${id}`, { isActive: true })
                                .then(res => {
                                    Swal.fire(`${res.data.username} is Activated!`, "", "success")
                                        .then(() => {
                                            location.reload()
                                        });
                                })
                        }
                    })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }


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
        <div className='pb-12'>
            <div className='py-4 bg-base-200 text-center text-2xl md:text-4xl font-bold my-12'>
                <h1>All Users</h1>
            </div>

            <div className='flex my-4 gap-4 flex-wrap'>
                <button onClick={() => handleFilterChange('')} className={`btn btn-outline btn-info ${roleFilter === '' ? 'btn-active' : ''}`}>All Users</button>
                <button onClick={() => handleFilterChange('admin')} className={`btn btn-outline btn-accent ${roleFilter === 'admin' ? 'btn-active' : ''}`}>Admins</button>
                <button onClick={() => handleFilterChange('user')} className={`btn btn-outline btn-primary ${roleFilter === 'user' ? 'btn-active' : ''}`}>Users</button>
                <form className='flex gap-1' onSubmit={e => e.preventDefault()}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input name='search' type="text" className="grow" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                    </label>
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Active Status</th>
                            <th>Edit Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.isActive ? <button onClick={() => handleActiveStatus(user?._id)} className='btn btn-success text-white'>True</button> : <button onClick={() => handleActiveStatus(user?._id)} className='btn btn-error text-white'>False</button>}</td>
                                <td>
                                    <div className='flex text-2xl gap-2'>
                                        <button onClick={() => openUpdateRoleModal(user)}><FaEdit className='text-blue-500'></FaEdit></button>
                                        {/* <MdDelete className='text-error'></MdDelete> */}
                                        <dialog className='rounded-lg' id="my_modal_4">
                                            <UpdateRole user={userToUpdate} />
                                        </dialog>
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

export default AllUsers;
