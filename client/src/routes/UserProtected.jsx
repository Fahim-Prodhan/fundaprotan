import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
// import useLogin from '../Hooks/useLogin';

const UserProtected = ({ children }) => {
    // const { loading } = useLogin();
    const { authUser,loadingUser } = useContext(AuthContext)
    const { logout } = useLogout()

    if (loadingUser) {
        return <div className="flex justify-center"><span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span></div>
    }

    if (authUser && authUser.verified === false) {
        return (
            <Navigate to='/otp'></Navigate>
        )
    } else if (authUser && authUser.isActive === false) {
        return (
            <div className='flex justify-center'>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Account Not Active</h1>
                        <p className="text-gray-700 mb-6">Your account is currently not active. Please contact support to resolve this issue.</p>
                        <button className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                            Contact Support
                        </button>
                        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200">
                            Logout
                        </button>
                    </div>
                </div>
        )
    } else {
        return children
    }
};

export default UserProtected;