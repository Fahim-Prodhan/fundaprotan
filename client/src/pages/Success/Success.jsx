import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/images/6 Logo Verde.png'

function Success() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const transactionId = query.get("session_id");
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSuccessData = () => {
            fetch("/api/donate/success", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ transactionId }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFetched(true);
            });
        };

        if (!fetched) {
            const timeout = setTimeout(fetchSuccessData, 1000); 
            return () => clearTimeout(timeout);
        }
        setLoading(false)

    }, [transactionId, fetched]);

    return (
        <div>
            <div className="flex items-center justify-center ">
                <div className=" p-8 rounded-lg  max-w-md flex flex-col justify-center items-center">
                    <img className="w-1/2 rounded-e-lg mb-4" src={logo} alt="" />                  
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Payment Successful</h2>
                    <p className="text-gray-600 text-center mb-6">Thank you for your Donation</p>
                    <Link to = '/my-profile'><button className="btn btn-accent text-white">{loading ? <p className="flex items-center gap-2"> Please Wait<span className="loading loading-spinner loading-md"></span></p> : 'Done'}</button></Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Success;
