import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from 'react-hot-toast';
import useAddPublisher from '../../Hooks/useAddPublisher';

const AddPublisher = () => {
    const { loading, addPublisher } = useAddPublisher();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'publisher',
        verified:true
    });

    const [eye, setEye] = useState(false);


    const togglePassword = () => {
        setEye(!eye);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const password = e.target.password.value
        const confirmPassword = e.target.password.value
        if(password != confirmPassword){
            toast.error("Password not Match")
        }else {
            await addPublisher(formData);
        }


    }

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <div className="">
                <div className="lg:px-36">
                    <div className="card w-full  shadow-2xl bg-base-100">
                        <h1 className="text-center text-3xl md:text-5xl font-bold py-4">Add Publisher</h1>
                        <form className="card-body lg:grid md:grid-cols-2" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input name="firstName" type="text" placeholder="first name" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input name="lastName" type="text" placeholder="last name" className="input input-bordered" onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input name="username" type="text" placeholder="username" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="password" type={eye ? "text" : "password"} className="grow" placeholder="password" onChange={handleChange} />
                                    <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="confirmPassword" type={eye ? "text" : "password"} className="grow" placeholder="confirm password" onChange={handleChange} />
                                    {/* <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span> */}
                                </label>
                            </div>                          

                            <div className="form-control mt-6 col-span-2">
                                <button type="submit" className="btn bg-[#363062] text-white">Add Publisher {loading && <span className="loading loading-spinner loading-md"></span>}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPublisher;