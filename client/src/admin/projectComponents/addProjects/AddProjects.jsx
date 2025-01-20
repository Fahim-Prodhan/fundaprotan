import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddProjects = () => {
    const [loading, setLoading] = useState(false)

    const handleAddProject = async (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        const file = event.target.elements.file.files[0];

        // Create FormData object
        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true)
            // Upload image to ImgBB
            const response = await fetch('https://api.imgbb.com/1/upload?key=6b61fed2ade9e1cb6596b28fb4315762', {
                method: 'POST',
                body: formData,
            });
            const imageData = await response.json();
            const imageUrl = imageData.data.url;


            // Post project data to server
            const projectData = { title, description, imageUrl };
            const postResponse = await fetch('/api/project/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const postResult = await postResponse.json();
            if(postResponse.ok){
                document.getElementById('my_modal_3').close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    location.reload()
                  });
            } 
            console.log('Project added:', postResult);
                 

        } catch (error) {
            console.error('Error uploading image or posting project:', error);
        }
        setLoading(false)   
        // Clear the form if needed
        event.target.reset();
    };

    return (
        <div>
            <button className="btn btn-outline btn-info" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Project</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h1 className='text-center pb-6 text-2xl font-bold'>Add Project</h1>
                    <form className='grid justify-center' onSubmit={handleAddProject}>
                        <input name="file" type="file" className="file-input file-input-bordered w-full max-w-xs" required />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Title</span>
                            </label>
                            <input name="title" type="text" placeholder="Enter Title of project" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Description</span>
                            </label>
                            <textarea name="description" type="text" placeholder="Enter Description of project" className="input input-bordered h-40" required />
                        </div>

                        <button type="submit" className='btn mt-4 bg-[#363062] text-white'>Add Project {loading ? <span className="loading loading-spinner loading-sm"></span> : ''}</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AddProjects;
