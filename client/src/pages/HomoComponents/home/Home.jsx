import HeaderBanner from '../HeaderBanner/HeaderBanner';
import Mission from '../Mission/Mission';
import OurBlogs from '../ourBlogs/OurBlogs';
import OurProjects from '../ourProjects/OurProjects';


const Home = () => {

    return (
        <div>
            <HeaderBanner></HeaderBanner>
            <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
                <div className='mt-12 md:mt-[100px]'><Mission></Mission></div>
                <div className='mt-12 md:mt-[100px]'><OurProjects></OurProjects></div>
                <div className='mt-12 md:mt-[100px]'><OurBlogs></OurBlogs></div>
                {/* <div className='mt-12 md:mt-[100px]'><InvoiceCard></InvoiceCard></div> */}

            </div>
        </div>
    );
};

export default Home;