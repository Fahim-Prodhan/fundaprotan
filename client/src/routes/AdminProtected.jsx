/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useLogout from '../Hooks/useLogout';

const AdminProtected = ({ children }) => {

    const { authUser, loadingUser } = useContext(AuthContext);
    const { logout } = useLogout();
    // console.log(authUser);

    // useEffect(() => {      
    //     if (!loadingUser && (!authUser || authUser.role !== 'admin')) {
    //         logout();
    //         location.reload()
    //     }
    // }, [loadingUser, authUser, logout]);

    if (loadingUser) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if (authUser && authUser.isActive === false) {
        return (
            <div>
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
            </div>
        )
    } else if (authUser && authUser?.role === "admin" || authUser?.role === 'publisher') {
        return children
    }
    else {
        return (
            <div className='flex justify-center'>
                <div className="text-center p-6 bg-white ">
                    <h1 className="text-6xl font-bold text-red-500">403</h1>
                    <h2 className="text-2xl mt-4 text-gray-800">Forbidden</h2>
                    <p className="mt-2 text-gray-600">You don't have permission to access this resource.</p>
                    <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Go to Home
                    </a>
                </div>
            </div>
        );
    }
    // return children
};

export default AdminProtected;
