import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { paymentSuccess } from '../component/Toastify'

import { DataContext } from '../context/DataContext'
import { useHistory } from 'react-router-dom'


const PaymentForm = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [total, setTotal] = useState("")
  const { cart, setCart } = useContext(DataContext)


  const his = useHistory()


  const handlePaymentSuccess = (response) => {
    // Process payment success logic here
    setPaymentStatus('Payment successful!');



    console.log(response);
    setTimeout(() => {
      paymentSuccess()
      setCart([])
      his.push('/home')
    }, 2000);
  };

  const handlePaymentError = (error) => {
    // Handle payment error
    setPaymentStatus('Payment failed!');
    console.error(error);
  };

  useEffect(() => {
    //    console.log()
    let totamo = 0;
    for (let i = 0; i < cart.length; i++) {
      totamo += cart[i].price * cart[i].qty;

    }
    totamo += 50;
    setTotal(totamo)
  }, [])

  const openPaymentModal = async () => {
    console.log('payment req started..')

    const dat = localStorage.getItem('EcomUserId')
    const datemail = localStorage.getItem('EcomEmail')
    const datname = localStorage.getItem('EcomUser')
    const paymentMode = localStorage.getItem('payment')


    // Make an API call to your server to create an order
    const data = {
      userid: dat,
      totalprice: total * 100,
      orderstatus: "order Not Done",
      paymentmode: paymentMode,
      paymentemail: datemail,
      name: datname,
      cart: cart
    }

    console.log('buy now req data :- ', data)
    // console.log(data)
    try {
      const res = await axios.post(`http://localhost:8000/buynow`, data)
      console.log("payment : ", res)
      // const {amount, id, created_at } = res
      // const orderData = {
      //   cart : cart,
      //   amount : amount,
      //   id : id,
      //   created_at : created_at
      // }

      // const orderSave = await axios.post('http://localhost:8000/saveorder', orderData)

      // setTimeout(() => {
      //   paymentSuccess()
      // }, 2000);
    } catch (err) {
      console.log("order not placed", err)
    }

    const { amount, id: orderId, currency } = data;
    console.log(amount)
    // Convert amount to paise
    const amountInPaise = total * 100;

    const options = {
      key: 'rzp_test_cRKMALlwldZBvI',
      amount: amountInPaise,
      currency: currency,
      name: 'Your Company Name',
      description: 'Order Payment',
      order_id: orderId,
      handler: handlePaymentSuccess,
      prefill: {
        name: datname,
        email: datemail,
        contact: '+91XXXXXXXXXX',
      },
      theme: {
        color: '#F37254',
      },
      modal: {
        escape: false,
      },
      notes: {
        address: 'Your delivery address',
      },
      // Add any additional options as per your requirement
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', handlePaymentError);

  };

  return (
    <div>
      <h2>Payment Form</h2>
      <button type="button" className="btn btn-info" onClick={openPaymentModal}>Proceed to Pay</button>

      <p>{paymentStatus}</p>
    </div>
  );
};

export default PaymentForm;
