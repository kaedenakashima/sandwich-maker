import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        atomato: 0,
        cheese: 0,
        salad: 0,
        salami: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    atomato: 2,
    cheese: 1.5,
    salad: 0.5,
    salami: 1.3,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
    return state;
}

export default reducer;
