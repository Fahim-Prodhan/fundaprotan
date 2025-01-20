import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/6 Logo Verde.png'


const SubscriptionConfirm = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const preapprovalId = query.get("preapproval_id");
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSuccessData = () => {
            setLoading(true)
            fetch("/api/subscription/confirm-subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ preapprovalId }),
            })
                .then((res) => {
                    res.json()
                    setLoading(false)
                })
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

    }, [fetched, preapprovalId]);

    return (
        <div>
            <div className="flex items-center justify-center ">
                <div className=" p-8 rounded-lg  max-w-md flex flex-col justify-center items-center">
                    <img className="w-1/2 rounded-e-lg mb-4" src={logo} alt="" />
                    {
                    loading ? 
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Subscription Processing...</h2>:
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Subscription Successful</h2>

                    }
                    <p className="text-gray-600 text-center mb-6">Thank you for your Subscription</p>
                    {
                    loading ?
                        <button className="btn btn-accent text-white flex justify-center items-center gap-4">Loading <span className="loading loading-spinner loading-md"></span></button> :
                        <Link to='/my-profile'><button className="btn btn-accent text-white">Done</button></Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default SubscriptionConfirm;