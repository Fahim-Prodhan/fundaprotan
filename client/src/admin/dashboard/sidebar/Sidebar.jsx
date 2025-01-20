/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import profile from '../../../assets/images/man.png'
import { Link, NavLink } from 'react-router-dom';
import { MdDashboard, MdDriveFolderUpload } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { FaBlogger } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { AuthContext } from '../../../Context/AuthContext';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

const Sidebar = () => {

    const { authUser, setAuthUser } = useContext(AuthContext); // assuming setAuthUser is provided in AuthContext to update user data
    const [sidebar, SetSidebar] = useState(false)
    // const { authUser } = useContext(AuthContext)
    const [firstName, setFirstName] = useState(authUser.firstName);
    const [lastName, setLastName] = useState(authUser.lastName);
    const [loading, setLoading] = useState(false)


    const changeProfilePic = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true)
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=6b61fed2ade9e1cb6596b28fb4315762', {
                    method: 'POST',
                    body: formData,
                });
                const imageData = await response.json();
                const imageUrl = imageData.data.url;
                await axios.put('/api/auth/user/profile-pic', { profilePic: imageUrl });
                setAuthUser((prev) => ({ ...prev, profilePic: imageUrl }));
                setLoading(false)
            } catch (error) {
                console.error('Error uploading image or updating profile picture:', error);
            }
        }
    };



    const updateName = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/auth/user/name', { firstName, lastName });
            console.log(response.data.message);
            setAuthUser((prev) => ({ ...prev, firstName, lastName }));
            document.getElementById('my_modal_name').close();
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };


    const handleSidebar = () => {
        SetSidebar(!sidebar)
    }

    return (
        <div>
            <button onClick={handleSidebar} type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className={`fixed left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${sidebar ? 'top-20' : '-translate-x-full'}`} aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-[#0A6847] rounded-lg mt-1">
                    <ul className="space-y-2 font-medium">
                        <button onClick={handleSidebar} className='absolute right-4 text-white text-2xl md:hidden block'><IoCloseSharp /></button>

                        {/* Profile Pic and name */}
                        <div className='mb-4 '>
                            {
                                loading ? <div className=' mt-1 w-28 h-28 rounded-full bg-[#eee] flex justify-center'>
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div> :
                                    <img className=' mt-1 w-28 h-28 rounded-full' src={authUser?.profilePic || profile} alt="Profile" />
                            }
                            <label for="fileInput" className="cursor-pointer ml-3 file-label flex items-center gap-1 bg-gray-400 w-36 mt-4 mb-2 text-white rounded-lg px-2"><MdDriveFolderUpload /> Profile Photo</label>
                            <input type="file" id="fileInput" name="fileInput" className="hidden" onChange={changeProfilePic} />
                            <h1 className='font-bold pt-1 text-white mx-3'>@{authUser?.role}</h1>
                            <h1 className=' font-bold text-white mx-3 flex items-center gap-1'>{authUser?.firstName} {authUser?.lastName}  <CiEdit className='cursor-pointer' onClick={() => document.getElementById('my_modal_name').showModal()} /></h1>
                            <dialog id="my_modal_name" className="modal">
                                <div className="modal-box">
                                    <form method="dialog" onSubmit={updateName}>
                                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_name').close()}>✕</button>
                                        <h3 className="font-bold text-lg">Update Name</h3>
                                        <div className="py-4">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="input input-bordered w-full mb-2"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="input input-bordered w-full"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="modal-action">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </dialog>
                            <Link className=' mx-3 text-[#FFBF00]' to='/change-Password'>Change Password</Link>
                            <div className='my-6 border'>
                                <hr />
                            </div>

                        </div>

                        {/* Others */}
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? "#fff" : "#fff",
                                border: isActive ? '2px solid #FDDE55' : 'none',
                                borderRadius: isActive ? '5px' : '',
                                padding: isActive ? '5px 12px' : '',
                                background: isActive ? "#1111111f" : "transparent",
                            })} to='/admin/dashboard' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< MdDashboard /></span></p>
                                <span className="ms-3">Dashboard</span>

                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? "#fff" : "#fff",
                                border: isActive ? '2px solid #FDDE55' : 'none',
                                borderRadius: isActive ? '5px' : '',
                                padding: isActive ? '5px 12px' : '',
                                background: isActive ? "#1111111f" : "transparent",
                            })} to='/admin/projects' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< GoProjectRoadmap /></span></p>
                                <span className="ms-3">Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? "#fff" : "#fff",
                                border: isActive ? '2px solid #FDDE55' : 'none',
                                borderRadius: isActive ? '5px' : '',
                                padding: isActive ? '5px 12px' : '',
                                background: isActive ? "#1111111f" : "transparent",
                            })} to='/admin/blogs' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< FaBlogger /></span></p>
                                <span className="ms-3">Blogs</span>

                            </NavLink>
                        </li>
                        {authUser && authUser.role === 'admin' && <><li>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? "#fff" : "#fff",
                                border: isActive ? '2px solid #FDDE55' : 'none',
                                borderRadius: isActive ? '5px' : '',
                                padding: isActive ? '5px 12px' : '',
                                background: isActive ? "#1111111f" : "transparent",
                            })} to='/admin/add-admin' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white'><IoIosPersonAdd /></span></p>
                                <span className="ms-3">Add Admin</span>

                            </NavLink>
                        </li><li>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? "#fff" : "#fff",
                                    border: isActive ? '2px solid #FDDE55' : 'none',
                                    borderRadius: isActive ? '5px' : '',
                                    padding: isActive ? '5px 12px' : '',
                                    background: isActive ? "#1111111f" : "transparent",
                                })} to='/admin/add-publisher' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <p className='text-2xl'><span className='text-gray-400 group-hover:text-white'><IoIosPersonAdd /></span></p>
                                    <span className="ms-3">Add Publisher</span>

                                </NavLink>
                            </li><li>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? "#fff" : "#fff",
                                    border: isActive ? '2px solid #FDDE55' : 'none',
                                    borderRadius: isActive ? '5px' : '',
                                    padding: isActive ? '5px 12px' : '',
                                    background: isActive ? "#1111111f" : "transparent",
                                })} to='/admin/users' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                    <p className='text-2xl'><svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                    </svg></p>
                                    <span className="ms-3">Users</span>

                                </NavLink>
                            </li></>
                        }
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;