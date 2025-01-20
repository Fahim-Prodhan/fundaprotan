import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/root/Root";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import OtpPage from "../pages/otpPage/OtpPage";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import Home from "../pages/HomoComponents/home/Home";
import AdminDashboard from "../admin/dashboard/adminDashboard/AdminDashboard";
import DashboardContent from "../admin/dashboard/dashboardContent/DashboardContent";
import Projects from "../admin/projectComponents/porjects/Projects";
import Blogs from "../admin/blogs/Blogs";
import AddAdmin from "../admin/addAdmin/AddAdmin";
import AllUsers from "../admin/allUsers/AllUsers";
// import OtpProtected from "./OtpProtected";
import AdminProtected from "./AdminProtected";
import AllProjects from "../pages/ProjectComponents/projects/AllProjects";
import AllBlogs from "../pages/blogsComponents/AllBlogs/AllBlogs";
import BlogsDetails from "../pages/blogsComponents/blogsDetails/BlogsDetails";
import ProjectDetails from "../pages/ProjectComponents/projectDetails/ProjectDetails";
import UserProtected from "./UserProtected";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Donate from "../pages/Donate/Donate";
import Success from "../pages/Success/Success";
import DonateProtected from "./DonateProtected";
import MyProfile from "../pages/MyProfile/MyProfile";
import Invoice from "../pages/invoice/Invoice";
import LogoutProtected from "./LogoutProtected";
import AddPublisher from "../admin/addPublisher/AddPublisher";
import SubscriptionConfirm from "../pages/subscriptionConfirm/SubscriptionConfirm";

const router = createBrowserRouter([
    {
        path:'/',
        element:<UserProtected><Root></Root></UserProtected>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
            ,
            {
                path:'/forgot-password',
                element:<ForgotPassword></ForgotPassword>
            },
            {
                path:'/reset/:token',
                element:<ResetPassword></ResetPassword>
            },
            {
                path:'/projects',
                element:<AllProjects></AllProjects>
            },
            {
                path:'/project-details/:id',
                element:<ProjectDetails></ProjectDetails>
            },
            {
                path:'/blogs',
                element:<AllBlogs></AllBlogs>
            },
            {
                path:'/blogs-details/:id',
                element:<BlogsDetails></BlogsDetails>
            },
            {
                path:'/change-password',
                element:<ChangePassword/>
            },
            {
                path:'/success',
                element:<Success/>
            },
            {
                path:'/confirm-subscription',
                element:<SubscriptionConfirm/>
            },
            {
                path:'my-profile',
                element:<MyProfile></MyProfile>
            }
        ]
    },
    {
        path:'/admin',
        element:<AdminProtected><AdminDashboard></AdminDashboard></AdminProtected>,
        children:[
            {
                path:'dashboard',
                element:<DashboardContent></DashboardContent>
            },
            {
                path:'projects',
                element:<Projects></Projects>
            },
            {
                path:'blogs',
                element:<Blogs></Blogs>
            },
            {
                path:'add-admin',
                element:<AddAdmin></AddAdmin>
            },
            {
                path:'add-publisher',
                element:<AddPublisher></AddPublisher>
            },
            {
                path:'users',
                element:<AllUsers></AllUsers>
            }
        ]
    },
    {
        path:'/donate',
        element:<DonateProtected><Donate/></DonateProtected>
     },            
     {
         path:'/otp',
         element:<OtpPage></OtpPage>
     },
     {
        path:'/invoice/:id',
        element:<Invoice></Invoice>
     },
     {
         path:'/register',
         element:<LogoutProtected><Register></Register></LogoutProtected>
     },
     {
         path:'/login',
         element:<LogoutProtected><Login></Login></LogoutProtected>
     }
])

export default router;