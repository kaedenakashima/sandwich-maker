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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}

