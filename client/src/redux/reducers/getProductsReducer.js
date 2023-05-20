import * as actionType from '../constants/productConstant'

// state : -> currentState
// action : -> updated /dispatched state
export const getProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCTS_SUCCESS:
            return { products: action.payload }
        case actionType.GET_PRODUCTS_FAIL:
            return { err: action.payload }
        default:
            return state
    }
}