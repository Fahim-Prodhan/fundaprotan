import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios.get(`/api/project/details/${id}`)
            .then(res => {
                setProject(res.data)
                setLoading(false)
            })
    }, [id])

        
    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }
    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <div className='lg:p-12 p-4 bg-base-200'>
                <img className='rounded-lg lg:max-w-3xl mx-auto' src= {project.imageUrl} alt="" />
            </div>
            <div>
                <h1 className='text-center my-3 font-bold text-4xl text-[#FF204E]'>{project.title}</h1>
                <p><span className='font-bold text-2xl'>Description:</span></p>
                <p className='pb-12'>{project.description}</p>
            </div>
        </div>
    );
};

export default ProjectDetails;