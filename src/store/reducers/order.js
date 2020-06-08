import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseSandwichStart = (state, action) => {
    return updateObject(state, { purchased: true })
}

const purchaseSandwichSccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseSandwichFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_SANDWICH_START: return purchaseSandwichStart(state, action);
        case actionTypes.PURCHASE_SANDWICH_SECCESS: return purchaseSandwichSccess(state, action);
        case actionTypes.PURCHASE_SANDWICH_FAIL: return purchaseSandwichFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer