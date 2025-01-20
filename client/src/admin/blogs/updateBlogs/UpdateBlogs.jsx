import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const UpdateBlogs = ({ blog }) => {
    const [updatedBlog, setUpdatedBlog] = useState({
        title: blog?.title ,
        description: blog?.description ,
        file: null,
    });

    useEffect(() => {
        setUpdatedBlog({
            title: blog?.title ,
            description: blog?.description ,
            file: null,
        });
    }, [blog]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBlog({ ...updatedBlog, [name]: value });
    };

    const handleFileChange = (e) => {
        setUpdatedBlog({ ...updatedBlog, file: e.target.files[0] });
    };

    const handleUpdateBlog = async (event) => {
        event.preventDefault();
        let imageUrl = blog.imageUrl; // default to existing image URL

        if (updatedBlog.file) {
            // Upload image to ImgBB if a new file is selected
            const formData = new FormData();
            formData.append('image', updatedBlog.file);
            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=6b61fed2ade9e1cb6596b28fb4315762', {
                    method: 'POST',
                    body: formData,
                });
                const imageData = await response.json();
                imageUrl = imageData.data.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        // Send updated blog data to the server
        try {
            const response = await fetch(`/api/blogs/update/${blog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedBlog.title,
                    description: updatedBlog.description,
                    imageUrl,
                }),
            });
            if (response.ok) {
                // Optionally, refresh the blog list or provide feedback
                console.log('Blog updated successfully');
                document.getElementById('my_modal_4').close();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Blog has been updated",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    location.reload()
                  });
            } else {
                console.error('Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => document.getElementById('my_modal_4').close()}
                    >
                        ✕
                    </button>
                    <h1 className='text-center pb-6 text-2xl font-bold'>Update Blog</h1>
                    <form className='grid justify-center' onSubmit={handleUpdateBlog}>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Title</span>
                            </label>
                            <input
                                name="title"
                                value={updatedBlog.title}
                                type="text"
                                placeholder="Enter Title of blog"
                                className="input input-bordered"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={updatedBlog.description}
                                placeholder="Enter Description of blog"
                                className="input input-bordered h-40"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className='btn mt-4 bg-[#363062] text-white'>Update Blog</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateBlogs;
