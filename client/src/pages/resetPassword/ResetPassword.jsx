import React, { useState } from 'react';
import logo from '../../assets/images/Logo-FUNDAPROTAN.png'
import toast from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
              toast.error('Passwords do not match');
              return;
            }
      
            // Make a request to your backend to reset the password
            const response = await axios.post('/api/auth/reset-password', {
              password,
              resetToken: window.location.pathname.split('/').pop(), // Extract reset token from URL
            });
            
            toast.success(response.data.message)
          
          } catch (error) {
            console.error(error);
            toast.error(error.message)
          }
        // Perform further actions here, such as resetting the password
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
                    </div>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input type="password" value={password} onChange={handlePasswordChange} placeholder="new password" className="input input-bordered rounded-md" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="confirm new password" className="input input-bordered rounded-md" required />
                        </div>
                        <div className='text-center mt-4'>
                            <button type="submit" className="btn bg-[#FDDE55]">Reset Password</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ResetPassword;
