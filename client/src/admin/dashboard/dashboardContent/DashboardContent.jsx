import React, { useEffect, useState } from 'react';
import { FaBlogger, FaUsers } from "react-icons/fa6";
import { GoProjectRoadmap } from 'react-icons/go';
import CountUp from 'react-countup';

import { HiCurrencyDollar } from "react-icons/hi2";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { FaDollarSign } from 'react-icons/fa';

const datas = [
    {
  
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {

        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {

        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {

        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
    
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {

        uv: 1400,
        pv: 680,
        amt: 1700,
    },
];

const DashboardContent = () => {

const [userCount, setUserCount] = useState(0)
const [projectCount, setProjectCount] = useState(0)
const [blogCount, setBlogCount] = useState(0)
const [total, setTotal] = useState(0)
const [invoiceData, setInvoiceData] = useState([])

    useEffect(()=>{
        axios.get(`/api/auth/userCount`)
        .then(res=>{
            const count = res.data.count;
            setUserCount(count)
        })
        axios.get(`/api/project/countProject`)
        .then(res=>{
            const count = res.data.count;
            setProjectCount(count)
        })
        axios.get(`/api/blogs/countBlog`)
        .then(res=>{
            const count = res.data.count;
            setBlogCount(count)
        })
        axios.get(`/api/donate/invoices`)
        .then(res=>{
            const invoices = res.data
            setInvoiceData(invoices)
            const amount = invoices.reduce((total, invoice)=> total + invoice.amount, 0)
            setTotal(amount)

        })
    },[])

    const data = invoiceData.splice(0,6)
    console.log(data);


    return (
        <div className='grid lg:grid-rows-3 lg:grid-cols-4 gap-4 mt-6'>

            <div className="card bg-[#40A2E3] text-white shadow-xl col-span-1">
                <div className="card-body text-center">
                    <h2 className=" text-left text-3xl flex items-center gap-2"><FaUsers />Donors</h2>
                    <p className='py-6 font-bold text-3xl items-center flex justify-center'><CountUp
                        start={0}
                        end={userCount}
                        ></CountUp></p>
                </div>
            </div>

            <div className="card bg-[#F97300] shadow-xl text-white">
                <div className="card-body text-center">
                    <h2 className=" text-left text-3xl flex items-center gap-2"><HiCurrencyDollar />Amount</h2>
                    <p className='py-6 font-bold text-3xl items-center flex justify-center'>
                        <CountUp
                        start={0}
                        end={total}
                        duration={1.5}
                        ></CountUp><FaDollarSign></FaDollarSign></p>
                </div>
            </div>

            <div className="card lg:order-none order-last bg-base-100 shadow-xl lg:col-span-2 lg:row-span-2">
                <div className="card-body">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="amount" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card bg-[#FC4100] shadow-xl text-white">
                <div className="card-body text-center">
                    <h2 className=" text-left text-3xl flex items-center gap-2">< GoProjectRoadmap />Projects</h2>
                    <p className='py-6 font-bold text-3xl items-center flex justify-center'><CountUp
                        start={0}
                        end={projectCount}
                        ></CountUp></p>
                </div>
            </div>
            <div className="card bg-[#10439F] shadow-xl text-white">
                <div className="card-body text-center">
                    <h2 className=" text-left text-3xl flex items-center gap-2">< FaBlogger />Blogs</h2>
                    <p className='py-6 font-bold text-3xl items-center'><CountUp
                        start={0}
                        end={blogCount}
                        ></CountUp></p>
                </div>
            </div>

        </div>
    );
};

export default DashboardContent;