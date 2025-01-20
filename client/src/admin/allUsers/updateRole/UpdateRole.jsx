import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateRole = ({ user }) => {
    const [selectedRole, setSelectedRole] = useState(user?.role);

    const handleUpdateRole = e => {
        e.preventDefault();
        console.log(selectedRole);
        const data = {
            role: selectedRole
        }

        try {
            axios.patch(`/api/auth/updateRole/${user._id}`, data)
                .then(res => {
                    if (res) {
                        // Optionally, refresh the blog list or provide feedback
                        console.log('Role updated successfully');
                        document.getElementById('my_modal_4').close();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Role has been updated",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            location.reload()
                        });
                    } else {
                        console.error('Failed to update blog');
                    }
                })

        } catch (error) {
            console.error('Error updating blog:', error);
        }
    }

    useEffect(() => {
        if (user) {
            setSelectedRole(user.role);
        }
    }, [user]);

    return (
        <div>
            <div className="modal-box shadow-none">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h1 className='text-center pb-6 text-2xl font-bold'>Update Role {user?.username}</h1>
                <form onSubmit={handleUpdateRole} className='grid justify-center'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold ">Role</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            <option value="publisher">publisher</option>
                        </select>
                    </div>
                    <button className='btn mt-4 bg-[#363062] text-white'>Update Role</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRole;