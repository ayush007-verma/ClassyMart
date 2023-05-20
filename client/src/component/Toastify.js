import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const paymentSuccess = () => {
    toast.success("Payment Successful", {
        position : toast.POSITION.TOP_RIGHT
    })
}

    