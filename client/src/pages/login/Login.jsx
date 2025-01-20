/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { TiTick } from "react-icons/ti";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Logo-FUNDAPROTAN.png'
import useLogin from '../../Hooks/useLogin';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
    const { login } = useLogin();
    const [eye, setEye] = useState(false);
    const [formData, setFormData] = useState({
        username: 'admin',
        password: '123456'
    });

    const togglePassword = () => {
        setEye(!eye)
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
        e.preventDefault();
        const form = e.target;
        await login(formData.username, formData.password);
        form.reset();
    }

    return (

        <div>
            <Navbar></Navbar>
            <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mb-16 mb-8'>
                <div className="relative md:top-10">
                    <div className="grid md:grid-cols-2 gap-7">
                        <div className="lg:py-0 py-4 ">
                            <div className='flex justify-center lg:justify-start my-6'>
                                <img className='lg:w-[40%] w-1/2' src={logo} alt="" />
                            </div>
                            <div >
                                <h1 className='font-bold text-xl md:text-3xl lg:text-4xl text-center lg:text-left'>Login your Fundaportan account</h1>
                                <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Create a campaign in minutes</p>
                                <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Seamlessly integrate with your website</p>
                                <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Accept nearly every payment method</p>
                            </div>
                        </div>
                        <div className="card w-full  shadow-2xl bg-base-100">
                            <h1 className="text-center text-5xl font-bold py-4">Login to Demo Admin</h1>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input defaultValue={'admin'} name="username" type="text" placeholder="username" className="input input-bordered" required onChange={handleChange} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2 label">
                                        <input defaultValue={'123456'} name="password" type={eye ? "text" : "password"} className="grow" placeholder="password" onChange={handleChange} />
                                        <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span>
                                    </label>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <Link to='/forgot-password' className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                    <label className="label">
                                        <p className="pt-2 text-sm">Don't have an account? <span className="text-blue-400"><Link to='/register'>Register</Link></span></p>
                                    </label>
                                </div>
                                <div className="form-control mt-6 col-span-2">
                                    <button type="submit" className="btn bg-[#363062] text-white">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Login;
