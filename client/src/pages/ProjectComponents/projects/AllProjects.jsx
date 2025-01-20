import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllProjectCard from '../project/AllProjectCard';

const AllProjects = () => {

    const [projects, setProjects] = useState([])
    const [index,setIndex] = useState(3)
    const [loading, setLoading] = useState(false)


    const handleSeeMore =()=>{
        setIndex(index+3)
    }

    useEffect(()=>{
        setLoading(true)
        axios.get(`/api/project/projects`)
        .then(res=>{
            setProjects(res.data.projects)
            setLoading(false)
        })
    },[])

        
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
            <h1 className='text-center font-bold md:text-5xl text-3xl py-4 mb-12 text-[#2C3333]'>OUR PROJECTS</h1>
            <div className='lg:max-w-7xl mx-auto space-y-12 pb-12'>
                {
                    projects.map(project=> <AllProjectCard key={project._id} project={project}></AllProjectCard>)
                }
            </div>
            <div className='text-center'>
            <button onClick={handleSeeMore} className={`btn btn-outline btn-success mb-12 ${index >= projects.length ? 'hidden':''}`}>See more</button>
            </div>
        </div>
    );
};

export default AllProjects;