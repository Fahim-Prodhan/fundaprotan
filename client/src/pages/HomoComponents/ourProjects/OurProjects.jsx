import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';



const OurProjects = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get(`/api/project/projects`)
            .then(res => {
                setProjects(res.data.projects)
            })
    }, [])
    return (
        <div>
            <h1 className='text-center pb-12 text-3xl md:text-5xl font-bold text-[#2C3333]'>Latest Projects</h1>
            <div className='grid  gap-6'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper"
                >
                    {
                        projects.slice(0, 6).map(project =>
                            <SwiperSlide key={project._id}>
                                <div className="card h-[450px] text-left card-compact bg-base-100 shadow-xl">
                                    <figure><img src={project.imageUrl} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-[#02A95C]">{project.title}</h2>
                                        <p>{project.description.slice(0, 100)}....</p>

                                        <Link className="btn bg-[#03C988] text-white my-4" to={`/project-details/${project._id}`}><button>view Details</button></Link>

                                    </div>
                                </div>
                            </SwiperSlide>
                        )}
                </Swiper>
            </div>
            <div className='text-center '>
                <Link to='/projects'>
                    <button className='btn btn-outline btn-success mt-12'>See All</button>
                </Link>
            </div>
        </div>
    );
};

export default OurProjects;