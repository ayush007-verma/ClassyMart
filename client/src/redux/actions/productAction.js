import axios from "axios"

import * as actionTypes from '../constants/productConstant'

const URL = 'http://localhost:8000'

export const getProducts = () => async (dispatch) => {
    try {
        const { products } = await axios.get(`${URL}/products`)
        console.log('products : ', products)
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products })
    } catch (err) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: err.message })
    }
}