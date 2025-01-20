import  { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UpdateProjects = ({ project }) => {
    const [updatedProject, setUpdatedProject] = useState({
        title: project?.title ,
        description: project?.description ,
        file: null,
    });
    useEffect(() => {
        setUpdatedProject({
            title: project?.title ,
            description: project?.description ,
            file: null,
        });
    }, [project]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProject({ ...updatedProject, [name]: value });
    };

    const handleFileChange = (e) => {
        setUpdatedProject({ ...updatedProject, file: e.target.files[0] });
    };

    const handleUpdateProject = async (event) => {
        event.preventDefault();

        let imageUrl = project.imageUrl; // default to existing image URL
        if (updatedProject.file) {
            // Upload image to ImgBB if a new file is selected
            const formData = new FormData();
            formData.append('image', updatedProject.file);

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

        // Send updated project data to the server
        try {
            const response = await fetch(`/api/project/update/${project._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: updatedProject.title,
                    description: updatedProject.description,
                    imageUrl,
                }),
            });

            if (response.ok) {
                // Optionally, refresh the project list or provide feedback
                console.log('Project updated successfully');
                document.getElementById('my_modal_4').close();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Project has been Updated",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    location.reload()
                  });
            } else {
                console.error('Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
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
                    <h1 className='text-center pb-6 text-2xl font-bold'>Update Project</h1>
                    <form className='grid justify-center' onSubmit={handleUpdateProject}>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                            onChange={handleFileChange}
                        />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Title</span>
                            </label>
                            <input
                                name="title"
                                value={updatedProject.title}
                                type="text"
                                placeholder="Enter Title of project"
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
                                value={updatedProject.description}
                                type="text"
                                placeholder="Enter Description of project"
                                className="input input-bordered h-40"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className='btn mt-4 bg-[#363062] text-white'>Update Project</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateProjects;
