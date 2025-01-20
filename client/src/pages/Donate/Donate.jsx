import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/images/6 Logo Verde.png'
import Navbar from '../../components/navbar/Navbar';
// import { Hidden } from '@mui/material';
// import Footer from '../../components/footer/Footer';

const Donate = () => {
  const { authUser } = useContext(AuthContext)
  const [amount, setAmount] = useState('');
  const [subAmount, setSubAmount] = useState('');
  const [error, setError] = useState('');
  const [subError, setSubError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [currency, setCurrency] = useState('USD'); // New state for selected currency

  const handleDonate = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError('');
    setSuccess('');
    // console.log(currency);

    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      setLoading(false)
      return;
    } else if ( currency === 'COP' && Number(amount) < 1000) {
      setLoading(false)
      setError('Amount must be at least 1000 COP');
      return;
    } else if ( currency === 'USD' && Number(amount) < 0.25) {
      setLoading(false)
      setError('Amount must be at least 0.25 USD');
      return;
    }

    try {
      const order = {
        amount,
        currency, // Include currency in the order
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        email: authUser.email,
      }

      const res = await fetch('/api/pay/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      console.log(data);
      if (data.init_point) {
        setLoading(false)
        window.location.href = data.init_point;
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      setError('Please enter a valid amount');
    }
  };

  const handleSubscription = async (e) => {
    setSubLoading(true)
    e.preventDefault();
    setSubError('');
    setSuccess('');

    if (!subAmount || isNaN(subAmount)) {
      setSubLoading(false)
      setSubError('Please enter a valid amount');
      return;
    } else if (Number(subAmount) < 4000) {
      setSubError('Amount must be at least 4000');
      setSubLoading(false)
      return;
    }

    try {
      const res = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: subAmount, currency }), // Include currency in the subscription
      });

      const data = await res.json();
      if (data.message === 'user already subscribed') {
        setSubError('User is already subscribed');
        setSubLoading(false)
        return;
      }
      console.log(data.data);
      if (data.data.init_point) {
        setSubLoading(false)
        window.location.href = data.data.init_point;
      }
    } catch (error) {
      setSubLoading(false)
      console.log(error);
      setSubError('Please enter a valid amount');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex justify-center flex-col'>
      </div>
      <div className='flex md:flex-row flex-col py-6'>
        <div className="max-w-md mx-6 md:mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md my-12">
          <img className='w-[25%] mx-auto rounded-lg' src={logo} alt="" />
          <p className='text-center font-semibold py-4'>Join us in sowing the seeds of hope and prosperity. Your donation helps farmers cultivate not just their crops, but their futures</p>
          <h2 className="text-2xl font-semibold text-center mb-6">Donate Directly</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleDonate}>
            <label className="block text-gray-700 font-bold">Select Currency</label>
            <div className='flex gap-3'>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">USD $</span>
                  <input
                    type="radio"
                    name="currency"
                    value="USD"
                    checked={currency === 'USD'}
                    onChange={() => setCurrency('USD')}
                    className="radio checked:bg-red-500"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">COP</span>
                  <input
                    type="radio"
                    name="currency"
                    value="COP"
                    checked={currency === 'COP'}
                    onChange={() => setCurrency('COP')}
                    className="radio checked:bg-blue-500"
                  />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-bold">Amount (minimum 1,000 COP or 0.25 USD):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder='Please enter donation amount $'
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-[#fff] hover:bg-[#099c6b] bg-[#03C988] font-semibold rounded-lg flex items-center gap-4 justify-center "
            >
              Donate <span className={`loading loading-spinner loading-md ${loading ? '' : 'hidden'}`}></span>
            </button>
          </form>
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        <div className="max-w-md mx-6 md:mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md my-12">
          <img className='w-[25%] mx-auto rounded-lg' src={logo} alt="" />
          <p className='text-center font-semibold py-4'>Your subscription helps farmers cultivate not just their fields, but their futures. Subscribe today to sow the seeds of hope and prosperity!</p>
          <h2 className="text-2xl font-semibold text-center mb-6">Subscribe</h2>
          {subError && <p className="text-red-500 text-center mb-4">{subError}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubscription}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-bold">Amount $ (minimum 4,000 COP):</label>
              <input
                type="number"
                value={subAmount}
                onChange={(e) => setSubAmount(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder='Please enter subscription amount $'
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 outline outline-green-500 text-green-500 font-semibold rounded-lg flex items-center gap-4 justify-center "
            >
              Subscribe <span className={`loading loading-spinner loading-md ${subLoading ? '' : 'hidden'}`}></span>
            </button>
          </form>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Donate;
