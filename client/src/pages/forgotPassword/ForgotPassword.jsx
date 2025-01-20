import React, { useState } from 'react';
import logo from '../../assets/images/Logo-FUNDAPROTAN.png'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Email is Sending......')
        fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Username not found');
            })
            .then((data) => {
                console.log(data);
                Swal.fire({
                    title: "Check Your Email!",
                    text: "Password reset instructions sent to your email.",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error(error.message);
            });
        // Perform further actions here, such as sending the email
    }

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <div className='flex justify-center'>
                <div className="lg:py-0 py-4">
                    <div className='flex justify-center my-1'>
                        <img className='w-32' src={logo} alt="" />
                    </div>
                    <div className='space-y-3' >
                        <h1 className='font-bold text-xl md:text-3xl lg:text-4xl text-center'>Reset Your Account Password</h1>
                        <p className='text-xl lg:px-56 text-center'>Please provide your account email. We will email you the instructions to reset your account.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control lg:px-60">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" value={email} onChange={handleChange} placeholder="email" className="input input-bordered rounded-md" required />
                        </div>
                        <div className='text-center mt-4'>
                            <button type="submit" className="btn bg-[#363062] text-white">Send Email</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
