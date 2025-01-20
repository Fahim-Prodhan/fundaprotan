
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';


const AdminDashboard = () => {


    return (
        <div>
            <div className="sticky top-0 z-[99]"><Navbar></Navbar></div>
            <div >
                <Sidebar></Sidebar>
            </div>
            <div className='lg:ml-[20%] md:ml-[35%] mr-[4%] ml-[4%]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminDashboard;