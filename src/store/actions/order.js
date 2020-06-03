import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseSandwichSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SANDWICH_SECCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseSandwichFail = (error) => {
    return {
        return: actionTypes.PURCHASE_SANDWICH_FAIL,
        error: error
    }
}

export const purchaseSandwichStart = () => {
    return {
        type: actionTypes.PURCHASE_SANDWICH_START
    }
}

export const purchaseSandwich = (orderData) => {
    return dispatch => {
        dispatch(purchaseSandwichStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseSandwichSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseSandwichFail(error))
            });
    }
}