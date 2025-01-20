import { Link } from "react-router-dom";


const AllProjectCard = ({ project }) => {

    const descriptionSlice = project.description.slice(0, 100)
    return (
        <div>
            <div className="hero bg-base-100 shadow-lg">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={project.imageUrl} className="md:max-w-md rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="md:text-2xl text-xl font-bold text-[#02A95C]">{project.title}</h1>
                        <p className="py-6"> <span className='font-bold'>Description:</span> {descriptionSlice}...</p>
                      <Link to={`/project-details/${project._id}`}>  <button className="btn bg-[#FF9800] text-white">Read More</button> </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProjectCard;