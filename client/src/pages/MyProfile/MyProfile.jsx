/* eslint-disable react/no-unknown-property */
import React, { useContext, useEffect, useState } from 'react';
import profileLogo from '../../assets/images/man.png';
import { AuthContext } from '../../Context/AuthContext';
import { format } from 'date-fns';
import axios from 'axios';
import { FaFileDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { MdDriveFolderUpload } from 'react-icons/md';

const MyProfile = () => {
    const { authUser, setAuthUser } = useContext(AuthContext); // assuming setAuthUser is provided in AuthContext to update user data
    const [payments, setPayments] = useState([]);
    const [number, setNumber] = useState(10);
    const [firstName, setFirstName] = useState(authUser.firstName);
    const [lastName, setLastName] = useState(authUser.lastName);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get(`/api/donate/payment-history/${authUser?._id}`)
            .then(res => {
                setPayments(res.data);
            });
    }, [authUser?._id]);

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

    return (
        <div className='mx-6'>
            <div className='text-center'>

                {
                    loading ? <div className='mx-auto mt-12 w-28 h-28 rounded-full bg-[#eee] flex justify-center'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div> :
                        <img className='mx-auto mt-12 w-28 h-28 rounded-full' src={authUser?.profilePic || profileLogo} alt="Profile" />
                }

                <div className='flex justify-center'>
                    <label htmlFor="fileInput" className="cursor-pointer file-label flex items-center gap-1 bg-gray-400 w-36 mt-4 text-white rounded-lg px-2">
                        <MdDriveFolderUpload /> Profile Photo
                    </label>
                    <input type="file" id="fileInput" name="fileInput" className="hidden" onChange={changeProfilePic} />
                </div>
                <h1 className='mt-4 font-bold text-2xl flex justify-center items-center gap-1'>
                    Name: {authUser.firstName} {authUser.lastName} <CiEdit className='cursor-pointer' onClick={() => document.getElementById('my_modal_name').showModal()} />
                </h1>
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
                <h3 className='font-semibold'>Email: {authUser.email}</h3>
                <h3 className=''><span className='font-bold'>Edit:</span> <span><a className='text-blue-500' href="/change-password">Change Password</a></span></h3>
            </div>
            <div className='mt-12'>
                <h1 className='text-center text-2xl md:text-4xl font-bold mb-6'>My Donation History</h1>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Transaction Date</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.slice(0, number).map((payment, index) =>
                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{authUser?.firstName} {authUser?.lastName}</td>
                                        <td>{payment?.createdAt ? format(new Date(payment.createdAt), 'dd-MM-yyyy') : ''}</td>
                                        <td>{payment?.paymentId}</td>
                                        <td>{payment?.amount} $</td>
                                        <td>{payment?.status}</td>
                                        <td>{payment?.status === "completed" ? <Link to={`/invoice/${payment._id}`}><button className='bg-green-500 px-2 text-white py-1 flex items-center gap-2 rounded-md'>Invoice <FaFileDownload /></button></Link> : ''}</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div className='text-center mt-6'>
                        {
                            number < payments.length && <button onClick={() => setNumber(number + 10)} className="btn btn-accent text-white">See More</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
