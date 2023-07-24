import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../context/DataContext'

const ProductDetails = () => {
    const { id } = useParams()

    const { cart, setCart } = useContext(DataContext)
    const [detdata, setDetdata] = useState([])
    const [pdetails, setPdetails] = useState("1")

    const timeout = useRef(null)
    const his = useHistory()
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            //  console.log()
            if (!response.data.login) {
                his.push("/");
            }
        })

    }

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 100)
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }


    }, [])



    const onSub = (e) => {
        e.preventDefault()
        // console.log(pdetails)
        const data = {
            id: detdata[0].id,
            name: detdata[0].title,
            price: detdata[0].price,
            image: detdata[0].image,
            qty: pdetails
        }
        console.log("det data : ", data)

        // setCart([...cart,data])
        const exist = cart.find((x) => x.id === data.id)
        if (exist) {
            setCart(
                cart.map((x) => x.id === data.id ? data : x)
            )
        }
        else {
            setCart([...cart, data])
        }
        console.log(cart)
        his.push('/cart')
    }

    const getData = async () => {

        const res = await axios.get(`http://localhost:8000/getdata/${id}`)
        console.log("api response : ", res)
        setDetdata(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    if (!detdata.length) {
        return <h1>Loading..</h1>
    }

    return (
        <>
            <div className="details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            {/* {
                                console.log('image : ', detdata[0])
                            } */}
                            <img src={`${detdata[0].image}`} alt={detdata[0].plant_image} className="img-fluid p-im" />
                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3 d-flex  flex-column mt-5">
                            <h2>{detdata[0].title}</h2>
                            <h4>Price : <strong>{detdata[0].price}.00</strong> </h4>
                            <p>{detdata[0].description}</p>
                            <form onSubmit={onSub}>
                                <input type="hidden" value={detdata[0].id} />
                                <div class="form-group w-50">
                                    <label for="sel1">Choose Qty:</label>
                                    <select class="form-control" id="" onChange={(e) => setPdetails(e.target.value)} required>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="text-left">
                                    <button type="submit" className="btn btn-info">Add To Cart</button>
                                </div>
                                {/* <input type="submit" className="btn btn-info" value="Add To Cart" /> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetails
